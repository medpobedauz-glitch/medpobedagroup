-- CreateEnum
CREATE TYPE "InquiryPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "PartnershipInterest" AS ENUM ('MEDICAL_TOURISM_COOPERATION', 'PATIENT_REFERRAL_PATHWAY', 'PARTNERSHIP_DISCUSSION', 'TRAINING_AND_CONFERENCE_COLLABORATION', 'INSTITUTIONAL_MOU_DISCUSSION', 'OTHER');

-- CreateEnum
CREATE TYPE "StudentService" AS ENUM ('STUDENT_MOBILITY_GUIDANCE', 'CLINICAL_EXPOSURE_PLANNING', 'ACADEMIC_COOPERATION', 'INSTITUTIONAL_COMMUNICATION', 'OBSERVERSHIP_DISCUSSION', 'OTHER');

-- AlterTable
ALTER TABLE "StudentMobilityInquiry" ADD COLUMN     "city" TEXT,
ADD COLUMN     "consent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interestedService" "StudentService",
ADD COLUMN     "internalNote" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "preferredCourse" TEXT,
ADD COLUMN     "sourcePage" TEXT,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userCountry" TEXT,
ADD COLUMN     "userIp" TEXT;

-- AlterTable
ALTER TABLE "UploadedFile" ADD COLUMN     "contactInquiryId" TEXT,
ADD COLUMN     "hospitalPartnershipInquiryId" TEXT,
ADD COLUMN     "patientInquiryId" TEXT;

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "priority" "InquiryPriority" NOT NULL DEFAULT 'NORMAL',
    "sourcePage" TEXT,
    "locale" TEXT,
    "userCountry" TEXT,
    "userIp" TEXT,
    "userAgent" TEXT,
    "internalNote" TEXT,
    "fullName" TEXT NOT NULL,
    "organization" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "inquiryType" "InquiryType" NOT NULL DEFAULT 'CONTACT',
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "priority" "InquiryPriority" NOT NULL DEFAULT 'NORMAL',
    "sourcePage" TEXT,
    "locale" TEXT,
    "userCountry" TEXT,
    "userIp" TEXT,
    "userAgent" TEXT,
    "internalNote" TEXT,
    "patientName" TEXT NOT NULL,
    "age" INTEGER,
    "gender" "Gender",
    "country" TEXT,
    "phone" TEXT,
    "telegram" TEXT,
    "email" TEXT,
    "contactPersonName" TEXT,
    "patientNationality" TEXT,
    "preferredTreatmentDepartment" TEXT NOT NULL,
    "diagnosisOrConcern" TEXT,
    "preferredTreatmentCountry" TEXT,
    "preferredHospital" TEXT,
    "budgetRange" TEXT,
    "needsVisaSupport" BOOLEAN NOT NULL DEFAULT false,
    "needsAccommodationSupport" BOOLEAN NOT NULL DEFAULT false,
    "uploadedDocumentUrl" TEXT,
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PatientInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalPartnershipInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "priority" "InquiryPriority" NOT NULL DEFAULT 'NORMAL',
    "sourcePage" TEXT,
    "locale" TEXT,
    "userCountry" TEXT,
    "userIp" TEXT,
    "userAgent" TEXT,
    "internalNote" TEXT,
    "hospitalName" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "designation" TEXT,
    "country" TEXT,
    "city" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "telegram" TEXT,
    "website" TEXT,
    "partnershipInterest" "PartnershipInterest",
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "uploadedDocumentUrl" TEXT,

    CONSTRAINT "HospitalPartnershipInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactInquiry_createdAt_status_idx" ON "ContactInquiry"("createdAt", "status");

-- CreateIndex
CREATE INDEX "ContactInquiry_priority_createdAt_idx" ON "ContactInquiry"("priority", "createdAt");

-- CreateIndex
CREATE INDEX "ContactInquiry_email_idx" ON "ContactInquiry"("email");

-- CreateIndex
CREATE INDEX "ContactInquiry_country_idx" ON "ContactInquiry"("country");

-- CreateIndex
CREATE INDEX "ContactInquiry_sourcePage_idx" ON "ContactInquiry"("sourcePage");

-- CreateIndex
CREATE INDEX "PatientInquiry_createdAt_status_idx" ON "PatientInquiry"("createdAt", "status");

-- CreateIndex
CREATE INDEX "PatientInquiry_priority_createdAt_idx" ON "PatientInquiry"("priority", "createdAt");

-- CreateIndex
CREATE INDEX "PatientInquiry_email_idx" ON "PatientInquiry"("email");

-- CreateIndex
CREATE INDEX "PatientInquiry_country_idx" ON "PatientInquiry"("country");

-- CreateIndex
CREATE INDEX "PatientInquiry_sourcePage_idx" ON "PatientInquiry"("sourcePage");

-- CreateIndex
CREATE INDEX "HospitalPartnershipInquiry_createdAt_status_idx" ON "HospitalPartnershipInquiry"("createdAt", "status");

-- CreateIndex
CREATE INDEX "HospitalPartnershipInquiry_priority_createdAt_idx" ON "HospitalPartnershipInquiry"("priority", "createdAt");

-- CreateIndex
CREATE INDEX "HospitalPartnershipInquiry_email_idx" ON "HospitalPartnershipInquiry"("email");

-- CreateIndex
CREATE INDEX "HospitalPartnershipInquiry_country_idx" ON "HospitalPartnershipInquiry"("country");

-- CreateIndex
CREATE INDEX "HospitalPartnershipInquiry_sourcePage_idx" ON "HospitalPartnershipInquiry"("sourcePage");

-- CreateIndex
CREATE INDEX "UploadedFile_contactInquiryId_idx" ON "UploadedFile"("contactInquiryId");

-- CreateIndex
CREATE INDEX "UploadedFile_patientInquiryId_idx" ON "UploadedFile"("patientInquiryId");

-- CreateIndex
CREATE INDEX "UploadedFile_hospitalPartnershipInquiryId_idx" ON "UploadedFile"("hospitalPartnershipInquiryId");

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_contactInquiryId_fkey" FOREIGN KEY ("contactInquiryId") REFERENCES "ContactInquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_patientInquiryId_fkey" FOREIGN KEY ("patientInquiryId") REFERENCES "PatientInquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_hospitalPartnershipInquiryId_fkey" FOREIGN KEY ("hospitalPartnershipInquiryId") REFERENCES "HospitalPartnershipInquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

