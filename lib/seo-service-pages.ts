/**
 * SEO Service Pages Configuration
 * Defines all SEO landing pages with content structure
 * Used to dynamically generate pages in /services/[slug]
 */

export interface SeoServicePageData {
  id: string;
  slug: string;
  region?: string; // For region-specific pages
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string;
  introPoints: string[];
  whoThisIsFor: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  servicesIncluded: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  processSteps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  trustNotes: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedPages: Array<{
    slug: string;
    title: string;
  }>;
  disclaimerText?: string;
}

export const seoServicePages: SeoServicePageData[] = [
  {
    id: "med-tourism-uz-india",
    slug: "medical-tourism-from-uzbekistan-to-india",
    region: "Uzbekistan",
    metaTitle: "Medical Tourism from Uzbekistan to India | MedPobeda Group",
    metaDescription:
      "MedPobeda Group supports patients and families in Uzbekistan with structured medical tourism assistance, hospital appointment planning, travel guidance, interpreter support, and India treatment inquiry coordination from Tashkent.",
    keywords: [
      "medical tourism from Uzbekistan to India",
      "India treatment assistance from Uzbekistan",
      "hospital appointment support India Uzbekistan",
      "international patient support Uzbekistan",
      "medical tourism Tashkent",
      "India hospital referral Uzbekistan",
    ],
    heroTitle: "Medical Tourism from Uzbekistan to India",
    heroSubtitle: "Structured coordination for treatment planning and hospital communication",
    introTitle: "Coordinated Healthcare Support from Uzbekistan to India",
    introText:
      "MedPobeda Group MCHJ helps patients and families in Uzbekistan navigate medical treatment inquiries with India-based hospitals. We provide structured communication, hospital guidance, travel preparation, and multilingual support throughout your healthcare journey.",
    introPoints: [
      "Hospital and specialist matching assistance",
      "Medical document review and routing",
      "Travel and visa guidance",
      "Interpreter and accommodation support",
      "Follow-up communication coordination",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Those seeking treatment options, second opinions, or specialist consultations in India",
      },
      {
        icon: "Building",
        title: "Local Hospitals",
        description: "Healthcare institutions needing structured India referral pathways",
      },
      {
        icon: "Globe",
        title: "Healthcare Coordinators",
        description: "Organizations supporting patient journeys across borders",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Patient Inquiry Handling",
        description: "Initial assessment and documentation of healthcare needs",
      },
      {
        icon: "Users",
        title: "Hospital & Doctor Matching",
        description: "Guidance on suitable hospitals and specialties based on your case",
      },
      {
        icon: "FileCheck",
        title: "Medical Document Routing",
        description: "Organization of reports, scans, and summaries for hospital review",
      },
      {
        icon: "MessageSquare",
        title: "Hospital Communication",
        description: "Structured inquiry submission and appointment coordination",
      },
      {
        icon: "Plane",
        title: "Travel Preparation",
        description: "Guidance on travel timing, visa requirements, and logistics",
      },
      {
        icon: "MessageCircle",
        title: "Interpreter Support",
        description: "Multilingual guidance and communication assistance",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Submit Your Inquiry",
        description: "Share your healthcare needs, medical background, and treatment preferences",
      },
      {
        number: 2,
        title: "Medical Review",
        description: "MedPobeda Group reviews your case and discusses relevant treatment options",
      },
      {
        number: 3,
        title: "Hospital Selection",
        description: "Guidance on suitable hospitals and specialists based on your needs",
      },
      {
        number: 4,
        title: "Document Organization",
        description: "Prepare and organize medical reports for hospital submission",
      },
      {
        number: 5,
        title: "Hospital Inquiry",
        description: "MedPobeda Group submits your inquiry to the selected hospital",
      },
      {
        number: 6,
        title: "Hospital Response",
        description: "Receive guidance on hospital feedback and next steps",
      },
      {
        number: 7,
        title: "Travel Planning",
        description: "Plan travel dates, accommodation, and visa requirements",
      },
      {
        number: 8,
        title: "Appointment Support",
        description: "Appointment coordination and pre-visit guidance",
      },
    ],
    trustNotes: [
      "Tashkent-based healthcare coordination team",
      "Support for patients, families, and healthcare institutions",
      "Multilingual assistance (English, Uzbek, Russian, and more)",
      "Transparent communication and ethical healthcare guidance",
      "Focus on patient safety and informed decision-making",
    ],
    faqs: [
      {
        question: "How long does the medical tourism coordination process take?",
        answer:
          "The timeline varies based on your specific case and hospital response times. Initial inquiry to hospital response typically takes 2-4 weeks. Treatment planning and travel arrangements depend on your case complexity and preferred hospital schedules.",
      },
      {
        question: "Does MedPobeda Group provide medical advice?",
        answer:
          "No. MedPobeda Group provides coordination support only. Medical advice, diagnosis, and treatment decisions are made exclusively by licensed healthcare professionals and hospitals. We help facilitate communication between you and medical providers.",
      },
      {
        question: "Can MedPobeda Group help if I already have a hospital in mind?",
        answer:
          "Yes. If you have already selected a hospital or specialist, we can help with document organization, inquiry submission, appointment coordination, and travel planning support.",
      },
      {
        question: "What documents do I need to share?",
        answer:
          "Typically, medical reports, imaging results, test reports, and relevant medical history are helpful. We can guide you on which documents are most important to organize first. You should only share documents necessary for the inquiry review.",
      },
      {
        question: "Does MedPobeda Group guarantee hospital acceptance or treatment outcomes?",
        answer:
          "No. Hospital acceptance, treatment recommendations, and medical outcomes depend on the hospital's review and the licensed medical professionals involved. MedPobeda Group provides coordination support, not medical guarantees.",
      },
      {
        question: "Is there a cost for using MedPobeda Group services?",
        answer:
          "Contact us for information about service fees and coordination options. We work with patients, families, and institutions on a case-by-case basis.",
      },
    ],
    relatedPages: [
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support in Tashkent" },
      { slug: "india-hospital-referral-assistance", title: "India Hospital Referral Assistance" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Medical Interpreter Support" },
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "India-Uzbekistan Healthcare Collaboration" },
    ],
  },
  {
    id: "med-tourism-ky-india",
    slug: "medical-tourism-from-kyrgyzstan-to-india",
    region: "Kyrgyzstan",
    metaTitle: "Medical Tourism from Kyrgyzstan to India | MedPobeda Group",
    metaDescription:
      "MedPobeda Group supports patients in Kyrgyzstan with medical tourism coordination, hospital referral assistance, treatment planning, and India healthcare communication from Tashkent.",
    keywords: [
      "medical tourism from Kyrgyzstan to India",
      "India treatment support from Kyrgyzstan",
      "hospital assistance India Kyrgyzstan",
      "international patient support Kyrgyzstan",
      "Kyrgyzstan medical tourism",
    ],
    heroTitle: "Medical Tourism from Kyrgyzstan to India",
    heroSubtitle: "Professional coordination for Kyrgyz patients seeking healthcare in India",
    introTitle: "Healthcare Coordination for Patients in Kyrgyzstan",
    introText:
      "MedPobeda Group helps patients and families in Kyrgyzstan access quality healthcare through structured communication with India-based hospitals. From initial inquiry to treatment coordination, we provide professional guidance tailored for Kyrgyz patients.",
    introPoints: [
      "Central Asian healthcare communication bridge",
      "Structured hospital matching and appointment coordination",
      "Multilingual support in English, Russian, Kyrgyz, and more",
      "Medical document organization and review",
      "Travel and visa assistance",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Kyrgyz patients seeking specialized treatment or second medical opinions",
      },
      {
        icon: "Building",
        title: "Local Healthcare Providers",
        description: "Hospitals and clinics needing India referral pathways",
      },
      {
        icon: "Building",
        title: "Medical Institutions",
        description: "Universities and medical organizations supporting student mobility",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Inquiry Processing",
        description: "Structured intake of your healthcare needs and medical background",
      },
      {
        icon: "Users",
        title: "Hospital Guidance",
        description: "Support in selecting appropriate hospitals and specialists",
      },
      {
        icon: "MessageSquare",
        title: "Communication Support",
        description: "Multilingual assistance throughout the inquiry process",
      },
      {
        icon: "FileCheck",
        title: "Document Management",
        description: "Organization of medical records for hospital submission",
      },
      {
        icon: "Globe",
        title: "Visa & Travel Support",
        description: "Guidance on travel documentation and logistics",
      },
      {
        icon: "MessageCircle",
        title: "Ongoing Coordination",
        description: "Follow-up communication and appointment support",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Initial Inquiry",
        description: "Submit your healthcare needs and treatment preferences",
      },
      {
        number: 2,
        title: "Case Review",
        description: "MedPobeda Group assesses your case and discusses options",
      },
      {
        number: 3,
        title: "Hospital Selection",
        description: "Identify suitable hospitals and medical specialists",
      },
      {
        number: 4,
        title: "Document Preparation",
        description: "Organize medical records for hospital submission",
      },
      {
        number: 5,
        title: "Hospital Submission",
        description: "Submit your inquiry to selected hospitals",
      },
      {
        number: 6,
        title: "Response Guidance",
        description: "Explain hospital feedback and next steps",
      },
      {
        number: 7,
        title: "Travel Coordination",
        description: "Plan travel, visa, and accommodation needs",
      },
      {
        number: 8,
        title: "Pre-visit Support",
        description: "Appointment coordination and pre-travel guidance",
      },
    ],
    trustNotes: [
      "Experienced with Kyrgyz patients and Central Asian healthcare coordination",
      "Multilingual team fluent in English, Russian, and Kyrgyz",
      "Trusted by patients across Central Asia",
      "Ethical and transparent healthcare facilitation",
      "Focus on patient safety and informed choices",
    ],
    faqs: [
      {
        question: "Can MedPobeda Group help Kyrgyz patients access Indian hospitals?",
        answer:
          "Yes. We specialize in coordinating inquiries from Kyrgyzstan and other Central Asian countries to India-based hospitals. We handle communication, document organization, and coordination support.",
      },
      {
        question: "What languages does MedPobeda Group support?",
        answer:
          "We support English, Russian, Kyrgyz, Uzbek, Kazakh, Tajik, and Turkmen. All communication can be conducted in your preferred language.",
      },
      {
        question: "How does the inquiry process work for Kyrgyz patients?",
        answer:
          "You submit your healthcare needs, we review your case, identify suitable hospitals, organize your medical documents, submit your inquiry, and guide you through the hospital's response. Throughout, we provide multilingual support.",
      },
      {
        question: "Are there restrictions on which patients can inquire?",
        answer:
          "No specific restrictions. Patients of any age, condition, or medical history can submit inquiries. However, hospital acceptance depends on each hospital's capabilities and their assessment of your case.",
      },
      {
        question: "Can families and companions be included in communications?",
        answer:
          "Yes. Families and companions can be involved in discussions and updates. We support family-centered communication throughout the coordination process.",
      },
      {
        question: "What is the cost for medical tourism coordination?",
        answer:
          "Contact us directly for information about service fees. Costs vary based on the complexity of your case and specific services requested.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-kazakhstan-to-india", title: "Medical Tourism from Kazakhstan to India" },
      { slug: "india-hospital-referral-assistance", title: "India Hospital Referral Assistance" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Interpreter Support Services" },
    ],
  },
  {
    id: "med-tourism-kz-india",
    slug: "medical-tourism-from-kazakhstan-to-india",
    region: "Kazakhstan",
    metaTitle: "Medical Tourism from Kazakhstan to India | MedPobeda Group",
    metaDescription:
      "Professional medical tourism coordination for Kazakhstan patients. MedPobeda Group helps with hospital referrals, treatment planning, and India healthcare communication from Tashkent.",
    keywords: [
      "medical tourism from Kazakhstan to India",
      "India hospital referral assistance Kazakhstan",
      "international patient support Kazakhstan",
      "medical tourism Kazakhstan",
      "India treatment from Kazakhstan",
    ],
    heroTitle: "Medical Tourism from Kazakhstan to India",
    heroSubtitle: "Trusted healthcare coordination for Kazakh patients and families",
    introTitle: "Healthcare Coordination for Kazakhstan Patients",
    introText:
      "MedPobeda Group provides comprehensive medical tourism support for patients in Kazakhstan seeking treatment in India. We facilitate hospital communication, document coordination, travel planning, and multilingual guidance every step of the way.",
    introPoints: [
      "Professional hospital and specialist matching",
      "Structured medical document preparation and submission",
      "Bilingual and multilingual communication support",
      "Travel, visa, and accommodation guidance",
      "Appointment coordination and follow-up support",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Kazakh patients seeking specialized medical treatment or second opinions",
      },
      {
        icon: "Building",
        title: "Healthcare Institutions",
        description: "Hospitals and clinics supporting patient referrals to India",
      },
      {
        icon: "Globe",
        title: "Medical Coordinators",
        description: "Healthcare organizations facilitating cross-border patient journeys",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Case Assessment",
        description: "Comprehensive review of your healthcare needs and medical history",
      },
      {
        icon: "Users",
        title: "Hospital Matching",
        description: "Identification of appropriate hospitals and specialist doctors",
      },
      {
        icon: "FileCheck",
        title: "Document Organization",
        description: "Professional preparation of medical records for hospital submission",
      },
      {
        icon: "MessageSquare",
        title: "Inquiry Coordination",
        description: "Professional communication with hospitals on your behalf",
      },
      {
        icon: "Plane",
        title: "Travel Planning",
        description: "Guidance on travel dates, visa, and accommodation logistics",
      },
      {
        icon: "MessageCircle",
        title: "Ongoing Support",
        description: "Continuous coordination until your appointment and beyond",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Submit Inquiry",
        description: "Share your healthcare needs and medical background",
      },
      {
        number: 2,
        title: "Case Review",
        description: "MedPobeda Group reviews your case and treatment options",
      },
      {
        number: 3,
        title: "Hospital Selection",
        description: "Identify suitable hospitals and medical specialists",
      },
      {
        number: 4,
        title: "Prepare Documents",
        description: "Organize and prepare medical records for submission",
      },
      {
        number: 5,
        title: "Hospital Inquiry",
        description: "Submit your case to selected hospitals",
      },
      {
        number: 6,
        title: "Review Response",
        description: "Discuss hospital feedback and recommendations",
      },
      {
        number: 7,
        title: "Plan Travel",
        description: "Organize travel, visa, and accommodation needs",
      },
      {
        number: 8,
        title: "Appointment Support",
        description: "Finalize appointments and pre-visit preparation",
      },
    ],
    trustNotes: [
      "Established coordination with Kazakhstan's healthcare sector",
      "Fluent in Kazakh, Russian, and English",
      "Support for individual patients and institutional referrals",
      "Transparent and ethical healthcare facilitation",
      "Patient-centered approach to medical coordination",
    ],
    faqs: [
      {
        question: "Can patients from other regions of Kazakhstan access these services?",
        answer:
          "Yes. Whether you are from Almaty, Astana, Karaganda, or any other region of Kazakhstan, we support medical tourism inquiries. Communication can be conducted remotely throughout the coordination process.",
      },
      {
        question: "What types of medical cases does MedPobeda Group help with?",
        answer:
          "We help with a wide range of medical cases including oncology, cardiology, orthopedics, neurosurgery, transplants, cosmetic surgery, and many other specialties. Each case is assessed individually.",
      },
      {
        question: "How long does it take to get a response from hospitals?",
        answer:
          "Hospital response times vary. Initial responses typically arrive within 2-4 weeks, but some cases may take longer depending on case complexity and hospital caseload.",
      },
      {
        question: "Can I cancel or change my hospital selection?",
        answer:
          "Yes. You can modify your hospital selection at any point before the final commitment. We can help reassess and select alternative hospitals if needed.",
      },
      {
        question: "What if the hospital declines my inquiry?",
        answer:
          "If a hospital is unable to help, we can discuss alternative hospitals and specialties. Multiple hospital inquiries can be submitted simultaneously for broader options.",
      },
      {
        question: "How does payment for hospital services work?",
        answer:
          "Hospital fees are determined directly by the hospital based on your treatment plan. MedPobeda Group can provide guidance on typical cost structures, but all hospital payments are made directly to the hospital.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan to India" },
      { slug: "medical-tourism-from-kyrgyzstan-to-india", title: "Medical Tourism from Kyrgyzstan to India" },
      { slug: "india-hospital-referral-assistance", title: "India Hospital Referral Assistance" },
      { slug: "student-mobility-support-in-uzbekistan", title: "Student Mobility Support" },
    ],
  },
  {
    id: "med-tourism-tj-india",
    slug: "medical-tourism-from-tajikistan-to-india",
    region: "Tajikistan",
    metaTitle: "Medical Tourism from Tajikistan to India | MedPobeda Group",
    metaDescription:
      "MedPobeda Group supports patients in Tajikistan with medical tourism coordination, hospital referrals, treatment planning, and India healthcare assistance from Tashkent.",
    keywords: [
      "medical tourism from Tajikistan to India",
      "India treatment assistance Tajikistan",
      "hospital appointment support Tajikistan India",
      "international patient support Tajikistan",
      "Tajikistan medical tourism",
    ],
    heroTitle: "Medical Tourism from Tajikistan to India",
    heroSubtitle: "Professional healthcare coordination for Tajik patients",
    introTitle: "Healthcare Coordination for Tajikistan Patients",
    introText:
      "MedPobeda Group helps patients and families in Tajikistan access quality healthcare through coordinated communication with India-based hospitals. We provide structured support from initial inquiry through treatment planning and appointment coordination.",
    introPoints: [
      "Hospital and specialist identification",
      "Multilingual coordination and communication",
      "Medical document review and organization",
      "Travel and visa guidance",
      "Comprehensive follow-up support",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Tajik patients seeking specialized treatment or medical expertise",
      },
      {
        icon: "Building",
        title: "Healthcare Providers",
        description: "Hospitals and clinics supporting international patient referrals",
      },
      {
        icon: "Globe",
        title: "Health Organizations",
        description: "Medical institutions facilitating cross-border healthcare access",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Inquiry Intake",
        description: "Detailed assessment of your healthcare needs and medical profile",
      },
      {
        icon: "Users",
        title: "Specialist Matching",
        description: "Identification of appropriate medical specialists and hospitals",
      },
      {
        icon: "FileCheck",
        title: "Medical Records",
        description: "Professional organization of documents for hospital review",
      },
      {
        icon: "MessageSquare",
        title: "Hospital Communication",
        description: "Professional inquiry submission and correspondence",
      },
      {
        icon: "Plane",
        title: "Travel Assistance",
        description: "Guidance on travel planning, visas, and accommodation",
      },
      {
        icon: "MessageCircle",
        title: "Appointment Coordination",
        description: "Support in scheduling and preparing for hospital visits",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Submit Your Case",
        description: "Provide healthcare needs and treatment preferences",
      },
      {
        number: 2,
        title: "Initial Assessment",
        description: "MedPobeda Group reviews your case details",
      },
      {
        number: 3,
        title: "Hospital Selection",
        description: "Identify suitable hospitals and medical specialists",
      },
      {
        number: 4,
        title: "Document Preparation",
        description: "Organize medical records for hospital submission",
      },
      {
        number: 5,
        title: "Hospital Submission",
        description: "Submit your inquiry professionally",
      },
      {
        number: 6,
        title: "Hospital Feedback",
        description: "Receive and discuss hospital recommendations",
      },
      {
        number: 7,
        title: "Travel Planning",
        description: "Arrange travel, visa, and logistics",
      },
      {
        number: 8,
        title: "Final Coordination",
        description: "Appointment confirmation and pre-visit support",
      },
    ],
    trustNotes: [
      "Experienced coordination with Tajikistan healthcare sector",
      "Fluent in English, Russian, and Tajik",
      "Support for individual and institutional cases",
      "Transparent healthcare facilitation",
      "Commitment to patient safety and informed decision-making",
    ],
    faqs: [
      {
        question: "How does MedPobeda Group help Tajik patients access Indian hospitals?",
        answer:
          "We provide comprehensive coordination including hospital identification, document preparation, professional inquiry submission, response guidance, and travel planning support.",
      },
      {
        question: "What languages are supported?",
        answer:
          "We support English, Russian, Tajik, Uzbek, and other Central Asian languages, ensuring clear communication throughout the process.",
      },
      {
        question: "Can I submit inquiries to multiple hospitals at once?",
        answer:
          "Yes. You can simultaneously explore options with multiple hospitals. This gives you broader choices and comparative options for your treatment planning.",
      },
      {
        question: "What if I have limited medical documentation?",
        answer:
          "Contact us to discuss what you have available. Many inquiries can begin with basic information, and additional documentation can be requested by hospitals as needed.",
      },
      {
        question: "Does MedPobeda Group cover travel and accommodation costs?",
        answer:
          "No. MedPobeda Group provides guidance on travel planning and logistics. Travel and accommodation costs are your responsibility and are separate from hospital fees.",
      },
      {
        question: "Is there ongoing support after the hospital appointment is scheduled?",
        answer:
          "Yes. We provide pre-visit guidance, appointment confirmation, and can support communication with the hospital until your visit and beyond if needed.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan to India" },
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "Healthcare Collaboration" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Interpreter Support" },
    ],
  },
  {
    id: "med-tourism-tm-india",
    slug: "medical-tourism-from-turkmenistan-to-india",
    region: "Turkmenistan",
    metaTitle: "Medical Tourism from Turkmenistan to India | MedPobeda Group",
    metaDescription:
      "Healthcare coordination for patients in Turkmenistan. MedPobeda Group provides medical tourism support, hospital referrals, and India treatment assistance from Tashkent.",
    keywords: [
      "medical tourism from Turkmenistan to India",
      "India treatment support Turkmenistan",
      "international patient coordination Turkmenistan India",
      "medical tourism Turkmenistan",
      "healthcare coordination Ashgabat",
    ],
    heroTitle: "Medical Tourism from Turkmenistan to India",
    heroSubtitle: "Professional healthcare coordination for Turkmen patients and families",
    introTitle: "Healthcare Coordination for Turkmenistan Patients",
    introText:
      "MedPobeda Group provides comprehensive medical tourism coordination for patients in Turkmenistan seeking healthcare in India. Our Tashkent-based team offers professional support, multilingual communication, and structured hospital coordination.",
    introPoints: [
      "Professional hospital and specialist guidance",
      "Medical document preparation and submission",
      "Multilingual coordination support",
      "Travel planning and visa assistance",
      "Appointment coordination and follow-up",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Turkmen patients seeking specialized medical treatment",
      },
      {
        icon: "Building",
        title: "Medical Institutions",
        description: "Hospitals supporting international patient referrals",
      },
      {
        icon: "Globe",
        title: "Healthcare Organizations",
        description: "Institutions facilitating cross-border patient journeys",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Case Intake",
        description: "Comprehensive review of healthcare needs and medical background",
      },
      {
        icon: "Users",
        title: "Hospital Guidance",
        description: "Support in identifying appropriate hospitals and specialists",
      },
      {
        icon: "FileCheck",
        title: "Document Coordination",
        description: "Organization and preparation of medical records",
      },
      {
        icon: "MessageSquare",
        title: "Professional Inquiries",
        description: "Professional submission and communication with hospitals",
      },
      {
        icon: "Plane",
        title: "Travel Support",
        description: "Guidance on travel arrangements and logistics",
      },
      {
        icon: "MessageCircle",
        title: "Ongoing Coordination",
        description: "Continuous support through appointment and beyond",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Submit Inquiry",
        description: "Share your healthcare needs and medical information",
      },
      {
        number: 2,
        title: "Case Review",
        description: "MedPobeda Group assesses your case and options",
      },
      {
        number: 3,
        title: "Hospital Selection",
        description: "Identify suitable hospitals and specialists",
      },
      {
        number: 4,
        title: "Prepare Documents",
        description: "Organize medical records for hospital submission",
      },
      {
        number: 5,
        title: "Submit Inquiry",
        description: "Professional hospital communication",
      },
      {
        number: 6,
        title: "Discuss Response",
        description: "Review hospital recommendations and next steps",
      },
      {
        number: 7,
        title: "Arrange Travel",
        description: "Plan travel logistics and visas",
      },
      {
        number: 8,
        title: "Finalize Appointment",
        description: "Appointment confirmation and pre-visit preparation",
      },
    ],
    trustNotes: [
      "Established healthcare coordination network",
      "Fluent in Turkmen, Russian, and English",
      "Support for individual and institutional inquiries",
      "Transparent and ethical approach",
      "Patient-centered healthcare facilitation",
    ],
    faqs: [
      {
        question: "Can patients from Ashgabat and other Turkmen cities use MedPobeda Group?",
        answer:
          "Yes. Whether you are from Ashgabat, Turkmenabat, Balkanabat, or any other city in Turkmenistan, we provide the same professional coordination services.",
      },
      {
        question: "What makes MedPobeda Group suitable for Turkmen patients?",
        answer:
          "We are based in Tashkent and have direct relationships with Indian hospitals. We speak Turkmen, Russian, and English, and understand the healthcare needs of patients across Central Asia.",
      },
      {
        question: "How is confidentiality maintained during the coordination process?",
        answer:
          "Your medical information is treated with complete confidentiality. We only share information necessary for hospital inquiry and with your explicit permission.",
      },
      {
        question: "Can family members be included in the coordination?",
        answer:
          "Yes. Family members and companions can be involved in all communications and coordination. We support family-centered healthcare decision-making.",
      },
      {
        question: "What happens if I decide not to proceed after hospital initial contact?",
        answer:
          "You can cancel your inquiry at any time. There is no obligation to proceed, and you have full control over your healthcare decisions.",
      },
      {
        question: "Is there additional support after the hospital visit is completed?",
        answer:
          "Yes. We can provide follow-up coordination, help with ongoing communication, and assist with any additional healthcare needs that may arise.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan" },
      { slug: "india-hospital-referral-assistance", title: "Hospital Referral Assistance" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Interpreter Services" },
    ],
  },
  {
    id: "intl-patient-tashkent",
    slug: "international-patient-support-in-tashkent",
    metaTitle: "International Patient Support in Tashkent | MedPobeda Group",
    metaDescription:
      "Professional international patient coordination services in Tashkent. MedPobeda Group provides hospital communication, treatment planning, and healthcare support for patients worldwide.",
    keywords: [
      "international patient support in Tashkent",
      "medical tourism coordination Tashkent",
      "patient assistance Uzbekistan",
      "healthcare support Tashkent",
      "international patient services",
    ],
    heroTitle: "International Patient Support in Tashkent",
    heroSubtitle: "Professional healthcare coordination from our Tashkent office",
    introTitle: "Comprehensive International Patient Support Services",
    introText:
      "MedPobeda Group's Tashkent office provides comprehensive support for international patients seeking healthcare coordination. Whether you are traveling to India, seeking specialist consultation, or need interpreter assistance, we are here to support your healthcare journey.",
    introPoints: [
      "Hospital and specialist identification",
      "Medical document management",
      "Professional multilingual interpretation",
      "Travel and accommodation guidance",
      "Appointment coordination and follow-up",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "International Patients",
        description: "Patients from Central Asia seeking healthcare in India or other countries",
      },
      {
        icon: "Globe",
        title: "Patient Families",
        description: "Family members seeking support for relatives undergoing treatment",
      },
      {
        icon: "Building",
        title: "Healthcare Referral Partners",
        description: "Hospitals and clinics referring international patients",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Patient Intake",
        description: "Comprehensive assessment of healthcare needs and requirements",
      },
      {
        icon: "Users",
        title: "Provider Matching",
        description: "Identification of suitable hospitals and medical specialists",
      },
      {
        icon: "FileCheck",
        title: "Document Management",
        description: "Professional organization of medical records and reports",
      },
      {
        icon: "MessageSquare",
        title: "Hospital Liaison",
        description: "Professional communication with healthcare providers",
      },
      {
        icon: "MessageCircle",
        title: "Interpretation Services",
        description: "Multilingual interpretation for patient-provider communication",
      },
      {
        icon: "Plane",
        title: "Travel Logistics",
        description: "Assistance with travel planning, visas, and accommodation",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Initial Consultation",
        description: "Meet with our team to discuss your healthcare needs",
      },
      {
        number: 2,
        title: "Needs Assessment",
        description: "Comprehensive review of your medical and travel requirements",
      },
      {
        number: 3,
        title: "Provider Selection",
        description: "Identify appropriate hospitals and specialists",
      },
      {
        number: 4,
        title: "Coordination Planning",
        description: "Develop comprehensive support plan",
      },
      {
        number: 5,
        title: "Hospital Submission",
        description: "Submit inquiry with organized medical records",
      },
      {
        number: 6,
        title: "Response Management",
        description: "Receive and explain hospital recommendations",
      },
      {
        number: 7,
        title: "Travel Arrangement",
        description: "Coordinate travel, visas, and accommodation",
      },
      {
        number: 8,
        title: "On-site Support",
        description: "In-person support and interpretation services",
      },
    ],
    trustNotes: [
      "Tashkent-based office with local presence",
      "Multilingual staff with healthcare expertise",
      "Direct relationships with international hospitals",
      "Comprehensive patient-centered approach",
      "Transparent and ethical healthcare facilitation",
    ],
    faqs: [
      {
        question: "Does MedPobeda Group provide services directly in Tashkent?",
        answer:
          "Yes. Our main office is in Tashkent. We provide in-person consultations, interpretation services, and local support for patients and their families.",
      },
      {
        question: "What types of medical cases do you support?",
        answer:
          "We support a wide range of specialties including oncology, cardiology, orthopedics, neurosurgery, cosmetic surgery, and many others. Each case is assessed individually.",
      },
      {
        question: "Can you provide interpretation services?",
        answer:
          "Yes. We provide professional medical interpretation in multiple languages including English, Russian, Uzbek, Kyrgyz, Kazakh, Tajik, and Turkmen.",
      },
      {
        question: "Do you assist with accommodation in Tashkent?",
        answer:
          "We provide guidance on accommodation options in Tashkent. For accommodation during hospital treatment abroad, we provide recommendations and support in planning.",
      },
      {
        question: "Is there a consultation fee?",
        answer:
          "Initial consultations are available. Contact us for information about consultation fees and service structures.",
      },
      {
        question: "Can family members join in consultations?",
        answer:
          "Yes. We encourage family involvement in consultations and coordination to ensure all decision-makers are informed and comfortable with the plan.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan to India" },
      { slug: "india-hospital-referral-assistance", title: "Hospital Referral Assistance" },
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "India-Uzbekistan Collaboration" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Medical Interpreter Support" },
    ],
  },
  {
    id: "hosp-partnerships-uz",
    slug: "hospital-partnerships-in-uzbekistan",
    metaTitle: "Hospital Partnerships in Uzbekistan | MedPobeda Group",
    metaDescription:
      "MedPobeda Group facilitates hospital partnerships between Uzbek healthcare institutions and international medical providers. Professional partnership development and referral pathway support.",
    keywords: [
      "hospital partnerships in Uzbekistan",
      "healthcare partnership Uzbekistan",
      "medical tourism hospital partnership Tashkent",
      "hospital referral pathway Uzbekistan",
      "international healthcare partnerships",
    ],
    heroTitle: "Hospital Partnerships in Uzbekistan",
    heroSubtitle: "Structured support for Uzbek hospitals seeking international healthcare partnerships",
    introTitle: "Healthcare Partnership Development & Support",
    introText:
      "MedPobeda Group helps Uzbek healthcare institutions establish and develop partnerships with international medical providers. From referral pathway development to institutional dialogue, we facilitate structured collaboration.",
    introPoints: [
      "Hospital-to-hospital partnership facilitation",
      "Referral pathway development",
      "International healthcare network expansion",
      "Patient referral coordination",
      "Institutional cooperation support",
    ],
    whoThisIsFor: [
      {
        icon: "Building",
        title: "Uzbek Hospitals",
        description: "Healthcare institutions seeking international partnerships and referral pathways",
      },
      {
        icon: "Globe",
        title: "International Hospitals",
        description: "International healthcare providers seeking partnerships in Uzbekistan",
      },
      {
        icon: "Users",
        title: "Healthcare Networks",
        description: "Healthcare organizations developing cross-border collaboration",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Partnership Assessment",
        description: "Evaluation of partnership goals and institutional capabilities",
      },
      {
        icon: "Users",
        title: "Partner Matching",
        description: "Identification of compatible international healthcare partners",
      },
      {
        icon: "MessageSquare",
        title: "Institutional Liaison",
        description: "Professional communication between partnering institutions",
      },
      {
        icon: "FileCheck",
        title: "Referral Development",
        description: "Structured development of referral pathways",
      },
      {
        icon: "Globe",
        title: "Network Expansion",
        description: "Support in building international healthcare networks",
      },
      {
        icon: "MessageCircle",
        title: "Ongoing Coordination",
        description: "Continuous support for established partnerships",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Initial Discussion",
        description: "Meet to understand partnership goals and capabilities",
      },
      {
        number: 2,
        title: "Partnership Assessment",
        description: "Evaluate institutional strengths and partnership objectives",
      },
      {
        number: 3,
        title: "Partner Identification",
        description: "Identify compatible international healthcare partners",
      },
      {
        number: 4,
        title: "Introduction & Dialogue",
        description: "Facilitate institutional introduction and preliminary discussions",
      },
      {
        number: 5,
        title: "Pathway Development",
        description: "Work with both institutions to develop referral pathways",
      },
      {
        number: 6,
        title: "Formal Partnership",
        description: "Support formalization of partnership agreement",
      },
      {
        number: 7,
        title: "Implementation",
        description: "Support implementation of partnership activities",
      },
      {
        number: 8,
        title: "Ongoing Support",
        description: "Continuous coordination and relationship support",
      },
    ],
    trustNotes: [
      "Established relationships with multiple Uzbek healthcare institutions",
      "Direct network of international hospital partners",
      "Professional institutional liaison services",
      "Ethical and transparent partnership development",
      "Focus on mutual benefit and sustainable cooperation",
    ],
    faqs: [
      {
        question: "What types of partnerships does MedPobeda Group facilitate?",
        answer:
          "We facilitate various partnership models including referral pathways, formal hospital-to-hospital partnerships, specialist consultation networks, and collaborative research arrangements.",
      },
      {
        question: "Can partnerships be developed with hospitals outside of India?",
        answer:
          "Yes. While we have extensive experience with India-Uzbekistan partnerships, we can facilitate connections with international hospitals in other countries as well.",
      },
      {
        question: "How long does the partnership development process take?",
        answer:
          "Timeline varies depending on partnership complexity and institutional readiness. Simple referral pathways may develop within weeks, while formal partnerships typically take several months.",
      },
      {
        question: "Do both institutions need to be large hospitals?",
        answer:
          "No. We work with hospitals and clinics of various sizes. Partnership benefits can be structured to work for small, medium, and large institutions.",
      },
      {
        question: "What support is provided during implementation?",
        answer:
          "We provide ongoing coordination, help with operational planning, support staff training, and continuous relationship management to ensure partnership success.",
      },
      {
        question: "Is there a cost for partnership facilitation services?",
        answer:
          "Yes. Partnership development services have associated fees. Contact us to discuss specific partnership goals and service costs.",
      },
    ],
    relatedPages: [
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "India-Uzbekistan Healthcare Collaboration" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan" },
      { slug: "india-hospital-referral-assistance", title: "Hospital Referral Assistance" },
    ],
  },
  {
    id: "healthcare-collab-india-uz",
    slug: "healthcare-collaboration-between-india-and-uzbekistan",
    metaTitle: "Healthcare Collaboration Between India and Uzbekistan | MedPobeda Group",
    metaDescription:
      "Professional healthcare collaboration support between India and Uzbekistan. MedPobeda Group facilitates institutional partnerships, patient coordination, and medical networking.",
    keywords: [
      "healthcare collaboration India Uzbekistan",
      "India Uzbekistan hospital cooperation",
      "medical partnership between India and Uzbekistan",
      "healthcare networking India Uzbekistan",
      "international healthcare collaboration",
    ],
    heroTitle: "Healthcare Collaboration Between India and Uzbekistan",
    heroSubtitle: "Bridging healthcare systems and facilitating cross-border cooperation",
    introTitle: "Facilitating Meaningful Healthcare Cooperation",
    introText:
      "MedPobeda Group serves as a bridge for healthcare collaboration between India and Uzbekistan. We support patient coordination, institutional partnerships, professional networking, and knowledge exchange that strengthen healthcare systems on both sides.",
    introPoints: [
      "Patient referral coordination",
      "Hospital partnership development",
      "Professional medical networking",
      "Healthcare knowledge exchange",
      "Clinical cooperation support",
    ],
    whoThisIsFor: [
      {
        icon: "Building",
        title: "Hospitals & Clinics",
        description: "Healthcare institutions seeking cross-border partnerships and referral networks",
      },
      {
        icon: "Users",
        title: "Patients & Families",
        description: "Patients seeking healthcare collaboration and specialized treatment",
      },
      {
        icon: "Globe",
        title: "Healthcare Organizations",
        description: "Medical organizations promoting healthcare cooperation between countries",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Collaboration Assessment",
        description: "Evaluate collaboration opportunities and institutional needs",
      },
      {
        icon: "Users",
        title: "Network Facilitation",
        description: "Facilitate connections between Indian and Uzbek healthcare providers",
      },
      {
        icon: "Globe",
        title: "Partnership Support",
        description: "Support development of institutional partnerships",
      },
      {
        icon: "MessageSquare",
        title: "Professional Liaison",
        description: "Facilitate professional communication and dialogue",
      },
      {
        icon: "FileCheck",
        title: "Patient Coordination",
        description: "Coordinate patient referrals and treatment planning",
      },
      {
        icon: "MessageCircle",
        title: "Ongoing Support",
        description: "Continuous support for collaborative relationships",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Identify Collaboration Goals",
        description: "Understand the collaboration objectives and benefits desired",
      },
      {
        number: 2,
        title: "Assess Opportunities",
        description: "Evaluate potential collaboration models and opportunities",
      },
      {
        number: 3,
        title: "Identify Partners",
        description: "Identify suitable institutions on the other country",
      },
      {
        number: 4,
        title: "Facilitate Introduction",
        description: "Introduce potential partners and facilitate dialogue",
      },
      {
        number: 5,
        title: "Develop Framework",
        description: "Work with both sides to develop collaboration framework",
      },
      {
        number: 6,
        title: "Establish Protocols",
        description: "Establish operational protocols and procedures",
      },
      {
        number: 7,
        title: "Launch Collaboration",
        description: "Begin collaborative activities and patient coordination",
      },
      {
        number: 8,
        title: "Sustain & Grow",
        description: "Support sustainability and growth of collaboration",
      },
    ],
    trustNotes: [
      "Deep knowledge of both Indian and Uzbek healthcare systems",
      "Established relationships on both sides of the collaboration",
      "Professional facilitation and mediation capabilities",
      "Focus on mutually beneficial cooperation",
      "Commitment to ethical and sustainable partnerships",
    ],
    faqs: [
      {
        question: "What types of healthcare collaboration can be facilitated?",
        answer:
          "Patient referral networks, formal hospital partnerships, specialist consultation relationships, clinical training exchanges, research collaborations, and technology/knowledge sharing arrangements.",
      },
      {
        question: "How does MedPobeda Group support long-term partnerships?",
        answer:
          "We provide ongoing liaison services, help resolve operational challenges, support communication between partners, and facilitate continuous relationship strengthening.",
      },
      {
        question: "Can individual doctors participate in collaboration initiatives?",
        answer:
          "Yes. We facilitate professional networks that include individual specialists, clinics, and hospitals. Collaboration can occur at various organizational levels.",
      },
      {
        question: "Is there support for healthcare training exchanges?",
        answer:
          "Yes. We can help facilitate training exchanges, clinical fellowships, and professional development opportunities between India and Uzbekistan.",
      },
      {
        question: "How does collaboration benefit smaller healthcare institutions?",
        answer:
          "Smaller institutions gain access to larger networks, specialist consultation, training resources, and patient referral pathways that strengthen their capabilities and service offerings.",
      },
      {
        question: "What is the investment required for collaborative initiatives?",
        answer:
          "Investment varies based on the type and scope of collaboration. We can discuss cost structures tailored to your institution's budget and goals.",
      },
    ],
    relatedPages: [
      { slug: "hospital-partnerships-in-uzbekistan", title: "Hospital Partnerships in Uzbekistan" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan" },
      { slug: "india-hospital-referral-assistance", title: "Hospital Referral Assistance" },
    ],
  },
  {
    id: "student-mobility-uz",
    slug: "student-mobility-support-in-uzbekistan",
    metaTitle: "Student Mobility Support in Uzbekistan | MedPobeda Group",
    metaDescription:
      "Professional support for medical and health science students seeking international academic opportunities. MedPobeda Group facilitates student mobility, institutional partnerships, and academic cooperation.",
    keywords: [
      "student mobility support in Uzbekistan",
      "medical student support Uzbekistan",
      "university admission coordination Uzbekistan",
      "healthcare education cooperation",
      "student mobility programs",
    ],
    heroTitle: "Student Mobility Support in Uzbekistan",
    heroSubtitle: "Facilitating academic opportunities for health science students",
    introTitle: "Supporting Student Mobility and Academic Development",
    introText:
      "MedPobeda Group helps students and educational institutions in Uzbekistan access international academic opportunities. From university admission support to clinical placement coordination, we facilitate meaningful student mobility.",
    introPoints: [
      "University admission assistance",
      "Academic program matching",
      "Student placement coordination",
      "Institutional partnership development",
      "Ongoing student support services",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Students",
        description: "Medical and health science students seeking international study opportunities",
      },
      {
        icon: "Building",
        title: "Universities",
        description: "Uzbek educational institutions supporting student international mobility",
      },
      {
        icon: "Globe",
        title: "Academic Networks",
        description: "International academic organizations promoting student exchanges",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Student Assessment",
        description: "Evaluation of academic background, goals, and suitability for programs",
      },
      {
        icon: "Globe",
        title: "Program Matching",
        description: "Identification of suitable universities and academic programs",
      },
      {
        icon: "FileCheck",
        title: "Application Support",
        description: "Assistance with application documents and submission",
      },
      {
        icon: "Building",
        title: "Admission Liaison",
        description: "Professional communication with educational institutions",
      },
      {
        icon: "MessageSquare",
        title: "Placement Coordination",
        description: "Support for clinical placements and internships",
      },
      {
        icon: "MessageCircle",
        title: "Student Support",
        description: "Ongoing support throughout academic journey",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Initial Consultation",
        description: "Discuss academic goals, background, and preferences",
      },
      {
        number: 2,
        title: "Program Research",
        description: "Identify suitable universities and academic programs",
      },
      {
        number: 3,
        title: "Profile Development",
        description: "Prepare application materials and student profile",
      },
      {
        number: 4,
        title: "Application Submission",
        description: "Submit applications to selected universities",
      },
      {
        number: 5,
        title: "Interview Support",
        description: "Prepare for and support university interviews",
      },
      {
        number: 6,
        title: "Admission Confirmation",
        description: "Confirm admission and discuss program details",
      },
      {
        number: 7,
        title: "Enrollment Planning",
        description: "Plan enrollment, accommodation, and logistics",
      },
      {
        number: 8,
        title: "Ongoing Support",
        description: "Provide support throughout the academic program",
      },
    ],
    trustNotes: [
      "Established relationships with international universities",
      "Understanding of student mobility requirements",
      "Support for professional development",
      "Focus on student success and career development",
      "Commitment to educational excellence",
    ],
    faqs: [
      {
        question: "What types of academic programs can be supported?",
        answer:
          "We support medical degrees, nursing programs, public health studies, healthcare administration, clinical fellowship, and many other health science programs internationally.",
      },
      {
        question: "Does MedPobeda Group help with visa and immigration?",
        answer:
          "We provide guidance on visa requirements and documentation. For formal immigration assistance, we recommend consulting with immigration specialists.",
      },
      {
        question: "Can students apply to multiple universities simultaneously?",
        answer:
          "Yes. We recommend applying to multiple universities to maximize your options and choices for your academic journey.",
      },
      {
        question: "Is there support for scholarship applications?",
        answer:
          "We can provide guidance on scholarship opportunities. Many universities offer scholarships that we can help you explore and apply for.",
      },
      {
        question: "What happens after I'm admitted to a university?",
        answer:
          "We continue to provide support including enrollment planning, accommodation assistance, pre-arrival orientation, and ongoing student support throughout your program.",
      },
      {
        question: "Is there a cost for student mobility support?",
        answer:
          "Yes. We provide student consultation and support services. Contact us for information about service fees and support packages.",
      },
    ],
    relatedPages: [
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "Healthcare Collaboration" },
      { slug: "hospital-partnerships-in-uzbekistan", title: "Hospital Partnerships" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Interpreter Support" },
    ],
  },
  {
    id: "med-interpreter-uz",
    slug: "medical-interpreter-support-in-uzbekistan",
    metaTitle: "Medical Interpreter Support in Uzbekistan | MedPobeda Group",
    metaDescription:
      "Professional medical interpretation services in Uzbekistan. MedPobeda Group provides multilingual medical interpreters for patients, hospitals, and healthcare institutions.",
    keywords: [
      "medical interpreter support Uzbekistan",
      "hospital interpreter Tashkent",
      "patient language assistance Uzbekistan",
      "medical translation services",
      "healthcare interpreter services",
    ],
    heroTitle: "Medical Interpreter Support in Uzbekistan",
    heroSubtitle: "Professional multilingual medical interpretation services",
    introTitle: "Bridging Language Barriers in Healthcare",
    introText:
      "MedPobeda Group provides professional medical interpretation services for patients, hospitals, and healthcare institutions. Our multilingual interpreters ensure clear communication in critical healthcare situations.",
    introPoints: [
      "Professional medical interpreters",
      "Multilingual support (7+ languages)",
      "Healthcare-specific terminology expertise",
      "Patient and provider support",
      "Confidential and ethical interpretation",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "Patients",
        description: "International patients needing medical interpretation support",
      },
      {
        icon: "Building",
        title: "Hospitals",
        description: "Healthcare institutions serving multilingual patient populations",
      },
      {
        icon: "Globe",
        title: "Healthcare Organizations",
        description: "Medical organizations supporting international patient care",
      },
    ],
    servicesIncluded: [
      {
        icon: "MessageCircle",
        title: "Medical Interpretation",
        description: "Professional interpretation during medical consultations",
      },
      {
        icon: "FileText",
        title: "Medical Translation",
        description: "Translation of medical documents and reports",
      },
      {
        icon: "Users",
        title: "Provider Liaison",
        description: "Professional communication between patients and healthcare providers",
      },
      {
        icon: "MessageSquare",
        title: "Phone Interpretation",
        description: "Remote interpretation for consultations and follow-ups",
      },
      {
        icon: "Globe",
        title: "Multilingual Support",
        description: "Support in multiple Central Asian languages",
      },
      {
        icon: "FileCheck",
        title: "Confidential Services",
        description: "Ethical and confidential interpretation services",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Request Interpretation",
        description: "Contact us with your language and interpretation needs",
      },
      {
        number: 2,
        title: "Assess Requirements",
        description: "Discuss specific interpretation needs and context",
      },
      {
        number: 3,
        title: "Assign Interpreter",
        description: "Assign qualified healthcare interpreter",
      },
      {
        number: 4,
        title: "Prepare Interpreter",
        description: "Brief interpreter on medical context and terminology",
      },
      {
        number: 4,
        title: "Conduct Interpretation",
        description: "Provide professional interpretation services",
      },
      {
        number: 6,
        title: "Quality Assurance",
        description: "Ensure clear and accurate communication",
      },
      {
        number: 7,
        title: "Documentation",
        description: "Maintain confidential records of interpretation",
      },
      {
        number: 8,
        title: "Follow-up Support",
        description: "Provide additional interpretation as needed",
      },
    ],
    trustNotes: [
      "Professional healthcare interpreters with medical terminology expertise",
      "Multilingual support in 7+ languages",
      "Commitment to interpretation accuracy and ethics",
      "Confidentiality and patient privacy protection",
      "Professional standards and best practices",
    ],
    faqs: [
      {
        question: "What languages do your medical interpreters speak?",
        answer:
          "We have interpreters fluent in English, Russian, Uzbek, Kyrgyz, Kazakh, Tajik, Turkmen, and other languages as needed.",
      },
      {
        question: "Can interpreters be available on short notice?",
        answer:
          "We work to accommodate urgent interpretation requests. Contact us as soon as possible to ensure interpreter availability.",
      },
      {
        question: "Do you provide interpretation for phone consultations?",
        answer:
          "Yes. We provide remote interpretation for phone consultations, video calls, and other remote healthcare communications.",
      },
      {
        question: "Are medical translations available?",
        answer:
          "Yes. We translate medical documents, reports, test results, and other healthcare-related documents with healthcare terminology expertise.",
      },
      {
        question: "What is the cost of medical interpretation services?",
        answer:
          "Interpretation fees vary based on language, duration, complexity, and timing of the request. Contact us for specific pricing information.",
      },
      {
        question: "Is confidentiality maintained for interpreted communications?",
        answer:
          "Yes. All interpreted communications are kept strictly confidential following healthcare privacy standards and ethical guidelines.",
      },
    ],
    relatedPages: [
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan" },
      { slug: "india-hospital-referral-assistance", title: "Hospital Referral Assistance" },
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "Healthcare Collaboration" },
    ],
  },
  {
    id: "india-hosp-referral",
    slug: "india-hospital-referral-assistance",
    metaTitle: "India Hospital Referral Assistance | MedPobeda Group",
    metaDescription:
      "Professional hospital referral assistance for patients seeking treatment in India. MedPobeda Group provides appointment coordination, specialist matching, and comprehensive patient support.",
    keywords: [
      "India hospital referral assistance",
      "hospital appointment support India",
      "international patient referral India",
      "India treatment coordination",
      "hospital referral services India",
    ],
    heroTitle: "India Hospital Referral Assistance",
    heroSubtitle: "Professional support for patients seeking Indian healthcare",
    introTitle: "Comprehensive Hospital Referral Services in India",
    introText:
      "MedPobeda Group provides professional referral assistance for patients seeking treatment in India's leading hospitals. From specialist matching to appointment coordination, we facilitate smooth access to quality Indian healthcare.",
    introPoints: [
      "Hospital and specialist matching",
      "Professional referral submission",
      "Appointment scheduling",
      "Pre-visit preparation",
      "Ongoing patient support",
    ],
    whoThisIsFor: [
      {
        icon: "Users",
        title: "International Patients",
        description: "Patients worldwide seeking specialized treatment in India",
      },
      {
        icon: "Globe",
        title: "Patients & Families",
        description: "Families seeking quality healthcare options in India",
      },
      {
        icon: "Building",
        title: "Referring Institutions",
        description: "Hospitals and clinics referring patients to India",
      },
    ],
    servicesIncluded: [
      {
        icon: "FileText",
        title: "Referral Assessment",
        description: "Comprehensive review of your medical case and needs",
      },
      {
        icon: "Users",
        title: "Hospital Matching",
        description: "Identification of suitable hospitals and specialists in India",
      },
      {
        icon: "FileCheck",
        title: "Document Preparation",
        description: "Professional organization of medical records",
      },
      {
        icon: "MessageSquare",
        title: "Referral Submission",
        description: "Professional hospital referral and communication",
      },
      {
        icon: "Globe",
        title: "Appointment Coordination",
        description: "Assistance with appointment scheduling",
      },
      {
        icon: "MessageCircle",
        title: "Pre-visit Support",
        description: "Preparation and guidance before hospital visit",
      },
    ],
    processSteps: [
      {
        number: 1,
        title: "Submit Referral Request",
        description: "Share your medical condition and treatment needs",
      },
      {
        number: 2,
        title: "Case Assessment",
        description: "Comprehensive review of your medical case",
      },
      {
        number: 3,
        title: "Hospital Identification",
        description: "Identify suitable hospitals and specialists",
      },
      {
        number: 4,
        title: "Document Organization",
        description: "Prepare medical records for hospital review",
      },
      {
        number: 5,
        title: "Referral Submission",
        description: "Submit referral to identified hospitals",
      },
      {
        number: 6,
        title: "Hospital Response",
        description: "Receive hospital feedback and recommendations",
      },
      {
        number: 7,
        title: "Appointment Scheduling",
        description: "Coordinate appointment date and timing",
      },
      {
        number: 8,
        title: "Pre-visit Guidance",
        description: "Provide guidance and preparation for hospital visit",
      },
    ],
    trustNotes: [
      "Direct relationships with leading Indian hospitals",
      "Specialist expertise in hospital referral coordination",
      "Professional and ethical referral services",
      "Patient-centered approach to care coordination",
      "Transparent communication throughout the process",
    ],
    faqs: [
      {
        question: "How long does it take to get a hospital referral response?",
        answer:
          "Initial responses typically arrive within 2-4 weeks. Some complex cases may take longer depending on hospital caseload and the complexity of your medical condition.",
      },
      {
        question: "Can I be referred to multiple hospitals at once?",
        answer:
          "Yes. Simultaneous referrals to multiple hospitals can give you more options and allow you to compare recommendations and costs.",
      },
      {
        question: "What if the hospital cannot help with my condition?",
        answer:
          "If a hospital cannot assist, we can identify alternative hospitals or specialists. We continue support until you find suitable care.",
      },
      {
        question: "Do you help with travel arrangements for the hospital visit?",
        answer:
          "Yes. We provide guidance on travel planning, visa requirements, accommodation, and logistics for your hospital visit in India.",
      },
      {
        question: "What happens after the hospital visit is completed?",
        answer:
          "We can assist with follow-up communication with the hospital, help you understand treatment recommendations, and provide ongoing support as needed.",
      },
      {
        question: "Is there a guarantee that the hospital will accept my referral?",
        answer:
          "Hospital acceptance depends on their evaluation of your medical condition and their capabilities. We work to identify hospitals most likely to help your specific case.",
      },
    ],
    relatedPages: [
      { slug: "medical-tourism-from-uzbekistan-to-india", title: "Medical Tourism from Uzbekistan" },
      { slug: "international-patient-support-in-tashkent", title: "International Patient Support" },
      { slug: "healthcare-collaboration-between-india-and-uzbekistan", title: "Healthcare Collaboration" },
      { slug: "medical-interpreter-support-in-uzbekistan", title: "Interpreter Support" },
    ],
  },
];

export function getSeoServicePage(slug: string): SeoServicePageData | undefined {
  return seoServicePages.find((page) => page.slug === slug);
}

export function getAllSeoServiceSlugs(): string[] {
  return seoServicePages.map((page) => page.slug);
}

export function getRelatedServicePages(
  currentSlug: string,
  limit: number = 4,
): SeoServicePageData[] {
  const currentPage = getSeoServicePage(currentSlug);
  if (!currentPage) return [];

  return currentPage.relatedPages
    .slice(0, limit)
    .map((related) => getSeoServicePage(related.slug))
    .filter((page) => page !== undefined) as SeoServicePageData[];
}
