 ---
 
# NA 新生招新网站使用说明

> 本项目基于 Next.js（App Router）+ Tailwind CSS 构建，用于 NA 部门介绍与“加入我们/申请加入”在线收集信息。
>
> 近期已完成的样式优化：
> - 输入框底色更柔和、占位符颜色优化、单选/复选动画与主题色统一
> - 全局去除加粗、输入框圆角收敛、按钮样式统一（主题/副主题配色）
> - 申请按钮圆形化、表单左右布局优化（桌面端更平衡）

---
<table>
   <tr>
     <td><img src="Example%20image/1.png" alt="" width="100%" /></td>
     <td><img src="Example%20image/2.png" alt="" width="100%" /></td>
   </tr>
   <tr>
     <td><img src="Example%20image/3.png" alt="" width="100%" /></td>
     <td><img src="Example%20image/4.png" alt="" width="100%" /></td>
   </tr>
 </table>

## 目录
- [项目简介](#项目简介)
- [快速开始](#快速开始)
- [替换文本指南](#替换文本指南)
- [替换各部门图片](#替换各部门图片)
- [替换微信群二维码](#替换微信群二维码)
- [申请表单与数据库接入说明](#申请表单与数据库接入说明)
- [部署建议](#部署建议)
- [常见问题](#常见问题)
- [联系作者](#联系作者)

---

## 项目简介
- 网站目标：介绍 NA 各部门（技术部、秘书部、宣传部、外联部、资源部）职责与文化，并提供在线申请加入的表单入口。
- 技术栈：
  - Next.js App Router（TypeScript）
  - Tailwind CSS（定制 theme-primary / theme-secondary 主题色）
  - API 路由用于接收表单提交并写入数据库（可选接入）

---

## 快速开始
1) 安装依赖
```bash
pnpm i
# 或 npm i / yarn
```
2) 本地开发
```bash
pnpm dev
# 或 npm run dev
```
3) 打开浏览器访问 http://localhost:3000

---

## 替换文本指南
> 改动位置请“自行搜索替换项”在代码中的位置（IDE 全局搜索关键字）。常见位置如下：

> 改动位置请自行搜索替换项在代码中的位置@[/Users/curtisyan/Desktop/na-zhaoxin2025/DATABASE_SETUP.txt]

- 首页与通用布局
  - `app/page.tsx`（首页文案、按钮文案）
  - `app/layout.tsx`（站点 <head> 元信息、全局标题/描述）
- 部门文案
  - `app/departments/data.ts`：
    - 字段说明：
      - `slug`: 部门路由短名
      - `title`: 部门中文名称
      - `intro`: 列表页两句话简介
      - `details: string[]`: 详情页 4-5 句描述
      - `gradient?`: 可选占位封面渐变（无图片时显示）
      - `imageSrc?`: 可选封面单图
      - `images?: string[]`: 详情页多图（按一列向下排列）
  - `app/departments/[slug]/page.tsx` 与 `app/departments/page.tsx`：渲染逻辑与样式
- 加入我们页面
  - `app/join/page.tsx`：表单字段标签/占位符/按钮文案

建议做法：
- 使用编辑器的全局搜索（如 VSCode 的“在文件中查找”）搜索你的替换关键字或“TODO/替换/placeholder”等标记进行定位。

---

## 替换各部门图片
- 推荐将图片放置在 `public/departments/<slug>/` 目录（如不存在可自行创建）。
  - 示例：
    - 封面单图：`public/departments/tech/cover.jpg`
    - 详情多图：`public/departments/tech/detail-1.jpg`、`detail-2.jpg` ...
- 在 `app/departments/data.ts` 中配置：
  - 若使用单张封面图：设置 `imageSrc: "/departments/tech/cover.jpg"`
  - 若使用多张详情图：设置 `images: ["/departments/tech/detail-1.jpg", "/departments/tech/detail-2.jpg"]`
  - 若暂不提供图片，可移除 `imageSrc/images`，保留 `gradient` 渐变占位

### 部门详情页多张图片展示
- 配置位置：在 `app/departments/data.ts` 的对应部门对象中设置 `images: string[]`，例如：
  ```ts
  images: [
    "/departments/tech/detail-1.jpg",
    "/departments/tech/detail-2.jpg",
    "/departments/tech/detail-3.jpg",
  ]
  ```
- 图片放置：将文件放在 `public/departments/<slug>/` 下，路径以 `/departments/...` 形式填写。
- 展示顺序：按数组顺序从上到下展示。
- 移动端间距：部门详情页已使用 `grid` 的垂直间距控制（`gap-y-*`）。若需调整“图片与图片之间”的距离，可在 `app/departments/[slug]/page.tsx` 中修改：
  - 列表容器类名（示例）：`grid grid-cols-1 gap-y-12 sm:gap-y-14 md:gap-y-16`
  - 你可以将移动端改为更大/更小（如 `gap-y-8` 或 `gap-y-20`）。

- 建议尺寸与优化：
  - 宽度建议 ≥ 1200px，保证高清；按需裁切 16:9 或接近比例。
  - 使用合适的压缩工具（如 Squoosh/TinyPNG）降低体积以提升加载速度。

注意：
- Next.js 会从 `public/` 目录根路径暴露静态资源，因此在代码中以 `"/departments/..."` 的形式引用。
- 图片文件名与路径大小写需与引用一致。

---

## 替换微信群二维码
> 如果项目中已有占位二维码，请在 `public/` 目录中替换同名图片；如不确定位置，请全局搜索“wechat/二维码/qr”。

建议：
- 将二维码置于 `public/assets/wechat-group.png`（或 .jpg），并在引用处统一使用 `"/assets/wechat-group.png"`。
- 若在页面中新增展示位置（例如首页底部或“加入我们”成功页），可直接在对应 TSX 文件中引入：
  ```tsx
  <Image src="/assets/wechat-group.png" alt="加入微信群二维码" width={240} height={240} />
  ```

---

## 申请表单与数据库接入说明

### 目标
- 让“加入我们/申请加入”表单提交的数据写入数据库。
- 本项目已提供 API 路由与数据库封装逻辑骨架，无需立即填写真实主机/密码即可联通前后端。

### 文件结构
- `app/api/applications/route.ts`   接收表单 POST，并调用数据库封装保存数据
- `lib/db.ts`                       数据库封装：根据 `DB_PROVIDER` 动态选择驱动

### 环境变量（在 `.env` 或部署平台环境配置中设置）
- `DB_PROVIDER=postgres | mysql | sqlite`（留空则使用占位模式，仅打印日志，不写库）
- `DB_URL`（可选，标准连接串，如 `postgres://user:pass@host:5432/dbname`）
- `DB_HOST` 数据库主机
- `DB_PORT` 端口（数值）
- `DB_USER` 用户名
- `DB_PASSWORD` 密码
- `DB_NAME` 数据库名称
- `DB_SSL=true/false`（需要 SSL 时设为 true）
- `DB_FILE` SQLite 文件路径（仅当 `DB_PROVIDER=sqlite` 时生效，默认 `.data/local.sqlite`）

### 所需依赖（按需安装，仅当对应 `DB_PROVIDER` 被使用时）
- Postgres: `pg`
- MySQL: `mysql2`
- SQLite: `better-sqlite3`

安装依赖示例（任选其一，根据 `DB_PROVIDER`）
```bash
npm i pg
npm i mysql2
npm i better-sqlite3
```

### 表结构（统一规范，驱动层可自动创建表；如需手动初始化可参考下方 DDL）
- 表名：`applications`
- 字段：
  - `id`           主键（UUID/CHAR(36)/TEXT）
  - `name`         姓名 TEXT/VARCHAR
  - `major`        专业 TEXT/VARCHAR
  - `grade`        年级 TEXT/VARCHAR
  - `gender`       性别 TEXT/VARCHAR
  - `phone`        手机号 TEXT/VARCHAR
  - `departments`  JSON/JSONB/TEXT（存储字符串数组）
  - `created_at`   创建时间（TIMESTAMPTZ/DATETIME/TEXT）
  - `ip`           IP 地址 TEXT/VARCHAR
  - `ua`           User-Agent TEXT

#### Postgres 建表（可选）
```sql
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  major TEXT NOT NULL,
  grade TEXT NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT NOT NULL,
  departments JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  ip TEXT,
  ua TEXT
);
```

#### MySQL 建表（可选）
```sql
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
);
```

#### SQLite 建表（可选）
```sql
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
);
```

### 本地快速验证（不接数据库）
1) 不设置 `DB_PROVIDER`（留空）。
2) 启动开发服务器后提交表单，服务端日志会输出“`[DB:stub] 收到申请记录`”。

### 接入数据库步骤（示例以 Postgres 为例）
1) 安装依赖：
```bash
npm i pg
```
2) 设置环境变量：
```
DB_PROVIDER=postgres
DB_URL=postgres://user:pass@host:5432/dbname
# 或使用 DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME 组合
```
3) 重新启动服务。首次写入会自动创建表。
4) 在“加入我们”页面提交表单，数据应写入 `applications` 表。

### 部署提示
- 部署平台请在“环境变量”面板中配置以上变量。
- 若需要 SSL 连接，设置 `DB_SSL=true`。
- SQLite 适合简易或单机部署，生产建议使用托管 Postgres/MySQL。

### 故障排查
- 400：请检查前端必填字段是否完整。
- 500：请查看服务端日志（依赖是否已安装、连接串是否正确）。
- 未安装驱动：根据错误提示安装对应包（`pg`/`mysql2`/`better-sqlite3`）。

---

## 部署建议
- 静态资源（部门图片、二维码）放在 `public/` 下，路径以 `/` 开头引用。
- 环境变量通过 `.env.local`（本地）或部署平台面板设置（如 Vercel/Netlify）。
- 若使用自定义域名，确保部署平台 DNS 与域名解析正确。

---

## 常见问题
- 看不到图片？
  - 检查 `public/` 路径、文件名大小写、构建后路径是否一致。
- 不懂部署？
  - 自行问 AI 如何部署，万事不懂的就问 AI！！！
- 想快速定位替换点？
  - 使用编辑器全局搜索：关键词如“替换”“placeholder”“title”“intro”“details”“imageSrc”“images”“二维码/wechat/qr”。

---
# 联系作者
*realthat@foxmail.com*