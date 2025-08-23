import { randomUUID } from "crypto"

export type ApplicationRecord = {
  name: string
  stuid: string
  major: string
  grade: string
  gender: string
  phone: string
  departments: string[]
  createdAt: string
  ip: string
  ua: string
}

/**
 * 保存报名信息到数据库。
 * 说明：
 * - 默认（未配置 DB_PROVIDER）下，不会实际写数据库，仅在服务端控制台输出并返回一个占位 ID，方便端到端联通性测试。
 * - 当设置 DB_PROVIDER=postgres|mysql|sqlite 时，将按需动态导入驱动，仅在被调用到该分支时才需要安装对应依赖。（其实都要装好）
 * - 表结构请参考根目录 DATABASE_SETUP.txt。（目前仅对postgres进行修改结构--增加学号。
 */
export async function saveApplication(record: ApplicationRecord): Promise<string> {
  const id = randomUUID()
  const provider = (process.env.DB_PROVIDER || "").toLowerCase()

  if (!provider) {
    // 未配置数据库时的占位逻辑：仅打印日志，返回一个 ID
    console.log("[DB:stub] 收到申请记录：", { id, ...record })
    return id
  }

  if (provider === "postgres") {
    // 需要依赖：pg，仅对此数据库进行增改 学号 的行
    const { Client } = await import("pg").catch(() => ({ Client: null as any }))
    if (!Client) throw new Error("未安装依赖 pg，请参考 DATABASE_SETUP.txt")

    const client = new Client({
      connectionString: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    })

    await client.connect()
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id UUID PRIMARY KEY,
          name TEXT NOT NULL,
          stuid TEXT NOT NULL,
          major TEXT NOT NULL,
          grade TEXT NOT NULL,
          gender TEXT NOT NULL,
          phone TEXT NOT NULL,
          departments JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          ip TEXT,
          ua TEXT
        );
      `)

      await client.query(
        `INSERT INTO applications (
          id, name, stuid, major, grade, gender, phone, departments, created_at, ip, ua
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          id,
          record.name,
          record.stuid,
          record.major,
          record.grade,
          record.gender,
          record.phone,
          JSON.stringify(record.departments),
          record.createdAt,
          record.ip,
          record.ua,
        ]
      )
      return id
    } finally {
      await client.end()
    }
  }

  if (provider === "mysql") {
    // 需要依赖：mysql2
    const mysql = await import("mysql2/promise").catch(() => null as any)
    if (!mysql) throw new Error("未安装依赖 mysql2，请参考 DATABASE_SETUP.txt")

    const conn = await mysql.createConnection({
      uri: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    })

    try {
      await conn.execute(`
        CREATE TABLE IF NOT EXISTS applications (
          id CHAR(36) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          major VARCHAR(200) NOT NULL,
          grade VARCHAR(50) NOT NULL,
          gender VARCHAR(10) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          departments JSON NOT NULL,
          created_at DATETIME NOT NULL,
          ip VARCHAR(255),
          ua TEXT
        )
      `)

      await conn.execute(
        `INSERT INTO applications (
          id, name, major, grade, gender, phone, departments, created_at, ip, ua
        ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
          id,
          record.name,
          record.major,
          record.grade,
          record.gender,
          record.phone,
          JSON.stringify(record.departments),
          // MySQL DATETIME 建议传本地或 UTC 字符串
          record.createdAt.replace("Z", "").replace("T", " "),
          record.ip,
          record.ua,
        ]
      )
      return id
    } finally {
      await conn.end()
    }
  }

  if (provider === "sqlite") {
    // 需要依赖：better-sqlite3 或 sqlite3，以下采用 better-sqlite3（同步 API，更简单）
    const Database = await import("better-sqlite3").catch(() => null as any)
    if (!Database) throw new Error("未安装依赖 better-sqlite3，请参考 DATABASE_SETUP.txt")

    const dbFile = process.env.DB_FILE || ".data/local.sqlite"
    const db = new (Database as any)(dbFile)
    try {
      db.prepare(`
        CREATE TABLE IF NOT EXISTS applications (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          major TEXT NOT NULL,
          grade TEXT NOT NULL,
          gender TEXT NOT NULL,
          phone TEXT NOT NULL,
          departments TEXT NOT NULL,
          created_at TEXT NOT NULL,
          ip TEXT,
          ua TEXT
        )
      `).run()

      db.prepare(
        `INSERT INTO applications (
          id, name, major, grade, gender, phone, departments, created_at, ip, ua
        ) VALUES (@id,@name,@major,@grade,@gender,@phone,@departments,@created_at,@ip,@ua)`
      ).run({
        id,
        name: record.name,
        major: record.major,
        grade: record.grade,
        gender: record.gender,
        phone: record.phone,
        departments: JSON.stringify(record.departments),
        created_at: record.createdAt,
        ip: record.ip,
        ua: record.ua,
      })
      return id
    } finally {
      db.close()
    }
  }

  throw new Error(`不支持的 DB_PROVIDER: ${provider}`)
}
