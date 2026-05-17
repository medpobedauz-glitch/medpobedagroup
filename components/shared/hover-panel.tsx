"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type HoverPanelProps = {
  children: ReactNode;
  className?: string;
};

export function HoverPanel({ children, className }: HoverPanelProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
