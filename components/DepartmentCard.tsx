"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export type DepartmentCardProps = {
  title: string;
  intro: string; // 2 句话简介
  href: string;
  gradient?: string; // 背景渐变，用于占位图
  imageSrc?: string; // 可选图片
};

export default function DepartmentCard({ title, intro, href, gradient, imageSrc }: DepartmentCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5">
      <CardMedia gradient={gradient} imageSrc={imageSrc} />

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--theme-secondary)" }}>{title}</h3>
        <p className="text-lg leading-relaxed line-clamp-2 opacity-80" style={{ color: "var(--theme-secondary)" }}>{intro}</p>
        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex items-center text-xs font-medium transition-opacity"
            aria-label={`了解${title}`}
            style={{ color: "var(--theme-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
          >
            了解 {title} →
          </Link>
        </div>
      </div>
    </article>
  );
}

function CardMedia({ gradient, imageSrc }: { gradient?: string; imageSrc?: string }) {
  if (imageSrc) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt="Department cover"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "aspect-[16/9] w-full",
        "bg-gradient-to-br",
        gradient ?? "from-primary/20 via-primary/10 to-background"
      )}
    />
  );
}
