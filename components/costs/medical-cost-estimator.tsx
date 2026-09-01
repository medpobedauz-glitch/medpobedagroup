"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Clock3,
  Download,
  Mail,
  MapPin,
  Printer,
  Save,
  Share2,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { submitCostEstimateLead } from "@/app/actions/cost-estimate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import {
  COST_COUNTRIES,
  COST_CURRENCIES,
  COST_LANGUAGES,
  HOTEL_CATEGORIES,
  calculateCostEstimate,
  getCostOptions,
  type CostCalculatorInput,
  type CostCurrency,
} from "@/lib/data/costs";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";

const options = getCostOptions();
const firstTreatment = options.treatments[0];
const defaultHospital = firstTreatment?.suitableHospitals[0] ?? "";

const DEFAULT_INPUT: CostCalculatorInput = {
  patientCountry: "Uzbekistan",
  preferredLanguage: "Russian",
  treatmentId: firstTreatment?.slug ?? "heart-surgery",
  disease: "",
  hospitalId: defaultHospital,
  doctorId: "",
  preferredCity: "",
  age: 40,
  gender: "PREFER_NOT_TO_SAY",
  companions: 1,
  expectedStayDays: 21,
  hotelCategory: "comfort",
  interpreter: true,
  airportPickup: true,
  visaAssistance: true,
  teleconsultation: true,
  currency: "USD",
};

function formatMoney(value: number, currency: CostCurrency) {
  const config = COST_CURRENCIES[currency];
  return `${config.symbol}${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function recordCalculatorEvent(eventType: "FORM_START" | "FORM_SUCCESS" | "CTA_CLICK", calculatorEvent: string, metadata: Record<string, unknown> = {}) {
  void fetch("/api/analytics-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      eventType,
      path: "/cost-calculator",
      inquiryType: "MEDICAL_TOURISM",
      sessionId: getSessionId(),
      metadata: { calculatorEvent, ...metadata },
    }),
    keepalive: true,
  }).catch(() => undefined);
}

function getSessionId() {
  if (typeof window === "undefined") return undefined;
  const key = "medpobeda-cost-estimate-session";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const created = window.crypto?.randomUUID?.() ?? `estimate-${Date.now()}`;
  window.sessionStorage.setItem(key, created);
  return created;
}

export function MedicalCostEstimator({
  initialDisease = "",
  initialTreatmentId,
}: {
  initialDisease?: string;
  initialTreatmentId?: string;
}) {
  const [input, setInput] = useState<CostCalculatorInput>(() => {
    const selectedTreatment =
      options.treatments.find((item) => item.slug === initialTreatmentId) ??
      firstTreatment;

    return {
      ...DEFAULT_INPUT,
      disease: initialDisease,
      treatmentId: selectedTreatment?.slug ?? DEFAULT_INPUT.treatmentId,
      hospitalId:
        selectedTreatment?.suitableHospitals[0] ?? DEFAULT_INPUT.hospitalId,
    };
  });
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [pendingExport, setPendingExport] = useState<"pdf" | "email" | null>(null);
  const [isPending, startTransition] = useTransition();
  const started = useRef(false);

  const eligibleHospitals = useMemo(() => {
    const treatment = options.treatments.find((item) => item.slug === input.treatmentId);
    return (treatment?.suitableHospitals ?? [])
      .map((slug) => options.hospitals.find((hospital) => hospital.slug === slug))
      .filter((hospital): hospital is (typeof options.hospitals)[number] => Boolean(hospital));
  }, [input.treatmentId]);

  const eligibleDoctors = useMemo(() => options.doctors.filter((doctor) =>
    doctor.treatments.includes(input.treatmentId) &&
    (!input.hospitalId || doctor.hospitalId === input.hospitalId)
  ), [input.hospitalId, input.treatmentId]);

  const estimate = useMemo(() => calculateCostEstimate(input), [input]);

  function update<K extends keyof CostCalculatorInput>(key: K, value: CostCalculatorInput[K]) {
    if (!started.current) {
      started.current = true;
      recordCalculatorEvent("FORM_START", "CALCULATOR_START");
    }
    setInput((current) => ({ ...current, [key]: value }));
  }

  function updateTreatment(treatmentId: string) {
    const treatment = options.treatments.find((item) => item.slug === treatmentId);
    update("treatmentId", treatmentId);
    setInput((current) => ({
      ...current,
      treatmentId,
      hospitalId: treatment?.suitableHospitals[0] ?? "",
      doctorId: "",
    }));
  }

  function requestExport(type: "pdf" | "email") {
    setPendingExport(type);
    setLeadMessage("");
    setLeadOpen(true);
    recordCalculatorEvent("CTA_CLICK", type === "pdf" ? "DOWNLOAD_REQUEST" : "EMAIL_ESTIMATE_REQUEST");
  }

  async function runExport(type: "pdf" | "email", patientName: string, patientEmail: string) {
    if (type === "pdf") {
      await downloadEstimatePdf(estimate, patientName);
      recordCalculatorEvent("CTA_CLICK", "PDF_DOWNLOADED", { treatment: estimate.selectedTreatment.slug });
      return;
    }
    const subject = encodeURIComponent(`MedPobeda cost estimate — ${estimate.selectedTreatment.name}`);
    const body = encodeURIComponent(
      `Hello ${patientName},\n\nYour indicative estimate for ${estimate.selectedTreatment.name} is ${formatMoney(estimate.minTotal, input.currency)}–${formatMoney(estimate.maxTotal, input.currency)}.\n\nThis is informational only and requires hospital confirmation.\n\n${siteConfig.siteUrl}/cost-calculator`,
    );
    window.location.href = `mailto:${patientEmail}?subject=${subject}&body=${body}`;
  }

  function submitLead(formData: FormData) {
    const patientName = String(formData.get("fullName") ?? "");
    const patientEmail = String(formData.get("email") ?? "");
    formData.set("preferredTreatment", estimate.selectedTreatment.name);
    formData.set("redirectPath", "/cost-calculator");
    formData.set("sessionId", getSessionId() ?? "");
    formData.set("estimateSnapshot", JSON.stringify(createSnapshot(input, estimate)));
    startTransition(async () => {
      const result = await submitCostEstimateLead(formData);
      setLeadMessage(result.message);
      if (!result.success) return;
      recordCalculatorEvent("FORM_SUCCESS", "COMPLETED_ESTIMATE", {
        treatment: estimate.selectedTreatment.slug,
        hospital: estimate.selectedHospital?.slug,
        country: input.patientCountry,
      });
      if (pendingExport) await runExport(pendingExport, patientName, patientEmail);
      setPendingExport(null);
    });
  }

  function saveEstimate() {
    window.localStorage.setItem("medpobeda-saved-cost-estimate", JSON.stringify({ input, estimate, savedAt: new Date().toISOString() }));
    recordCalculatorEvent("CTA_CLICK", "ESTIMATE_SAVED", { treatment: estimate.selectedTreatment.slug });
    setLeadMessage("Estimate saved in this browser.");
  }

  async function shareEstimate() {
    const text = `Indicative ${estimate.selectedTreatment.name} estimate: ${formatMoney(estimate.minTotal, input.currency)}–${formatMoney(estimate.maxTotal, input.currency)}.`;
    if (navigator.share) {
      await navigator.share({ title: "MedPobeda Medical Cost Estimate", text, url: `${siteConfig.siteUrl}/cost-calculator` });
    } else {
      await navigator.clipboard.writeText(`${text} ${siteConfig.siteUrl}/cost-calculator`);
      setLeadMessage("Estimate summary copied to the clipboard.");
    }
    recordCalculatorEvent("CTA_CLICK", "ESTIMATE_SHARED");
  }

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <section className="surface-panel rounded-[1.85rem] border border-[#D6E8FF] p-5 sm:p-7" aria-labelledby="calculator-input-title">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="section-kicker">Your Preferences</span>
              <h2 id="calculator-input-title" className="mt-4 font-display text-3xl font-semibold text-[#0B1F4D]">Build your estimate</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white"><Calculator className="h-5 w-5" /></div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Select label="Patient Country" value={input.patientCountry} options={[...COST_COUNTRIES]} onChange={(value) => update("patientCountry", value)} />
            <Select label="Preferred Language" value={input.preferredLanguage} options={[...COST_LANGUAGES]} onChange={(value) => update("preferredLanguage", value)} />
            <Select label="Treatment" value={input.treatmentId} options={options.treatments.map((item) => item.slug)} labels={Object.fromEntries(options.treatments.map((item) => [item.slug, item.name]))} onChange={updateTreatment} />
            <Field label="Disease or medical condition"><Input value={input.disease} onChange={(event) => update("disease", event.target.value)} placeholder="Diagnosis or symptoms" /></Field>
            <Select label="Hospital" value={input.hospitalId} options={["", ...eligibleHospitals.map((item) => item.slug)]} labels={{ "": "Recommend for me", ...Object.fromEntries(eligibleHospitals.map((item) => [item.slug, item.name])) }} onChange={(value) => { update("hospitalId", value); setInput((current) => ({ ...current, hospitalId: value, doctorId: "" })); }} />
            <Select label="Doctor (optional)" value={input.doctorId} options={["", ...eligibleDoctors.map((item) => item.slug)]} labels={{ "": "No preference", ...Object.fromEntries(eligibleDoctors.map((item) => [item.slug, item.name])) }} onChange={(value) => update("doctorId", value)} />
            <Select label="Preferred City" value={input.preferredCity} options={["", ...options.cities]} labels={{ "": "Any city" }} onChange={(value) => update("preferredCity", value)} />
            <Field label="Age"><Input type="number" min={0} max={120} value={input.age} onChange={(event) => update("age", Math.max(0, Math.min(120, Number(event.target.value) || 0)))} /></Field>
            <Select label="Gender" value={input.gender} options={["PREFER_NOT_TO_SAY", "FEMALE", "MALE", "OTHER"]} labels={{ PREFER_NOT_TO_SAY: "Prefer not to say", FEMALE: "Female", MALE: "Male", OTHER: "Other" }} onChange={(value) => update("gender", value as CostCalculatorInput["gender"])} />
            <Field label="Number of Companions"><Input type="number" min={0} max={10} value={input.companions} onChange={(event) => update("companions", Math.max(0, Math.min(10, Number(event.target.value) || 0)))} /></Field>
            <Field label="Expected Stay (days)"><Input type="number" min={1} max={365} value={input.expectedStayDays} onChange={(event) => update("expectedStayDays", Math.max(1, Math.min(365, Number(event.target.value) || 1)))} /></Field>
            <Select label="Hotel Category" value={input.hotelCategory} options={Object.keys(HOTEL_CATEGORIES)} labels={Object.fromEntries(Object.entries(HOTEL_CATEGORIES).map(([key, value]) => [key, value.label]))} onChange={(value) => update("hotelCategory", value as CostCalculatorInput["hotelCategory"])} />
            <Select label="Display Currency" value={input.currency} options={Object.keys(COST_CURRENCIES)} labels={Object.fromEntries(Object.entries(COST_CURRENCIES).map(([key, value]) => [key, `${key} — ${value.label}`]))} onChange={(value) => update("currency", value as CostCurrency)} />
          </div>
          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-slate-700">International patient services</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Toggle label="Need Interpreter?" checked={input.interpreter} onChange={(value) => update("interpreter", value)} />
              <Toggle label="Need Airport Pickup?" checked={input.airportPickup} onChange={(value) => update("airportPickup", value)} />
              <Toggle label="Need Visa Assistance?" checked={input.visaAssistance} onChange={(value) => update("visaAssistance", value)} />
              <Toggle label="Need Teleconsultation?" checked={input.teleconsultation} onChange={(value) => update("teleconsultation", value)} />
            </div>
          </fieldset>
        </section>

        <section className="section-frame-accent overflow-hidden p-5 sm:p-7" aria-labelledby="estimate-results-title" aria-live="polite">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="section-kicker">Estimated Cost Range</span>
              <h2 id="estimate-results-title" className="mt-4 font-display text-3xl font-semibold text-[#0B1F4D]">{estimate.selectedTreatment.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{estimate.selectedHospital?.name ?? "Recommended hospital"} · {estimate.selectedHospital?.city ?? "India"}</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/85 p-4 text-right shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated total</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#0B1F4D]">{formatMoney(estimate.estimatedTotal, input.currency)}</p>
            </div>
          </div>
          <p className="mt-6 font-display text-3xl font-bold tracking-tight text-[#0B1F4D] sm:text-4xl">{formatMoney(estimate.minTotal, input.currency)}–{formatMoney(estimate.maxTotal, input.currency)}</p>
          <p className="mt-2 text-xs text-slate-500">Base range: ${estimate.minTotalUSD.toLocaleString()}–${estimate.maxTotalUSD.toLocaleString()} USD · FX reference {estimate.fxLastUpdated}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <ResultStat icon={Clock3} label="Treatment Duration" value={estimate.treatmentDuration} />
            <ResultStat icon={Building2} label="Hospital Stay" value={estimate.hospitalStay} />
            <ResultStat icon={CheckCircle2} label="Recovery Time" value={estimate.recoveryTime} />
          </div>

          <div className="mt-7">
            <h3 className="font-display text-xl font-semibold text-[#0B1F4D]">Cost breakdown</h3>
            <div className="mt-3 divide-y divide-dashed divide-slate-200">
              {estimate.breakdown.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-semibold tabular-nums text-slate-900">{formatMoney(Math.round(item.estimatedUSD * estimate.fxRate), input.currency)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 py-3 font-bold text-[#0B1F4D]"><span>Grand Total</span><span>{formatMoney(estimate.estimatedTotal, input.currency)}</span></div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <ExportButton icon={Download} label="Download PDF" onClick={() => requestExport("pdf")} />
            <ExportButton icon={Mail} label="Email Estimate" onClick={() => requestExport("email")} />
            <ExportButton icon={Printer} label="Print Estimate" onClick={() => { recordCalculatorEvent("CTA_CLICK", "ESTIMATE_PRINTED"); window.print(); }} />
            <ExportButton icon={Share2} label="Share Estimate" onClick={() => void shareEstimate()} />
            <ExportButton icon={Save} label="Save Estimate" onClick={saveEstimate} />
          </div>
          {leadMessage && !leadOpen ? <p className="mt-4 text-sm font-semibold text-emerald-700" role="status">{leadMessage}</p> : null}
          <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-800">{estimate.disclaimer}</p>
        </section>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <DashboardList title="Travel Preparation" items={estimate.travelPreparation} />
        <DashboardList title="Estimated Timeline" items={estimate.timeline} ordered />
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4"><div><span className="section-kicker">Suggested Hospitals</span><h2 className="mt-4 font-display text-3xl font-semibold text-[#0B1F4D]">Hospitals matched to this treatment</h2></div><Link href="/hospitals" className="hidden text-sm font-semibold text-[#1D4ED8] sm:inline-flex">View directory <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {estimate.recommendedHospitals.map((hospital) => (
            <Link key={hospital.slug} href={`/hospitals/${hospital.slug}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
              {hospital.logo ? <Image src={hospital.logo} alt={`${hospital.name} logo`} width={120} height={60} className="h-10 w-auto object-contain" /> : <Building2 className="h-6 w-6 text-[#1D4ED8]" />}<h3 className="mt-3 font-display text-lg font-semibold text-[#0B1F4D]">{hospital.name}</h3><p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" />{hospital.city}</p><p className="mt-3 text-xs leading-6 text-slate-500">{hospital.specialties.slice(0, 3).join(" · ")}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecommendationPanel title="Recommended Doctors" icon={UserRound}>
          {estimate.recommendedDoctors.length ? estimate.recommendedDoctors.map((doctor) => <Link key={doctor.slug} href={`/doctors/${doctor.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-4"><span className="font-semibold text-[#0B1F4D]">{doctor.name}</span><span className="mt-1 block text-xs text-slate-500">{doctor.specialization} · {doctor.hospitalGroup}</span></Link>) : <p className="text-sm text-slate-600">A doctor will be recommended after medical-report review.</p>}
        </RecommendationPanel>
        <RecommendationPanel title="Suggested Treatments" icon={Stethoscope}>
          {estimate.suggestedTreatments.map((treatment) => <Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-[#1D4ED8]">{treatment.name}</Link>)}
        </RecommendationPanel>
      </section>

      <section className="section-frame-accent mt-8 p-6 text-center sm:p-8">
        <span className="section-kicker">Talk to MedPobeda</span>
        <h2 className="mt-5 font-display text-3xl font-semibold text-[#0B1F4D]">Turn this estimate into a treatment plan</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">Share your medical reports for hospital confirmation, specialist review, and a personalized quotation.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ContactAction href="/international-patient-care" label="Book Free Consultation" />
          <ContactAction href={getWhatsAppUrl(`I would like a cost estimate for ${estimate.selectedTreatment.name}.`)} label="WhatsApp" external secondary />
          <ContactAction href={getTelegramUrl()} label="Telegram" external secondary />
          <ContactAction href={`tel:${siteConfig.contactPhone.replace(/\s/g, "")}`} label="Call Now" secondary />
          <ContactAction href={`mailto:${siteConfig.contactEmail}`} label="Email" secondary />
          <ContactAction href="/contact" label="Request Treatment Plan" secondary />
        </div>
      </section>

      <Modal open={leadOpen} onOpenChange={setLeadOpen}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader><ModalTitle>Save your personalized estimate</ModalTitle><ModalDescription>Enter your details before {pendingExport === "pdf" ? "downloading the branded PDF" : "emailing the estimate"}. Your request will be stored securely for MedPobeda follow-up.</ModalDescription></ModalHeader>
          <form action={submitLead} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name"><Input name="fullName" required minLength={2} /></Field>
            <Field label="Country"><select name="country" defaultValue={input.patientCountry} required className="select-field">{COST_COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></Field>
            <Field label="Phone"><Input name="phone" type="tel" required /></Field>
            <Field label="WhatsApp"><Input name="whatsapp" type="tel" required /></Field>
            <Field label="Email"><Input name="email" type="email" required /></Field>
            <Field label="Preferred Treatment"><Input value={estimate.selectedTreatment.name} readOnly /></Field>
            <label className="sm:col-span-2 text-sm font-semibold text-slate-700">Medical Condition<Textarea name="medicalCondition" required minLength={5} defaultValue={input.disease} className="mt-2 min-h-24" /></label>
            <label className="sm:col-span-2 text-sm font-semibold text-slate-700">Upload Medical Reports<Input name="medicalReports" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx" className="mt-2" /></label>
            <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-slate-600"><input name="consentAccepted" type="checkbox" required className="mt-1" />I consent to MedPobeda Group storing these details and contacting me about this treatment request.</label>
            <div className="sm:col-span-2"><Button type="submit" variant="primary" disabled={isPending} className="w-full">{isPending ? "Saving estimate…" : pendingExport === "pdf" ? "Save & Download PDF" : "Save & Email Estimate"}</Button></div>
            {leadMessage ? <p className={`sm:col-span-2 text-sm font-semibold ${leadMessage.includes("saved") || leadMessage.includes("received") ? "text-emerald-700" : "text-rose-700"}`} role="status">{leadMessage}</p> : null}
          </form>
        </ModalContent>
      </Modal>

      <style jsx global>{`.select-field{height:3.35rem;width:100%;border-radius:1.35rem;border:1px solid rgba(226,232,240,.8);background:rgba(255,255,255,.94);padding:0 1rem;font-size:.875rem;color:#0f172a;box-shadow:0 12px 30px rgba(8,22,52,.06);outline:none}.select-field:focus{border-color:#22d3ee;box-shadow:0 0 0 4px #cffafe}`}</style>
    </>
  );
}

function createSnapshot(input: CostCalculatorInput, estimate: ReturnType<typeof calculateCostEstimate>) {
  return {
    version: 1,
    currency: "USD",
    displayCurrency: input.currency,
    treatmentId: estimate.selectedTreatment.id,
    treatmentSlug: estimate.selectedTreatment.slug,
    treatmentName: estimate.selectedTreatment.name,
    disease: input.disease,
    hospitalId: estimate.selectedHospital?.id,
    hospitalName: estimate.selectedHospital?.name,
    doctorId: estimate.selectedDoctor?.id,
    doctorName: estimate.selectedDoctor?.name,
    preferredCity: input.preferredCity,
    patientCountry: input.patientCountry,
    preferredLanguage: input.preferredLanguage,
    age: input.age,
    gender: input.gender,
    companions: input.companions,
    expectedStayDays: input.expectedStayDays,
    hotelCategory: input.hotelCategory,
    services: { interpreter: input.interpreter, airportPickup: input.airportPickup, visaAssistance: input.visaAssistance, teleconsultation: input.teleconsultation },
    minimumEstimate: estimate.minTotalUSD,
    maximumEstimate: estimate.maxTotalUSD,
    estimatedTotal: estimate.estimatedTotalUSD,
    lineItems: estimate.breakdown.map((item) => ({ key: item.key, label: item.label, minimum: item.minUSD, maximum: item.maxUSD, amount: item.estimatedUSD })),
    recommendedHospitalIds: estimate.recommendedHospitals.map((hospital) => hospital.id),
    recommendedDoctorIds: estimate.recommendedDoctors.map((doctor) => doctor.id),
  };
}

async function downloadEstimatePdf(estimate: ReturnType<typeof calculateCostEstimate>, patientName: string) {
  const [{ jsPDF }, qrModule] = await Promise.all([import("jspdf"), import("qrcode")]);
  const QRCode = qrModule.default;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const qr = await QRCode.toDataURL(`${siteConfig.siteUrl}/cost-calculator`, { width: 180, margin: 1 });
  const logo = await imageAsDataUrl("/images/brand/medpobeda-logo.png").catch(() => null);
  if (logo) pdf.addImage(logo, "PNG", 16, 12, 42, 14);
  pdf.setTextColor(11, 31, 77);
  pdf.setFontSize(20);
  pdf.text("Medical Treatment Cost Estimate", 16, 36);
  pdf.setFontSize(10);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Patient: ${patientName}`, 16, 45);
  pdf.text(`Estimate date: ${new Date().toLocaleDateString("en-GB")}`, 16, 51);
  pdf.text(`Treatment: ${estimate.selectedTreatment.name}`, 16, 57);
  pdf.text(`Hospital: ${estimate.selectedHospital?.name ?? "To be recommended"}`, 16, 63);
  pdf.setFontSize(15);
  pdf.setTextColor(29, 78, 216);
  pdf.text(`Estimated range: $${estimate.minTotalUSD.toLocaleString()} - $${estimate.maxTotalUSD.toLocaleString()} USD`, 16, 74);
  pdf.setFontSize(11);
  pdf.setTextColor(11, 31, 77);
  pdf.text("Cost breakdown", 16, 86);
  let y = 94;
  pdf.setFontSize(9);
  estimate.breakdown.forEach((item) => {
    if (y > 255) { pdf.addPage(); y = 20; }
    pdf.setTextColor(71, 85, 105);
    pdf.text(item.label, 16, y);
    pdf.setTextColor(15, 23, 42);
    pdf.text(`$${item.estimatedUSD.toLocaleString()}`, 175, y, { align: "right" });
    y += 7;
  });
  y += 4;
  pdf.setFontSize(11);
  pdf.setTextColor(11, 31, 77);
  pdf.text(`Estimated total: $${estimate.estimatedTotalUSD.toLocaleString()} USD`, 16, y);
  y += 12;
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139);
  const disclaimerLines = pdf.splitTextToSize(estimate.disclaimer, 145);
  pdf.text(disclaimerLines, 16, y);
  pdf.addImage(qr, "PNG", 165, 255, 28, 28);
  pdf.setFontSize(8);
  pdf.text(siteConfig.contactPhone, 16, 278);
  pdf.text(siteConfig.contactEmail, 16, 283);
  pdf.save(`MedPobeda-${estimate.selectedTreatment.slug}-estimate.pdf`);
}

async function imageAsDataUrl(path: string) {
  const response = await fetch(path);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="text-sm font-semibold text-slate-700">{label}<span className="mt-2 block">{children}</span></label>; }
function Select({ label, value, options, labels = {}, onChange }: { label: string; value: string; options: string[]; labels?: Record<string, string>; onChange: (value: string) => void }) { return <label className="text-sm font-semibold text-slate-700">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="select-field mt-2" aria-label={label}>{options.map((option) => <option key={option || "none"} value={option}>{labels[option] ?? option}</option>)}</select></label>; }
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>; }
function ResultStat({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) { return <div className="rounded-2xl border border-white/80 bg-white/80 p-4"><Icon className="h-5 w-5 text-[#1D4ED8]" /><p className="mt-2 text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-[#0B1F4D]">{value}</p></div>; }
function ExportButton({ icon: Icon, label, onClick }: { icon: typeof Download; label: string; onClick: () => void }) { return <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-3 text-xs font-bold text-[#0B1F4D] transition hover:-translate-y-0.5"><Icon className="h-4 w-4" />{label}</button>; }
function DashboardList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <div className="section-frame-soft p-6"><h2 className="font-display text-2xl font-semibold text-[#0B1F4D]">{title}</h2><Tag className="mt-5 space-y-3">{items.map((item, index) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">{ordered ? index + 1 : "✓"}</span>{item}</li>)}</Tag></div>; }
function RecommendationPanel({ title, icon: Icon, children }: { title: string; icon: typeof UserRound; children: React.ReactNode }) { return <div className="section-frame-soft p-6"><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-[#1D4ED8]" /><h2 className="font-display text-2xl font-semibold text-[#0B1F4D]">{title}</h2></div><div className="mt-5 space-y-3">{children}</div></div>; }
function ContactAction({ href, label, external = false, secondary = false }: { href: string; label: string; external?: boolean; secondary?: boolean }) { const className = secondary ? "inline-flex rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-bold text-[#0B1F4D]" : "inline-flex rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-bold text-white"; return external ? <a href={href} target="_blank" rel="noreferrer" className={className}>{label}</a> : <Link href={href} className={className}>{label}</Link>; }
