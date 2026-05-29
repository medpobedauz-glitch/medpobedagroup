import { Card } from "@/components/ui/card";
import type { BlogArticleSection } from "@/data/blog-posts";

type ArticleContentProps = {
  sections: BlogArticleSection[];
};

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <Card className="border-slate-200/80 p-6 sm:p-8 lg:p-10">
      <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-950 prose-p:leading-8 prose-p:text-slate-700 prose-li:leading-7 prose-li:text-slate-700">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc pl-5">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.subsections?.map((subsection) => (
              <div key={subsection.title} className="mt-8">
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  {subsection.title}
                </h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {subsection.bullets?.length ? (
                  <ul className="list-disc pl-5">
                    {subsection.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </section>
        ))}
      </article>
    </Card>
  );
}
