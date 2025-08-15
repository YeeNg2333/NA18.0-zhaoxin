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
        <section className="w-full max-w-none px-4 md:px-8 py-10 md:py-14 lg:py-16">
          {/* 顶部：左上部门名称，右上长简介 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-3 md:col-start-1">
              <h1
                className="text-4xl md:text-5xl font-semibold tracking-tight"
                style={{ color: "var(--theme-secondary)" }}
              >
                {dept.title}
              </h1>
            </div>
            <div
              className="md:col-span-6 md:col-start-7 space-y-4 text-lg md:text-xl leading-relaxed font-semibold md:pr-4 break-words"
              style={{ color: "var(--theme-secondary)" }}
            >
              {dept.details.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* 下方：图片一列纵向排列 */}
          {dept.images && dept.images.length > 0 && (
            <div className="mt-10 md:mt-14">
              {dept.images.map((src, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <img
                    src={src}
                    alt={`${dept.title} 图片 ${idx + 1}`}
                    className="w-full rounded-lg object-cover"
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
