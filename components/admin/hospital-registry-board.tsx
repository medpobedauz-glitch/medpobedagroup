import { PartnershipStatus } from "@prisma/client";

import {
  createContactPersonAction,
  createHospitalAction,
  updateHospitalProfileAction,
} from "@/lib/actions/admin";
import { startCase } from "@/lib/utils";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type HospitalRegistryBoardProps = {
  hospitals: Awaited<
    ReturnType<typeof import("@/lib/data/partnerships").getHospitalsForAdmin>
  >;
};

const partnershipStatusOptions = Object.values(PartnershipStatus);

export function HospitalRegistryBoard({
  hospitals,
}: HospitalRegistryBoardProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-white/10 p-6">
        <h2 className="font-display text-2xl font-semibold text-white">
          Add Hospital Partner
        </h2>
        <form action={createHospitalAction} className="mt-5 grid gap-4 lg:grid-cols-3">
          <Input name="name" placeholder="Hospital name" required />
          <Input name="country" placeholder="Country" required />
          <Input name="city" placeholder="City" />
          <Input name="website" placeholder="Website" />
          <Input name="hospitalType" placeholder="Hospital type" />
          <Input name="internationalDeskEmail" placeholder="International desk email" />
          <Input name="internationalDeskPhone" placeholder="International desk phone" />
          <select
            name="status"
            defaultValue={PartnershipStatus.PROSPECT}
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            {partnershipStatusOptions.map((status) => (
              <option key={status} value={status}>
                {startCase(status)}
              </option>
            ))}
          </select>
          <Textarea
            name="description"
            placeholder="Hospital profile or collaboration context"
            className="lg:col-span-3"
          />
          <SubmitButton type="submit" variant="hero" pendingLabel="Creating hospital...">
            Create Hospital Record
          </SubmitButton>
        </form>
      </Card>
      {hospitals.map((hospital) => {
        const latestPartnership = hospital.partnerships[0];

        return (
          <Card key={hospital.id} className="border-white/10 p-6">
            <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
              <div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {hospital.country}
                  </span>
                  {latestPartnership ? (
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                      {startCase(latestPartnership.collaborationStatus)}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Leads: {hospital._count.partnerLeads}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold text-white">
                  {hospital.name}
                </h3>
                <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-300">
                  {hospital.city ? <p>{hospital.city}</p> : null}
                  {hospital.website ? <p>{hospital.website}</p> : null}
                  {hospital.internationalDeskEmail ? (
                    <p>{hospital.internationalDeskEmail}</p>
                  ) : null}
                  {hospital.internationalDeskPhone ? (
                    <p>{hospital.internationalDeskPhone}</p>
                  ) : null}
                  {hospital.description ? <p>{hospital.description}</p> : null}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-4 text-sm text-slate-200">
                    Partnerships: {hospital._count.partnerships}
                  </div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-4 text-sm text-slate-200">
                    Medical cases assigned: {hospital._count.assignedMedicalTourismInquiries}
                  </div>
                </div>
                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-slate-950/28 p-4">
                  <p className="text-sm font-semibold text-white">Contact Persons</p>
                  <div className="mt-3 grid gap-3">
                    {hospital.contacts.length ? (
                      hospital.contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="rounded-[1rem] border border-white/8 bg-white/6 px-3 py-3 text-sm text-slate-300"
                        >
                          <p className="font-medium text-white">{contact.name}</p>
                          <p>{contact.role || "No role provided"}</p>
                          <p>{contact.email || contact.phone || contact.telegram || "No direct channel recorded"}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">No contacts recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <form
                  action={updateHospitalProfileAction}
                  className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/26 p-4"
                >
                  <input type="hidden" name="hospitalId" value={hospital.id} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="name" defaultValue={hospital.name} />
                    <Input name="country" defaultValue={hospital.country} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="city" defaultValue={hospital.city ?? ""} />
                    <Input name="website" defaultValue={hospital.website ?? ""} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="hospitalType" defaultValue={hospital.hospitalType ?? ""} />
                    <select
                      name="status"
                      defaultValue={latestPartnership?.collaborationStatus ?? hospital.status}
                      className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                    >
                      {partnershipStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {startCase(status)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      name="internationalDeskEmail"
                      defaultValue={hospital.internationalDeskEmail ?? ""}
                    />
                    <Input
                      name="internationalDeskPhone"
                      defaultValue={hospital.internationalDeskPhone ?? ""}
                    />
                  </div>
                  <Textarea
                    name="description"
                    defaultValue={hospital.description ?? ""}
                    className="min-h-[90px]"
                  />
                  <SubmitButton
                    type="submit"
                    variant="secondary"
                    pendingLabel="Saving profile..."
                  >
                    Save Hospital Profile
                  </SubmitButton>
                </form>
                <form
                  action={createContactPersonAction}
                  className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/26 p-4"
                >
                  <input type="hidden" name="hospitalId" value={hospital.id} />
                  {latestPartnership ? (
                    <input type="hidden" name="partnershipId" value={latestPartnership.id} />
                  ) : null}
                  <p className="text-sm font-semibold text-white">Add Contact Person</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="name" placeholder="Contact name" />
                    <Input name="role" placeholder="Role or department" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input name="email" placeholder="Email" />
                    <Input name="phone" placeholder="Phone" />
                  </div>
                  <Input name="telegram" placeholder="Telegram" />
                  <SubmitButton
                    type="submit"
                    variant="outline"
                    pendingLabel="Adding contact..."
                  >
                    Add Contact Person
                  </SubmitButton>
                </form>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
