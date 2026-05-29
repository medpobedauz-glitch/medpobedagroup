import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding new content models...");

  // ─── Hospital Partners ──────────────────────────────────────────
  const hospitalPartners = [
    {
      name: "Fortis Escorts Heart Institute",
      slug: "fortis-escorts-heart",
      shortName: "Fortis Escorts",
      country: "India",
      city: "New Delhi",
      website: "https://www.fortis Escorts.com",
      description: "One of Asia's premier cardiac care centres with over 20,000 successful heart surgeries annually. JCI and NABH accredited.",
      specialties: ["Cardiology", "Cardiac Surgery", "Interventional Cardiology", "Cardiac Transplant"],
      bedCount: 310,
      establishedYear: 1988,
      accreditations: ["JCI", "NABH", "NABL"],
      patientRating: 4.8,
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      name: "Apollo Hospitals Chennai",
      slug: "apollo-hospitals-chennai",
      shortName: "Apollo Chennai",
      country: "India",
      city: "Chennai",
      website: "https://www.apollohospitals.com",
      description: "Asia's largest and most trusted hospital network. Pioneer of private healthcare in India with world-class infrastructure.",
      specialties: ["Multi-specialty", "Oncology", "Orthopedics", "Neurosurgery", "Organ Transplant"],
      bedCount: 600,
      establishedYear: 1983,
      accreditations: ["JCI", "NABH", "NABL"],
      patientRating: 4.7,
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
    },
    {
      name: "Medanta Hospital Delhi",
      slug: "medanta-hospital-delhi",
      shortName: "Medanta Delhi",
      country: "India",
      city: "Gurugram",
      website: "https://www.medanta.org",
      description: "Multi-super specialty hospital founded by renowned cardiac surgeon Dr. Naresh Trehan. Known for complex organ transplants.",
      specialties: ["Cardiology", "Organ Transplant", "Oncology", "Neurosciences", "Gastroenterology"],
      bedCount: 1600,
      establishedYear: 2009,
      accreditations: ["JCI", "NABH"],
      patientRating: 4.6,
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
    },
    {
      name: "Tata Memorial Hospital",
      slug: "tata-memorial-hospital",
      shortName: "Tata Memorial",
      country: "India",
      city: "Mumbai",
      website: "https://www.tmc.gov.in",
      description: "India's premier cancer research and treatment centre. Government-aided with cutting-edge oncology treatments.",
      specialties: ["Oncology", "Surgical Oncology", "Medical Oncology", "Radiation Oncology"],
      bedCount: 700,
      establishedYear: 1941,
      accreditations: ["NABH", "NABL"],
      patientRating: 4.5,
      isFeatured: true,
      isPublished: true,
      sortOrder: 4,
    },
    {
      name: "Nova IVF Fertility Delhi",
      slug: "nova-ivf-fertility",
      shortName: "Nova IVF",
      country: "India",
      city: "New Delhi",
      website: "https://www.novaivffertility.com",
      description: "India's largest IVF network with high success rates and advanced reproductive technologies.",
      specialties: ["IVF", "Fertility", "Reproductive Medicine", "Andrology"],
      bedCount: 50,
      establishedYear: 2011,
      accreditations: ["NABH"],
      patientRating: 4.4,
      isFeatured: true,
      isPublished: true,
      sortOrder: 5,
    },
    {
      name: "Artemis Hospital Gurugram",
      slug: "artemis-hospital",
      shortName: "Artemis",
      country: "India",
      city: "Gurugram",
      website: "https://www.artemishospital.com",
      description: "JCI accredited multi-specialty hospital known for excellence in healthcare with state-of-the-art technology.",
      specialties: ["Multi-specialty", "Cardiology", "Orthopedics", "Nephrology", "Urology"],
      bedCount: 400,
      establishedYear: 2007,
      accreditations: ["JCI", "NABH"],
      patientRating: 4.5,
      isFeatured: false,
      isPublished: true,
      sortOrder: 6,
    },
    {
      name: "Narayana Health Bangalore",
      slug: "narayana-health",
      shortName: "Narayana Health",
      country: "India",
      city: "Bangalore",
      website: "https://www.narayanahealth.org",
      description: "Founded by Dr. Devi Shetty, known for affordable cardiac care. Pioneer of quality healthcare at scale.",
      specialties: ["Cardiology", "Cardiac Surgery", "Oncology", "Orthopedics", "Neurosciences"],
      bedCount: 1000,
      establishedYear: 2000,
      accreditations: ["JCI", "NABH", "NABL"],
      patientRating: 4.6,
      isFeatured: false,
      isPublished: true,
      sortOrder: 7,
    },
    {
      name: "Max Super Speciality Hospital",
      slug: "max-super-speciality",
      shortName: "Max Hospital",
      country: "India",
      city: "New Delhi",
      website: "https://www.maxhealthcare.in",
      description: "Leading multi-specialty hospital with advanced technology and internationally trained specialists.",
      specialties: ["Multi-specialty", "Cardiology", "Oncology", "Organ Transplant", "Neurosciences"],
      bedCount: 500,
      establishedYear: 1985,
      accreditations: ["JCI", "NABH"],
      patientRating: 4.4,
      isFeatured: false,
      isPublished: true,
      sortOrder: 8,
    },
  ];

  for (const partner of hospitalPartners) {
    await prisma.hospitalPartner.upsert({
      where: { slug: partner.slug },
      create: partner,
      update: partner,
    });
  }
  console.log(`  ✅ ${hospitalPartners.length} hospital partners created`);

  // ─── Success Stories ────────────────────────────────────────────
  const successStories = [
    {
      patientName: "Alisher N.",
      patientCountry: "Uzbekistan",
      patientAge: 52,
      treatmentType: "Heart Valve Replacement",
      hospitalName: "Fortis Escorts Heart Institute",
      testimonial: "After being diagnosed with a severe heart valve condition, my family was terrified. MedPobeda Group arranged everything — from the initial consultation to the surgery at Fortis Escorts. The doctors were world-class, and the care was exceptional. I'm now back home in Tashkent, fully recovered and grateful.",
      outcome: "Successful aortic valve replacement. Full recovery in 8 weeks. Patient is now leading a normal active life.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      slug: "alisher-heart-valve-uzbekistan",
      tags: ["Cardiology", "Heart Surgery", "Uzbekistan"],
    },
    {
      patientName: "Gulnara K.",
      patientCountry: "Kazakhstan",
      patientAge: 45,
      treatmentType: "Knee Replacement",
      hospitalName: "Apollo Hospitals Chennai",
      testimonial: "I had been suffering from severe knee pain for years. The treatment in India was life-changing. The surgeons at Apollo were incredibly skilled, and MedPobeda coordinated every detail.",
      outcome: "Bilateral knee replacement surgery. Patient regained full mobility within 3 months of surgery.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      slug: "gulnara-knee-replacement-kazakhstan",
      tags: ["Orthopedics", "Knee Surgery", "Kazakhstan"],
    },
    {
      patientName: "Dilshod R.",
      patientCountry: "Tajikistan",
      patientAge: 38,
      treatmentType: "Liver Transplant",
      hospitalName: "Medanta Hospital Delhi",
      testimonial: "My liver condition was critical, and treatment options in Tajikistan were limited. MedPobeda connected us with Medanta Hospital where I received a liver transplant. This company literally saved my life.",
      outcome: "Successful liver transplant. Patient is on minimal immunosuppressants and has returned to normal life.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      slug: "dilshod-liver-transplant-tajikistan",
      tags: ["Organ Transplant", "Liver", "Tajikistan"],
    },
    {
      patientName: "Nurgul T.",
      patientCountry: "Kyrgyzstan",
      patientAge: 34,
      treatmentType: "IVF Treatment",
      hospitalName: "Nova IVF Fertility Delhi",
      testimonial: "After years of trying to conceive, we were hopeless. MedPobeda guided us to Nova IVF in Delhi. Our twins are now 1 year old. We owe everything to the MedPobeda team.",
      outcome: "Successful IVF resulting in healthy twin pregnancy. Patient delivered at full term.",
      rating: 5,
      isFeatured: false,
      isPublished: true,
      slug: "nurgul-ivf-kyrgyzstan",
      tags: ["IVF", "Fertility", "Kyrgyzstan"],
    },
    {
      patientName: "Rustam M.",
      patientCountry: "Uzbekistan",
      patientAge: 61,
      treatmentType: "Brain Tumor Surgery",
      hospitalName: "Apollo Hospitals Chennai",
      testimonial: "When I was diagnosed with a brain tumor, I thought it was the end. MedPobeda arranged an immediate consultation with a neurosurgeon at Apollo. I'm cancer-free today.",
      outcome: "Successful gross total resection of brain tumor. Patient is cancer-free after 18 months of follow-up.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      slug: "rustam-brain-tumor-uzbekistan",
      tags: ["Neurosurgery", "Oncology", "Uzbekistan"],
    },
    {
      patientName: "Marina V.",
      patientCountry: "Russia",
      patientAge: 42,
      treatmentType: "Cardiac Bypass Surgery",
      hospitalName: "Fortis Escorts Heart Institute",
      testimonial: "I needed coronary bypass surgery urgently. The surgeons at Fortis performed a triple bypass, and the recovery was smooth. Thank you for giving me a second chance.",
      outcome: "Successful triple coronary artery bypass graft. Full cardiac recovery within 12 weeks.",
      rating: 5,
      isFeatured: false,
      isPublished: true,
      slug: "marina-cardiac-bypass-russia",
      tags: ["Cardiology", "Heart Surgery", "Russia"],
    },
  ];

  for (const story of successStories) {
    await prisma.successStory.upsert({
      where: { slug: story.slug },
      create: story,
      update: story,
    });
  }
  console.log(`  ✅ ${successStories.length} success stories created`);

  // ─── Team Members ──────────────────────────────────────────────
  const teamMembers = [
    {
      name: "Leadership Team",
      role: "FOUNDER" as const,
      title: "Founder & CEO",
      bio: "Established MedPobeda Group with a vision to bridge the gap between Central Asian patients and world-class Indian healthcare.",
      shortBio: "Visionary leader with 15+ years in international healthcare coordination.",
      languages: ["EN", "RU", "UZ"] as any,
      specializations: ["Healthcare Strategy", "Hospital Partnerships"],
      yearsExperience: 15,
      sortOrder: 1,
      isPublished: true,
    },
    {
      name: "Patient Coordination Lead",
      role: "COORDINATOR" as const,
      title: "Senior Patient Coordinator",
      bio: "Manages the entire patient coordination team ensuring seamless treatment journeys.",
      shortBio: "Expert in navigating complex medical cases across borders.",
      languages: ["EN", "RU", "UZ", "KZ"] as any,
      specializations: ["Patient Navigation", "Treatment Planning"],
      yearsExperience: 8,
      sortOrder: 2,
      isPublished: true,
    },
    {
      name: "Medical Advisory Lead",
      role: "MEDICAL_ADVISOR" as const,
      title: "Chief Medical Advisor",
      bio: "Reviews patient cases and ensures treatment plans meet international standards.",
      shortBio: "Board-certified physician with global healthcare experience.",
      languages: ["EN", "RU"] as any,
      specializations: ["Clinical Review", "Quality Assurance"],
      yearsExperience: 20,
      sortOrder: 3,
      isPublished: true,
    },
    {
      name: "International Relations Head",
      role: "INTERNATIONAL_RELATIONS" as const,
      title: "Director of International Relations",
      bio: "Manages partnerships with hospitals and coordinates visa processes across all served countries.",
      shortBio: "Experienced diplomat in healthcare international relations.",
      languages: ["EN", "RU", "UZ", "KZ", "KG"] as any,
      specializations: ["Hospital Relations", "Visa Coordination"],
      yearsExperience: 10,
      sortOrder: 4,
      isPublished: true,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log(`  ✅ ${teamMembers.length} team members created`);

  // ─── Accreditations ──────────────────────────────────────────────
  const accreditations = [
    { name: "JCI Accreditation", type: "CERTIFICATION" as const, issuer: "Joint Commission International", description: "Gold standard for international healthcare quality.", sortOrder: 1 },
    { name: "NABH Certification", type: "CERTIFICATION" as const, issuer: "National Accreditation Board for Hospitals", description: "India's premier hospital quality certification.", sortOrder: 2 },
    { name: "ISO 9001:2015", type: "COMPLIANCE" as const, issuer: "International Organization for Standardization", description: "Quality management system compliance.", sortOrder: 3 },
    { name: "Medical Tourism Association", type: "MEMBERSHIP" as const, issuer: "Medical Tourism Association (MTA)", description: "Global membership in the medical tourism industry body.", sortOrder: 4 },
    { name: "Ministry of Health Uzbekistan", type: "REGISTRATION" as const, issuer: "Ministry of Health of Uzbekistan", description: "Official registration and recognition.", sortOrder: 5 },
  ];

  for (const acc of accreditations) {
    const existing = await prisma.accreditation.findFirst({ where: { name: acc.name } });
    if (!existing) {
      await prisma.accreditation.create({ data: acc });
    }
  }
  console.log(`  ✅ ${accreditations.length} accreditations created`);

  // ─── Cost Guides ────────────────────────────────────────────────
  const costGuides = [
    { treatmentName: "Heart Valve Replacement", slug: "heart-valve-replacement", category: "Cardiology", description: "Aortic or mitral valve replacement at JCI-accredited hospitals.", costMinINR: 550000, costMaxINR: 1200000, costMinUSD: 7000, costMaxUSD: 15000, durationDays: "7-10 days", includes: ["Surgeon fees", "Hospital stay", "Medications", "Follow-up"], hospitalIds: [], isPublished: true, sortOrder: 1 },
    { treatmentName: "Coronary Bypass (CABG)", slug: "coronary-bypass", category: "Cardiology", description: "Single, double, or triple coronary artery bypass grafting.", costMinINR: 650000, costMaxINR: 1450000, costMinUSD: 8000, costMaxUSD: 18000, durationDays: "10-14 days", includes: ["Surgeon fees", "ICU stay", "Medications", "Cardiac rehab"], hospitalIds: [], isPublished: true, sortOrder: 2 },
    { treatmentName: "Knee Replacement", slug: "knee-replacement", category: "Orthopedics", description: "Total or partial knee replacement with premium implants.", costMinINR: 480000, costMaxINR: 950000, costMinUSD: 6000, costMaxUSD: 12000, durationDays: "10-14 days", includes: ["Prosthesis", "Surgery", "Physiotherapy", "Rehabilitation"], hospitalIds: [], isPublished: true, sortOrder: 3 },
    { treatmentName: "IVF Treatment", slug: "ivf-treatment", category: "IVF", description: "In vitro fertilization with ICSI and blastocyst transfer.", costMinINR: 240000, costMaxINR: 480000, costMinUSD: 3000, costMaxUSD: 6000, durationDays: "2-3 weeks", includes: ["Stimulation drugs", "Egg retrieval", "Embryo transfer", "Pregnancy test"], hospitalIds: [], isPublished: true, sortOrder: 4 },
    { treatmentName: "Liver Transplant", slug: "liver-transplant", category: "Organ Transplant", description: "Living donor or deceased donor liver transplant.", costMinINR: 2400000, costMaxINR: 4000000, costMinUSD: 30000, costMaxUSD: 50000, durationDays: "4-6 weeks", includes: ["Donor workup", "Surgery", "Post-op care", "Immunosuppressants"], hospitalIds: [], isPublished: true, sortOrder: 5 },
    { treatmentName: "Brain Tumor Surgery", slug: "brain-tumor-surgery", category: "Neurosurgery", description: "Craniotomy for brain tumor removal with neuronavigation.", costMinINR: 640000, costMaxINR: 2000000, costMinUSD: 8000, costMaxUSD: 25000, durationDays: "10-14 days", includes: ["MRI/CT scans", "Surgery", "ICU stay", "Pathology"], hospitalIds: [], isPublished: true, sortOrder: 6 },
    { treatmentName: "Cataract Surgery", slug: "cataract-surgery", category: "Ophthalmology", description: "Phacoemulsification with premium intraocular lenses.", costMinINR: 120000, costMaxINR: 320000, costMinUSD: 1500, costMaxUSD: 4000, durationDays: "1-2 days", includes: ["Premium IOL", "Surgery", "Medications", "Follow-ups"], hospitalIds: [], isPublished: true, sortOrder: 7 },
  ];

  for (const guide of costGuides) {
    await prisma.costGuide.upsert({
      where: { slug: guide.slug },
      create: guide,
      update: guide,
    });
  }
  console.log(`  ✅ ${costGuides.length} cost guides created`);

  // ─── Country Pages ──────────────────────────────────────────────
  const countryPages = [
    {
      countryCode: "UZ", countryName: "Uzbekistan", slug: "medical-tourism-uzbekistan",
      heroTitle: "Medical Tourism from Uzbekistan to India",
      heroDescription: "Trusted medical tourism coordination for patients from Uzbekistan. World-class treatment in India with multilingual support.",
      popularTreatments: ["Heart Surgery", "Cancer Treatment", "Knee Replacement", "IVF", "Organ Transplant"],
      partnerHospitals: ["Fortis Escorts", "Apollo Hospitals", "Medanta Hospital"],
      languages: ["English", "Russian", "Uzbek"],
      timezone: "UTC+5",
      currency: "UZS",
      localPhone: "+998 90 123 4567",
      isPublished: true,
    },
    {
      countryCode: "KZ", countryName: "Kazakhstan", slug: "medical-tourism-kazakhstan",
      heroTitle: "Medical Tourism from Kazakhstan to India",
      heroDescription: "Premier medical tourism services for Kazakh patients seeking treatment in India.",
      popularTreatments: ["Cardiac Surgery", "Orthopedics", "Oncology", "Fertility"],
      partnerHospitals: ["Fortis Escorts", "Apollo Hospitals", "Narayana Health"],
      languages: ["English", "Russian", "Kazakh"],
      timezone: "UTC+6",
      currency: "KZT",
      localPhone: "+7 700 123 4567",
      isPublished: true,
    },
    {
      countryCode: "KG", countryName: "Kyrgyzstan", slug: "medical-tourism-kyrgyzstan",
      heroTitle: "Medical Tourism from Kyrgyzstan to India",
      heroDescription: "Accessible healthcare coordination for Kyrgyz patients in India's top hospitals.",
      popularTreatments: ["Heart Surgery", "Cancer Treatment", "IVF", "Eye Surgery"],
      partnerHospitals: ["Apollo Hospitals", "Nova IVF"],
      languages: ["English", "Russian", "Kyrgyz"],
      timezone: "UTC+6",
      currency: "KGS",
      localPhone: "+996 555 123 456",
      isPublished: true,
    },
    {
      countryCode: "TJ", countryName: "Tajikistan", slug: "medical-tourism-tajikistan",
      heroTitle: "Medical Tourism from Tajikistan to India",
      heroDescription: "Comprehensive medical tourism support for Tajik patients seeking specialized treatment.",
      popularTreatments: ["Organ Transplant", "Cardiac Surgery", "Cancer Treatment"],
      partnerHospitals: ["Medanta Hospital", "Fortis Escorts"],
      languages: ["English", "Russian", "Tajik"],
      timezone: "UTC+5",
      currency: "TJS",
      isPublished: true,
    },
    {
      countryCode: "TM", countryName: "Turkmenistan", slug: "medical-tourism-turkmenistan",
      heroTitle: "Medical Tourism from Turkmenistan to India",
      heroDescription: "Dedicated medical tourism services for Turkmen patients in India.",
      popularTreatments: ["Heart Surgery", "Orthopedics", "Neurosurgery"],
      partnerHospitals: ["Apollo Hospitals", "Fortis Escorts"],
      languages: ["English", "Russian", "Turkmen"],
      timezone: "UTC+5",
      currency: "TMT",
      isPublished: true,
    },
    {
      countryCode: "RU", countryName: "Russia", slug: "medical-tourism-russia",
      heroTitle: "Medical Tourism from Russia to India",
      heroDescription: "Premium medical tourism coordination for Russian patients seeking world-class Indian healthcare.",
      popularTreatments: ["Cardiac Surgery", "Oncology", "Organ Transplant", "IVF", "Orthopedics"],
      partnerHospitals: ["Fortis Escorts", "Apollo Hospitals", "Medanta Hospital", "Tata Memorial"],
      languages: ["English", "Russian"],
      timezone: "UTC+3",
      currency: "RUB",
      isPublished: true,
    },
  ];

  for (const cp of countryPages) {
    await prisma.countryPage.upsert({
      where: { slug: cp.slug },
      create: cp,
      update: cp,
    });
  }
  console.log(`  ✅ ${countryPages.length} country pages created`);

  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });