import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, Clock, Users } from "lucide-react";

import { AppointmentForm } from "@/components/doctors/appointment-form";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { HospitalCard } from "@/components/hospitals/hospital-card";
import { Card } from "@/components/ui/card";
import type { Doctor } from "@/lib/data/doctors";
import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";

export function DoctorProfile({ doctor, hospital, treatments, relatedDoctors, allDoctors, allHospitals }: { doctor: Doctor; hospital: Hospital; treatments: Treatment[]; relatedDoctors: Doctor[]; allDoctors: Doctor[]; allHospitals: Hospital[] }) {
  const message = `I would like a consultation with ${doctor.name}.`;
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide section-frame overflow-hidden p-0">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[360px]"><Image src={doctor.image} alt={`${doctor.name}, ${doctor.specialization}`} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 42vw" /></div>
            <div className="p-6 sm:p-8 lg:p-12">
              <span className="section-kicker">{doctor.specialization}</span>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-6xl">{doctor.name}</h1>
              <p className="mt-3 text-lg font-semibold text-sky-700">{doctor.title}</p>
              <p className="mt-3 text-sm text-slate-500">{doctor.qualifications.join(" · ")}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600"><span>{doctor.yearsOfExperience}+ years</span><span>{hospital.name}</span><span>{doctor.city}, India</span><span>{doctor.languages.join(", ")}</span></div>
              <p className="mt-5 text-base leading-8 text-slate-600">{doctor.biography}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Action href="#appointment" label="Book Consultation" />
                <Action href="/contact" label="Request Treatment" secondary />
                <Action href={getWhatsAppUrl(message)} label="WhatsApp" external secondary />
                <Action href={getTelegramUrl(message)} label="Telegram" external secondary />
                <Action href={`mailto:${siteConfig.contactEmail}`} label="Email" secondary />
                <Action href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`} label="Call Now" secondary />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact pt-0"><div className="container-wide grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Clock} value={`${doctor.yearsOfExperience}+`} label="Years of Experience" />
        <Stat icon={Users} value={doctor.patientsTreated} label="Patients Treated" />
        <Stat icon={CheckCircle2} value={doctor.proceduresPerformed} label="Procedures Performed" />
        <Stat icon={Award} value={`${doctor.successAreas.length}`} label="Success Areas" />
      </div></section>

      <TextSection eyebrow="About Doctor" title="Professional Summary" text={doctor.professionalSummary} />
      <ListSection eyebrow="Areas of Expertise" title="Clinical expertise and special interests" items={[...doctor.expertise, ...doctor.specialInterests]} />
      <ListSection eyebrow="Specialties" title="Specialties and subspecialties" items={[doctor.specialization, ...doctor.subspecialties]} />

      <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">Treatments Performed</span><h2 className="mt-5 heading-section">Treatment pathways offered</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{treatments.map((item) => <Link key={item.slug} href={`/treatments/${item.slug}`} className="rounded-2xl border border-[#D6E8FF] bg-white p-5 font-semibold text-[#1D4ED8] transition hover:-translate-y-0.5">{item.name}</Link>)}</div></div></section>

      <ListSection eyebrow="Procedures" title="Procedures and clinical services" items={doctor.procedures} />
      <ListSection eyebrow="Education & Training" title="Education, fellowships, and training" items={[...doctor.education, ...doctor.fellowships, ...doctor.training]} />
      <ListSection eyebrow="Research & Publications" title="Academic and research activity" items={[...doctor.research, ...doctor.publications]} />
      <ListSection eyebrow="Professional Recognition" title="Memberships, awards, and achievements" items={[...doctor.memberships, ...doctor.awards, ...doctor.professionalAchievements]} />
      <ListSection eyebrow="Languages Spoken" title="Consultation languages" items={doctor.languages} />
      <ListSection eyebrow="International Patient Experience" title="Support for patients traveling to India" items={["International consultations available", "Teleconsultation available", "Medical-report review before travel", "Interpreter and treatment coordination through MedPobeda Group"]} />

      <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">Hospital Profile</span><h2 className="mt-5 heading-section">Where {doctor.name} practices</h2></div><div className="mx-auto mt-8 max-w-xl"><HospitalCard hospital={hospital} /></div></div></section>

      {relatedDoctors.length > 0 && <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">Related Doctors</span><h2 className="mt-5 heading-section">Doctors with related expertise</h2></div><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedDoctors.map((item) => <DoctorCard key={item.slug} doctor={item} />)}</div></div></section>}

      <section id="appointment" className="section-shell pt-0 scroll-mt-24"><div className="container-wide"><div className="mb-8 text-center"><span className="section-kicker">Consultation Request</span><h2 className="mt-5 heading-section">Request an appointment with {doctor.name}</h2></div><AppointmentForm doctors={allDoctors} hospitals={allHospitals} selectedDoctor={doctor.slug} selectedHospital={hospital.slug} /></div></section>
    </>
  );
}

function Action({ href, label, external = false, secondary = false }: { href: string; label: string; external?: boolean; secondary?: boolean }) {
  const className = secondary ? "rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]" : "rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white";
  return external ? <a href={href} target="_blank" rel="noreferrer" className={className}>{label}</a> : <Link href={href} className={className}>{label}</Link>;
}
function Stat({ icon: Icon, value, label }: { icon: typeof Clock; value: string; label: string }) { return <Card className="rounded-2xl border border-[#D6E8FF] p-5 text-center"><Icon className="mx-auto h-6 w-6 text-[#1D4ED8]" /><p className="mt-2 font-display text-xl font-bold text-[#0B1F4D]">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></Card>; }
function TextSection({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <section className="section-shell pt-0"><div className="container-wide section-frame p-6 sm:p-8 lg:p-10"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2><p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{text}</p></div></section>; }
function ListSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) { const unique = [...new Set(items)].filter(Boolean); return <section className="section-shell pt-0"><div className="container-wide"><div className="text-center"><span className="section-kicker">{eyebrow}</span><h2 className="mt-5 heading-section">{title}</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{unique.map((item) => <Card key={item} className="flex gap-3 rounded-2xl border border-slate-200 p-5 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{item}</Card>)}</div></div></section>; }
