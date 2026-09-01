export type PatientVideo = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  patientCountry: string;
  hospitalName: string;
  hospitalGroupSlug?: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl: string;
  posterImage: string;
};

export const homepagePatientVideo: PatientVideo = {
  id: "uzbekistan-india-treatment-review",
  youtubeId: "_vrCt_V2HkE",
  title: "🇺🇿 Oʻzbekistondan Hindistonga muvaffaqiyatli davolanish!",
  description:
    "Oʻzbekistonlik bemorning Hindistondagi davolanish tajribasi va MedPobeda Group orqali tashkil etilgan tibbiy safar haqidagi video sharhi.",
  patientCountry: "Uzbekistan",
  hospitalName: "Treatment in India",
  embedUrl: "https://www.youtube-nocookie.com/embed/_vrCt_V2HkE?rel=0",
  watchUrl: "https://youtu.be/_vrCt_V2HkE",
  thumbnailUrl:
    "https://www.medpobedagroup.uz/images/patient-stories/uzbekistan-india-treatment-review.jpg",
  posterImage: "/images/patient-stories/uzbekistan-india-treatment-review.jpg",
};

export function createPatientVideoSchema(video: PatientVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: "2026-07-16",
    embedUrl: video.embedUrl,
    inLanguage: "uz",
    publisher: {
      "@type": "Organization",
      name: "MedPobeda Group",
      url: "https://www.medpobedagroup.uz",
    },
  };
}
