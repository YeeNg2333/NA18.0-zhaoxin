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
        <section className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14 lg:py-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm">
            <div className={`aspect-[16/9] w-full bg-gradient-to-br ${dept.gradient ?? "from-primary/20 via-primary/10 to-background"}`} />
            <div className="space-y-5 p-6 md:p-8">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{dept.title}</h1>
              <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
                {dept.details.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
