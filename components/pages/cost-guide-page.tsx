"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Clock, Check, ArrowRight, Info } from "lucide-react";

import { useState } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CostItem = {
  treatment: string;
  category: string;
  costRangeUSD: string;
  costRangeINR: string;
  duration: string;
  includes: string[];
  description: string;
  popular?: boolean;
};

const costData: CostItem[] = [
  {
    treatment: "Heart Valve Replacement",
    category: "Cardiology",
    costRangeUSD: "$7,000 - $15,000",
    costRangeINR: "₹5,50,000 - ₹12,00,000",
    duration: "7-10 days",
    includes: ["Surgeon fees", "Hospital stay", "Medications", "Follow-up"],
    description: "Aortic or mitral valve replacement surgery at JCI-accredited hospitals with experienced cardiac surgeons.",
    popular: true,
  },
  {
    treatment: "Coronary Bypass (CABG)",
    category: "Cardiology",
    costRangeUSD: "$8,000 - $18,000",
    costRangeINR: "₹6,50,000 - ₹14,50,000",
    duration: "10-14 days",
    includes: ["Surgeon fees", "ICU stay", "Medications", "Cardiac rehab plan"],
    description: "Single, double, or triple coronary artery bypass grafting with modern minimally invasive techniques.",
  },
  {
    treatment: "Knee Replacement",
    category: "Orthopedics",
    costRangeUSD: "$6,000 - $12,000",
    costRangeINR: "₹4,80,000 - ₹9,50,000",
    duration: "10-14 days",
    includes: ["Prosthesis", "Surgery", "Physiotherapy", "Rehabilitation"],
    description: "Total or partial knee replacement using premium implants from Johnson & Johnson or Stryker.",
    popular: true,
  },
  {
    treatment: "Hip Replacement",
    category: "Orthopedics",
    costRangeUSD: "$7,000 - $13,000",
    costRangeINR: "₹5,60,000 - ₹10,50,000",
    duration: "10-14 days",
    includes: ["Prosthesis", "Surgery", "Physiotherapy", "Rehabilitation"],
    description: "Total hip replacement with ceramic-on-ceramic or metal-on-polyethylene implants.",
  },
  {
    treatment: "Chemotherapy (per cycle)",
    category: "Oncology",
    costRangeUSD: "$1,500 - $5,000",
    costRangeINR: "₹1,20,000 - ₹4,00,000",
    duration: "1-3 days per cycle",
    includes: ["Drug cost", "Administration", "Monitoring", "Supportive care"],
    description: "Advanced chemotherapy protocols for various cancer types with internationally trained oncologists.",
  },
  {
    treatment: "Cancer Surgery",
    category: "Oncology",
    costRangeUSD: "$5,000 - $20,000",
    costRangeINR: "₹4,00,000 - ₹16,00,000",
    duration: "7-14 days",
    includes: ["Pre-op tests", "Surgery", "Hospital stay", "Pathology"],
    description: "Surgical oncology procedures including tumor removal, mastectomy, and organ-sparing surgeries.",
    popular: true,
  },
  {
    treatment: "Liver Transplant",
    category: "Organ Transplant",
    costRangeUSD: "$30,000 - $50,000",
    costRangeINR: "₹24,00,000 - ₹40,00,000",
    duration: "4-6 weeks",
    includes: ["Donor workup", "Surgery", "Post-op care", "Immunosuppressants"],
    description: "Living donor or deceased donor liver transplant at India's top transplant centers.",
    popular: true,
  },
  {
    treatment: "Kidney Transplant",
    category: "Organ Transplant",
    costRangeUSD: "$20,000 - $35,000",
    costRangeINR: "₹16,00,000 - ₹28,00,000",
    duration: "3-4 weeks",
    includes: ["Donor evaluation", "Surgery", "Post-op care", "Immunosuppressants"],
    description: "Living donor kidney transplant with comprehensive pre and post-operative management.",
  },
  {
    treatment: "IVF (per cycle)",
    category: "IVF",
    costRangeUSD: "$3,000 - $6,000",
    costRangeINR: "₹2,40,000 - ₹4,80,000",
    duration: "2-3 weeks",
    includes: ["Stimulation drugs", "Egg retrieval", "Embryo transfer", "Pregnancy test"],
    description: "In vitro fertilization with ICSI, blastocyst transfer, and genetic screening options.",
    popular: true,
  },
  {
    treatment: "Brain Tumor Surgery",
    category: "Neurosurgery",
    costRangeUSD: "$8,000 - $25,000",
    costRangeINR: "₹6,40,000 - ₹20,00,000",
    duration: "10-14 days",
    includes: ["MRI/CT scans", "Surgery", "ICU stay", "Pathology"],
    description: "Craniotomy for brain tumor removal using neuronavigation and intraoperative monitoring.",
  },
  {
    treatment: "Spine Surgery",
    category: "Neurosurgery",
    costRangeUSD: "$7,000 - $18,000",
    costRangeINR: "₹5,60,000 - ₹14,40,000",
    duration: "7-10 days",
    includes: ["Imaging", "Surgery", "Implants", "Physiotherapy"],
    description: "Discectomy, spinal fusion, laminectomy, and minimally invasive spine procedures.",
  },
  {
    treatment: "Cataract Surgery",
    category: "Ophthalmology",
    costRangeUSD: "$1,500 - $4,000",
    costRangeINR: "₹1,20,000 - ₹3,20,000",
    duration: "1-2 days",
    includes: ["Premium IOL", "Surgery", "Medications", "Follow-ups"],
    description: "Phacoemulsification with premium intraocular lenses (multifocal, toric).",
  },
];

const categories = ["All", "Cardiology", "Orthopedics", "Oncology", "Organ Transplant", "IVF", "Neurosurgery", "Ophthalmology"];

export function CostGuidePageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredCosts = selectedCategory === "All"
    ? costData
    : costData.filter((c) => c.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="text-center"
            >
              <span className="section-kicker">Cost Guide</span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                Transparent Treatment Costs
              </h1>
              <p className="mt-5 body-lg mx-auto max-w-3xl">
                Understand the cost of medical treatment in India. All prices are estimates — actual costs depend on your specific case and chosen hospital.
              </p>
            </motion.div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                <DollarSign className="h-3.5 w-3.5" />
                Save 30-70% vs Western countries
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                <Clock className="h-3.5 w-3.5" />
                Short waiting times
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-xs font-semibold transition-all",
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-[#D6E8FF] bg-white text-slate-600 hover:border-blue-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cost Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCosts.map((item, index) => (
              <motion.div
                key={item.treatment}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={cn(
                  "relative overflow-hidden rounded-[1.5rem] border bg-white/90 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(29,78,216,0.1)]",
                  item.popular
                    ? "border-blue-300 shadow-[0_16px_48px_rgba(29,78,216,0.1)]"
                    : "border-[#D6E8FF] shadow-[0_16px_48px_rgba(7,27,58,0.06)]"
                )}
              >
                {item.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[0.6rem] font-bold uppercase text-white">
                    Popular
                  </div>
                )}

                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[0.65rem] font-semibold text-[#1D4ED8]">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-[#0B1F4D]">
                  {item.treatment}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
                    Estimated Cost (India)
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#0B1F4D]">
                    {item.costRangeUSD}
                  </p>
                  <p className="text-xs text-slate-500">{item.costRangeINR}</p>
                </div>

                {/* Duration */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Recovery: {item.duration}</span>
                </div>

                {/* Includes */}
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {item.includes.map((inc) => (
                    <div key={inc} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check className="h-3 w-3 shrink-0 text-emerald-500" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div className="text-xs leading-6 text-amber-700">
              <p className="font-semibold">Disclaimer: These are estimated costs only.</p>
              <p className="mt-1">
                Actual costs may vary based on your specific medical condition, chosen hospital, surgeon, and any complications. 
                Contact MedPobeda for a personalized cost estimate based on your medical reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-accent p-6 sm:p-8 text-center">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0B1F4D] sm:text-3xl">
              Get a Personalized Cost Estimate
            </h2>
            <p className="mt-3 body-lg mx-auto max-w-xl">
              Share your medical reports and receive a detailed cost breakdown within 48 hours.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/international-patients"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
              >
                Request Cost Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-8 py-3.5 text-sm font-bold text-[#0B1F4D]"
              >
                Talk to a Coordinator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
