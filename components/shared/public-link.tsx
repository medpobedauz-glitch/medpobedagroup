"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

import { getLocaleFromPathname, localizePath } from "@/lib/i18n/config";

type PublicLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export function PublicLink({ href, ...props }: PublicLinkProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return <Link href={localizePath(href, locale)} {...props} />;
}
