export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const faqCategories = [
  "Medical Visa",
  "Treatment Costs",
  "Hospital Selection",
  "Accommodation",
  "Travel",
  "Language Support",
  "Payment",
  "Treatment Process",
  "Insurance",
  "General",
] as const;

export const allFAQs: FAQItem[] = [
  // ─── Medical Visa (8 FAQs) ──────────────────────────────────────
  {
    id: "visa-1",
    question: "How do I get a medical visa for India?",
    answer:
      "MedPobeda Group assists you with the entire medical visa process. You'll need a medical visa (not tourist visa) for treatment in India. We help you gather required documents including hospital invitation letters, medical reports, passport copies, and financial documents. The visa is typically processed within 5-7 business days through the Indian embassy or consulate in your country.",
    category: "Medical Visa",
  },
  {
    id: "visa-2",
    question: "What documents are needed for a medical visa to India?",
    answer:
      "Required documents include: valid passport (6+ months validity), recent passport-size photos, hospital admission letter from a recognized Indian hospital, medical reports and diagnosis, proof of financial means, return flight tickets, and accommodation details. MedPobeda provides a complete checklist and assists with document preparation.",
    category: "Medical Visa",
  },
  {
    id: "visa-3",
    question: "How long does it take to process a medical visa?",
    answer:
      "Medical visa processing typically takes 5-7 business days from the Indian embassy. However, we recommend applying at least 2-3 weeks before your planned travel date. In urgent cases, expedited processing may be available. MedPobeda can help fast-track the process through proper documentation.",
    category: "Medical Visa",
  },
  {
    id: "visa-4",
    question: "Can my family member accompany me on a medical visa?",
    answer:
      "Yes, family members can apply for a Medical Attendant Visa (MX visa) to accompany you. Usually, up to two attendants are allowed. They need similar documentation plus proof of relationship. MedPobeda helps coordinate both patient and attendant visa applications.",
    category: "Medical Visa",
  },
  {
    id: "visa-5",
    question: "What if my medical visa application is rejected?",
    answer:
      "Visa rejections are rare when proper documentation is provided. If rejected, you can reapply with additional supporting documents. MedPobeda reviews your application thoroughly before submission to minimize rejection risk. We also assist with appeal procedures if needed.",
    category: "Medical Visa",
  },
  {
    id: "visa-6",
    question: "Do I need a different visa for each visit?",
    answer:
      "A medical visa is typically valid for the duration of your treatment and can include multiple entries. If you need follow-up visits, a single visa may cover multiple trips within its validity period. We advise confirming with the Indian embassy for your specific case.",
    category: "Medical Visa",
  },
  {
    id: "visa-7",
    question: "Can MedPobeda process my visa remotely?",
    answer:
      "Yes, we handle most of the visa process remotely. You'll need to visit the Indian embassy or consulate only for the final biometric submission (if required). We prepare all documents, coordinate with the hospital for invitation letters, and guide you through each step virtually.",
    category: "Medical Visa",
  },
  {
    id: "visa-8",
    question: "What is the cost of a medical visa to India?",
    answer:
      "Medical visa fees vary by country but typically range from $25 to $100 USD. This includes the visa application fee and any service charges. MedPobeda's visa assistance service is included in our coordination package at no extra charge for our patients.",
    category: "Medical Visa",
  },

  // ─── Treatment Costs (7 FAQs) ───────────────────────────────────
  {
    id: "cost-1",
    question: "How much does treatment in India cost compared to other countries?",
    answer:
      "Medical treatment in India typically costs 30-70% less than in the US, UK, or Europe, and 20-50% less than in Turkey or Thailand. For example, heart surgery that costs $100,000+ in the US may cost $7,000-$15,000 in India. Costs vary by procedure, hospital, and complexity. MedPobeda provides detailed cost estimates before you travel.",
    category: "Treatment Costs",
  },
  {
    id: "cost-2",
    question: "What is included in the treatment cost?",
    answer:
      "Typically, hospital costs include surgeon fees, anesthesia, operating room charges, hospital stay (as per package), medications during stay, and post-operative follow-up. MedPobeda's coordination fees cover airport pickup, accommodation assistance, translator services, hospital coordination, and follow-up care planning.",
    category: "Treatment Costs",
  },
  {
    id: "cost-3",
    question: "Are there any hidden costs I should be aware of?",
    answer:
      "We believe in complete transparency. Some potential additional costs include: pre-operative tests (if not included), complications requiring extended stay, separate specialist consultations, personal expenses, and travel insurance. MedPobeda provides a comprehensive cost breakdown before you commit, so there are no surprises.",
    category: "Treatment Costs",
  },
  {
    id: "cost-4",
    question: "Can I get a cost estimate before traveling?",
    answer:
      "Absolutely. Share your medical reports with us, and we'll coordinate with the hospital to provide a detailed cost estimate within 48-72 hours. This estimate includes hospital charges, surgeon fees, estimated stay duration, and our coordination fees. We also provide estimates in USD, UZS, or your local currency.",
    category: "Treatment Costs",
  },
  {
    id: "cost-5",
    question: "Do Indian hospitals offer payment plans?",
    answer:
      "Many Indian hospitals offer flexible payment options, including installment plans for large procedures. Some hospitals require partial payment before treatment and the balance after. MedPobeda negotiates payment terms on your behalf and ensures they are manageable for your budget.",
    category: "Treatment Costs",
  },
  {
    id: "cost-6",
    question: "What about the cost of living during treatment?",
    answer:
      "India has a very affordable cost of living. A comfortable hotel near the hospital costs $30-80/night. Meals cost $5-15/day. Local transport is very affordable. MedPobeda helps arrange accommodation at partner hotels with special medical tourist rates, often including breakfast and laundry service.",
    category: "Treatment Costs",
  },
  {
    id: "cost-7",
    question: "Are there additional charges for international patients?",
    answer:
      "Some hospitals have separate international patient departments with premium services, which may have slightly different pricing. However, the core medical treatment costs are generally the same. MedPobeda ensures you receive fair pricing comparable to what local patients pay, with the added benefit of international patient services.",
    category: "Treatment Costs",
  },

  // ─── Hospital Selection (7 FAQs) ────────────────────────────────
  {
    id: "hospital-1",
    question: "How does MedPobeda select partner hospitals?",
    answer:
      "We partner only with hospitals that hold JCI (Joint Commission International) or NABH (National Accreditation Board for Hospitals) accreditation. We evaluate hospitals based on infrastructure, specialist expertise, international patient services, success rates, patient reviews, and hygiene standards.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-2",
    question: "Can I choose which hospital I want to go to?",
    answer:
      "Yes, absolutely. While we recommend hospitals based on your specific treatment needs, you have the final choice. We provide detailed profiles of our partner hospitals including specialties, success rates, patient reviews, and cost comparisons to help you make an informed decision.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-3",
    question: "Do partner hospitals have international patient departments?",
    answer:
      "Yes, all our partner hospitals have dedicated International Patient Departments with multilingual staff. They provide services including international admissions, visa assistance letters, language interpreters, international cuisine options, and cultural liaison services.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-4",
    question: "What if I'm not satisfied with the hospital after arrival?",
    answer:
      "Your satisfaction is our priority. If you have concerns about the hospital after arrival, MedPobeda can facilitate a transfer to another partner hospital. We work with 20+ hospitals across India, so alternatives are always available. However, we carefully match patients to hospitals beforehand to prevent this situation.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-5",
    question: "How do I know if a hospital is good for my specific treatment?",
    answer:
      "We match your treatment needs with hospitals that have proven expertise in that specific specialty. For example, Fortis Escorts for cardiology, Tata Memorial for oncology, or Apollo for multi-specialty care. We provide specialty-specific success rates, doctor credentials, and patient volume data.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-6",
    question: "Are the doctors in Indian hospitals qualified?",
    answer:
      "Indian doctors are among the most qualified in the world. Many trained at prestigious institutions in the US, UK, and Europe. Our partner hospital doctors hold MD, DM, MCh, and fellowship qualifications from recognized institutions. We provide detailed doctor profiles including qualifications, experience, and specializations.",
    category: "Hospital Selection",
  },
  {
    id: "hospital-7",
    question: "Can I get a second opinion before deciding on treatment?",
    answer:
      "Yes, and we strongly encourage it. MedPobeda offers free initial second opinion services where our medical advisors review your reports and provide preliminary guidance. We can also arrange virtual consultations with specialists at our partner hospitals before you commit to traveling.",
    category: "Hospital Selection",
  },

  // ─── Accommodation (5 FAQs) ─────────────────────────────────────
  {
    id: "accommodation-1",
    question: "Where will I stay during my treatment in India?",
    answer:
      "MedPobeda arranges accommodation near your hospital. Options range from budget-friendly guesthouses ($15-25/night) to premium hotels ($50-100/night). We partner with medical tourism-friendly accommodations that offer kitchen access, laundry, Wi-Fi, and proximity to the hospital. Family rooms are also available.",
    category: "Accommodation",
  },
  {
    id: "accommodation-2",
    question: "Can my family stay with me?",
    answer:
      "Yes, we arrange family-friendly accommodations. Many of our partner hotels offer family rooms or adjacent rooms. Hospital-based guest houses also accommodate families. The cost for family members is separate from medical costs and is typically very affordable in India.",
    category: "Accommodation",
  },
  {
    id: "accommodation-3",
    question: "Is the accommodation close to the hospital?",
    answer:
      "Yes, we prioritize accommodations within 1-3 km of the hospital. Many are within walking distance or a short auto-rickshaw ride. This ensures easy access for pre-operative visits, the surgery itself, and post-operative follow-ups.",
    category: "Accommodation",
  },
  {
    id: "accommodation-4",
    question: "What if I need long-term accommodation for extended treatment?",
    answer:
      "For treatments requiring extended stays (e.g., cancer treatment, organ transplant recovery), we arrange serviced apartments with kitchen facilities, which are more comfortable and cost-effective for long stays. Monthly rates are available at significantly discounted prices.",
    category: "Accommodation",
  },
  {
    id: "accommodation-5",
    question: "Do accommodations have medical support?",
    answer:
      "Our partner medical tourism accommodations are trained to support patients. They can help with medication reminders, meal timing for patients, and emergency contacts. For serious medical needs, we ensure you're close to the hospital for immediate access.",
    category: "Accommodation",
  },

  // ─── Travel (6 FAQs) ────────────────────────────────────────────
  {
    id: "travel-1",
    question: "How do I book flights to India?",
    answer:
      "MedPobeda can assist with flight bookings or provide guidance on the best routes. Direct flights are available from Tashkent, Almaty, Bishkek, and other Central Asian cities to Delhi, Mumbai, Chennai, or Bangalore. We recommend booking 2-3 weeks in advance for the best fares.",
    category: "Travel",
  },
  {
    id: "travel-2",
    question: "Will someone pick me up at the airport?",
    answer:
      "Yes, absolutely. MedPobeda provides complimentary airport pickup at all major Indian airports. Our representative will meet you at the arrivals hall with a name board and assist you with transfer to your accommodation or hospital. We also arrange drop-off for your return journey.",
    category: "Travel",
  },
  {
    id: "travel-3",
    question: "What is the best time to travel to India for treatment?",
    answer:
      "India is accessible year-round for medical treatment. However, the best weather is from October to March (cooler months). Summer (April-June) can be very hot, and monsoon season (July-September) brings heavy rains. Since hospital environments are climate-controlled, treatment quality is consistent throughout the year.",
    category: "Travel",
  },
  {
    id: "travel-4",
    question: "Do I need travel insurance?",
    answer:
      "While not mandatory, we strongly recommend comprehensive travel insurance that covers medical emergencies, trip cancellation, and baggage loss. Some Indian hospitals require proof of insurance or financial capability before treatment. MedPobeda can recommend suitable insurance providers.",
    category: "Travel",
  },
  {
    id: "travel-5",
    question: "What should I pack for my medical trip to India?",
    answer:
      "Pack comfortable clothing, all medical records and reports (both physical and digital copies), prescribed medications, power adapters (India uses Type C, D, and M plugs), and personal hygiene items. Leave valuables at home. We provide a detailed packing list upon booking confirmation.",
    category: "Travel",
  },
  {
    id: "travel-6",
    question: "How long should I plan to stay in India?",
    answer:
      "Duration depends on your treatment. Simple procedures may require 1-2 weeks. Complex surgeries like organ transplants may need 4-8 weeks. We provide estimated timelines after reviewing your case, including pre-op tests, surgery, recovery, and follow-up before safe travel home.",
    category: "Travel",
  },

  // ─── Language Support (4 FAQs) ──────────────────────────────────
  {
    id: "language-1",
    question: "Will there be a language barrier in India?",
    answer:
      "English is widely spoken in Indian hospitals, and most doctors are fluent in English. MedPobeda provides professional interpreters for Russian, Uzbek, Kazakh, Kyrgyz, Tajik, and Turkmen languages. Our coordinators are multilingual and accompany you throughout your stay.",
    category: "Language Support",
  },
  {
    id: "language-2",
    question: "Do your interpreters accompany me to hospital visits?",
    answer:
      "Yes, our interpreters accompany you to all hospital visits, consultations, and procedures (where permitted). They ensure clear communication between you and the medical team, help understand medical terminology, and assist with paperwork and consent forms.",
    category: "Language Support",
  },
  {
    id: "language-3",
    question: "Are medical documents translated?",
    answer:
      "Yes, MedPobeda translates all important medical documents including discharge summaries, prescriptions, test results, and treatment plans into your preferred language. This is essential for follow-up care when you return home.",
    category: "Language Support",
  },
  {
    id: "language-4",
    question: "Can I communicate with the hospital in my language?",
    answer:
      "Major Indian hospitals have multilingual support staff. Many have Russian-speaking staff given the volume of patients from CIS countries. For other languages, MedPobeda provides interpretation support via phone, video call, or in-person, ensuring nothing is lost in translation.",
    category: "Language Support",
  },

  // ─── Payment (5 FAQs) ───────────────────────────────────────────
  {
    id: "payment-1",
    question: "What payment methods do Indian hospitals accept?",
    answer:
      "Indian hospitals accept cash (INR or USD), credit/debit cards (Visa, Mastercard), bank transfers, and sometimes online payment platforms. MedPobeda helps you understand the payment process and can assist with currency exchange at favorable rates.",
    category: "Payment",
  },
  {
    id: "payment-2",
    question: "Can I pay in my local currency?",
    answer:
      "Hospitals typically bill in Indian Rupees (INR). However, some international patient departments accept USD. We help you understand the costs in your local currency using current exchange rates and advise on the most cost-effective payment method.",
    category: "Payment",
  },
  {
    id: "payment-3",
    question: "Is a deposit required before treatment?",
    answer:
      "Most hospitals require an initial deposit or advance payment before admission and treatment. The amount varies by procedure — typically 20-50% of estimated costs. MedPobeda negotiates deposit amounts and payment schedules on your behalf.",
    category: "Payment",
  },
  {
    id: "payment-4",
    question: "What if the actual cost exceeds the estimate?",
    answer:
      "This can happen in complex cases or if complications arise. We ensure you're informed about potential cost variations upfront. The hospital will communicate any additional costs during treatment. MedPobeda monitors costs and advocates for fair pricing on your behalf.",
    category: "Payment",
  },
  {
    id: "payment-5",
    question: "Do you accept payment via international bank transfer?",
    answer:
      "Yes, international wire transfers (SWIFT) are accepted by most partner hospitals. MedPobeda provides bank details and assists with the transfer process. We also help you understand any bank charges and ensure the hospital receives the correct amount.",
    category: "Payment",
  },

  // ─── Treatment Process (5 FAQs) ─────────────────────────────────
  {
    id: "treatment-1",
    question: "How does the treatment process work with MedPobeda?",
    answer:
      "Our process: 1) Share your medical reports with us. 2) We review and match you with the right hospital/specialist. 3) Receive a treatment plan and cost estimate. 4) We arrange your medical visa. 5) Airport pickup and accommodation. 6) Hospital admission and treatment. 7) Post-operative care. 8) Follow-up and return home support.",
    category: "Treatment Process",
  },
  {
    id: "treatment-2",
    question: "Can I consult with a doctor before traveling?",
    answer:
      "Yes, we arrange free or low-cost video consultations with specialists before you travel. You can discuss your condition, treatment options, expected outcomes, and costs. This helps you make an informed decision and builds confidence before your journey.",
    category: "Treatment Process",
  },
  {
    id: "treatment-3",
    question: "What happens after my treatment is complete?",
    answer:
      "After treatment, we assist with hospital discharge procedures, medication instructions, and recovery accommodation. Before you fly home, the hospital provides a detailed discharge summary. We also coordinate follow-up care plans with your local doctors and remain available for any post-treatment queries.",
    category: "Treatment Process",
  },
  {
    id: "treatment-4",
    question: "What if I need emergency medical care during my stay?",
    answer:
      "Our 24/7 support team is always available for emergencies. We have direct contacts at all partner hospitals for emergency admissions. We also provide emergency contact numbers for our coordinators and the hospital's international patient helpline.",
    category: "Treatment Process",
  },
  {
    id: "treatment-5",
    question: "How long do I need to wait for surgery after arriving?",
    answer:
      "This depends on the procedure. Many surgeries are scheduled within 2-5 days of arrival, allowing time for pre-operative tests and consultations. Emergency cases are prioritized. We coordinate with the hospital to minimize your waiting time while ensuring thorough pre-operative preparation.",
    category: "Treatment Process",
  },

  // ─── Insurance (4 FAQs) ─────────────────────────────────────────
  {
    id: "insurance-1",
    question: "Does my health insurance cover treatment in India?",
    answer:
      "Some international health insurance policies cover treatment abroad, including India. Check your policy for international coverage provisions. MedPobeda can help you understand your policy's coverage and provide documentation required by your insurance company.",
    category: "Insurance",
  },
  {
    id: "insurance-2",
    question: "Do Indian hospitals accept international insurance?",
    answer:
      "Some partner hospitals have tie-ups with international insurance companies for cashless treatment. However, many require upfront payment with reimbursement from your insurer. MedPobeda helps verify insurance acceptance and facilitates claim documentation.",
    category: "Insurance",
  },
  {
    id: "insurance-3",
    question: "What documents do I need for insurance claims?",
    answer:
      "For insurance claims, you'll need: hospital bills and receipts, discharge summary, treatment records, diagnostic reports, prescriptions, and a letter from the treating doctor. MedPobeda ensures all documentation is properly organized and translated for your insurance claim.",
    category: "Insurance",
  },
  {
    id: "insurance-4",
    question: "Can MedPobeda help with insurance pre-authorization?",
    answer:
      "Yes, we assist with insurance pre-authorization by providing required documentation, hospital quotes, and treatment justification letters to your insurance company. We communicate directly with insurers to streamline the approval process.",
    category: "Insurance",
  },

  // ─── General (5 FAQs) ───────────────────────────────────────────
  {
    id: "general-1",
    question: "Is it safe to travel to India for medical treatment?",
    answer:
      "India is one of the world's leading medical tourism destinations, with millions of international patients visiting annually. Our partner hospitals maintain international safety standards. MedPobeda ensures your safety through verified hospitals, pre-screened accommodations, and 24/7 local support.",
    category: "General",
  },
  {
    id: "general-2",
    question: "How is MedPobeda Group different from other medical tourism companies?",
    answer:
      "MedPobeda Group is uniquely positioned with: 1) Deep expertise in Central Asian patient needs. 2) Direct partnerships with 20+ accredited hospitals. 3) Multilingual support in 7 languages. 4) Dedicated coordinators from your country. 5) End-to-end service from visa to follow-up. 6) Transparent pricing with no hidden fees. 7) Regional offices across Central Asia.",
    category: "General",
  },
  {
    id: "general-3",
    question: "What countries do you serve?",
    answer:
      "We serve patients from Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and Russia. We have regional coordinators and offices in these countries to provide localized support in your language and timezone.",
    category: "General",
  },
  {
    id: "general-4",
    question: "Is my personal and medical information kept confidential?",
    answer:
      "Absolutely. MedPobeda follows strict data protection protocols. Your medical records, personal information, and treatment details are kept completely confidential. We only share information with the treating hospital and only with your explicit consent.",
    category: "General",
  },
  {
    id: "general-5",
    question: "How do I get started with MedPobeda Group?",
    answer:
      "Getting started is simple: 1) Contact us via WhatsApp, Telegram, phone, or our website form. 2) Share your medical reports and treatment needs. 3) Our medical advisors review your case within 48 hours. 4) Receive a personalized treatment plan and cost estimate. 5) If you decide to proceed, we begin coordinating your entire journey.",
    category: "General",
  },
];