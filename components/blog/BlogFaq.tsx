import type { BlogFaqItem } from "@/data/blog-posts";

type BlogFaqProps = {
  title: string;
  description: string;
  items: BlogFaqItem[];
};

export function BlogFaq({ title, description, items }: BlogFaqProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <details
            key={item.question}
            className="group rounded-[1.7rem] border border-slate-200/80 bg-white px-5 py-5 shadow-soft"
            open={index === 0}
          >
            <summary className="cursor-pointer list-none font-display text-lg font-semibold text-slate-950">
              {item.question}
            </summary>
            <p className="mt-4 text-base leading-8 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
