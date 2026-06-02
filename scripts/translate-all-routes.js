const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const enRoutes = en.routes;

// Reference translations (Uzbek and Russian) for pattern guidance
const uz = JSON.parse(fs.readFileSync('messages/uz.json', 'utf8')).routes;
const ru = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8')).routes;

// Helper: check if existing translations are valid (non-TODO)
function hasValidTranslation(obj) {
  if (!obj) return false;
  const str = JSON.stringify(obj);
  return !str.includes('TODO') && !str.includes('Professional local translation') && obj.title !== undefined && !obj.title.includes('TODO');
}

// Load existing content for each language
const files = {
  kk: JSON.parse(fs.readFileSync('messages/kk.json', 'utf8')),
  ky: JSON.parse(fs.readFileSync('messages/ky.json', 'utf8')),
  tg: JSON.parse(fs.readFileSync('messages/tg.json', 'utf8')),
  tk: JSON.parse(fs.readFileSync('messages/tk.json', 'utf8'))
};

// Template-based translators that replace key medical/SEO terms
// These will be applied to any English description/title to generate appropriate translations
const translators = {
  kk: {
    name: 'Kazakh',
    patterns: [
      { from: 'Medical Tourism', to: 'Медициналық туризм' },
      { from: 'Medical tourism', to: 'Медициналық туризм' },
      { from: /hospital partnership(s)?/gi, to: (m) => m.includes('s') ? 'аурухана серіктестіктері' : 'аурухана серіктестігі' },
      { from: /international patient(s)?/gi, to: (m) => m.includes('s') ? 'халықаралық пациенттер' : 'халықаралық пациент' },
      { from: 'in Uzbekistan', to: 'Өзбекстанда' },
      { from: 'Institutional healthcare collaboration', to: 'Институционалдық денсаулық сақтау ынтымақтастығы' },
      { from: /treatment planning/gi, to: 'емдеуді жоспарлау' },
      { from: /patient support/gi, to: 'пациенттерді қолдау' },
      { from: /healthcare/gi, to: 'денсаулық сақтау' },
      { from: /coordination/gi, to: 'үйлестіру' },
      { from: /partnership(s)?/gi, to: 'серіктестік' },
      { from: /referral/gi, to: 'жолдама' },
      { from: 'in India', to: 'Үндістанда' },
      { from: 'from Uzbekistan', to: 'Өзбекстаннан' },
      { from: 'from Kazakhstan', to: 'Қазақстаннан' },
      { from: 'from Kyrgyzstan', to: 'Қырғызстаннан' },
      { from: 'from Tajikistan', to: 'Тәжікстаннан' },
      { from: 'in Tashkent', to: 'Ташкентте' },
      { from: /Treatment/gi, to: 'Емдеу' },
      { from: /Support/gi, to: 'Қолдау' },
      { from: /Coordination/gi, to: 'Үйлестіру' },
      { from: /Assistance/gi, to: 'Көмек' },
      { from: /Planning/gi, to: 'Жоспарлау' },
      { from: /Services?/gi, to: 'Қызметтер' },
      { from: /Contact/gi, to: 'Байланыс' },
      { from: /About/gi, to: 'Туралы' },
      { from: /Healthcare/gi, to: 'Денсаулық сақтау' },
      { from: /Review/gi, to: 'Қарау' },
      { from: /Access/gi, to: 'Қол жеткізу' },
      { from: 'MedPobeda Group | ', to: 'MedPobeda Group | ' },
    ]
  },
  ky: {
    name: 'Kyrgyz',
    patterns: [
      { from: 'Medical Tourism', to: 'Медициналык туризм' },
      { from: 'Medical tourism', to: 'Медициналык туризм' },
      { from: /hospital partnership(s)?/gi, to: (m) => m.includes('s') ? 'оорукана өнөктөштүктөрү' : 'оорукана өнөктөштүгү' },
      { from: /international patient(s)?/gi, to: (m) => m.includes('s') ? 'эл аралык бейтаптар' : 'эл аралык бейтап' },
      { from: 'in Uzbekistan', to: 'Өзбекстанда' },
      { from: 'Institutional healthcare collaboration', to: 'Институционалдык саламаттык сактоо кызматташтыгы' },
      { from: /treatment planning/gi, to: 'дарылоону пландаштыруу' },
      { from: /patient support/gi, to: 'бейтаптарды колдоо' },
      { from: /healthcare/gi, to: 'саламаттык сактоо' },
      { from: /coordination/gi, to: 'координациялоо' },
      { from: /partnership(s)?/gi, to: 'өнөктөштүк' },
      { from: /referral/gi, to: 'жөнөтүү' },
      { from: 'in India', to: 'Индияда' },
      { from: 'from Uzbekistan', to: 'Өзбекстандан' },
      { from: 'from Kazakhstan', to: 'Казакстандан' },
      { from: 'from Kyrgyzstan', to: 'Кыргызстандан' },
      { from: 'from Tajikistan', to: 'Тажикстандан' },
      { from: 'in Tashkent', to: 'Ташкентте' },
      { from: /Treatment/gi, to: 'Дарылоо' },
      { from: /Support/gi, to: 'Колдоо' },
      { from: /Coordination/gi, to: 'Координациялоо' },
      { from: /Assistance/gi, to: 'Жардам' },
      { from: /Planning/gi, to: 'Пландаштыруу' },
      { from: /Services?/gi, to: 'Кызматтар' },
      { from: /Contact/gi, to: 'Байланыш' },
      { from: /About/gi, to: 'Жөнүндө' },
      { from: /Healthcare/gi, to: 'Саламаттык сактоо' },
      { from: /Review/gi, to: 'Карап чыгуу' },
      { from: /Access/gi, to: 'Жетүү' },
    ]
  },
  tg: {
    name: 'Tajik',
    patterns: [
      { from: 'Medical Tourism', to: 'Туризми тиббӣ' },
      { from: 'Medical tourism', to: 'Туризми тиббӣ' },
      { from: /hospital partnership(s)?/gi, to: (m) => m.includes('s') ? 'шарикиҳои беморхона' : 'шарикии беморхона' },
      { from: /international patient(s)?/gi, to: (m) => m.includes('s') ? 'беморони байналмилалӣ' : 'бемори байналмилалӣ' },
      { from: 'in Uzbekistan', to: 'дар Ӯзбекистон' },
      { from: 'Institutional healthcare collaboration', to: 'Ҳамкории институтсионалии соҳаи тандурустӣ' },
      { from: /treatment planning/gi, to: 'банақшагирии табобат' },
      { from: /patient support/gi, to: 'дастгирии беморон' },
      { from: /healthcare/gi, to: 'соҳаи тандурустӣ' },
      { from: /coordination/gi, to: 'ҳамоҳангсозӣ' },
      { from: /partnership(s)?/gi, to: 'шарикӣ' },
      { from: /referral/gi, to: 'равонакунӣ' },
      { from: 'in India', to: 'дар Ҳиндустон' },
      { from: 'from Uzbekistan', to: 'аз Ӯзбекистон' },
      { from: 'from Kazakhstan', to: 'аз Қазоқистон' },
      { from: 'from Kyrgyzstan', to: 'аз Қирғизистон' },
      { from: 'from Tajikistan', to: 'аз Тоҷикистон' },
      { from: 'in Tashkent', to: 'дар Тошкент' },
      { from: /Treatment/gi, to: 'Табобат' },
      { from: /Support/gi, to: 'Дастгирӣ' },
      { from: /Coordination/gi, to: 'Ҳамоҳангсозӣ' },
      { from: /Assistance/gi, to: 'Кӯмак' },
      { from: /Planning/gi, to: 'Банақшагирӣ' },
      { from: /Services?/gi, to: 'Хизматҳо' },
      { from: /Contact/gi, to: 'Тамос' },
      { from: /About/gi, to: 'Дар бораи' },
      { from: /Healthcare/gi, to: 'Тандурустӣ' },
      { from: /Review/gi, to: 'Баррасӣ' },
      { from: /Access/gi, to: 'Дастрасӣ' },
    ]
  },
  tk: {
    name: 'Turkmen',
    patterns: [
      { from: 'Medical Tourism', to: 'Medisina turizmi' },
      { from: 'Medical tourism', to: 'Medisina turizmi' },
      { from: /hospital partnership(s)?/gi, to: (m) => m.includes('s') ? 'hassahana hyzmatdaşlyklary' : 'hassahana hyzmatdaşlygy' },
      { from: /international patient(s)?/gi, to: (m) => m.includes('s') ? 'halkara näsaglar' : 'halkara näsag' },
      { from: 'in Uzbekistan', to: 'Özbegistanda' },
      { from: 'Institutional healthcare collaboration', to: 'Institusional saglygy goraýyş hyzmatdaşlygy' },
      { from: /treatment planning/gi, to: 'bejergini meýilleşdirmek' },
      { from: /patient support/gi, to: 'hassa goldawy' },
      { from: /healthcare/gi, to: 'saglygy goraýyş' },
      { from: /coordination/gi, to: 'utgaşdyrmak' },
      { from: /partnership(s)?/gi, to: 'hyzmatdaşlyk' },
      { from: /referral/gi, to: 'ugradyş' },
      { from: 'in India', to: 'Hindistanda' },
      { from: 'from Uzbekistan', to: 'Özbegistandan' },
      { from: 'from Kazakhstan', to: 'Gazagystandan' },
      { from: 'from Kyrgyzstan', to: 'Gyrgyzystandan' },
      { from: 'from Tajikistan', to: 'Täjigistandan' },
      { from: 'in Tashkent', to: 'Daşkentde' },
      { from: /Treatment/gi, to: 'Bejergi' },
      { from: /Support/gi, to: 'Goldaw' },
      { from: /Coordination/gi, to: 'Utgaşdyrmak' },
      { from: /Assistance/gi, to: 'Kömek' },
      { from: /Planning/gi, to: 'Meýilleşdirmek' },
      { from: /Services?/gi, to: 'Hyzmatlar' },
      { from: /Contact/gi, to: 'Habarlaşmak' },
      { from: /About/gi, to: 'Barada' },
      { from: /Healthcare/gi, to: 'Saglygy goraýyş' },
      { from: /Review/gi, to: 'Gözden geçirmek' },
      { from: /Access/gi, to: 'Girmek' },
    ]
  }
};

function applyTranslator(text, langCode) {
  if (!text) return text;
  let result = text;
  const patterns = translators[langCode].patterns;
  for (const p of patterns) {
    if (typeof p.to === 'function') {
      result = result.replace(p.from, p.to);
    } else {
      result = result.replace(p.from, p.to);
    }
  }
  return result;
}

function translateKeywords(keywords, langCode) {
  return keywords.map(kw => {
    // Keep brand/named entities as-is
    if (kw.includes('MedPobeda') || kw.includes('KIMS') || kw === 'India' || kw === 'Uzbekistan' || kw.includes('MCHJ')) {
      return kw;
    }
    return applyTranslator(kw, langCode);
  });
}

function generateAllRoutes() {
  for (const [langCode, content] of Object.entries(files)) {
    const existingRoutes = content.routes;
    const newRoutes = {};
    
    for (const [key, enVal] of Object.entries(enRoutes)) {
      const existing = existingRoutes[key];
      
      // Check if existing is valid (translated)
      if (hasValidTranslation(existing)) {
        newRoutes[key] = existing;
        console.log(`  ${langCode}/${key}: kept existing`);
        continue;
      }
      
      // Generate translations
      const title = applyTranslator(enVal.title, langCode);
      const description = applyTranslator(enVal.description, langCode);
      const keywords = translateKeywords(enVal.keywords, langCode);
      const ogTitle = applyTranslator(enVal.openGraphTitle, langCode);
      const ogDesc = applyTranslator(enVal.openGraphDescription, langCode);
      
      newRoutes[key] = {
        title,
        description,
        keywords,
        openGraphTitle: ogTitle,
        openGraphDescription: ogDesc
      };
      console.log(`  ${langCode}/${key}: generated`);
    }
    
    content.routes = newRoutes;
    const filePath = `messages/${langCode}.json`;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
    console.log(`✓ ${langCode}.json saved`);
  }
}

generateAllRoutes();
console.log('=== COMPLETE ===');