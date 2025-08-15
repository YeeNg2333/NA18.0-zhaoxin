"use client"

import type React from "react"
import { useState } from "react"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    grade: "",
    gender: "",
    phone: "",
    departments: [] as string[],
  })

  const departments = ["技术部", "秘书部", "宣传部", "外联部", "资源部"]
  const grades = ["23级（大三）", "24级（大二）", "25级（大一）"]
  const genders = ["男", "女"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDepartmentChange = (department: string) => {
    setFormData((prev) => {
      const currentDepts = prev.departments
      if (currentDepts.includes(department)) {
        return {
          ...prev,
          departments: currentDepts.filter((d) => d !== department),
        }
      } else if (currentDepts.length < 2) {
        return {
          ...prev,
          departments: [...currentDepts, department],
        }
      }
      return prev
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, major, grade, gender, phone, departments } = formData

    if (!name || !major || !grade || !gender || !phone || departments.length === 0) {
      alert("请填写所有必填项目")
      return
    }

    alert("申请提交成功！")
  }

  return (
    <div>
      <div className="min-h-screen">
        <section className="h-[60vh] flex flex-col p-8 relative">
          <main className="flex-grow flex items-start justify-start w-full pt-16">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-light leading-tight" style={{ color: "var(--theme-secondary)" }}>
                无论你有清晰的目标还是初步的想法，
                <br />
                我们都在这里帮助你实现梦想。
              </h1>
            </div>
          </main>

          <div className="absolute bottom-8 left-8">
            <a
              href="mailto:realthat@foxmail.com"
              className="px-8 py-3 text-stone-900 font-medium rounded-full hover:opacity-90 transition-colors inline-block"
              style={{ backgroundColor: "var(--theme-secondary)" }}
            >
              realthat@foxmail.com
            </a>
          </div>
        </section>

        <section
          className="min-h-[100vh] p-10 flex items-start"
          style={{ backgroundColor: "var(--theme-secondary)" }}
        >
          <div className="max-w-7xl w-full flex items-stretch justify-between min-h-[100vh]">
            <div className="w-1/3 pr-12">
              <h2 className="text-5xl font-bold" style={{ color: "var(--theme-primary)" }}>
                申请加入
              </h2>
            </div>

            <div className="w-2/3 pl-12 flex flex-col justify-between">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                      姓名
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-stone-300/60 border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                      style={{ color: "var(--theme-primary)" }}
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                      专业
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="w-full bg-stone-300/60 border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                      style={{ color: "var(--theme-primary)" }}
                      placeholder="请输入专业"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                      年级
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-stone-300/60 border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                      style={{ color: "var(--theme-primary)" }}
                    >
                      <option value="">请选择年级</option>
                      {grades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                      性别
                    </label>
                    <div className="flex space-x-6 pt-2">
                      {genders.map((gender) => (
                        <label key={gender} className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={formData.gender === gender}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.gender === gender ? "" : "bg-transparent"
                              }`}
                              style={{
                                borderColor: "var(--theme-primary)",
                                backgroundColor: formData.gender === gender ? "var(--theme-primary)" : "transparent",
                              }}
                            >
                              {formData.gender === gender && (
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: "var(--theme-primary-foreground)" }}
                                ></div>
                              )}
                            </div>
                          </div>
                          <span className="ml-2 text-base font-medium" style={{ color: "var(--theme-primary)" }}>
                            {gender}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                    手机号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-stone-300/60 border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                    style={{ color: "var(--theme-primary)" }}
                    placeholder="请输入手机号"
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-base md:text-lg font-semibold" style={{ color: "var(--theme-primary)" }}>
                    感兴趣的部门 <span className="text-xs text-stone-600">(可多选，最多选择2个)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {departments.map((department) => (
                      <label key={department} className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.departments.includes(department)}
                            onChange={() => handleDepartmentChange(department)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center`}
                            style={{
                              borderColor: "var(--theme-primary)",
                              backgroundColor: formData.departments.includes(department)
                                ? "var(--theme-primary)"
                                : "transparent",
                            }}
                          >
                            {formData.departments.includes(department) && (
                              <div
                                className="w-2 h-2 rounded-sm"
                                style={{ backgroundColor: "var(--theme-primary-foreground)" }}
                              ></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-base font-medium" style={{ color: "var(--theme-primary)" }}>
                          {department}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: "var(--theme-primary)", color: "var(--theme-primary-foreground)" }}
                  >
                    提交申请
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
