"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PremiumCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
};

export function PremiumCard({
  children,
  className,
  delay = 0,
  hover = true,
  ...props
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white/90 shadow-[0_24px_80px_rgba(7,27,58,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:border-[#9CC8FF] hover:shadow-[0_34px_100px_rgba(29,78,216,0.14)]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(29,78,216,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.9),rgba(212,175,55,0))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-2px)] border border-white/40" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
