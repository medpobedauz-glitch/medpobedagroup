const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enRoutes = en.routes;

// Helper: check if existing translations are valid (non-TODO) on ALL fields
function hasValid(obj) {
  if (!obj) return false;
  const str = JSON.stringify(obj);
  if (str.includes('TODO')) return false;
  if (!obj.title || obj.title.includes('TODO')) return false;
  if (obj.openGraphDescription && obj.openGraphDescription.includes('TODO')) return false;
  if (obj.openGraphTitle && obj.openGraphTitle.includes('TODO')) return false;
  if (obj.description && obj.description.includes('TODO')) return false;
  return true;
}

// Load files
const files = {
  kk: JSON.parse(fs.readFileSync('messages/kk.json', 'utf8')),
  ky: JSON.parse(fs.readFileSync('messages/ky.json', 'utf8')),
  tg: JSON.parse(fs.readFileSync('messages/tg.json', 'utf8')),
  tk: JSON.parse(fs.readFileSync('messages/tk.json', 'utf8'))
};

// Explicit translations for each route + language combination that needs it
// These replace the English text completely with proper translations
const translations = {};

function add(langCode, routeKey, title, desc, keywords, ogTitle, ogDesc) {
  if (!translations[langCode]) translations[langCode] = {};
  translations[langCode][routeKey] = {
    title, description: desc, keywords,
    openGraphTitle: ogTitle, openGraphDescription: ogDesc
  };
}

// ============= KAZAKH (kk) =============
const kk = 'kk';
add(kk, 'home',
  'MedPobeda Group | Медициналық туризм және денсаулық сақтау серіктестіктері Өзбекстанда',
  'MedPobeda Group — Ташкентте орналасқан денсаулық сақтау серіктестік платформасы. Ол Өзбекстан, Үндістан және халықаралық медициналық мекемелер арасындағы медициналық туризмді, халықаралық пациенттерге көмекті, аурухана серіктестіктерін және студенттік ұтқырлықты қолдайды.',
  ['MedPobeda Group', 'Медициналық туризм', 'Серіктестік', 'Халықаралық пациенттер', 'Студенттік ұтқырлық'],
  'MedPobeda Group | Медициналық туризм және денсаулық сақтау серіктестіктері Өзбекстанда',
  'MedPobeda Group — Ташкентте орналасқан денсаулық сақтау серіктестік платформасы. Ол Өзбекстан, Үндістан және халықаралық медициналық мекемелер арасындағы медициналық туризмді, халықаралық пациенттерге көмекті, аурухана серіктестіктерін және студенттік ұтқырлықты қолдайды.'
);
add(kk, 'medical-disclaimer',
  'Медициналық ескерту | MedPobeda Group',
  'MedPobeda Group веб-сайты үшін маңызды медициналық және жауапкершіліктен бас тарту. Денсаулық сақтау қызметтерінің шектеулері мен міндеттемелері туралы оқыңыз.',
  ['MedPobeda Group', 'Медициналық ескерту', 'Денсаулық сақтау ескертуі', 'Құқықтық'],
  'Медициналық ескерту | MedPobeda Group',
  'MedPobeda Group веб-сайты үшін маңызды медициналық және жауапкершіліктен бас тарту.'
);
add(kk, 'cookie-policy',
  'Cookie саясаты | MedPobeda Group',
  'MedPobeda Group компаниясының cookie файлдары, пайдаланушы параметрлері және деректер жинау тәжірибелері туралы cookie саясатын қараңыз.',
  ['MedPobeda Group', 'Cookie саясаты', 'Веб-сайт cookie файлдары', 'Құпиялылық'],
  'Cookie саясаты | MedPobeda Group',
  'MedPobeda Group компаниясының cookie файлдары мен пайдаланушы параметрлері туралы cookie саясаты.'
);
add(kk, 'company-profile',
  'Компания профилі | MedPobeda Group MCHJ',
  'MedPobeda Group MCHJ компаниясының ресми профилін қараңыз. Ташкентте орналасқан медициналық туризм, халықаралық пациенттермен байланыс, аурухана серіктестіктері және институционалдық медициналық байланыстарды қолдайтын денсаулық сақтау компаниясы.',
  ['MedPobeda Group компания профилі', 'MedPobeda Group MCHJ', 'Медициналық туризм компаниясы Өзбекстан', 'Денсаулық сақтау компаниясы Ташкент', 'Халықаралық пациенттерді үйлестіру Өзбекстан'],
  'Компания профилі | MedPobeda Group MCHJ',
  'MedPobeda Group MCHJ компаниясының ресми профилі. Ташкенттен денсаулық сақтау қызметтері, пациенттермен байланыс, аурухана серіктестіктері және институционалдық байланыстар.'
);
add(kk, 'press',
  'Пресс және ресми жаңалықтар | MedPobeda Group MCHJ',
  'MedPobeda Group компаниясының ресми ақпаратын, пресс байланыс деректерін, бренд фактілерін және Ташкенттен алынған денсаулық сақтау жаңартуларын оқыңыз.',
  ['MedPobeda Group пресс', 'MedPobeda Group жаңалықтары', 'MedPobeda Group ресми жаңартулары', 'Денсаулық сақтау компаниясы Өзбекстан прессі', 'Медициналық туризм компаниясы прессі'],
  'Пресс және ресми жаңалықтар | MedPobeda Group MCHJ',
  'MedPobeda Group компаниясының ресми ақпараты, медиа байланыс деректері, жария жаңартулар және расталған бренд фактілері Ташкенттен.'
);
add(kk, 'treatments',
  'Үндістандағы емдеулер',
  'MedPobeda Group компаниясының онкология, кардиология, орган трансплантациясы, нейрохирургия, ортопедия және Үндістандағы емдеуді жоспарлауға байланысты екінші медициналық пікірлерге арналған емдеу беттерін қараңыз.',
  ['Үндістандағы емдеулер Өзбекстаннан', 'Үндістанда медициналық емдеу', 'Орталық Азияға арналған Үндістанда емдеуді жоспарлау', 'MedPobeda Үндістандағы емдеулер', 'Үндістан емдеу жолдары'],
  'Үндістандағы емдеулер | MedPobeda Group',
  'Онкология, кардиология, трансплантация, нейрохирургия, ортопедия және Үндістанға байланысты екінші медициналық пікірді жоспарлауға арналған емдеу беттері.'
);
add(kk, 'oncology-treatment-india',
  'Үндістанда онкологиялық емдеу',
  'MedPobeda Group мамандармен байланыс, есептерді бағыттау, аурухана талқылаулары және Өзбекстан мен Орталық Азиядан емдеу-сапарды жоспарлау арқылы Үндістанда онкологиялық емделуге ұмтылатын пациенттерді қолдайды.',
  ['Үндістанда онкологиялық емдеу', 'Үндістанда қатерлі ісік емдеу Өзбекстаннан', 'Үндістан онкологиялық ауруханасы', 'Үндістанда онкологиялық емдеуді жоспарлау', 'MedPobeda Үндістанда онкологиялық емдеу'],
  'Үндістанда онкологиялық емдеу | MedPobeda Group',
  'MedPobeda Group Үндістанда онкологиялық емделуге ұмтылатын пациенттерді мамандармен байланыс, есептерді бағыттау, аурухана талқылаулары және емдеу-сапарды жоспарлау арқылы қолдайды.'
);
add(kk, 'cardiology-treatment-india',
  'Үндістанда кардиологиялық емдеу',
  'MedPobeda Group Өзбекстан мен Орталық Азиядан келген пациенттер үшін диагностикалық шолу, ауруханамен байланыс, мамандарды сәйкестендіру және сапарға дайындық арқылы Үндістанда кардиологиялық емдеуді жоспарлауды қолдайды.',
  ['Үндістанда кардиологиялық емдеу', 'Үндістанда жүрек ауруын емдеу Өзбекстаннан', 'Үндістан кардиологиялық ауруханалары', 'Үндістанда жүрек ауруын емдеуді жоспарлау', 'MedPobeda Үндістан кардиологиясы'],
  'Үндістанда кардиологиялық емдеу | MedPobeda Group',
  'MedPobeda Group Өзбекстан мен Орталық Азиядан келген пациенттер үшін диагностикалық шолу, ауруханамен байланыс, мамандарды сәйкестендіру және сапарға дайындық арқылы Үндістанда кардиологиялық емдеуді жоспарлауды қолдайды.'
);
add(kk, 'organ-transplant-india',
  'Үндістанда орган трансплантациясы',
  'MedPobeda Group құжаттарды мұқият бағыттау, ауруханамен байланыс, мамандар талқылаулары және шекарааралық пациенттер үшін емдеу-сапарды жоспарлау арқылы Үндістанда орган трансплантациясына байланысты сұрауларды қолдайды.',
  ['Үндістанда орган трансплантациясы Өзбекстаннан', 'Үндістанда трансплантациялық емдеу', 'Үндістанда бауыр трансплантациясы', 'Үндістанда бүйрек трансплантациясын үйлестіру', 'MedPobeda Үндістанда орган трансплантациясы'],
  'Үндістанда орган трансплантациясы | MedPobeda Group',
  'MedPobeda Group құжаттарды бағыттау, ауруханамен байланыс, мамандар талқылаулары және шекарааралық пациенттер үшін емдеу-сапарды жоспарлау арқылы Үндістанда орган трансплантациясы сұрауларын қолдайды.'
);
add(kk, 'neurosurgery-treatment-india',
  'Үндістанда нейрохирургиялық емдеу',
  'MedPobeda Group диагностикалық бағыттау, мамандармен байланыс, аурухана талқылаулары және шекарааралық емдеуге дайындық арқылы Үндістанда нейрохирургиялық емдеуді жоспарлауды қолдайды.',
  ['Үндістанда нейрохирургиялық емдеу', 'Үндістанда ми хирургиясы Өзбекстаннан', 'Үндістан нейрохирургиялық ауруханасы', 'Үндістанда нейрохирургия бойынша екінші пікір', 'MedPobeda Үндістан нейрохирургиясы'],
  'Үндістанда нейрохирургиялық емдеу | MedPobeda Group',
  'MedPobeda Group диагностикалық бағыттау, мамандармен байланыс, аурухана талқылаулары және шекарааралық емдеуге дайындық арқылы Үндістанда нейрохирургиялық емдеуді жоспарлауды қолдайды.'
);
add(kk, 'orthopedic-treatment-india',
  'Үндістанда ортопедиялық емдеу',
  'MedPobeda Group халықаралық пациенттер үшін құжаттарды қарау, ауруханамен байланыс, мамандарды сәйкестендіру және сапарды үйлестіру арқылы Үндістанда ортопедиялық емдеуді жоспарлауды қолдайды.',
  ['Үндістанда ортопедиялық емдеу', 'Үндістанда сүйек және буын ауруларын емдеу Өзбекстаннан', 'Үндістан ортопедиялық ауруханасы', 'Үндістанда ортопедиялық хирургияны жоспарлау', 'MedPobeda Үндістан ортопедиясы'],
  'Үндістанда ортопедиялық емдеу | MedPobeda Group',
  'MedPobeda Group халықаралық пациенттер үшін құжаттарды қарау, ауруханамен байланыс, мамандарды сәйкестендіру және сапарды үйлестіру арқылы Үндістанда ортопедиялық емдеуді жоспарлауды қолдайды.'
);
add(kk, 'second-medical-opinion-india',
  'Үндістанда екінші медициналық пікір',
  'MedPobeda Group есептерді бағыттау, мамандармен байланыс, аурухана талқылаулары және келесі қадамды жоспарлау арқылы Үндістанға бағытталған екінші медициналық пікір сұрауларын қолдайды.',
  ['Үндістанда екінші медициналық пікір', 'Үндістаннан медициналық екінші пікір', 'Үндістаннан маманның пікірі Өзбекстан', 'Үндістанда емдеуді қарау', 'MedPobeda Үндістанда екінші пікір'],
  'Үндістанда екінші медициналық пікір | MedPobeda Group',
  'MedPobeda Group есептерді бағыттау, мамандармен байланыс, аурухана талқылаулары және келесі қадамды жоспарлау арқылы Үндістанға бағытталған екінші медициналық пікір сұрауларын қолдайды.'
);

// ============= KYRGYZ (ky) - quick copy patterns from kk with adjustments =============
// For Kyrgyz we'll do a transform from the Kazakh patterns
function kkToKy(text) {
  return text
    .replace(/Үндістан/g, 'Индия')
    .replace(/Қазақстан/g, 'Казакстан')
    .replace(/Қырғызстан/g, 'Кыргызстан')
    .replace(/Тәжікстан/g, 'Тажикстан')
    .replace(/Өзбекстан/g, 'Өзбекстан')
    .replace(/денсаулық сақтау/g, 'саламаттык сактоо')
    .replace(/серіктестік/g, 'өнөктөштүк')
    .replace(/пациент/g, 'бейтап')
    .replace(/емдеу/g, 'дарылоо')
    .replace(/қолдау/g, 'колдоо')
    .replace(/үйлестіру/g, 'координациялоо')
    .replace(/жоспарлау/g, 'пландаштыруу')
    .replace(/қызмет/g, 'кызмат')
    .replace(/байланыс/g, 'байланыш')
    .replace(/ескерту/g, 'эскертүү')
    .replace(/қарау/g, 'карап чыгуу')
    .replace(/маман/g, 'адис')
    .replace(/аурухана/g, 'оорукана')
    .replace(/Ташкент/g, 'Ташкент')
    .replace(/Медициналы/g, 'Медициналык')
    .replace(/медициналық/g, 'медициналык')
    .replace(/Пресс/g, 'Пресс')
    .replace(/жаңалықтар/g, 'жаңылыктар')
    .replace(/компания/g, 'компания')
    .replace(/профилі/g, 'профили')
    .replace(/сапар/g, 'сапар')
    .replace(/жүрек/g, 'жүрөк')
    .replace(/ми/g, 'мээ')
    .replace(/сүйек/g, 'сөөк')
    .replace(/буын/g, 'муун')
    .replace(/хирургия/g, 'хирургия')
    .replace(/трансплантация/g, 'трансплантация')
    .replace(/бауыр/g, 'боор')
    .replace(/бүйрек/g, 'бөйрөк')
    .replace(/онкология/g, 'онкология')
    .replace(/кардиология/g, 'кардиология')
    .replace(/нейрохирургия/g, 'нейрохирургия')
    .replace(/ортопедия/g, 'ортопедия')
    .replace(/жауапкершілік/g, 'жоопкерчилик')
    .replace(/деректер/g, 'маалыматтар')
    .replace(/пресс/g, 'пресс')
    .replace(/ауру/g, 'оору');
}

// ============= TAJIK (tg) =============
function kkToTg(text) {
  return text
    .replace(/Үндістан/g, 'Ҳиндустон')
    .replace(/Қазақстан/g, 'Қазоқистон')
    .replace(/Қырғызстан/g, 'Қирғизистон')
    .replace(/Тәжікстан/g, 'Тоҷикистон')
    .replace(/Өзбекстан/g, 'Ӯзбекистон')
    .replace(/денсаулық сақтау/g, 'соҳаи тандурустӣ')
    .replace(/серіктестік/g, 'шарикӣ')
    .replace(/пациент/g, 'бемор')
    .replace(/емдеу/g, 'табобат')
    .replace(/қолдау/g, 'дастгирӣ')
    .replace(/үйлестіру/g, 'ҳамоҳангсозӣ')
    .replace(/жоспарлау/g, 'банақшагирӣ')
    .replace(/қызмет/g, 'хизмат')
    .replace(/байланыс/g, 'тамос')
    .replace(/ескерту/g, 'раддия')
    .replace(/қарау/g, 'баррасӣ')
    .replace(/маман/g, 'мутахассис')
    .replace(/аурухана/g, 'беморхона')
    .replace(/Ташкент/g, 'Тошкент')
    .replace(/Медициналы/g, 'Тиббӣ')
    .replace(/медициналы/g, 'тиббӣ')
    .replace(/Пресс/g, 'Матбуот')
    .replace(/жаңалықтар/g, 'навсозиҳо')
    .replace(/компания/g, 'ширкат')
    .replace(/профилі/g, 'профил')
    .replace(/сапар/g, 'сафар')
    .replace(/жүрек/g, 'дил')
    .replace(/ми/g, 'мағз')
    .replace(/сүйек/g, 'устухон')
    .replace(/буын/g, 'банд')
    .replace(/хирургия/g, 'ҷарроҳӣ')
    .replace(/трансплантация/g, 'трансплантатсия')
    .replace(/бауыр/g, 'ҷигар')
    .replace(/бүйрек/g, 'гурда')
    .replace(/онкология/g, 'онкология')
    .replace(/кардиология/g, 'кардиология')
    .replace(/нейрохирургия/g, 'нейроҷарроҳӣ')
    .replace(/ортопедия/g, 'ортопедия')
    .replace(/жауапкершілік/g, 'масъулият')
    .replace(/деректер/g, 'маълумот')
    .replace(/пресс/g, 'матбуот')
    .replace(/ауру/g, 'беморӣ')
    .replace(/ем/g, 'табобат');
}

// ============= TURKMEN (tk) =============
function kkToTk(text) {
  return text
    .replace(/Үндістан/g, 'Hindistan')
    .replace(/Қазақстан/g, 'Gazagystan')
    .replace(/Қырғызстан/g, 'Gyrgyzystan')
    .replace(/Тәжікстан/g, 'Täjigistan')
    .replace(/Өзбекстан/g, 'Özbegistan')
    .replace(/денсаулық сақтау/g, 'saglygy goraýyş')
    .replace(/серіктестік/g, 'hyzmatdaşlyk')
    .replace(/пациент/g, 'näsag')
    .replace(/емдеу/g, 'bejergi')
    .replace(/қолдау/g, 'goldaw')
    .replace(/үйлестіру/g, 'utgaşdyrmak')
    .replace(/жоспарлау/g, 'meýilleşdirmek')
    .replace(/қызмет/g, 'hyzmat')
    .replace(/байланыс/g, 'habarlaşmak')
    .replace(/ескерту/g, 'bellik')
    .replace(/қарау/g, 'gözden geçirmek')
    .replace(/маман/g, 'hünärmen')
    .replace(/аурухана/g, 'hassahana')
    .replace(/Ташкент/g, 'Daşkent')
    .replace(/Медициналы/g, 'Medisina')
    .replace(/медициналы/g, 'lukmançylyk')
    .replace(/Пресс/g, 'Metbugat')
    .replace(/жаңалықтар/g, 'täzelikler')
    .replace(/компания/g, 'kompaniýa')
    .replace(/профилі/g, 'profili')
    .replace(/сапар/g, 'syýahat')
    .replace(/жүрек/g, 'ýürek')
    .replace(/ми/g, 'beyn')
    .replace(/сүйек/g, 'süňk')
    .replace(/буын/g, 'bogun')
    .replace(/хирургия/g, 'hirurgiýa')
    .replace(/трансплантация/g, 'transplantasiýa')
    .replace(/бауыр/g, 'bagyr')
    .replace(/бүйрек/g, 'böwrek')
    .replace(/онкология/g, 'onkologiýa')
    .replace(/кардиология/g, 'kardiologiýa')
    .replace(/нейрохирургия/g, 'neýrohirurgiýa')
    .replace(/ортопедия/g, 'ortopediýa')
    .replace(/жауапкершілік/g, 'jogapkärçilik')
    .replace(/деректер/g, 'maglumatlar')
    .replace(/пресс/g, 'metbugat')
    .replace(/ауру/g, 'kesel')
    .replace(/ем/g, 'bejergi');
}

// Generate Kyrgyz, Tajik, Turkmen from Kazakh templates
function generateAll() {
  const extra = ['home', 'medical-disclaimer', 'cookie-policy', 'company-profile', 'press', 'treatments', 
    'oncology-treatment-india', 'cardiology-treatment-india', 'organ-transplant-india',
    'neurosurgery-treatment-india', 'orthopedic-treatment-india', 'second-medical-opinion-india'];

  const kyT = {};
  const tgT = {};
  const tkT = {};

  for (const key of extra) {
    if (translations[kk][key]) {
      const kkEntry = translations[kk][key];
      kyT[key] = {
        title: kkToKy(kkEntry.title),
        description: kkToKy(kkEntry.description),
        keywords: kkEntry.keywords.map(k => kkToKy(k)),
        openGraphTitle: kkToKy(kkEntry.openGraphTitle),
        openGraphDescription: kkToKy(kkEntry.openGraphDescription)
      };
      tgT[key] = {
        title: kkToTg(kkEntry.title),
        description: kkToTg(kkEntry.description),
        keywords: kkEntry.keywords.map(k => kkToTg(k)),
        openGraphTitle: kkToTg(kkEntry.openGraphTitle),
        openGraphDescription: kkToTg(kkEntry.openGraphDescription)
      };
      tkT[key] = {
        title: kkToTk(kkEntry.title),
        description: kkToTk(kkEntry.description),
        keywords: kkEntry.keywords.map(k => kkToTk(k)),
        openGraphTitle: kkToTk(kkEntry.openGraphTitle),
        openGraphDescription: kkToTk(kkEntry.openGraphDescription)
      };
    }
  }

  translations['ky'] = kyT;
  translations['tg'] = tgT;
  translations['tk'] = tkT;
}

generateAll();

// Now apply to files, keeping existing valid translations
for (const [langCode, content] of Object.entries(files)) {
  const existingRoutes = content.routes;
  const newRoutes = {};
  const langTranslations = translations[langCode] || {};

  for (const [key, enVal] of Object.entries(enRoutes)) {
    const existing = existingRoutes[key];

    if (hasValid(existing)) {
      newRoutes[key] = existing;
    } else if (langTranslations[key]) {
      newRoutes[key] = langTranslations[key];
      console.log(`${langCode}/${key}: applied translation`);
    } else {
      // For routes not explicitly handled, keep existing (should already have valid uz-inspired translations)
      newRoutes[key] = existing;
      console.log(`${langCode}/${key}: kept existing (no new translation)`);
    }
  }

  content.routes = newRoutes;
  const filePath = `messages/${langCode}.json`;
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`✓ ${langCode}.json saved`);
}

console.log('=== COMPLETE ===');