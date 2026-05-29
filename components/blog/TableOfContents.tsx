import { ListTree } from "lucide-react";

import { Card } from "@/components/ui/card";

type TableOfContentsProps = {
  title: string;
  items: Array<{
    id: string;
    title: string;
  }>;
};

export function TableOfContents({ title, items }: TableOfContentsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <>
      <Card className="hidden border-slate-200/80 p-5 lg:block lg:sticky lg:top-28">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
          <ListTree className="h-4 w-4" />
          {title}
        </div>
        <nav className="mt-4 grid gap-3">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm leading-6 text-slate-600 transition hover:text-sky-700"
            >
              <span className="mr-2 font-semibold text-sky-700">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          ))}
        </nav>
      </Card>
      <details className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-soft lg:hidden">
        <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
          {title}
        </summary>
        <nav className="mt-4 grid gap-3">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm leading-6 text-slate-600 transition hover:text-sky-700"
            >
              <span className="mr-2 font-semibold text-sky-700">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
