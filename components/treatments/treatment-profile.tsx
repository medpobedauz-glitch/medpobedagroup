import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, DollarSign, Plane, ShieldCheck } from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { HospitalCard } from "@/components/hospitals/hospital-card";
import { Card } from "@/components/ui/card";
import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";
import type { Doctor } from "@/lib/data/doctors";
import { DoctorCard } from "@/components/doctors/doctor-card";

export function TreatmentProfile({ treatment, hospitals, relatedTreatments, recommendedDoctors = [] }: { treatment: Treatment; hospitals: Hospital[]; relatedTreatments: Treatment[]; recommendedDoctors?: Doctor[] }) {
  const message = `I would like a free consultation about ${treatment.name} in India.`;
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-12">
                <span className="section-kicker">{treatment.category}</span>
                <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">{treatment.name} in India</h1>
                <p className="mt-3 text-sm font-semibold text-sky-700">{treatment.specialty} · {treatment.organSystem}</p>
                <p className="mt-5 text-base leading-8 text-slate-600">{treatment.overview}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Cta href="/international-patient-care" label="Book Free Consultation" />
                  <Cta href="/contact" label="Request Treatment" secondary />
                  <Cta href={getWhatsAppUrl(message)} label="WhatsApp" external secondary />
                  <Cta href={getTelegramUrl(message)} label="Telegram" external secondary />
                  <Cta href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`} label="Call Now" secondary />
                </div>
              </div>
              <div className="relative min-h-[320px]">
                <Image src={treatment.heroImage} alt={`${treatment.name} consultation and treatment planning`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/25 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact pt-0">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CostCard icon={DollarSign} label="Estimated Cost in India" value={treatment.cost.estimatedCostIndia} />
          <CostCard icon={Clock} label="Average Hospital Stay" value={treatment.cost.averageHospitalStay} />
          <CostCard icon={ShieldCheck} label="Average ICU Stay" value={treatment.cost.averageIcuStay} />
          <CostCard icon={Clock} label="Recovery Time" value={treatment.cost.recoveryTime} />
          <CostCard icon={Plane} label="Travel Duration" value={treatment.cost.travelDuration} />
          <CostCard icon={CheckCircle2} label="Companion Allowed" value={treatment.cost.companionAllowed ? "Yes" : "Hospital confirmation required"} />
        </div>
      </section>

      <TextSection eyebrow="Treatment Overview" title={`Understanding ${treatment.name}`} text={treatment.overview} />
      <GridSection eyebrow="Symptoms" title="When specialist evaluation may be needed" items={treatment.symptoms} />
      <GridSection eyebrow="Causes" title="Possible causes and contributing factors" items={treatment.causes} />
      <GridSection eyebrow="Diagnosis" title="How the condition is evaluated" items={treatment.diagnosis} />
      <GridSection eyebrow="Treatment Options" title="Possible treatment pathways" items={treatment.treatmentOptions} />
      <GridSection eyebrow="Why Choose India" title="Advanced care with international patient coordination" items={["Large multispecialty hospital networks", "Experienced specialist and surgical teams", "Modern diagnostics and treatment technology", "Coordinated care for international patients"]} />
      <GridSection eyebrow="Benefits" title="Potential benefits of a planned care pathway" items={treatment.benefits} />
      <Timeline title="Procedure" items={treatment.procedure} />
      <Timeline title="Recovery Timeline" items={treatment.recovery} />
      <GridSection eyebrow="Possible Risks" title="Risks discussed during informed consent" items={treatment.risks} />
      <GridSection eyebrow="Expected Outcomes" title="Treatment goals and expected outcomes" items={[...treatment.expectedOutcomes, treatment.successRate]} />

      <GridSection eyebrow="International Patient Support" title="Support before, during, and after travel" items={["Medical visa assistance", "Airport pickup", "Hotel assistance", "Interpreter", "Treatment coordinator", "Teleconsultation", "Medical reports review", "Follow-up support"]} />

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="text-center"><span className="section-kicker">Partner Hospitals</span><h2 className="mt-5 heading-section">Hospitals suitable for {treatment.name}</h2></div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{hospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}</div>
        </div>
      </section>

      {recommendedDoctors.length > 0 && (
        <section className="section-shell pt-0">
          <div className="container-wide">
            <div className="text-center"><span className="section-kicker">Recommended Doctors</span><h2 className="mt-5 heading-section">Doctors connected to {treatment.name}</h2></div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{recommendedDoctors.map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div>
          </div>
        </section>
      )}

      <section className="section-shell pt-0">
        <div className="container-wide section-frame-soft p-6 sm:p-8 lg:p-10">
          <span className="section-kicker">Patients Also Searched For</span>
          <h2 className="mt-5 heading-section">Related treatments and medical pathways</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {relatedTreatments.map((item) => <Link key={item.slug} href={`/treatments/${item.slug}`} className="glass-badge">{item.name}</Link>)}
            {treatment.relatedSpecialties.map((item) => <Link key={item} href={`/treatments?specialty=${encodeURIComponent(item)}`} className="glass-badge">{item}</Link>)}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InternalLink href="/hospitals" label="Compare Hospitals" />
            <InternalLink href="/about" label="About MedPobeda" />
            <InternalLink href="/treatment-in-india-from-uzbekistan" label="Patients from Uzbekistan" />
            <InternalLink href="/treatment-in-india-from-kazakhstan" label="Patients from Kazakhstan" />
          </div>
        </div>
      </section>

      <FAQAccordion eyebrow="Treatment FAQ" title={`Questions about ${treatment.name}`} description="General guidance for international patients. Your treating specialist provides diagnosis and individual medical advice." items={treatment.faq} />

      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="section-frame-accent p-6 text-center sm:p-8 lg:p-10">
            <h2 className="font-display text-3xl font-bold text-[#0B1F4D]">Plan {treatment.name} treatment in India</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">Share medical reports for specialist review, hospital recommendations, a treatment estimate, and travel coordination.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/international-patient-care" label="Book Free Consultation" />
              <Cta href="/second-medical-opinion" label="Get Second Opinion" secondary />
              <Cta href="/contact" label="Upload Medical Reports" secondary />
              <Cta href="/contact" label="Request Treatment" secondary />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Cta({ href, label, external = false, secondary = false }: { href: string; label: string; external?: boolean; secondary?: boolean }) {
  const className = secondary ? "inline-flex items-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D] transition hover:-translate-y-0.5" : "inline-flex items-center rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5";
  return external ? <a href={href} target="_blank" rel="noreferrer" className={className}>{label}</a> : <Link href={href} className={className}>{label}</Link>;
}

function CostCard({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return <Card className="rounded-2xl border border-[#D6E8FF] p-5"><Icon className="h-6 w-6 text-[#1D4ED8]" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p><p className="mt-2 font-semibold text-[#0B1F4D]">{value}</p></Card>;
}

function TextSection({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="section-shell pt-0"><div className="container-wide section-frame p-6 sm:p-8 lg:p-10"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2><p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{text}</p></div></section>;
}

function GridSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <Card key={item} className="flex gap-3 rounded-2xl border border-slate-200 p-5 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{item}</Card>)}</div></div></section>;
}

function Timeline({ title, items }: { title: string; items: string[] }) {
  return <section className="section-shell pt-0"><div className="container-wide section-frame-soft p-6 sm:p-8 lg:p-10"><span className="section-kicker">{title}</span><h2 className="mt-5 heading-section">{title} pathway</h2><ol className="mt-8 grid gap-4 lg:grid-cols-4">{items.map((item, index) => <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">{index + 1}</span><p className="mt-4 text-sm leading-6 text-slate-600">{item}</p></li>)}</ol></div></section>;
}

function InternalLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-[#1D4ED8] transition hover:-translate-y-0.5">{label}</Link>;
}
