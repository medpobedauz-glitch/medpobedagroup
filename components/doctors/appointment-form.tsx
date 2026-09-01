import type { Doctor } from "@/lib/data/doctors";
import type { Hospital } from "@/lib/data/hospitals";

export function AppointmentForm({
  doctors,
  hospitals,
  selectedDoctor,
  selectedHospital,
  selectedCondition,
  sourceDiseaseSlug,
}: {
  doctors: Doctor[];
  hospitals: Hospital[];
  selectedDoctor?: string;
  selectedHospital?: string;
  selectedCondition?: string;
  sourceDiseaseSlug?: string;
}) {
  return (
    <form action="/contact" method="get" className="section-frame-soft p-6 sm:p-8" aria-label="Request a medical consultation">
      {sourceDiseaseSlug ? (
        <>
          <input type="hidden" name="source" value="disease" />
          <input type="hidden" name="disease" value={sourceDiseaseSlug} />
        </>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="date" label="Preferred Consultation Date" type="date" />
        <Field name="country" label="Country" />
        <Field name="phone" label="Phone Number" type="tel" />
        <Field name="whatsapp" label="WhatsApp Number" type="tel" />
        <Field name="email" label="Email" type="email" />
        <label className="text-sm font-semibold text-slate-700">Preferred Hospital<select name="hospital" defaultValue={selectedHospital ?? ""} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal"><option value="">Select hospital</option>{hospitals.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
        <label className="text-sm font-semibold text-slate-700">Preferred Doctor<select name="doctor" defaultValue={selectedDoctor ?? ""} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal"><option value="">Select doctor</option>{doctors.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
        <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Medical Condition<textarea name="condition" rows={4} defaultValue={selectedCondition} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-normal" /></label>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 text-sm font-bold text-white">Book Consultation</button>
        <button type="submit" name="request" value="callback" className="rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-bold text-[#0B1F4D]">Request Callback</button>
        <button type="submit" name="request" value="upload-reports" className="rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-bold text-[#0B1F4D]">Upload Reports</button>
      </div>
    </form>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return <label className="text-sm font-semibold text-slate-700">{label}<input name={name} type={type} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal" /></label>;
}
