"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import type { HomepageEvent } from "@/lib/home-updates";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PublicLink } from "@/components/shared/public-link";

type EventSliderProps = {
  events: HomepageEvent[];
};

export function EventSlider({ events }: EventSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeEvent = useMemo(() => events[activeIndex], [activeIndex, events]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || events.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [events.length, isPaused, prefersReducedMotion]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % events.length);
  };

  if (!activeEvent) {
    return null;
  }

  return (
    <Card
      variant="panel"
      className="overflow-hidden p-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured medical events"
    >
      <div className="relative aspect-[1.15] overflow-hidden sm:aspect-[1.02]">
        <AnimatePresence mode="wait">
          <m.div
            key={activeEvent.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={activeEvent.image}
              alt={activeEvent.title}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1280px) 42vw, (min-width: 768px) 80vw, 100vw"
              fallbackLabel={activeEvent.title}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(11,31,77,0.12)_36%,rgba(11,31,77,0.46)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_24%)]" />
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6" aria-live="polite">
          <div className="rounded-[1.8rem] border border-white/60 bg-white/80 p-5 shadow-panel backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              Featured Event
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
              {activeEvent.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {activeEvent.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-700" />
                {activeEvent.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-sky-700" />
                {activeEvent.dateLabel}
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild variant="hero" size="lg">
                <PublicLink href={activeEvent.href}>{activeEvent.ctaLabel}</PublicLink>
              </Button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:border-sky-200 hover:text-sky-700"
                  aria-label="Show previous event"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:border-sky-200 hover:text-sky-700"
                  aria-label="Show next event"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-slate-200/80 bg-slate-50 px-5 py-4">
        {events.map((event, index) => (
          <button
            key={event.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show event ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`h-2.5 rounded-full transition-all ${
              activeIndex === index ? "w-8 bg-sky-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
