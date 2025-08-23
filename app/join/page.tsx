"use client"

import type React from "react"
import { useState } from "react"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    stuid: "",
    major: "",
    grade: "",
    gender: "",
    phone: "",
    departments: [] as string[],
  })
  const [submitting, setSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const { name, stuid, major, grade, gender, phone, departments } = formData

    if (!name || !major || !grade || !gender || !phone || departments.length === 0) {
      alert("请填写所有必填项目")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const msg = (data && (data.message || data.error)) || `提交失败（HTTP ${res.status}）`
        alert(msg)
        return
      }

      alert("申请提交成功！")
      // 可按需重置表单
      setFormData({ name: "", stuid: "",major: "", grade: "", gender: "", phone: "", departments: [] })
    } catch (err) {
      console.error(err)
      alert("网络或服务器异常，请稍后重试")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="min-h-screen">
        <section className="h-[60vh] flex flex-col p-6 md:p-8 relative">
          <main className="flex-grow flex items-start justify-start w-full pt-8 md:pt-16">
            <div className="max-w-4xl pr-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight" style={{ color: "var(--theme-secondary)" }}>
                无论你有清晰的目标还是初步的想法，
                <br />
                我们都在这里帮助你实现梦想。
              </h1>
            </div>
          </main>

          <div className="static md:absolute md:bottom-8 md:left-8 mt-4 md:mt-0">
            <a
              href="mailto:realthat@foxmail.com"
              className="px-6 md:px-8 py-3 text-stone-900 font-medium rounded-full hover:opacity-90 transition-colors inline-block"
              style={{ backgroundColor: "var(--theme-secondary)" }}
            >
              realthat@foxmail.com
            </a>
          </div>
        </section>

        <section
          className="min-h-[70vh] p-6 md:p-10 flex items-start"
          style={{ backgroundColor: "var(--theme-secondary)" }}
        >
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-stretch justify-between min-h-[70vh] gap-6 md:gap-0">
            <div className="w-full md:w-1/2 md:pr-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "var(--theme-primary)" }}>
                申请加入
              </h2>
            </div>

            <div className="w-full md:w-1/2 md:pl-12 flex flex-col justify-between">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                      姓名
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-stone-400/30 text-[var(--theme-primary)] rounded-md placeholder:text-stone-500/70 focus:ring-2 focus:ring-stone-500/50 focus:outline-none transition-all duration-300 ease-in-out font-normal text-base"
                      placeholder="请输入姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                      学号
                    </label>
                    <input
                      type="text"
                      name="stuid"
                      value={formData.stuid}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-stone-400/30 text-[var(--theme-primary)] rounded-md placeholder:text-stone-500/70 focus:ring-2 focus:ring-stone-500/50 focus:outline-none transition-all duration-300 ease-in-out font-normal text-base"
                      placeholder="请输入学号"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                      专业
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-stone-400/30 text-[var(--theme-primary)] rounded-md placeholder:text-stone-500/70 focus:ring-2 focus:ring-stone-500/50 focus:outline-none transition-all duration-300 ease-in-out font-normal text-base"
                      placeholder="请输入专业"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4">
                  <div>
                    <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                      年级
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-stone-400/30 rounded-md focus:ring-2 focus:ring-stone-500/50 focus:outline-none transition-all duration-300 ease-in-out font-normal text-base ${
                        formData.grade ? 'text-[var(--theme-primary)]' : 'text-stone-500/70'
                      }`}
                      required
                    >
                      <option value="" className="text-black">请选择年级</option>
                      {grades.map((grade) => (
                        <option key={grade} value={grade} className="text-black">
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                      性别
                    </label>
                    <div className="flex flex-wrap gap-x-3 gap-y-3 pt-2">
                      {genders.map((gender) => (
                        <label key={gender} className={`flex items-center cursor-pointer rounded-full px-4 py-2 transition-colors duration-300 bg-stone-400/30 hover:bg-stone-400/50 ${formData.gender === gender ? '!bg-stone-500/40' : ''}`}>
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
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200`}
                              style={{
                                borderColor: "var(--theme-primary)",
                                backgroundColor: formData.gender === gender ? "var(--theme-primary)" : "transparent",
                              }}
                            >
                              {formData.gender === gender && (
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: "var(--theme-secondary)" }}
                                ></div>
                              )}
                            </div>
                          </div>
                          <span className="ml-2 text-sm sm:text-base font-normal text-[var(--theme-primary)]">
                            {gender}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal text-[var(--theme-primary)]">
                    手机号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-stone-400/30 text-[var(--theme-primary)] rounded-md placeholder:text-stone-500/70 focus:ring-2 focus:ring-stone-500/50 focus:outline-none transition-all duration-300 ease-in-out font-normal text-base"
                    placeholder="请输入手机号"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm sm:text-base md:text-lg font-normal" style={{ color: "var(--theme-primary)" }}>
                    感兴趣的部门 <span className="text-xs text-stone-600">(可多选，最多选择2个)</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {departments.map((department) => (
                      <label key={department} className={`flex items-center cursor-pointer rounded-full px-4 py-2 transition-colors duration-300 bg-stone-400/30 hover:bg-stone-400/50 ${formData.departments.includes(department) ? '!bg-stone-500/40' : ''}`}>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.departments.includes(department)}
                            onChange={() => handleDepartmentChange(department)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200`}
                            style={{
                              borderColor: "var(--theme-primary)",
                              backgroundColor: formData.departments.includes(department)
                                ? "var(--theme-primary)"
                                : "transparent",
                            }}
                          >
                            {formData.departments.includes(department) && (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="var(--theme-secondary)"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-sm sm:text-base font-normal text-[var(--theme-primary)]">
                          {department}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 font-normal rounded-full transition-colors duration-300 ease-in-out text-base border bg-[var(--theme-secondary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-[var(--theme-secondary)]"
                    style={{ 
                      borderColor: "var(--theme-primary)",
                      opacity: submitting ? 0.8 : 1 
                    }}
                    disabled={submitting}
                  >
                    {submitting ? "提交中..." : "提交申请"}
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
