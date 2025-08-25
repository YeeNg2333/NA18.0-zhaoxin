import { NextRequest, NextResponse } from "next/server"
export const runtime = "nodejs"
import { saveApplication } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "请求体无效" }, { status: 400 })
    }

    const { name, stuid, major, grade, gender, phone, departments } = body as {
      name?: string
      stuid?: string
      major?: string
      grade?: string
      gender?: string
      phone?: string
      departments?: string[]
    }

    if (!name || !stuid || !major || !grade || !gender || !phone || !Array.isArray(departments) || departments.length === 0) {
      return NextResponse.json({ message: "请填写所有必填项目" }, { status: 400 })
    }

    // 基础字段长度校验（可按需增强）
    if (name.length > 50 || major.length > 100 || phone.length > 30) {
      return NextResponse.json({ message: "字段长度超限" }, { status: 400 })
    }

    const record = {
      name,
      stuid,
      major,
      grade,
      gender,
      phone,
      departments,
      createdAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") || "",
      ua: req.headers.get("user-agent") || "",
    }

    const id = await saveApplication(record)

    return NextResponse.json({ id, message: "已接收" }, { status: 201 })
  } catch (err) {
    console.error("/api/applications POST error", err)
    return NextResponse.json({ message: "服务器错误" }, { status: 500 })
  }
}
