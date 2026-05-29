"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Star,
  MapPin,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Story = {
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
  tags: string[];
};

const countryFlags: Record<string, string> = {
  Uzbekistan: "🇺🇿",
  Kazakhstan: "🇰🇿",
  Kyrgyzstan: "🇰🇬",
  Tajikistan: "🇹🇯",
  Turkmenistan: "🇹🇲",
  Russia: "🇷🇺",
};

const treatmentCategories = [
  "All",
  "Cardiology",
  "Oncology",
  "Orthopedics",
  "Neurosurgery",
  "Organ Transplant",
  "IVF",
  "Ophthalmology",
  "Dental",
];

const countries = [
  "All",
  "Uzbekistan",
  "Kazakhstan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Russia",
];

// Fallback demo data when no DB data exists
const demoStories: Story[] = [
  {
    id: "1",
    patientName: "Alisher N.",
    patientCountry: "Uzbekistan",
    patientAge: 52,
    treatmentType: "Heart Valve Replacement",
    hospitalName: "Fortis Escorts Heart Institute",
    testimonial:
      "After being diagnosed with a severe heart valve condition, my family was terrified. MedPobeda Group arranged everything — from the initial consultation to the surgery at Fortis Escorts. The doctors were world-class, and the care was exceptional. I'm now back home in Tashkent, fully recovered and grateful.",
    outcome: "Successful aortic valve replacement. Full recovery in 8 weeks. Patient is now leading a normal active life.",
    coverImage: null,
    rating: 5,
    isFeatured: true,
    slug: "alisher-heart-valve-uzbekistan",
    tags: ["Cardiology", "Heart Surgery"],
  },
  {
    id: "2",
    patientName: "Gulnara K.",
    patientCountry: "Kazakhstan",
    patientAge: 45,
    treatmentType: "Knee Replacement",
    hospitalName: "Apollo Hospitals, Chennai",
    testimonial:
      "I had been suffering from severe knee pain for years. The treatment in India was life-changing. The surgeons at Apollo were incredibly skilled, and MedPobeda coordinated every detail — visa, accommodation, even local translator. I can walk without pain for the first time in 5 years.",
    outcome: "Bilateral knee replacement surgery. Patient regained full mobility within 3 months of surgery.",
    coverImage: null,
    rating: 5,
    isFeatured: true,
    slug: "gulnara-knee-replacement-kazakhstan",
    tags: ["Orthopedics", "Knee Surgery"],
  },
  {
    id: "3",
    patientName: "Dilshod R.",
    patientCountry: "Tajikistan",
    patientAge: 38,
    treatmentType: "Liver Transplant",
    hospitalName: "Medanta Hospital, Delhi",
    testimonial:
      "My liver condition was critical, and treatment options in Tajikistan were limited. MedPobeda connected us with Medanta Hospital where I received a liver transplant. The medical team was outstanding, and the post-surgery care was comprehensive. This company literally saved my life.",
    outcome: "Successful liver transplant. Patient is on minimal immunosuppressants and has returned to normal life.",
    coverImage: null,
    rating: 5,
    isFeatured: true,
    slug: "dilshod-liver-transplant-tajikistan",
    tags: ["Organ Transplant", "Liver"],
  },
  {
    id: "4",
    patientName: "Nurgul T.",
    patientCountry: "Kyrgyzstan",
    patientAge: 34,
    treatmentType: "IVF Treatment",
    hospitalName: "Nova IVF Fertility, Delhi",
    testimonial:
      "After years of trying to conceive, we were hopeless. MedPobeda guided us to Nova IVF in Delhi. The doctors were compassionate and professional. On our second cycle, we got pregnant! Our twins are now 1 year old. We owe everything to the MedPobeda team.",
    outcome: "Successful IVF resulting in healthy twin pregnancy. Patient delivered at full term.",
    coverImage: null,
    rating: 5,
    isFeatured: false,
    slug: "nurgul-ivf-kyrgyzstan",
    tags: ["IVF", "Fertility"],
  },
  {
    id: "5",
    patientName: "Rustam M.",
    patientCountry: "Uzbekistan",
    patientAge: 61,
    treatmentType: "Brain Tumor Surgery",
    hospitalName: "Apollo Hospitals, Chennai",
    testimonial:
      "When I was diagnosed with a brain tumor, I thought it was the end. MedPobeda arranged an immediate consultation with a neurosurgeon at Apollo. The surgery was successful, and the follow-up care was thorough. I'm cancer-free today and enjoying every moment with my family.",
    outcome: "Successful gross total resection of brain tumor. Patient is cancer-free after 18 months of follow-up.",
    coverImage: null,
    rating: 5,
    isFeatured: true,
    slug: "rustam-brain-tumor-uzbekistan",
    tags: ["Neurosurgery", "Oncology"],
  },
  {
    id: "6",
    patientName: "Marina V.",
    patientCountry: "Russia",
    patientAge: 42,
    treatmentType: "Cardiac Bypass Surgery",
    hospitalName: "Fortis Escorts Heart Institute",
    testimonial:
      "I needed coronary bypass surgery urgently. The team at MedPobeda not only arranged the surgery but also helped with my medical visa in record time. The surgeons at Fortis performed a triple bypass, and the recovery was smooth. Thank you for giving me a second chance.",
    outcome: "Successful triple coronary artery bypass graft. Full cardiac recovery within 12 weeks.",
    coverImage: null,
    rating: 5,
    isFeatured: false,
    slug: "marina-cardiac-bypass-russia",
    tags: ["Cardiology", "Heart Surgery"],
  },
];

export function SuccessStoriesPageContent() {
  const [selectedTreatment, setSelectedTreatment] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const stories = demoStories;

  const filteredStories = stories.filter((story) => {
    const matchesTreatment =
      selectedTreatment === "All" ||
      story.treatmentType.toLowerCase().includes(selectedTreatment.toLowerCase()) ||
      story.tags.some((t) =>
        t.toLowerCase().includes(selectedTreatment.toLowerCase())
      );
    const matchesCountry =
      selectedCountry === "All" || story.patientCountry === selectedCountry;
    return matchesTreatment && matchesCountry;
  });

  const featuredStories = stories.filter((s) => s.isFeatured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="text-center"
            >
              <span className="section-kicker">Patient Success Stories</span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                Real Patients, Real Outcomes
              </h1>
              <p className="mt-5 body-lg mx-auto max-w-3xl">
                Every story represents a life changed through world-class medical care in India.
                Read about patients from Central Asia who trusted us with their healthcare journey.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <Users className="mx-auto h-6 w-6 text-[#1D4ED8]" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">
                  {stories.length}+
                </p>
                <p className="text-xs text-slate-500">Success Stories</p>
              </div>
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <Heart className="mx-auto h-6 w-6 text-rose-500" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">98%</p>
                <p className="text-xs text-slate-500">Satisfaction Rate</p>
              </div>
              <div className="rounded-2xl border border-[#D6E8FF] bg-white/80 p-4 text-center shadow-sm">
                <TrendingUp className="mx-auto h-6 w-6 text-emerald-500" />
                <p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">6</p>
                <p className="text-xs text-slate-500">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="section-shell-compact pt-0">
          <div className="container-wide">
            <SectionTitle
              eyebrow="Featured"
              title="Highlighted Success Stories"
              description="Our most impactful patient journeys that showcase the quality of medical care coordinated through MedPobeda Group."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredStories.slice(0, 3).map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stories with Filters */}
      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionTitle
            eyebrow="All Stories"
            title="Browse Patient Stories"
            description="Filter by treatment type or country to find stories relevant to your situation."
          />

          {/* Filters */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {treatmentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTreatment(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                    selectedTreatment === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-[#D6E8FF] bg-white text-slate-600 hover:border-blue-300"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                    selectedCountry === country
                      ? "bg-[#0B1F4D] text-white shadow-md"
                      : "border border-[#D6E8FF] bg-white text-slate-600 hover:border-blue-300"
                  )}
                >
                  {country !== "All" && countryFlags[country]} {country}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="mt-12 rounded-2xl border border-[#D6E8FF] bg-white/80 p-12 text-center">
              <p className="text-lg font-semibold text-slate-700">
                No stories match your filters
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try adjusting your filter criteria or browse all stories.
              </p>
              <button
                onClick={() => {
                  setSelectedTreatment("All");
                  setSelectedCountry("All");
                }}
                className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-4xl">
              Your Success Story Starts Here
            </h2>
            <p className="mt-4 body-lg mx-auto max-w-2xl">
              Take the first step toward world-class medical treatment in India. Our team is ready to coordinate your entire healthcare journey.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/international-patient-care"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_18px_48px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-4 text-sm font-bold text-[#0B1F4D] shadow-sm transition hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="text-center"
    >
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-5 heading-section">{title}</h2>
      <p className="mt-4 body-lg mx-auto">{description}</p>
    </motion.div>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easeOutExpo }}
    >
      <div
        className={cn(
          "group h-full overflow-hidden rounded-[1.5rem] border border-[#D6E8FF] bg-white/90",
          "shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(29,78,216,0.12)]"
        )}
      >
        <div className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
                {countryFlags[story.patientCountry] ?? "🌍"}
              </div>
              <div>
                <p className="font-semibold text-[#0B1F4D]">{story.patientName}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  <span>{story.patientCountry}</span>
                  {story.patientAge && <span>• Age {story.patientAge}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: story.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-semibold text-[#1D4ED8]">{story.treatmentType}</span>
          </div>
        </div>

        <div className="p-6">
          <Quote className="h-8 w-8 text-blue-200" />
          <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-4">
            {story.testimonial}
          </p>
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3">
            <p className="text-xs font-semibold text-emerald-700">Outcome</p>
            <p className="mt-1 text-xs leading-6 text-emerald-600">{story.outcome}</p>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-xs text-slate-500">
              at <span className="font-semibold text-slate-700">{story.hospitalName}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}