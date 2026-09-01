ALTER TABLE "PatientInquiry"
ADD COLUMN "whatsapp" TEXT,
ADD COLUMN "costEstimateSnapshot" JSONB;

CREATE INDEX "PatientInquiry_cost_estimate_source_idx"
ON "PatientInquiry" ("sourcePage", "createdAt");
