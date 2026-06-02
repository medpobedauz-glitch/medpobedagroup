const fs = require('fs');
const path = require('path');

// Load source
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enRoutes = en.routes;

// Load existing partial translations for reference
const ru = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));
const uz = JSON.parse(fs.readFileSync('messages/uz.json', 'utf8'));

// Define translation patterns for each language
const translations = {
  kk: { // Kazakh - Қазақша
    prefix: 'kk',
    brand: 'MedPobeda Group',
    company: 'MedPobeda Group MCHJ',
    from: 'тан',
    inCountry: 'Үндістанда',
    and: 'және',
    support: 'қолдау',
    coordination: 'үйлестіру',
    treatment: 'емдеу',
    planning: 'жоспарлау',
    hospital: 'аурухана',
    patient: 'пациент',
    medical: 'медициналық',
    service: 'қызмет',
    partnership: 'серіктестік',
    tourism: 'туризм',
    about: 'туралы',
    contact: 'байланыс',
    blog: 'блог',
    policy: 'саясаты',
    terms: 'шарттары',
    disclaimer: 'ескерту',
    review: 'шолу',
    help: 'көмек',
    fromCountry: 'Өзбекстан',
    tashkent: 'Ташкент',
    india: 'Үндістан'
  },
  ky: { // Kyrgyz - Кыргызча
    prefix: 'ky',
    brand: 'MedPobeda Group',
    company: 'MedPobeda Group MCHJ',
    from: 'тан',
    inCountry: 'Индияда',
    and: 'жана',
    support: 'колдоо',
    coordination: 'координациялоо',
    treatment: 'дарылоо',
    planning: 'пландаштыруу',
    hospital: 'оорукана',
    patient: 'бейтап',
    medical: 'медициналық',
    service: 'кызмат',
    partnership: 'өнөктөштүк',
    tourism: 'туризм',
    about: 'жөнүндө',
    contact: 'байланыш',
    blog: 'блог',
    policy: 'саясаты',
    terms: 'шарттары',
    disclaimer: 'эскертүү',
    review: 'карап чыгуу',
    help: 'жардам',
    fromCountry: 'Өзбекстан',
    tashkent: 'Ташкент',
    india: 'Индия'
  },
  tg: { // Tajik - Тоҷикӣ
    prefix: 'tg',
    brand: 'MedPobeda Group',
    company: 'MedPobeda Group MCHJ',
    from: 'аз',
    inCountry: 'Ҳиндустон',
    and: 'ва',
    support: 'дастгирӣ',
    coordination: 'ҳамоҳангсозӣ',
    treatment: 'табобат',
    planning: 'банақшагирӣ',
    hospital: 'беморхона',
    patient: 'бемор',
    medical: 'тиббӣ',
    service: 'хизмат',
    partnership: 'шарикӣ',
    tourism: 'туризм',
    about: 'дар бораи',
    contact: 'тамос',
    blog: 'блог',
    policy: 'сиёсат',
    terms: 'шартҳо',
    disclaimer: 'раддия',
    review: 'баррасӣ',
    help: 'кӯмак',
    fromCountry: 'Ӯзбекистон',
    tashkent: 'Тошкент',
    india: 'Ҳиндустон'
  },
  tk: { // Turkmen - Türkmençe
    prefix: 'tk',
    brand: 'MedPobeda Group',
    company: 'MedPobeda Group MCHJ',
    from: 'dan',
    inCountry: 'Hindistanda',
    and: 'we',
    support: 'goldaw',
    coordination: 'utgaşdyrmak',
    treatment: 'bejergi',
    planning: 'meýilleşdirmek',
    hospital: 'hassahana',
    patient: 'hassa',
    medical: 'lukmançylyk',
    service: 'hyzmat',
    partnership: 'hyzmatdaşlyk',
    tourism: 'syýahatçylyk',
    about: 'barada',
    contact: 'habarlaşmak',
    blog: 'blog',
    policy: 'syýasaty',
    terms: 'şertleri',
    disclaimer: 'bellik',
    review: 'gözden geçirmek',
    help: 'kömek',
    fromCountry: 'Özbegistan',
    tashkent: 'Daşkent',
    india: 'Hindistan'
  }
};

// Helper to get translation for a specific route key based on language patterns
function translateStr(text, lang, langCode) {
  const t = translations[langCode];
  if (!text) return text;
  if (text.includes('TODO')) return text; // skip if already tagged

  // Brand names stay as-is
  if (text.includes('MedPobeda Group')) return text;
  if (text.includes('KIMS Hospitals')) return text;
  if (text.includes('MCHJ')) return text;
  if (text === 'MedPobeda Group') return text;

  // For keyword arrays - keep brand terms as-is, translate rest
  return null; // null means use the English text for brand/specific terms
}

// Generate routes section for a given language
function generateRoutes(langCode, existingRoutes = null) {
  const t = translations[langCode];
  const result = {};

  for (const [key, val] of Object.entries(enRoutes)) {
    // Check if existing translation has non-TODO content
    const existing = existingRoutes ? existingRoutes[key] : null;
    const hasValid = existing && !JSON.stringify(existing).includes('TODO');
    
    if (hasValid) {
      result[key] = existing;
    } else {
      // Generate new translation
      result[key] = generateRouteEntry(key, val, langCode, t);
    }
  }
  return result;
}

function generateRouteEntry(key, enVal, langCode, t) {
  const titleEn = enVal.title;
  const descEn = enVal.description;
  const keywordsEn = enVal.keywords;
  const ogTitleEn = enVal.openGraphTitle;
  const ogDescEn = enVal.openGraphDescription;

  // For keywords, we keep the first few tokens in English (brand names) 
  // and translate language-specific terms
  const translatedKeywords = keywordsEn.map(kw => {
    // Keep brand terms, locations, proper nouns
    if (kw.includes('MedPobeda') || kw.includes('KIMS') || kw === 'India' || kw === 'Uzbekistan') {
      return kw;
    }
    return null; // will be translated
  });

  // Build specific translations per route key
  const routeData = getRouteTranslation(key, langCode, t);
  return routeData;
}

function getRouteTranslation(key, langCode, t) {
  // These come from the English reference - generate per language
  const kk = langCode === 'kk';
  const ky = langCode === 'ky';
  const tg = langCode === 'tg';
  const tk = langCode === 'tk';

  switch(key) {
    case 'home':
      return kk ? {
        title: 'MedPobeda Group | Медициналық туризм және денсаулық сақтау серіктестіктері Өзбекстанда',
        description: 'MedPobeda Group — Ташкентте орналасқан денсаулық сақтау серіктестік платформасы. Ол Өзбекстан, Үндістан және халықаралық медициналық мекемелер арасындағы медициналық туризмді, халықаралық пациенттерге көмекті, аурухана серіктестіктерін және студенттік ұтқырлықты қолдайды.',
        keywords: ['MedPobeda Group', 'Медициналық туризм', 'Серіктестіктер', 'Халықаралық пациенттер', 'Студенттік ұтқырлық'],
        openGraphTitle: 'MedPobeda Group | Медициналық туризм және денсаулық сақтау серіктестіктері Өзбекстанда',
        openGraphDescription: 'MedPobeda Group — Ташкентте орналасқан денсаулық сақтау серіктестік платформасы.'
      } : ky ? {
        title: 'MedPobeda Group | Медициналык туризм жана саламаттык сактоо өнөктөштүктөрү Өзбекстанда',
        description: 'MedPobeda Group — Ташкентте жайгашкан саламаттык сактоо кызматташтык платформасы. Ал Өзбекстан, Индия жана эл аралык медициналык мекемелердин ортосунда медициналык туризмди, эл аралык бейтаптарга жардамды, оорукана өнөктөштүктөрүн жана студенттик мобилдүүлүктү колдойт.',
        keywords: ['MedPobeda Group', 'Медициналык туризм', 'Өнөктөштүктөр', 'Эл аралык бейтаптар', 'Студенттик мобилдүүлүк'],
        openGraphTitle: 'MedPobeda Group | Медициналык туризм жана саламаттык сактоо өнөктөштүктөрү Өзбекстанда',
        openGraphDescription: 'MedPobeda Group — Ташкентте жайгашкан саламаттык сактоо кызматташтык платформасы.'
      } : tg ? {
        title: 'MedPobeda Group | Туризми тиббӣ ва шарикиҳои соҳаи тандурустӣ дар Ӯзбекистон',
        description: 'MedPobeda Group — платформаи ҳамкории соҳаи тандурустӣ дар Тошкент. Он туризми тиббӣ, кӯмак ба беморони байналмилалӣ, шарикии беморхонаҳо ва мобилии донишҷӯёнро байни Ӯзбекистон, Ҳиндустон ва муассисаҳои байналмилалии тиббӣ дастгирӣ мекунад.',
        keywords: ['MedPobeda Group', 'Туризми тиббӣ', 'Шарикиҳо', 'Беморони байналмилалӣ', 'Мобилияти донишҷӯён'],
        openGraphTitle: 'MedPobeda Group | Туризми тиббӣ ва шарикиҳои соҳаи тандурустӣ дар Ӯзбекистон',
        openGraphDescription: 'MedPobeda Group — платформаи ҳамкории соҳаи тандурустӣ дар Тошкент.'
      } : tk ? {
        title: 'MedPobeda Group | Lukmançylyk syýahatçylygy we saglygy goraýyş hyzmatdaşlyklary Özbegistanda',
        description: 'MedPobeda Group — Daşkentde ýerleşýän saglygy goraýyş hyzmatdaşlyk platformasy. Ol Özbegistan, Hindistan we halkara lukmançylyk edaralarynyň arasynda lukmançylyk syýahatçylygyny, halkara näsaglara kömegi, hassahana hyzmatdaşlyklaryny we talyp hereketliligini goldaýar.',
        keywords: ['MedPobeda Group', 'Lukmançylyk syýahatçylygy', 'Hyzmatdaşlyklar', 'Halkara näsaglar', 'Talyp hereketliligi'],
        openGraphTitle: 'MedPobeda Group | Lukmançylyk syýahatçylygy we saglygy goraýyş hyzmatdaşlyklary Özbegistanda',
        openGraphDescription: 'MedPobeda Group — Daşkentde ýerleşýän saglygy goraýyş hyzmatdaşlyk platformasy.'
      } : null;

    case 'about':
      return kk ? {
        title: 'MedPobeda Group туралы',
        description: 'MedPobeda Group-тың халықаралық денсаулық сақтау ынтымақтастығы моделімен танысыңыз.',
        keywords: ['MedPobeda Group', 'Біз туралы', 'Серіктестіктер', 'Халықаралық пациенттер', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'MedPobeda Group туралы',
        openGraphDescription: 'MedPobeda Group-тың халықаралық денсаулық сақтау ынтымақтастығы моделімен танысыңыз.'
      } : ky ? {
        title: 'MedPobeda Group жөнүндө',
        description: 'MedPobeda Groupтун эл аралык саламаттык сактоо кызматташуу модели менен таанышыңыз.',
        keywords: ['MedPobeda Group', 'Биз жөнүндө', 'Өнөктөштүктөр', 'Эл аралык бейтаптар', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'MedPobeda Group жөнүндө',
        openGraphDescription: 'MedPobeda Groupтун эл аралык саламаттык сактоо кызматташуу модели менен таанышыңыз.'
      } : tg ? {
        title: 'Дар бораи MedPobeda Group',
        description: 'Бо модели ҳамкории байналмилалии тиббии MedPobeda Group шинос шавед.',
        keywords: ['MedPobeda Group', 'Дар бораи мо', 'Шарикиҳо', 'Беморони байналмилалӣ', 'Тошкент, Ӯзбекистон'],
        openGraphTitle: 'Дар бораи MedPobeda Group',
        openGraphDescription: 'Бо модели ҳамкории байналмилалии тиббии MedPobeda Group шинос шавед.'
      } : tk ? {
        title: 'MedPobeda Group barada',
        description: 'MedPobeda Group-yň halkara saglygy goraýyş hyzmatdaşlyk modeli bilen tanyşyň.',
        keywords: ['MedPobeda Group', 'Biz barada', 'Hyzmatdaşlyklar', 'Halkara näsaglar', 'Daşkent, Özbegistan'],
        openGraphTitle: 'MedPobeda Group barada',
        openGraphDescription: 'MedPobeda Group-yň halkara saglygy goraýyş hyzmatdaşlyk modeli bilen tanyşyň.'
      } : null;

    case 'services':
      return kk ? {
        title: 'Денсаулық сақтау қызметтері',
        description: 'MedPobeda Group-тың медициналық туризм, аурухана серіктестігі және пациенттерді қолдау қызметтерімен танысыңыз.',
        keywords: ['MedPobeda Group', 'Медициналық туризм', 'Серіктестіктер', 'Халықаралық пациенттер', 'Студенттік ұтқырлық'],
        openGraphTitle: 'Денсаулық сақтау қызметтері',
        openGraphDescription: 'MedPobeda Group-тың медициналық туризм, аурухана серіктестігі және пациенттерді қолдау қызметтерімен танысыңыз.'
      } : ky ? {
        title: 'Саламаттык сактоо кызматтары',
        description: 'MedPobeda Groupтун медициналык туризм, оорукана өнөктөштүгү жана бейтаптарды колдоо кызматтарын караңыз.',
        keywords: ['MedPobeda Group', 'Медициналык туризм', 'Өнөктөштүктөр', 'Эл аралык бейтаптар', 'Студенттик мобилдүүлүк'],
        openGraphTitle: 'Саламаттык сактоо кызматтары',
        openGraphDescription: 'MedPobeda Groupтун медициналык туризм, оорукана өнөктөштүгү жана бейтаптарды колдоо кызматтарын караңыз.'
      } : tg ? {
        title: 'Хизматҳои тандурустӣ',
        description: 'Хизматҳои MedPobeda Group дар соҳаи туризми тиббӣ, ҳамкории беморхонаҳо ва дастгирии беморонро омӯзед.',
        keywords: ['MedPobeda Group', 'Туризми тиббӣ', 'Шарикиҳо', 'Беморони байналмилалӣ', 'Мобилияти донишҷӯён'],
        openGraphTitle: 'Хизматҳои тандурустӣ',
        openGraphDescription: 'Хизматҳои MedPobeda Group дар соҳаи туризми тиббӣ, ҳамкории беморхонаҳо ва дастгирии беморонро омӯзед.'
      } : tk ? {
        title: 'Saglygy goraýyş hyzmatlary',
        description: 'MedPobeda Group-yň medisina turizmi, hassahana hyzmatdaşlygy we hassa goldawy hyzmatlaryny öwreniň.',
        keywords: ['MedPobeda Group', 'Medisina turizmi', 'Hyzmatdaşlyklar', 'Halkara näsaglar', 'Talyp hereketliligi'],
        openGraphTitle: 'Saglygy goraýyş hyzmatlary',
        openGraphDescription: 'MedPobeda Group-yň medisina turizmi, hassahana hyzmatdaşlygy we hassa goldawy hyzmatlaryny öwreniň.'
      } : null;

    case 'medical-tourism':
      return kk ? {
        title: 'Медициналық туризмді үйлестіру',
        description: 'Емдеуді жоспарлау, аурухананы таңдау, сапарға дайындық және пациентті қолдау.',
        keywords: ['MedPobeda Group', 'Медициналық туризм', 'Халықаралық пациенттер', 'Ташкент, Өзбекстан', 'Үндістан'],
        openGraphTitle: 'Медициналық туризмді үйлестіру',
        openGraphDescription: 'Емдеуді жоспарлау, аурухананы таңдау, сапарға дайындық және пациентті қолдау.'
      } : ky ? {
        title: 'Медициналык туризмди координациялоо',
        description: 'Дарылоону пландаштыруу, оорукана тандоо, сапарга даярдык жана бейтапты колдоо.',
        keywords: ['MedPobeda Group', 'Медициналык туризм', 'Эл аралык бейтаптар', 'Ташкент, Өзбекстан', 'Индия'],
        openGraphTitle: 'Медициналык туризмди координациялоо',
        openGraphDescription: 'Дарылоону пландаштыруу, оорукана тандоо, сапарга даярдык жана бейтапты колдоо.'
      } : tg ? {
        title: 'Ҳамоҳангсозии туризми тиббӣ',
        description: 'Банақшагирии табобат, интихоби беморхона, омодагӣ ба сафар ва дастгирии бемор.',
        keywords: ['MedPobeda Group', 'Туризми тиббӣ', 'Беморони байналмилалӣ', 'Тошкент, Ӯзбекистон', 'Ҳиндустон'],
        openGraphTitle: 'Ҳамоҳангсозии туризми тиббӣ',
        openGraphDescription: 'Банақшагирии табобат, интихоби беморхона, омодагӣ ба сафар ва дастгирии бемор.'
      } : tk ? {
        title: 'Medisina turizmini utgaşdyrmak',
        description: 'Bejergini meýilleşdirmek, hassahana saýlamak, syýahata taýýarlyk we hassa goldawy.',
        keywords: ['MedPobeda Group', 'Medisina turizmi', 'Halkara näsaglar', 'Daşkent, Özbegistan', 'Hindistan'],
        openGraphTitle: 'Medisina turizmini utgaşdyrmak',
        openGraphDescription: 'Bejergini meýilleşdirmek, hassahana saýlamak, syýahata taýýarlyk we hassa goldawy.'
      } : null;

    case 'hospital-partnerships':
      return kk ? {
        title: 'Аурухана серіктестіктері',
        description: 'Институционалдық ынтымақтастық, пациент жіберу бағыттары және халықаралық аурухана серіктестігі.',
        keywords: ['MedPobeda Group', 'Серіктестіктер', 'Ауруханалар', 'Медициналық туризм', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'Аурухана серіктестіктері',
        openGraphDescription: 'Институционалдық ынтымақтастық, пациент жіберу бағыттары және халықаралық аурухана серіктестігі.'
      } : ky ? {
        title: 'Оорукана өнөктөштүктөрү',
        description: 'Институционалдык кызматташуу, бейтаптарды жөнөтүү багыттары жана эл аралык оорукана өнөктөштүгү.',
        keywords: ['MedPobeda Group', 'Өнөктөштүктөр', 'Ооруканалар', 'Медициналык туризм', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'Оорукана өнөктөштүктөрү',
        openGraphDescription: 'Институционалдык кызматташуу, бейтаптарды жөнөтүү багыттары жана эл аралык оорукана өнөктөштүгү.'
      } : tg ? {
        title: 'Шарикӣ бо беморхонаҳо',
        description: 'Ҳамкории институтсионалӣ, роҳҳои равонакунии беморон ва шарикӣ бо беморхонаҳои байналмилалӣ.',
        keywords: ['MedPobeda Group', 'Шарикиҳо', 'Беморхонаҳо', 'Туризми тиббӣ', 'Тошкент, Ӯзбекистон'],
        openGraphTitle: 'Шарикӣ бо беморхонаҳо',
        openGraphDescription: 'Ҳамкории институтсионалӣ, роҳҳои равонакунии беморон ва шарикӣ бо беморхонаҳои байналмилалӣ.'
      } : tk ? {
        title: 'Hassahana hyzmatdaşlyklary',
        description: 'Institusional hyzmatdaşlyk, hassa ugradyş ugurlary we halkara hassahana hyzmatdaşlygy.',
        keywords: ['MedPobeda Group', 'Hyzmatdaşlyklar', 'Hassahanalar', 'Medisina turizmi', 'Daşkent, Özbegistan'],
        openGraphTitle: 'Hassahana hyzmatdaşlyklary',
        openGraphDescription: 'Institusional hyzmatdaşlyk, hassa ugradyş ugurlary we halkara hassahana hyzmatdaşlygy.'
      } : null;

    case 'international-patients':
      return kk ? {
        title: 'Халықаралық пациенттерді қолдау',
        description: 'Халықаралық пациенттер үшін құжаттарды қарау, емдеуді жоспарлау және байланыс үйлестіруі.',
        keywords: ['MedPobeda Group', 'Халықаралық пациенттер', 'Медициналық туризм', 'Ташкент, Өзбекстан', 'Үндістан'],
        openGraphTitle: 'Халықаралық пациенттерді қолдау',
        openGraphDescription: 'Халықаралық пациенттер үшін құжаттарды қарау, емдеуді жоспарлау және байланыс үйлестіруі.'
      } : ky ? {
        title: 'Эл аралык бейтаптарды колдоо',
        description: 'Эл аралык бейтаптар үчүн документтерди кароо, дарылоону пландаштыруу жана байланыш координациясы.',
        keywords: ['MedPobeda Group', 'Эл аралык бейтаптар', 'Медициналык туризм', 'Ташкент, Өзбекстан', 'Индия'],
        openGraphTitle: 'Эл аралык бейтаптарды колдоо',
        openGraphDescription: 'Эл аралык бейтаптар үчүн документтерди кароо, дарылоону пландаштыруу жана байланыш координациясы.'
      } : tg ? {
        title: 'Дастгирии беморони байналмилалӣ',
        description: 'Баррасии ҳуҷҷатҳо, банақшагирии табобат ва ҳамоҳангсозии иртибот барои беморони байналмилалӣ.',
        keywords: ['MedPobeda Group', 'Беморони байналмилалӣ', 'Туризми тиббӣ', 'Тошкент, Ӯзбекистон', 'Ҳиндустон'],
        openGraphTitle: 'Дастгирии беморони байналмилалӣ',
        openGraphDescription: 'Баррасии ҳуҷҷатҳо, банақшагирии табобат ва ҳамоҳангсозии иртибот барои беморони байналмилалӣ.'
      } : tk ? {
        title: 'Halkara hassalary goldamak',
        description: 'Halkara hassalar üçin resminamalary gözden geçirmek, bejergini meýilleşdirmek we aragatnaşyk utgaşdyrylyşy.',
        keywords: ['MedPobeda Group', 'Halkara näsaglar', 'Medisina turizmi', 'Daşkent, Özbegistan', 'Hindistan'],
        openGraphTitle: 'Halkara hassalary goldamak',
        openGraphDescription: 'Halkara hassalar üçin resminamalary gözden geçirmek, bejergini meýilleşdirmek we aragatnaşyk utgaşdyrylyşy.'
      } : null;

    case 'student-mobility':
      return kk ? {
        title: 'Студенттік мобильділік',
        description: 'Халықаралық академиялық бағыттар үшін студенттік мобильділік және үйлестіру қолдауы.',
        keywords: ['MedPobeda Group', 'Студенттік мобильділік', 'Біз туралы', 'Серіктестіктер', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'Студенттік мобильділік',
        openGraphDescription: 'Халықаралық академиялық бағыттар үшін студенттік мобильділік және үйлестіру қолдауы.'
      } : ky ? {
        title: 'Студенттик мобилдүүлүк',
        description: 'Эл аралык академиялык багыттар үчүн студенттик мобилдүүлүк жана координациялык колдоо.',
        keywords: ['MedPobeda Group', 'Студенттик мобилдүүлүк', 'Биз жөнүндө', 'Өнөктөштүктөр', 'Ташкент, Өзбекстан'],
        openGraphTitle: 'Студенттик мобилдүүлүк',
        openGraphDescription: 'Эл аралык академиялык багыттар үчүн студенттик мобилдүүлүк жана координациялык колдоо.'
      } : tg ? {
        title: 'Мобилияти донишҷӯён',
        description: 'Дастгирии мобилияти донишҷӯён ва ҳамоҳангсозии роҳҳои байналмилалии академӣ.',
        keywords: ['MedPobeda Group', 'Мобилияти донишҷӯён', 'Дар бораи мо', 'Шарикиҳо', 'Тошкент, Ӯзбекистон'],
        openGraphTitle: 'Мобилияти донишҷӯён',
        openGraphDescription: 'Дастгирии мобилияти донишҷӯён ва ҳамоҳангсозии роҳҳои байналмилалии академӣ.'
      } : tk ? {
        title: 'Talyp hereketliligi',
        description: 'Halkara akademiki ugurlar üçin talyp hereketliligi we utgaşdyryş goldawy.',
        keywords: ['MedPobeda Group', 'Talyp hereketliligi', 'Biz barada', 'Hyzmatdaşlyklar', 'Daşkent, Özbegistan'],
        openGraphTitle: 'Talyp hereketliligi',
        openGraphDescription: 'Halkara akademiki ugurlar üçin talyp hereketliligi we utgaşdyryş goldawy.'
      } : null;

    case 'contact':
      return kk ? {
        title: 'MedPobeda Group-пен байланыс',
        description: 'Медициналық серіктестік, емдеуді үйлестіру және пациенттерді қолдау бойынша MedPobeda Group-пен байланысыңыз.',
        keywords: ['MedPobeda Group', 'Байланыс', 'Медициналық туризм', 'Серіктестіктер', 'Халықаралық пациенттер'],
        openGraphTitle: 'MedPobeda Group-пен байланыс',
        openGraphDescription: 'Медициналық серіктестік, емдеуді үйлестіру және пациенттерді қолдау бойынша MedPobeda Group-пен байланысыңыз.'
      } : ky ? {
        title: 'MedPobeda Group менен байланыш',
        description: 'Медициналык өнөктөштүк, дарылоо координациясы жана бейтаптарды колдоо боюнча MedPobeda Group менен байланышыңыз.',
        keywords: ['MedPobeda Group', 'Байланыш', 'Медициналык туризм', 'Өнөктөштүктөр', 'Эл аралык бейтаптар'],
        openGraphTitle: 'MedPobeda Group менен байланыш',
        openGraphDescription: 'Медициналык өнөктөштүк, дарылоо координациясы жана бейтаптарды колдоо боюнча MedPobeda Group менен байланышыңыз.'
      } : tg ? {
        title: 'Тамос бо MedPobeda Group',
        description: 'Барои ҳамкории тиббӣ, ҳамоҳангсозии табобат ва дастгирии беморон бо MedPobeda Group тамос гиред.',
        keywords: ['MedPobeda Group', 'Тамос', 'Туризми тиббӣ', 'Шарикиҳо', 'Беморони байналмилалӣ'],
        openGraphTitle: 'Тамос бо MedPobeda Group',
        openGraphDescription: 'Барои ҳамкории тиббӣ, ҳамоҳангсозии табобат ва дастгирии беморон бо MedPobeda Group тамос гиред.'
      } : tk ? {
        title: 'MedPobeda Group bilen habarlaşmak',
        description: 'Medisina hyzmatdaşlygy, bejergi utgaşdyrylyşy we hassa goldawy boýunça MedPobeda Group bilen habarlaşyň.',
        keywords: ['MedPobeda Group', 'Habarlaşmak', 'Medisina turizmi', 'Hyzmatdaşlyklar', 'Halkara näsaglar'],
        openGraphTitle: 'MedPobeda Group bilen habarlaşmak',
        openGraphDescription: 'Medisina hyzmatdaşlygy, bejergi utgaşdyrylyşy we hassa goldawy boýunça MedPobeda Group bilen habarlaşyň.'
      } : null;

    case 'blog':
      return kk ? {
        title: 'MedPobeda Group блогы | Медициналық туризм және денсаулық сақтау мақалалары',
        description: 'MedPobeda Group блогында медициналық туризм, Үндістанда емдеуді жоспарлау, аурухана серіктестіктері және халықаралық пациенттер туралы мақалаларды оқыңыз.',
        keywords: ['MedPobeda Group блогы', 'Медициналық туризм мақалалары', 'Үндістанда емдеу жөніндегі нұсқаулық', 'Халықаралық пациенттер мақалалары', 'Аурухана серіктестігі туралы түсініктер'],
        openGraphTitle: 'MedPobeda Group блогы | Медициналық туризм және денсаулық сақтау мақалалары',
        openGraphDescription: 'Ташкенттегі MedPobeda Group компаниясының медициналық туризм, емдеуді жоспарлау және денсаулық сақтау серіктестігі туралы түсініктері.'
      } : ky ? {
        title: 'MedPobeda Group блогу | Медициналык туризм жана саламаттык сактоо макалалары',
        description: 'MedPobeda Group блогунда медициналык туризм, Индияда дарылоону пландаштыруу, оорукана өнөктөштүктөрү жана эл аралык бейтаптар жөнүндө макалаларды окуңуз.',
        keywords: ['MedPobeda Group блогу', 'Медициналык туризм макалалары', 'Индияда дарылоо боюнча нускама', 'Эл аралык бейтаптар макалалары', 'Оорукана өнөктөштүгү түшүнүктөрү'],
        openGraphTitle: 'MedPobeda Group блогу | Медициналык туризм жана саламаттык сактоо макалалары',
        openGraphDescription: 'Ташкенттеги MedPobeda Group компаниясынын медициналык туризм, дарылоону пландаштыруу жана саламаттык сактоо өнөктөштүгү боюнча түшүнүктөрү.'
      } : tg ? {
        title: 'Блоги MedPobeda Group | Туризми тиббӣ ва мақолаҳои соҳаи тандурустӣ',
        description: 'Мақолаҳои MedPobeda Group-ро дар бораи туризми тиббӣ, банақшагирии табобат дар Ҳиндустон, шарикии беморхонаҳо ва беморони байналмилалӣ хонед.',
        keywords: ['Блоги MedPobeda Group', 'Мақолаҳои туризми тиббӣ', 'Роҳнамои табобат дар Ҳиндустон', 'Мақолаҳои беморони байналмилалӣ', 'Фаҳмишҳои шарикии беморхона'],
        openGraphTitle: 'Блоги MedPobeda Group | Туризми тиббӣ ва мақолаҳои соҳаи тандурустӣ',
        openGraphDescription: 'Фаҳмишҳои туризми тиббӣ, банақшагирии табобат ва шарикии соҳаи тандурустӣ аз MedPobeda Group дар Тошкент.'
      } : tk ? {
        title: 'MedPobeda Group blogy | Medisina turizmi we saglygy goraýyş makalalary',
        description: 'MedPobeda Group blogynda medisina turizmi, Hindistanda bejergini meýilleşdirmek, hassahana hyzmatdaşlyklary we halkara näsaglar hakynda makalalary okaň.',
        keywords: ['MedPobeda Group blogy', 'Medisina turizmi makalalary', 'Hindistanda bejergi boýunça görkezme', 'Halkara näsaglar makalalary', 'Hassahana hyzmatdaşlygy düşünjeleri'],
        openGraphTitle: 'MedPobeda Group blogy | Medisina turizmi we saglygy goraýyş makalalary',
        openGraphDescription: 'Daşkentdäki MedPobeda Group tarapyndan medisina turizmi, bejergini meýilleşdirmek we saglygy goraýyş hyzmatdaşlygy barada düşünjeler.'
      } : null;

    case 'privacy-policy':
      return kk ? {
        title: 'Құпиялылық саясаты',
        description: 'MedPobeda Group-тың медициналық сұраулар мен операциялық байланыстар бойынша құпиялылық саясатын қараңыз.',
        keywords: ['MedPobeda Group', 'Құпиялылық саясаты', 'Байланыс'],
        openGraphTitle: 'Құпиялылық саясаты',
        openGraphDescription: 'MedPobeda Group-тың медициналық сұраулар мен операциялық байланыстар бойынша құпиялылық саясатын қараңыз.'
      } : ky ? {
        title: 'Купуялык саясаты',
        description: 'MedPobeda Groupтун медициналык суроолор жана операциялык байланыштар боюнча купуялык саясатын караңыз.',
        keywords: ['MedPobeda Group', 'Купуялык саясаты', 'Байланыш'],
        openGraphTitle: 'Купуялык саясаты',
        openGraphDescription: 'MedPobeda Groupтун медициналык суроолор жана операциялык байланыштар боюнча купуялык саясатын караңыз.'
      } : tg ? {
        title: 'Сиёсати махфият',
        description: 'Сиёсати махфияти MedPobeda Group-ро дар бораи дархостҳои тиббӣ ва иртиботи амалиётӣ баррасӣ кунед.',
        keywords: ['MedPobeda Group', 'Сиёсати махфият', 'Тамос'],
        openGraphTitle: 'Сиёсати махфият',
        openGraphDescription: 'Сиёсати махфияти MedPobeda Group-ро дар бораи дархостҳои тиббӣ ва иртиботи амалиётӣ баррасӣ кунед.'
      } : tk ? {
        title: 'Gizlinlik syýasaty',
        description: 'MedPobeda Group-yň lukmançylyk soraglary we amaly aragatnaşyklar baradaky gizlinlik syýasatyny gözden geçiriň.',
        keywords: ['MedPobeda Group', 'Gizlinlik syýasaty', 'Habarlaşmak'],
        openGraphTitle: 'Gizlinlik syýasaty',
        openGraphDescription: 'MedPobeda Group-yň lukmançylyk soraglary we amaly aragatnaşyklar baradaky gizlinlik syýasatyny gözden geçiriň.'
      } : null;

    case 'terms':
      return kk ? {
        title: 'Пайдалану шарттары',
        description: 'MedPobeda Group сайты мен үйлестіру қызметтерін пайдалану шарттарын қараңыз.',
        keywords: ['MedPobeda Group', 'Пайдалану шарттары', 'Байланыс'],
        openGraphTitle: 'Пайдалану шарттары',
        openGraphDescription: 'MedPobeda Group сайты мен үйлестіру қызметтерін пайдалану шарттарын қараңыз.'
      } : ky ? {
        title: 'Колдонуу шарттары',
        description: 'MedPobeda Group сайтын жана координациялык кызматтарды колдонуу шарттарын караңыз.',
        keywords: ['MedPobeda Group', 'Колдонуу шарттары', 'Байланыш'],
        openGraphTitle: 'Колдонуу шарттары',
        openGraphDescription: 'MedPobeda Group сайтын жана координациялык кызматтарды колдонуу шарттарын караңыз.'
      } : tg ? {
        title: 'Шартҳои истифода',
        description: 'Шартҳои истифодаи сомонаи MedPobeda Group ва хизматҳои ҳамоҳангсозиро баррасӣ кунед.',
        keywords: ['MedPobeda Group', 'Шартҳои истифода', 'Тамос'],
        openGraphTitle: 'Шартҳои истифода',
        openGraphDescription: 'Шартҳои истифодаи сомонаи MedPobeda Group ва хизматҳои ҳамоҳангсозиро баррасӣ кунед.'
      } : tk ? {
        title: 'Ulanyş şertleri',
        description: 'MedPobeda Group web sahypasyny we utgaşdyryş hyzmatlaryny ulanmagyň şertlerini gözden geçiriň.',
        keywords: ['MedPobeda Group', 'Ulanyş şertleri', 'Habarlaşmak'],
        openGraphTitle: 'Ulanyş şertleri',
        openGraphDescription: 'MedPobeda Group web sahypasyny we utgaşdyryş hyzmatlaryny ulanmagyň şertlerini gözden geçiriň.'
      } : null;

    case 'treatment-in-india':
      return kk ? {
        title: 'Өзбекстаннан Үндістанда емдеу',
        description: 'MedPobeda Group Өзбекстан және Орталық Азия пациенттеріне Үндістанда емдеуді жоспарлауға көмектеседі.',
        keywords: ['Өзбекстаннан Үндістанда емдеу', 'Өзбекстаннан Үндістанға медициналық туризм', 'Үндістан ауруханасына қол жеткізу', 'Үндістанда халықаралық пациенттерді қолдау', 'MedPobeda Үндістанда емдеу'],
        openGraphTitle: 'Өзбекстаннан Үндістанда емдеу | MedPobeda Group',
        openGraphDescription: 'Өзбекстан мен Орталық Азиядан Үндістанда емдеу үшін пациенттер сұрауларын өңдеу, ауруханамен байланыс және сапар бойынша нұсқаулық.'
      } : ky ? {
        title: 'Өзбекстандан Индияда дарылоо',
        description: 'MedPobeda Group Өзбекстан жана Борбордук Азиядагы бейтаптарга Индияда дарылоону пландаштырууга жардам берет.',
        keywords: ['Өзбекстандан Индияда дарылоо', 'Өзбекстандан Индияга медициналык туризм', 'Индия ооруканасына жетүү', 'Индияда эл аралык бейтаптарды колдоо', 'MedPobeda Индияда дарылоо'],
        openGraphTitle: 'Өзбекстандан Индияда дарылоо | MedPobeda Group',
        openGraphDescription: 'Өзбекстан жана Борбордук Азиядан Индияда дарылоо үчүн бейтап суроолорун иштетүү, оорукана менен байланыш жана сапар боюнча нускама.'
      } : tg ? {
        title: 'Табобат дар Ҳиндустон аз Ӯзбекистон',
        description: 'MedPobeda Group ба беморони Ӯзбекистон ва Осиёи Марказӣ дар банақшагирии табобат дар Ҳиндустон кӯмак мекунад.',
        keywords: ['Табобат дар Ҳиндустон аз Ӯзбекистон', 'Туризми тиббӣ Ҳиндустон аз Ӯзбекистон', 'Дастрасӣ ба беморхонаи Ҳиндустон', 'Дастгирии беморони байналмилалӣ дар Ҳиндустон', 'MedPobeda табобат дар Ҳиндустон'],
        openGraphTitle: 'Табобат дар Ҳиндустон аз Ӯзбекистон | MedPobeda Group',
        openGraphDescription: 'Коркарди дархостҳои беморон, иртибот бо беморхона ва роҳнамоии сафар барои табобат дар Ҳиндустон.'
      } : tk ? {
        title: 'Özbegistandan Hindistanda bejergi',
        description: 'MedPobeda Group Özbegistan we Merkezi Aziýa näsaglaryna Hindistanda bejergini meýilleşdirmäge kömek edýär.',
        keywords: ['Özbegistandan Hindistanda bejergi', 'Özbegistandan Hindistana medisina syýahatçylygy', 'Hindistan hassahanasyna girme', 'Hindistanda halkara näsaglary goldamak', 'MedPobeda Hindistanda bejergi'],
        openGraphTitle: 'Özbegistandan Hindistanda bejergi | MedPobeda Group',
        openGraphDescription: 'Özbegistan we Merkezi Aziýadan Hindistanda bejergi üçin näsag soraglaryny işlemek, hassahana bilen aragatnaşyk we syýahat boýunça görkezme.'
      } : null;

    default: {
      // For route keys that aren't explicitly translated above,
      // check if there's already a translated version in the file (non-TODO)
      return null; // Will be handled in the main merge
    }
  }
}

// Build and write files
function processLanguage(langCode) {
  const filePath = `messages/${langCode}.json`;
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Generate new routes
  const newRoutes = generateRoutes(langCode, content.routes);
  
  // Merge: if newRoutes provides a key, use it; otherwise keep existing
  const mergedRoutes = {};
  for (const [key, val] of Object.entries(content.routes)) {
    if (newRoutes[key]) {
      mergedRoutes[key] = newRoutes[key];
    } else {
      mergedRoutes[key] = val;
    }
  }
  
  content.routes = mergedRoutes;
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`✓ Updated ${langCode}.json`);
}

// Process all 4 languages
['kk', 'ky', 'tg', 'tk'].forEach(processLanguage);
console.log('Done!');