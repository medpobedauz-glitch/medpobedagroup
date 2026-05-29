import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  BookOpen,
  BriefcaseMedical,
  Building2,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Languages,
  MessageSquareMore,
  Plane,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
  Video,
} from "lucide-react";

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

export type StatItem = {
  value: number;
  label: string;
  description: string;
  suffix?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const trustIndicators = [
  "Uzbekistan-based operations",
  "India healthcare network",
  "Hospital collaboration support",
  "International patient facilitation",
];

export const coreServices: FeatureItem[] = [
  {
    title: "International Patient Care",
    description:
      "Structured hospital coordination, treatment planning, and patient support for advanced care pathways into India.",
    icon: Plane,
    href: "/international-patient-care",
  },
  {
    title: "Hospital Partnerships",
    description:
      "Cooperation models for Uzbekistan hospitals seeking international referral, desk support, and clinical access.",
    icon: Building2,
    href: "/hospital-partnerships",
  },
  {
    title: "International Patient Support",
    description:
      "End-to-end communication, documentation guidance, and cross-border patient coordination.",
    icon: HeartHandshake,
    href: "/international-patients",
  },
  {
    title: "Doctor Collaboration",
    description:
      "Specialist introductions, case discussion pathways, and professional exchange opportunities.",
    icon: Stethoscope,
  },
  {
    title: "Telemedicine Coordination",
    description:
      "Virtual consultation workflows connecting Uzbekistan stakeholders with partner specialists in India.",
    icon: Video,
  },
  {
    title: "Student Mobility & Clinical Exposure",
    description:
      "Clinical exposure and academic mobility guidance for healthcare-focused pathways through trusted institutional channels.",
    icon: GraduationCap,
    href: "/student-mobility",
  },
];

export const medicalTourismPoints = [
  "Treatment coordination in India",
  "Hospital collaboration support in India",
  "Second opinion support",
  "Specialist consultation scheduling",
  "Surgery planning assistance",
  "Visa and travel guidance",
  "Patient attendant support",
];

export const hospitalPartnershipPoints = [
  "Patient referrals to India",
  "Specialist consultation access",
  "Doctor-to-doctor case discussions",
  "Doctor-to-doctor collaboration",
  "CME and knowledge exchange",
  "Treatment package coordination",
  "International patient desk support",
];

export const whyIndiaItems: FeatureItem[] = [
  {
    title: "Advanced Hospital Infrastructure",
    description:
      "India offers tertiary care institutions with strong multidisciplinary pathways and mature international patient units.",
    icon: Activity,
  },
  {
    title: "Experienced Specialists",
    description:
      "Patients can access deep specialty expertise across cardiology, oncology, orthopedics, transplant care, and more.",
    icon: BadgeCheck,
  },
  {
    title: "Cost-Conscious Treatment Access",
    description:
      "Treatment planning can often be aligned with international standards while remaining financially practical for families.",
    icon: FileText,
  },
  {
    title: "English-Speaking Coordination",
    description:
      "Medical teams and international desks typically operate with English-speaking coordination channels for faster communication.",
    icon: Languages,
  },
  {
    title: "Faster Specialist Access",
    description:
      "Structured referrals can accelerate access to high-demand specialties and planned procedures.",
    icon: Search,
  },
  {
    title: "Dedicated International Departments",
    description:
      "Partner institutions often have internal systems designed for documentation, airport pickup, and overseas patient flow.",
    icon: Globe2,
  },
];

export const whyPartnerItems: FeatureItem[] = [
  {
    title: "Local Presence in Uzbekistan",
    description:
      "MedPobeda Group operates from Uzbekistan and understands the local hospital, patient, and communication context.",
    icon: Building2,
  },
  {
    title: "Healthcare-Focused Leadership",
    description:
      "The company is positioned around medical collaboration and cross-border healthcare facilitation rather than generic consulting.",
    icon: BriefcaseMedical,
  },
  {
    title: "India Hospital Access",
    description:
      "The partnership model is built for practical introductions, referrals, and coordination with Indian hospital systems.",
    icon: Handshake,
  },
  {
    title: "Patient Coordination Experience",
    description:
      "Processes are designed to keep clinical communication, travel readiness, and family support aligned.",
    icon: HeartPulse,
  },
  {
    title: "Multilingual Communication",
    description:
      "Cross-border patient and stakeholder communication can be managed more smoothly across local and international touchpoints.",
    icon: MessageSquareMore,
  },
  {
    title: "End-to-End Facilitation",
    description:
      "From first inquiry to treatment planning and follow-through, the support model is built to reduce friction.",
    icon: ShieldCheck,
  },
];

export const aboutPillars: FeatureItem[] = [
  {
    title: "Healthcare Bridge Building",
    description:
      "MedPobeda Group creates structured links between Uzbekistan stakeholders and established medical institutions in India.",
    icon: Globe2,
  },
  {
    title: "Cross-Border Care Coordination",
    description:
      "The company supports patients, hospitals, and doctors with practical coordination across referrals, consultations, and logistics.",
    icon: HeartHandshake,
  },
  {
    title: "Institutional Partnership Support",
    description:
      "The focus is on sustainable hospital-to-hospital cooperation, not one-off transactions or generic lead generation.",
    icon: Users,
  },
];

export const aboutApproach: FeatureItem[] = [
  {
    title: "Trust-Led Engagement",
    description:
      "Professional communication and careful case handling are treated as essential for long-term healthcare relationships.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Clarity",
    description:
      "Each engagement is designed around transparent next steps for hospitals, patients, families, and partner institutions.",
    icon: BadgeCheck,
  },
  {
    title: "Regional Relevance",
    description:
      "The company is built for Central Asia, with an emphasis on practical local presence and international medical access.",
    icon: Building2,
  },
];

export const patientJourneyItems: FeatureItem[] = [
  {
    title: "Case Review and Referral Readiness",
    description:
      "Initial medical documents are organized so hospitals and specialists can quickly understand the case context.",
    icon: FileText,
  },
  {
    title: "Hospital and Specialist Matching",
    description:
      "Suitable departments and specialists are identified based on treatment requirements and travel practicality.",
    icon: Stethoscope,
  },
  {
    title: "Pre-Travel Planning",
    description:
      "Patients receive structured support around appointments, travel planning, and documentation preparation.",
    icon: Plane,
  },
  {
    title: "In-Country Coordination",
    description:
      "Ongoing communication can continue through treatment scheduling, family support, and hospital navigation.",
    icon: HeartHandshake,
  },
];

export const partnershipModels: FeatureItem[] = [
  {
    title: "Referral Pathway Design",
    description:
      "Hospitals can establish defined cross-border patient referral workflows with clear communication channels.",
    icon: Building2,
  },
  {
    title: "Specialist Access and Telemedicine",
    description:
      "Clinical teams can explore second opinions, teleconsultation structures, and doctor-to-doctor discussion routes.",
    icon: Video,
  },
  {
    title: "CME and Knowledge Exchange",
    description:
      "Partnerships may include academic interaction, case exchange, and professional networking opportunities.",
    icon: BookOpen,
  },
  {
    title: "International Desk Enablement",
    description:
      "Support can be structured for hospital teams developing an international patient interface or overseas referral process.",
    icon: BriefcaseMedical,
  },
];

export const patientServiceItems: FeatureItem[] = [
  {
    title: "Pre-Arrival Guidance",
    description:
      "Support with documentation, appointment structuring, and treatment-readiness planning before travel.",
    icon: FileText,
  },
  {
    title: "Second Opinions and Consultation Access",
    description:
      "Patients can be guided toward expert review and specialist discussions through partner channels.",
    icon: Stethoscope,
  },
  {
    title: "Interpreter and Communication Support",
    description:
      "Clear communication is prioritized across patients, families, hospital teams, and facilitators.",
    icon: Languages,
  },
  {
    title: "Travel and Attendant Coordination",
    description:
      "Planning support can extend to travel flow, companion needs, and hospital arrival readiness.",
    icon: Plane,
  },
];

export const mobilityItems: FeatureItem[] = [
  {
    title: "Admissions Guidance",
    description:
      "Structured support for applicants exploring health sciences and medical education pathways through partner institutions.",
    icon: GraduationCap,
  },
  {
    title: "Institutional Mobility Coordination",
    description:
      "Facilitation for mobility programs, observership-style exposure, and academic pathway planning where applicable.",
    icon: Globe2,
  },
  {
    title: "Documentation Readiness",
    description:
      "Support for collecting, organizing, and sequencing mobility-related materials in a professional way.",
    icon: BadgeCheck,
  },
  {
    title: "Family and Candidate Communication",
    description:
      "A transparent communication layer helps families and applicants understand steps, timelines, and expectations.",
    icon: Users,
  },
];

export const leadershipHighlights = [
  "Founder-led coordination model",
  "Healthcare entrepreneur based in Tashkent",
  "Focused on cross-border medical relationships",
];

export const contactHighlights: FeatureItem[] = [
  {
    title: "Partnership Discussions",
    description:
      "Suitable for hospital directors, healthcare operators, and international patient departments exploring cooperation.",
    icon: Handshake,
  },
  {
    title: "Patient Support Requests",
    description:
      "Suitable for patients and families seeking structured guidance around international treatment planning.",
    icon: HeartHandshake,
  },
  {
    title: "Academic Mobility Enquiries",
    description:
      "Suitable for institutional or candidate enquiries related to student mobility and clinical exposure coordination.",
    icon: GraduationCap,
  },
  {
    title: "Doctor Collaboration Requests",
    description:
      "Suitable for clinicians exploring second opinions, specialist dialogue, or specialist introductions.",
    icon: Syringe,
  },
];

export const homeStats: StatItem[] = [
  {
    value: 2,
    label: "Connected healthcare markets",
    description:
      "A focused bridge between Uzbekistan and India for serious cross-border care coordination.",
  },
  {
    value: 5,
    label: "Strategic service lanes",
    description:
      "Medical tourism, hospital partnerships, international collaboration, patient coordination, and student mobility.",
  },
  {
    value: 4,
    label: "Core coordination phases",
    description:
      "Review, specialist matching, travel readiness, and ongoing communication support.",
  },
  {
    value: 1,
    label: "Local Uzbekistan base",
    description:
      "A Tashkent-centered operating model for hospital engagement and patient-facing coordination.",
  },
];

export const networkHighlights: FeatureItem[] = [
  {
    title: "Uzbekistan Coordination Desk",
    description:
      "A local operating base for hospitals, patients, and institutional partners who require responsive communication.",
    icon: Building2,
  },
  {
    title: "India Hospital Access",
    description:
      "Structured access to specialist channels, referral pathways, and international patient-facing hospital systems.",
    icon: Globe2,
  },
  {
    title: "Cross-Border Clinical Collaboration",
    description:
      "Telemedicine, second opinions, specialist introductions, and doctor-to-doctor connectivity when required.",
    icon: Video,
  },
];

export const trustServiceCards: FeatureItem[] = [
  {
    title: "Patient Referrals",
    description:
      "A more structured route for hospitals and families seeking advanced treatment access through Indian medical channels.",
    icon: FileText,
  },
  {
    title: "Hospital Partnerships",
    description:
      "Partnership frameworks for referral design, international desk support, and institutional collaboration.",
    icon: Building2,
  },
  {
    title: "Telemedicine",
    description:
      "Virtual consultation pathways that reduce delay and create faster access to specialist viewpoints.",
    icon: Video,
  },
  {
    title: "Specialist Coordination",
    description:
      "Targeted matching between case requirements and suitable specialist teams or departments.",
    icon: Stethoscope,
  },
  {
    title: "International Treatment Support",
    description:
      "Practical coordination for treatment planning, travel readiness, and family-facing communication.",
    icon: HeartHandshake,
  },
  {
    title: "Student Mobility",
    description:
      "Structured institutional coordination for healthcare-focused mobility pathways.",
    icon: GraduationCap,
  },
];

export const trustPillars = [
  "Professional healthcare presentation",
  "International collaboration model",
  "Patient-centric coordination",
  "End-to-end support",
  "Confidential handling",
];

export const collaborationProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Strategic Discovery",
    description:
      "We map the hospital, patient, or institutional objective before recommending a collaboration path.",
    detail:
      "This keeps medical tourism, referral partnerships, or student mobility conversations aligned from the start.",
  },
  {
    step: "02",
    title: "Partner Matching",
    description:
      "Suitable Indian hospital channels, specialist teams, or coordination structures are identified.",
    detail:
      "The goal is to create realistic next steps rather than vague introductions or generic consulting.",
  },
  {
    step: "03",
    title: "Coordination Design",
    description:
      "Communication flow, documentation needs, timing, and stakeholder responsibilities are clarified.",
    detail:
      "This reduces friction for hospital directors, patients, family members, and international teams.",
  },
  {
    step: "04",
    title: "Ongoing Relationship Support",
    description:
      "The collaboration continues through patient movement, specialist access, and institutional follow-through.",
    detail:
      "MedPobeda Group is designed to support durable healthcare relationships, not one-time handoffs.",
  },
];

export const partnerHospitalHighlights: FeatureItem[] = [
  {
    title: "India Hospital Cooperation",
    description:
      "A practical cooperation pathway for enquiries, case routing, and specialist access where suitable.",
    icon: Building2,
  },
  {
    title: "Multi-Specialty Referral Ecosystem",
    description:
      "Support for identifying suitable departments and specialist teams across major treatment requirements.",
    icon: Activity,
  },
  {
    title: "International Patient Desk Alignment",
    description:
      "Better coordination between Uzbekistan stakeholders and Indian hospital teams handling overseas cases.",
    icon: HeartHandshake,
  },
];

export const whyBridgeMatters: FeatureItem[] = [
  {
    title: "Closer Regional Coordination",
    description:
      "A locally positioned bridge can make hospital communication, patient support, and stakeholder trust easier to manage.",
    icon: Globe2,
  },
  {
    title: "Practical Specialist Access",
    description:
      "The model helps Uzbekistan hospitals and families reach international expertise with more structure and less ambiguity.",
    icon: Search,
  },
  {
    title: "Operational Clarity for Families",
    description:
      "Patients and attendants benefit when referrals, travel readiness, and treatment information move through one coordination layer.",
    icon: BadgeCheck,
  },
];

export const coordinationWorkflow: ProcessStep[] = [
  {
    step: "01",
    title: "Medical Case Intake",
    description:
      "Initial documentation, objectives, and timeline requirements are reviewed for readiness.",
    detail:
      "This stage is designed to remove uncertainty before referrals or consultations are initiated.",
  },
  {
    step: "02",
    title: "Specialist and Hospital Routing",
    description:
      "The case is directed toward suitable specialist channels or hospital departments in India.",
    detail:
      "Where appropriate, second-opinion options and specialist review can be explored before travel.",
  },
  {
    step: "03",
    title: "Travel and Treatment Preparation",
    description:
      "Scheduling, coordination readiness, and attendant planning are aligned with the hospital process.",
    detail:
      "The objective is to make international treatment movement feel more deliberate and less fragmented.",
  },
  {
    step: "04",
    title: "Follow-Through and Communication",
    description:
      "Ongoing support continues as patients, hospitals, and families require updates or coordination.",
    detail:
      "This includes confidentiality-aware communication across local and international stakeholders.",
  },
];

export const leadershipVisionPoints = [
  "Build a high-trust healthcare bridge between Uzbekistan and India.",
  "Support institutions and patients with coordinated, hospital-ready execution.",
  "Position MedPobeda Group as a serious international healthcare partner from Central Asia.",
];

export const innovationVisionItems: FeatureItem[] = [
  {
    title: "Specialist-Ready Collaboration",
    description:
      "Healthcare collaboration should include faster specialist connectivity and structured consultation pathways where appropriate.",
    icon: Video,
  },
  {
    title: "Confidential Case Handling",
    description:
      "International coordination must treat patient information, institutional communication, and medical records with care.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Institutional Relationships",
    description:
      "The strongest healthcare bridges are built through repeatable processes, trusted communication, and durable partnerships.",
    icon: Users,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "How does MedPobeda Group support hospital partnerships?",
    answer:
      "MedPobeda Group helps hospitals explore referral pathways, specialist access, doctor collaboration, and international patient desk support with Indian healthcare partners.",
  },
  {
    question: "Can MedPobeda Group assist with treatment coordination in India?",
    answer:
      "Yes. The coordination model can include case review readiness, specialist matching, second opinion access, travel guidance, and practical support around international treatment flow.",
  },
  {
    question: "How are patient documents and case details handled?",
    answer:
      "The process is designed around careful case organization and confidentiality-aware communication so that information can move more cleanly between stakeholders.",
  },
  {
    question: "Is remote specialist coordination part of the collaboration model?",
    answer:
      "Yes. Remote specialist coordination and second-opinion pathways can be part of the model when they are operationally useful for hospitals or patients.",
  },
  {
    question: "Does MedPobeda Group also support student mobility?",
    answer:
      "Yes. Student mobility remains a focused part of the public offering, positioned around clinical exposure and institutional coordination rather than mass-market recruiting.",
  },
  {
    question: "Does MedPobeda Group guarantee medical outcomes?",
    answer:
      "No. The company facilitates coordination, communication, and access. Clinical decisions and treatment outcomes remain the responsibility of the treating medical institutions and professionals.",
  },
];

export const countriesWeOperateIn = [
  {
    name: "Uzbekistan",
    label: "Local Coordination Base",
    description:
      "Hospital engagement, stakeholder communication, and patient-facing coordination anchored in Tashkent.",
  },
  {
    name: "India",
    label: "Destination Healthcare Network",
    description:
      "Specialist access, treatment pathways, and hospital collaboration through established medical channels.",
  },
  {
    name: "Central Asia",
    label: "Regional Healthcare Context",
    description:
      "A wider operating perspective for cross-border patient movement, partnerships, and healthcare collaboration.",
  },
];

export const stakeholderPerspectives = [
  {
    quote:
      "Hospital leaders want a coordination partner that understands both institutional expectations and patient movement realities.",
    role: "Hospital Leadership Perspective",
    context: "Illustrative of the priorities hospital directors typically bring into international partnership discussions.",
  },
  {
    quote:
      "Families value clarity, confidentiality, and a single communication layer when treatment planning moves across borders.",
    role: "Patient-Family Perspective",
    context: "Reflects the operational needs patients and attendants usually care about most during international treatment planning.",
  },
  {
    quote:
      "International healthcare relationships work best when the local stakeholder remains central to the process rather than being bypassed.",
    role: "Institutional Collaboration Perspective",
    context: "Represents the kind of structure serious healthcare institutions expect from a cross-border coordination model.",
  },
];

export const serviceArchitectureItems: FeatureItem[] = [
  {
    title: "International Patient Care Services",
    description:
      "Structured case intake, specialist matching, travel readiness, and treatment support for international patients seeking care in India.",
    icon: Plane,
    href: "/international-patient-care",
  },
  {
    title: "Hospital Partnership Models",
    description:
      "Referral design, international desk support, and institutional collaboration frameworks.",
    icon: Building2,
    href: "/hospital-partnerships",
  },
  {
    title: "International Patient Assistance",
    description:
      "Second opinions, documentation guidance, attendant support, and smoother communication across borders.",
    icon: HeartHandshake,
    href: "/international-patients",
  },
  {
    title: "Student Mobility Support",
    description:
      "Healthcare-focused institutional coordination for serious student mobility enquiries.",
    icon: GraduationCap,
    href: "/student-mobility",
  },
  {
    title: "Telemedicine Coordination",
    description:
      "Practical virtual consultation pathways to reduce friction before travel or between hospital stakeholders.",
    icon: Video,
  },
  {
    title: "Doctor Collaboration",
    description:
      "Structured routes for specialist introductions, second opinions, and professional healthcare exchange.",
    icon: Stethoscope,
  },
];
