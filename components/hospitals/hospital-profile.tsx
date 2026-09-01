import Image from "next/image";
import Link from "next/link";
import { Building2, Calendar, CheckCircle2, ExternalLink, MapPin, Stethoscope, Users } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { Card } from "@/components/ui/card";
import type { Hospital } from "@/lib/data/hospitals";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";
import { doctors } from "@/lib/data/doctors";
import { DoctorCard } from "@/components/doctors/doctor-card";

export function HospitalProfile({ hospital }: { hospital: Hospital }) {
  const consultationMessage = `I would like a consultation for treatment at ${hospital.name}.`;
  const hospitalDoctors = doctors.filter((doctor) => doctor.hospitalId === hospital.slug);
  const doctorSpecialties = [...new Set(hospitalDoctors.map((doctor) => doctor.specialization))];
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-12">
                <span className="section-kicker">Hospital Profile</span>
                <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">{hospital.name}</h1>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-[#1D4ED8]" />{hospital.city}, {hospital.state}, India</p>
                <p className="mt-5 text-base leading-8 text-slate-600">{hospital.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <CtaLink href="/international-patient-care" label="Book Free Consultation" />
                  <CtaLink href="/contact" label="Request Treatment" secondary />
                  <CtaLink href={getWhatsAppUrl(consultationMessage)} label="WhatsApp" external secondary />
                  <CtaLink href={getTelegramUrl(consultationMessage)} label="Telegram" external secondary />
                  <CtaLink href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`} label="Call Now" secondary />
                  <CtaLink href={hospital.website} label="Official Hospital Website" external secondary />
                </div>
              </div>
              <div className="relative min-h-[320px]">
                <Image
                  src={hospital.featuredImage}
                  alt={hospital.imageCredit ? `${hospital.hospitalGroup} official network` : `${hospital.name} hospital building`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/25 to-transparent" />
                {hospital.imageCredit ? (
                  <p className="absolute bottom-3 right-3 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs text-white">
                    Image: {hospital.imageCredit}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact pt-0">
        <div className="container-wide grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat icon={Building2} value={hospital.beds ? `${hospital.beds}+` : "Multi"} label="Hospital beds" />
          <Stat icon={Users} value={hospital.doctors ? `${hospital.doctors}+` : "Expert"} label="Doctors" />
          <Stat icon={Calendar} value={hospital.established?.toString() ?? "Modern"} label="Established" />
          <Stat icon={CheckCircle2} value="Available" label="International desk" />
        </div>
      </section>

      <ContentSection eyebrow="Overview" title={`About ${hospital.name}`} paragraphs={[hospital.description, hospital.shortDescription]} />
      {hospital.informationSource ? (
        <section className="section-shell-compact pt-0">
          <div className="container-wide">
            <a
              href={hospital.informationSource}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8]"
            >
              Information verified from KIMS Hospitals
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      ) : null}
      <ListSection eyebrow="Why Choose This Hospital" title="Specialist care with coordinated international support" items={[
        `Access to ${hospital.specialties.length} standardized specialty pathways`,
        "Case review and hospital communication before travel",
        "Experienced multidisciplinary medical teams",
        "Coordinated treatment planning and follow-up",
      ]} />
      <ListSection eyebrow="International Patient Services" title="Support throughout the patient journey" items={[
        "Medical visa support", "Airport pickup", "Interpreter assistance", "Accommodation coordination", "Teleconsultation", "Treatment estimate coordination",
      ]} />
      <TagSection eyebrow="Specialties" title="Medical specialties" items={hospital.specialties} />
      <TagSection eyebrow="Treatments" title="Treatment pathways" items={hospital.treatments} />
      <ListSection eyebrow="Facilities" title="Facilities and patient services" items={hospital.facilities} />
      <ListSection eyebrow="Technology" title="Advanced medical technology" items={hospital.technology} />
      <TagSection eyebrow="Medical Departments" title="Multidisciplinary departments" items={hospital.medicalDepartments} />

      {hospitalDoctors.length > 0 && (
        <section className="section-shell pt-0">
          <div className="container-wide">
            <div className="text-center"><span className="section-kicker">Doctors</span><h2 className="mt-5 heading-section">Doctors working at {hospital.name}</h2></div>
            {doctorSpecialties.map((specialty) => (
              <div key={specialty} className="mt-10">
                <h3 className="font-display text-2xl font-semibold text-[#0B1F4D]">{specialty}</h3>
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {hospitalDoctors.filter((doctor) => doctor.specialization === specialty).map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="text-center"><span className="section-kicker">Gallery</span><h2 className="mt-5 heading-section">{hospital.name} gallery</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {hospital.gallery.map((image, index) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-slate-200">
                <Image src={image} alt={`${hospital.name} facility ${index + 1}`} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PremiumCtaBanner
        eyebrow="Plan Your Treatment"
        title={`Get treatment at ${hospital.name}`}
        description="Share your reports for hospital review, a treatment estimate, visa guidance, and complete travel coordination."
        image={{ src: hospital.featuredImage, alt: `${hospital.name} international patient consultation` }}
        primary={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondary={{ href: "/contact", label: "Request Treatment" }}
      />
    </>
  );
}

function CtaLink({ href, label, external = false, secondary = false }: { href: string; label: string; external?: boolean; secondary?: boolean }) {
  const classes = secondary
    ? "inline-flex items-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D] transition hover:-translate-y-0.5"
    : "inline-flex items-center rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5";
  return external ? <a href={href} target="_blank" rel="noreferrer" className={classes}>{label}</a> : <Link href={href} className={classes}>{label}</Link>;
}

function Stat({ icon: Icon, value, label }: { icon: typeof Building2; value: string; label: string }) {
  return <Card className="rounded-2xl border border-[#D6E8FF] p-5 text-center"><Icon className="mx-auto h-6 w-6 text-[#1D4ED8]" /><p className="mt-2 font-display text-2xl font-bold text-[#0B1F4D]">{value}</p><p className="text-xs text-slate-500">{label}</p></Card>;
}

function ContentSection({ eyebrow, title, paragraphs }: { eyebrow: string; title: string; paragraphs: string[] }) {
  return <section className="section-shell pt-0"><div className="container-wide"><div className="section-frame p-6 sm:p-8 lg:p-10"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2>{paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 max-w-4xl text-base leading-8 text-slate-600">{paragraph}</p>)}</div></div></section>;
}

function ListSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return <section className="section-shell pt-0"><div className="container-wide"><div className="section-frame-soft p-6 sm:p-8 lg:p-10"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{item}</div>)}</div></div></div></section>;
}

function TagSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly string[] }) {
  return <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Card key={item} className="flex items-center gap-3 rounded-2xl border border-[#D6E8FF] p-5"><Stethoscope className="h-5 w-5 text-[#1D4ED8]" /><h3 className="font-semibold text-[#0B1F4D]">{item}</h3></Card>)}</div></div></section>;
}
