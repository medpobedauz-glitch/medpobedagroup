"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Quote,
  Star,
  MapPin,
  Heart,
  PlayCircle,
} from "lucide-react";

import type { PatientVideo } from "@/lib/data/patient-videos";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SuccessStory = {
  id: string;
  patientName: string;
  patientCountry: string;
  patientAge: number | null;
  treatmentType: string;
  hospitalName: string;
  testimonial: string;
  outcome: string;
  coverImage: string | null;
  rating: number;
  isFeatured: boolean;
  slug: string;
};

type PatientSuccessStoriesProps = {
  stories: SuccessStory[];
  featuredVideo?: PatientVideo;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const countryFlags: Record<string, string> = {
  Uzbekistan: "🇺🇿",
  Kazakhstan: "🇰🇿",
  Kyrgyzstan: "🇰🇬",
  Tajikistan: "🇹🇯",
  Turkmenistan: "🇹🇲",
  Russia: "🇷🇺",
};

export function PatientSuccessStories({
  stories,
  featuredVideo,
  eyebrow = "Patient Success Stories",
  title = "Real Patients, Real Outcomes",
  description = "Hear from patients and families who trusted us with their medical journey to India.",
}: PatientSuccessStoriesProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  if (stories.length === 0 && !featuredVideo) return null;

  return (
    <section className="section-shell" aria-labelledby="patient-success-stories-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center"
        >
          <span className="section-kicker">{eyebrow}</span>
          <h2 id="patient-success-stories-heading" className="mt-5 heading-section">
            {title}
          </h2>
          <p className="mt-4 body-lg mx-auto">{description}</p>
        </motion.div>

        {featuredVideo ? (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mt-12 overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90 shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl"
          >
            <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
              <div className="relative aspect-video min-h-[14rem] overflow-hidden bg-slate-950">
                {playingVideoId === featuredVideo.id ? (
                  <iframe
                    src={`${featuredVideo.embedUrl}&autoplay=1`}
                    title={featuredVideo.title}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideoId(featuredVideo.id)}
                    className="group absolute inset-0"
                    aria-label={`Play ${featuredVideo.title}`}
                  >
                    <Image
                      src={featuredVideo.posterImage}
                      alt={`${featuredVideo.title} video preview`}
                      fill
                      loading="lazy"
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 62vw"
                    />
                    <span className="absolute inset-0 bg-slate-950/25 transition group-hover:bg-slate-950/35" />
                    <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-2xl transition group-hover:scale-105">
                      <PlayCircle className="h-11 w-11" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                  <PlayCircle className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                  {countryFlags[featuredVideo.patientCountry] ?? "🌍"} Patient Journey
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#0B1F4D] sm:text-3xl">
                  {featuredVideo.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {featuredVideo.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Building2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  {featuredVideo.hospitalName}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href={
                      featuredVideo.hospitalGroupSlug
                        ? `/hospital-groups/${featuredVideo.hospitalGroupSlug}`
                        : "/international-patient-care"
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5"
                  >
                    {featuredVideo.hospitalGroupSlug
                      ? "View Hospital Network"
                      : "Plan Treatment in India"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={featuredVideo.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#1D4ED8] transition hover:-translate-y-0.5"
                    aria-label={`${featuredVideo.title} on YouTube (opens in a new tab)`}
                  >
                    Watch on YouTube
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ) : null}

        {stories.length > 0 ? (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: easeOutExpo,
                  }}
                >
                  <Link
                    href={`/success-stories/${story.slug}`}
                    className={cn(
                      "group block h-full overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90",
                      "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                      "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
                    )}
                  >
                    {/* Header with Patient Info */}
                    <div className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
                            {countryFlags[story.patientCountry] ?? "🌍"}
                          </div>
                          <div>
                            <p className="font-semibold text-[#0B1F4D]">
                              {story.patientName}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" />
                              <span>{story.patientCountry}</span>
                              {story.patientAge && (
                                <span>• Age {story.patientAge}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: story.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Treatment Badge */}
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                        <span className="text-xs font-semibold text-[#1D4ED8]">
                          {story.treatmentType}
                        </span>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="p-6">
                      <Quote className="h-8 w-8 text-blue-200" />
                      <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-4">
                        {story.testimonial}
                      </p>

                      {/* Outcome */}
                      <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                        <p className="text-xs font-semibold text-emerald-700">
                          Outcome
                        </p>
                        <p className="mt-1 text-xs leading-6 text-emerald-600">
                          {story.outcome}
                        </p>
                      </div>

                      {/* Hospital */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <p className="text-xs text-slate-500">
                          at <span className="font-semibold text-slate-700">{story.hospitalName}</span>
                        </p>
                        <ArrowRight className="h-4 w-4 text-[#1D4ED8] transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-semibold text-[#1D4ED8] shadow-[0_12px_32px_rgba(7,27,58,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(29,78,216,0.12)]"
              >
                Read More Success Stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </>
        ) : null}
      </div>
    </section>
  );
}
