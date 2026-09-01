import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Plane,
  Stethoscope,
} from "lucide-react";

import { DiseaseAnalyticsLink } from "@/components/diseases/disease-analytics-link";
import { AppointmentForm } from "@/components/doctors/appointment-form";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { HospitalCard } from "@/components/hospitals/hospital-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { Card } from "@/components/ui/card";
import type { Disease } from "@/lib/data/diseases";
import type { Doctor } from "@/lib/data/doctors";
import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";

type DiseaseProfileProps = {
  disease: Disease;
  hospitals: Hospital[];
  treatments: Treatment[];
  doctors: Doctor[];
  relatedDiseases: Disease[];
};

const emergencyFallback =
  "If you are experiencing symptoms of a medical emergency, seek immediate emergency medical care or contact your local emergency services. Do not rely on this website for urgent medical treatment.";

export function DiseaseProfile({
  disease,
  hospitals,
  treatments,
  doctors,
  relatedDiseases,
}: DiseaseProfileProps) {
  const encodedDisease = encodeURIComponent(disease.slug);
  const consultationPath = `/international-patient-care?source=disease&disease=${encodedDisease}`;
  const contactPath = `/contact?source=disease&disease=${encodedDisease}`;
  const message = `I would like a free consultation about ${disease.name} and treatment options in India.`;

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
        <div className="container-wide">
          <div className="section-frame overflow-hidden p-0">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-12">
                <span className="section-kicker">Disease Knowledge Center</span>
                <h1 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-6xl">
                  {disease.name}
                </h1>
                <p className="mt-3 text-sm font-semibold text-sky-700">
                  {disease.category} · {disease.specialty} · {disease.organSystem}
                </p>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {disease.shortDescription}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ProfileCta
                    href={consultationPath}
                    label="Book Free Consultation"
                    disease={disease.slug}
                    event="consultation_lead"
                  />
                  <ProfileCta
                    href={`${contactPath}&request=treatment-plan`}
                    label="Request Treatment Plan"
                    disease={disease.slug}
                    event="consultation_lead"
                    secondary
                  />
                  <ProfileCta
                    href={getWhatsAppUrl(message)}
                    label="WhatsApp"
                    disease={disease.slug}
                    event="consultation_lead"
                    target="whatsapp"
                    external
                    secondary
                  />
                  <ProfileCta
                    href={getTelegramUrl(message)}
                    label="Telegram"
                    disease={disease.slug}
                    event="consultation_lead"
                    target="telegram"
                    external
                    secondary
                  />
                </div>
              </div>
              <div className="relative min-h-[320px]">
                <Image
                  src={disease.heroImage}
                  alt={`${disease.name} patient education and specialist consultation`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/25 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {disease.emergency ? (
        <section className="section-shell-compact pt-0">
          <div className="container-wide">
            <div
              role="alert"
              className="flex items-start gap-4 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-red-950 sm:p-6"
            >
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-semibold">Medical emergency warning</h2>
                <p className="mt-2 text-sm leading-7">
                  {disease.emergencyMessage ?? emergencyFallback}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell-compact pt-0" aria-labelledby="quick-facts-heading">
        <div className="container-wide">
          <div className="mb-7 text-center">
            <span className="section-kicker">Quick Facts</span>
            <h2 id="quick-facts-heading" className="mt-5 heading-section">
              At-a-glance information
            </h2>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Fact icon={Activity} label="Common age group" value={disease.quickFacts.commonAgeGroup} />
            <Fact icon={AlertTriangle} label="Risk level" value={disease.quickFacts.riskLevel} />
            <Fact icon={CheckCircle2} label="Treatable" value={disease.quickFacts.treatable} />
            <Fact icon={Stethoscope} label="Requires surgery" value={disease.quickFacts.requiresSurgery} />
            <Fact icon={Clock3} label="Recovery time" value={disease.quickFacts.recoveryTime} />
            <Fact icon={HeartPulse} label="Medical specialty" value={disease.quickFacts.medicalSpecialty} />
          </dl>
        </div>
      </section>

      <TextSection
        id="overview"
        eyebrow="Disease Overview"
        title={`Understanding ${disease.name}`}
        paragraphs={[disease.overview, disease.prognosis]}
      />

      <ListSection
        eyebrow="Common Symptoms"
        title={`Possible symptoms of ${disease.name}`}
        items={disease.symptoms}
      />
      <ListSection
        eyebrow="Causes"
        title="Possible causes and contributing factors"
        items={disease.causes}
        soft
      />
      <ListSection
        eyebrow="Risk Factors"
        title="Factors that may increase risk"
        items={disease.riskFactors}
      />

      <section className="section-shell pt-0" aria-labelledby="warning-signs-heading">
        <div className="container-wide">
          <div className="rounded-[1.8rem] border border-amber-200 bg-amber-50 p-6 sm:p-8 lg:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">
              Warning Signs
            </span>
            <h2 id="warning-signs-heading" className="mt-5 heading-section">
              Symptoms that need prompt medical attention
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {disease.warningSigns.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-amber-200 bg-white p-5 text-sm leading-6 text-slate-700"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ListSection
        eyebrow="Diagnosis"
        title="How specialists may evaluate the condition"
        items={disease.diagnosis}
      />
      <TimelineSection eyebrow="Disease Stages" title="How the condition may progress" items={disease.stages} />
      <ListSection
        eyebrow="Complications"
        title="Potential complications"
        items={disease.complications}
        soft
      />
      <ListSection
        eyebrow="Treatment Options"
        title="Possible treatment pathways"
        items={disease.treatmentOptions}
      />
      <TimelineSection eyebrow="Recovery" title="Recovery and follow-up guidance" items={disease.recovery} />
      <ListSection
        eyebrow="Lifestyle Changes"
        title="Everyday measures that may support care"
        items={disease.lifestyleChanges}
        soft
      />
      <ListSection
        eyebrow="Prevention"
        title="Risk reduction and prevention"
        items={disease.prevention}
      />
      <ListSection
        eyebrow="When to See a Doctor"
        title="Arrange a qualified medical assessment"
        items={disease.whenToSeeDoctor}
        soft
      />

      <PatientEducation disease={disease} />

      <section className="section-shell pt-0" aria-labelledby="tourism-heading">
        <div className="container-wide section-frame p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="section-kicker">Medical Tourism Support</span>
              <h2 id="tourism-heading" className="mt-5 heading-section">
                Why international patients choose India
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                MedPobeda Group coordinates specialist review and the practical parts of the
                treatment journey. Hospital selection and treatment decisions remain subject to
                an individual medical assessment.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ProfileCta
                  href="/why-india"
                  label="Why Choose India"
                  disease={disease.slug}
                  event="consultation_lead"
                  target="why-india"
                  secondary
                />
                <ProfileCta
                  href="/second-medical-opinion"
                  label="Get a Second Opinion"
                  disease={disease.slug}
                  event="consultation_lead"
                  target="second-opinion"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Medical visa guidance",
                "Airport pickup",
                "Interpreter assistance",
                "Treatment coordinator",
                "Hotel assistance",
                "Remote second opinion",
                "Medical reports review",
                "Post-treatment follow-up",
              ].map((item) => (
                <Card
                  key={item}
                  className="flex gap-3 rounded-2xl border border-[#D6E8FF] p-5 text-sm font-semibold text-[#0B1F4D]"
                >
                  <Plane className="h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                  {item}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CarePathway disease={disease} />

      <section className="section-shell pt-0" aria-labelledby="recommended-treatments-heading">
        <div className="container-wide">
          <div className="text-center">
            <span className="section-kicker">Recommended Treatments</span>
            <h2 id="recommended-treatments-heading" className="mt-5 heading-section">
              Treatment pathways connected to {disease.name}
            </h2>
          </div>
          {treatments.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((treatment) => (
                <Card
                  key={treatment.slug}
                  className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                    {treatment.specialty}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-[#0B1F4D]">
                    {treatment.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {treatment.shortDescription}
                  </p>
                  <DiseaseAnalyticsLink
                    href={`/treatments/${treatment.slug}`}
                    diseaseSlug={disease.slug}
                    event="treatment_click"
                    target={treatment.slug}
                    className="mt-auto pt-5 text-sm font-bold text-[#1D4ED8]"
                    ariaLabel={`Explore ${treatment.name} for ${disease.name}`}
                  >
                    Explore treatment
                  </DiseaseAnalyticsLink>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-[#D6E8FF] bg-white p-6 text-center sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0B1F4D]">
                Specialist treatment matching is required
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                This condition does not yet have a dedicated pathway in the treatment directory.
                A specialist can review the diagnosis and identify appropriate medical,
                interventional, surgical, or rehabilitation options.
              </p>
              <DiseaseAnalyticsLink
                href="/treatments"
                diseaseSlug={disease.slug}
                event="treatment_click"
                target="treatment-directory"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Explore Treatment Directory
              </DiseaseAnalyticsLink>
            </div>
          )}
        </div>
      </section>

      {hospitals.length > 0 ? (
        <section className="section-shell pt-0" aria-labelledby="recommended-hospitals-heading">
          <div className="container-wide">
            <div className="text-center">
              <span className="section-kicker">Related Hospitals</span>
              <h2 id="recommended-hospitals-heading" className="mt-5 heading-section">
                Hospitals connected to {disease.name}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.slug}
                  hospital={hospital}
                  sourceDiseaseSlug={disease.slug}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-shell pt-0" aria-labelledby="recommended-doctors-heading">
        <div className="container-wide">
          <div className="text-center">
            <span className="section-kicker">Related Doctors</span>
            <h2 id="recommended-doctors-heading" className="mt-5 heading-section">
              Specialists connected to {disease.name}
            </h2>
          </div>
          {doctors.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.slug}
                  doctor={doctor}
                  sourceDiseaseSlug={disease.slug}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-[#D6E8FF] bg-white p-6 text-center sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0B1F4D]">
                Find a {disease.specialty} specialist
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Browse the doctor directory or request specialist matching based on the diagnosis,
                reports, preferred hospital, and treatment plan.
              </p>
              <DiseaseAnalyticsLink
                href="/doctors"
                diseaseSlug={disease.slug}
                event="doctor_profile_visit"
                target="doctor-directory"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Explore Doctor Directory
              </DiseaseAnalyticsLink>
            </div>
          )}
        </div>
      </section>

      <RelatedContent disease={disease} relatedDiseases={relatedDiseases} />

      <FAQAccordion
        eyebrow="Disease FAQ"
        title={`Common questions about ${disease.name}`}
        description="General patient education only. A qualified clinician must provide diagnosis and individual treatment advice."
        items={disease.faqs}
      />

      <section id="appointment" className="section-shell pt-0" aria-labelledby="appointment-heading">
        <div className="container-wide">
          <div className="mb-8 text-center">
            <span className="section-kicker">Appointment</span>
            <h2 id="appointment-heading" className="mt-5 heading-section">
              Request a specialist consultation
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Share your medical condition and preferred hospital or doctor. The coordination team
              will request the records needed for a case review.
            </p>
          </div>
          <AppointmentForm
            doctors={doctors}
            hospitals={hospitals}
            selectedDoctor={doctors[0]?.slug}
            selectedHospital={hospitals[0]?.slug}
            selectedCondition={disease.name}
            sourceDiseaseSlug={disease.slug}
          />
        </div>
      </section>

      <section className="section-shell-compact pt-0">
        <div className="container-wide">
          <div className="section-frame-accent p-6 text-center sm:p-8 lg:p-10">
            <h2 className="font-display text-3xl font-bold text-[#0B1F4D]">
              Plan care for {disease.name}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Request hospital matching, specialist review, an indicative treatment estimate, and
              international patient support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ProfileCta
                href={consultationPath}
                label="Book Free Consultation"
                disease={disease.slug}
                event="consultation_lead"
              />
              <ProfileCta
                href={`${contactPath}&request=upload-reports`}
                label="Upload Medical Reports"
                disease={disease.slug}
                event="consultation_lead"
                target="upload-reports"
                secondary
              />
              <ProfileCta
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`${disease.name} treatment plan request`)}`}
                label="Email"
                disease={disease.slug}
                event="consultation_lead"
                target="email"
                external
                secondary
              />
              <ProfileCta
                href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`}
                label="Call Now"
                disease={disease.slug}
                event="consultation_lead"
                target="phone"
                external
                secondary
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact pt-0" aria-label="Medical information disclaimer">
        <div className="container-wide">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
            This page provides general educational information and does not replace diagnosis,
            treatment, or advice from a qualified healthcare professional. Treatment suitability,
            benefits, risks, and recovery vary by patient. For urgent symptoms, contact local
            emergency services.
          </div>
        </div>
      </section>
    </>
  );
}

function ProfileCta({
  href,
  label,
  disease,
  event,
  target,
  external = false,
  secondary = false,
}: {
  href: string;
  label: string;
  disease: string;
  event:
    | "treatment_click"
    | "hospital_referral"
    | "doctor_profile_visit"
    | "cost_calculator_visit"
    | "consultation_lead";
  target?: string;
  external?: boolean;
  secondary?: boolean;
}) {
  const className = secondary
    ? "inline-flex items-center rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    : "inline-flex items-center rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(29,78,216,0.2)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

  return (
    <DiseaseAnalyticsLink
      href={href}
      diseaseSlug={disease}
      event={event}
      target={target ?? label}
      external={external}
      className={className}
      ariaLabel={`${label} for ${disease.replace(/-/g, " ")}`}
    >
      {label}
    </DiseaseAnalyticsLink>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-2xl border border-[#D6E8FF] p-5">
      <Icon className="h-6 w-6 text-[#1D4ED8]" aria-hidden="true" />
      <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 font-semibold text-[#0B1F4D]">{value}</dd>
    </Card>
  );
}

function TextSection({
  id,
  eyebrow,
  title,
  paragraphs,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id={id} className="section-shell pt-0">
      <div className="container-wide section-frame p-6 sm:p-8 lg:p-10">
        <span className="section-kicker">{eyebrow}</span>
        <h2 className="mt-5 heading-section">{title}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function ListSection({
  eyebrow,
  title,
  items,
  soft = false,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  soft?: boolean;
}) {
  return (
    <section className="section-shell pt-0">
      <div className="container-wide">
        <div className={soft ? "section-frame-soft p-6 sm:p-8 lg:p-10" : ""}>
          <div className="text-center">
            <span className="section-kicker">{eyebrow}</span>
            <h2 className="mt-5 heading-section">{title}</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card
                key={item}
                className="flex gap-3 rounded-2xl border border-slate-200 p-5 text-sm leading-6 text-slate-600"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="section-shell pt-0">
      <div className="container-wide section-frame-soft p-6 sm:p-8 lg:p-10">
        <span className="section-kicker">{eyebrow}</span>
        <h2 className="mt-5 heading-section">{title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                {index + 1}
              </span>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PatientEducation({ disease }: { disease: Disease }) {
  const groups = [
    { title: "Do", items: disease.patientEducation.dos },
    { title: "Don't", items: disease.patientEducation.donts },
    { title: "Healthy lifestyle tips", items: disease.patientEducation.healthyLifestyleTips },
    { title: "Diet advice", items: disease.patientEducation.dietAdvice },
    { title: "Exercise advice", items: disease.patientEducation.exerciseAdvice },
    { title: "Recovery guidance", items: disease.patientEducation.recoveryGuidance },
    { title: "Travel considerations", items: disease.patientEducation.travelConsiderations },
  ];

  return (
    <section className="section-shell pt-0" aria-labelledby="education-heading">
      <div className="container-wide">
        <div className="text-center">
          <span className="section-kicker">Patient Education</span>
          <h2 id="education-heading" className="mt-5 heading-section">
            Practical guidance for everyday care
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.title} className="rounded-[1.75rem] border border-slate-200 p-6">
              <h3 className="font-display text-xl font-semibold text-[#0B1F4D]">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarePathway({ disease }: { disease: Disease }) {
  const diseaseQuery = encodeURIComponent(disease.name);
  const primaryTreatment = disease.relatedTreatments[0];
  const primaryHospital = disease.relatedHospitals[0];
  const primaryDoctor = disease.relatedDoctors[0];
  const steps = [
    { label: "Disease", href: "#overview", detail: disease.name },
    {
      label: "Treatment",
      href: primaryTreatment
        ? `/treatments/${primaryTreatment}`
        : "/treatments",
      detail: "Compare pathways",
      event: "treatment_click" as const,
    },
    {
      label: "Hospital",
      href: primaryHospital
        ? `/hospitals/${primaryHospital}`
        : "/hospitals",
      detail: "Explore partner hospitals",
      event: "hospital_referral" as const,
    },
    {
      label: "Doctor",
      href: primaryDoctor
        ? `/doctors/${primaryDoctor}`
        : "/doctors",
      detail: "Find a specialist",
      event: "doctor_profile_visit" as const,
    },
    {
      label: "Cost",
      href: `/cost-calculator?condition=${diseaseQuery}${primaryTreatment ? `&treatment=${encodeURIComponent(primaryTreatment)}` : ""}&source=disease`,
      detail: "Estimate medical costs",
      event: "cost_calculator_visit" as const,
    },
    { label: "Appointment", href: "#appointment", detail: "Request consultation" },
  ];

  return (
    <section className="section-shell pt-0" aria-labelledby="care-pathway-heading">
      <div className="container-wide section-frame-soft p-6 sm:p-8 lg:p-10">
        <span className="section-kicker">Connected Care Pathway</span>
        <h2 id="care-pathway-heading" className="mt-5 heading-section">
          From condition research to coordinated care
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, index) => (
            <li key={step.label}>
              {step.event ? (
                <DiseaseAnalyticsLink
                  href={step.href}
                  diseaseSlug={disease.slug}
                  event={step.event}
                  target={step.label.toLowerCase()}
                  className="block h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                  <span className="mt-3 block font-display text-lg font-semibold text-[#0B1F4D]">
                    {step.label}
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-slate-500">{step.detail}</span>
                </DiseaseAnalyticsLink>
              ) : (
                <Link
                  href={step.href}
                  className="block h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                  <span className="mt-3 block font-display text-lg font-semibold text-[#0B1F4D]">
                    {step.label}
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-slate-500">{step.detail}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RelatedContent({
  disease,
  relatedDiseases,
}: {
  disease: Disease;
  relatedDiseases: Disease[];
}) {
  return (
    <section className="section-shell pt-0" aria-labelledby="related-content-heading">
      <div className="container-wide section-frame p-6 sm:p-8 lg:p-10">
        <span className="section-kicker">Related Content</span>
        <h2 id="related-content-heading" className="mt-5 heading-section">
          Continue exploring the knowledge center
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-[#0B1F4D]">
              Related diseases
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedDiseases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/diseases/${item.slug}`}
                  className="glass-badge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-[#0B1F4D]">
              Related articles
            </h3>
            <div className="mt-4 grid gap-3">
              {disease.relatedArticles.map((slug) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold capitalize text-[#1D4ED8] transition hover:border-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
              <Link
                href="/blog"
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#1D4ED8] transition hover:border-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Explore all medical articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
