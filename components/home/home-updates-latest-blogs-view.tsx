"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

import type { HomepageEditorialBlog, HomepageEvent } from "@/lib/home-updates";
import { EventSlider } from "@/components/home/event-slider";
import { LatestBlogListCard } from "@/components/home/latest-blog-list-card";
import { PublicLink } from "@/components/shared/public-link";
import { Button } from "@/components/ui/button";

type HomeUpdatesLatestBlogsViewProps = {
  events: HomepageEvent[];
  blogs: HomepageEditorialBlog[];
};

export function HomeUpdatesLatestBlogsView({
  events,
  blogs,
}: HomeUpdatesLatestBlogsViewProps) {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.1),transparent_28%)]" />

            <div className="relative">
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-3xl"
                >
                  <p className="section-kicker">Editorial Feed</p>
                  <h2 className="mt-5 heading-section">Updates &amp; Latest Blogs</h2>
                  <p className="mt-5 body-lg">
                    A premium editorial layer for medical events, healthcare updates, and the
                    latest insights shaping international patient coordination.
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.64, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  {[
                    "Events and collaborations",
                    "Medical innovation updates",
                    "Patient coordination insights",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-slate-200 bg-white/88 px-4 py-4 text-center text-sm font-medium text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      {item}
                    </div>
                  ))}
                </m.div>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="section-kicker">Updates and Events</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-slate-950">
                        Featured international healthcare activity
                      </h3>
                    </div>
                  </div>
                  <EventSlider events={events} />
                </div>

                <div>
                  <div className="mb-5">
                    <p className="section-kicker">Latest Blogs</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-slate-950">
                      Fresh insights from MedPobeda’s editorial stream
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {blogs.map((post, index) => (
                      <LatestBlogListCard key={post.id} post={post} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 flex justify-center"
              >
                <Button
                  asChild
                  variant="default"
                  size="2xl"
                  className="bg-[linear-gradient(135deg,#fca5a5_0%,#ef4444_42%,#b91c1c_100%)] text-white shadow-[0_26px_72px_rgba(185,28,28,0.24)] hover:-translate-y-1 hover:scale-[1.02] hover:bg-[linear-gradient(135deg,#fca5a5_0%,#ef4444_42%,#b91c1c_100%)]"
                >
                  <PublicLink href="/blog">View All Blogs</PublicLink>
                </Button>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
