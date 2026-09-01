import Link from "next/link";

import { uzMedicalSeoPages } from "@/lib/uz-medical-seo-pages";

const groups = [
  {
    title: "Saraton va gematologiya",
    match: /(saraton|onkolog|limfoma|leykemiya|mieloma|suyak iligi)/,
  },
  {
    title: "Yurak, miya va umurtqa",
    match: /(yurak|kardio|miya|neyro|umurtqa|insult)/,
  },
  {
    title: "Transplantatsiya va murakkab davolash",
    match: /(transplant|buyrak|jigar|robotik|jarrohlik)/,
  },
] as const;

export function UzbekTreatmentDirectory() {
  const assigned = new Set<string>();
  const sections = groups.map((group) => {
    const pages = uzMedicalSeoPages.filter((page) => {
      if (assigned.has(page.slug)) return false;
      const matches = group.match.test(`${page.slug} ${page.title.toLowerCase()}`);
      if (matches) assigned.add(page.slug);
      return matches;
    });
    return { ...group, pages };
  });
  const otherPages = uzMedicalSeoPages.filter((page) => !assigned.has(page.slug));

  return (
    <section aria-labelledby="uz-treatment-guides" className="bg-slate-50 px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          O‘zbek tilidagi tibbiy qo‘llanmalar
        </p>
        <h2 id="uz-treatment-guides" className="mt-3 text-3xl font-bold text-slate-950">
          Hindistonda davolanish yo‘nalishlari
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          Alomatlar, diagnostika, davolash variantlari, xarajat, tibbiy viza va
          safardan keyingi kuzatuv bo‘yicha O‘zbekistonlik bemorlar uchun amaliy
          ma’lumotlarni ko‘ring.
        </p>

        <div className="mt-10 space-y-10">
          {[...sections, { title: "Boshqa davolash va bemor yordami", pages: otherPages }].map(
            (section) =>
              section.pages.length ? (
                <div key={section.title}>
                  <h3 className="text-xl font-semibold text-slate-950">{section.title}</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {section.pages.map((page) => (
                      <li key={page.slug}>
                        <Link
                          className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                          href={`/uz/${page.slug}`}
                        >
                          {page.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
