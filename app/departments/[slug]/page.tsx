import { departments } from "../data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dept = departments.find((d) => d.slug === params.slug);
  if (!dept) return { title: "未找到" };
  return { title: `${dept.title} - 部门介绍` };
}

export default function DepartmentDetailPage({ params }: { params: { slug: string } }) {
  const dept = departments.find((d) => d.slug === params.slug);
  if (!dept) return notFound();

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <section className="w-full max-w-none px-4 md:px-8 py-8 md:py-14 lg:py-16">
          {/* 顶部：左上部门名称，右上长简介 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-16">
            <div className="md:col-span-3 md:col-start-1">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
                style={{ color: "var(--theme-secondary)" }}
              >
                {dept.title}
              </h1>
            </div>
            <div
              className="md:col-span-6 md:col-start-7 space-y-2 text-base sm:text-lg md:text-xl leading-snug font-normal md:pr-4 break-words"
              style={{ color: "var(--theme-secondary)" }}
            >
              {dept.details.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* 示例图片 */}
          <div className="mt-4 md:mt-6">
            <img src={dept.imageSrc} alt="部门活动图片 1" className="w-full object-cover" />
          </div>

          {/* 第二个图片和描述 */}
          <div className="mt-12 md:mt-6 grid grid-cols-1 md:grid-cols-5 gap-1 md:gap-8 items-start">
            {/* 左侧小图片 */}
            <div className="md:col-span-4">
              <img src={dept.images ? dept.images[0] : dept.imageSrc} alt="部门活动图片 2" className="w-full object-cover" />
            </div>
            {/* 右侧文字介绍 */}
            <div className="md:col-span-1 mt-0 md:mt-0">
              <p className="text-sm text-stone-400/90 leading-relaxed">
                {dept.title}<p/>{dept.description}
              </p>
            </div>
          </div>

          {/* 下方：图片一列纵向排列 */}
          {dept.images && dept.images.length > 1 && (
            <div className="mt-4 md:mt-6 grid grid-cols-1 gap-y-12 sm:gap-y-14 md:gap-y-16">
              {dept.images.map((src, idx) => (
                <div key={idx}>
                  <img
                    src={src}
                    alt={`${dept.title} 图片 ${idx + 1}`}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
