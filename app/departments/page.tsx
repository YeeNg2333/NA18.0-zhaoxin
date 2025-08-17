import { departments } from "./data";
import DepartmentCard from "@/components/DepartmentCard";

export const metadata = {
  title: "NA18.0 部门介绍",
};

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* 主要内容区域 */}
      <main className="px-6 md:px-8 lg:px-12 pt-6 md:pt-10">
        {/* 页面标题 */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight" style={{ color: "var(--theme-secondary)" }}>
            部门介绍
          </h1>
        </div>

        {/* 两列网格布局（更宽，行间距更大） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-16 lg:gap-y-24 max-w-screen-2xl mx-auto">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.slug}
              title={dept.title}
              intro={dept.intro}
              href={`/departments/${dept.slug}`}
              gradient={dept.gradient}
              imageSrc="/images/uploads/tech_party.jpeg"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
