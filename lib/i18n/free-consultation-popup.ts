import type { AppLocale } from "@/lib/i18n/config";

type PopupCopy = {
  close: string;
  badge: string;
  region: string;
  coordination: string;
  journeyTitle: string;
  journeySubtitle: string;
  journeyDescription: string;
  step: string;
  journeySteps: Array<[string, string]>;
  coordinated: string;
  confidentialHandling: string;
  freeConsultation: string;
  formTitle: string;
  formDescription: string;
  formIntro: string;
  fullName: string;
  fullNamePlaceholder: string;
  country: string;
  chooseCountry: string;
  phone: string;
  age: string;
  agePlaceholder: string;
  email: string;
  treatment: string;
  chooseTreatment: string;
  concern: string;
  concernPlaceholder: string;
  reports: string;
  reportHint: string;
  selectedFile: string;
  submit: string;
  confidential: string;
  requiredStatus: string;
  successStatus: string;
  required: {
    fullName: string;
    country: string;
    phone: string;
    age: string;
    validAge: string;
    treatment: string;
    concern: string;
  };
  countries: Record<string, string>;
  treatments: Record<string, string>;
  whatsappIntro: string;
  patientDetails: string;
  notProvided: string;
  whatsappClosing: string;
};

const countryKeys = [
  "Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan",
  "Turkmenistan", "Russia", "Other",
] as const;

const treatmentKeys = [
  "Cancer Treatment", "Cardiac Surgery", "Pediatric Cardiac Surgery",
  "Orthopedic Surgery", "Spine Surgery", "Neurosurgery", "Kidney Treatment",
  "Kidney Transplant", "Liver Treatment", "Liver Transplant", "Organ Transplant",
  "Bone Marrow Transplant", "IVF / Fertility Treatment", "Eye Treatment",
  "Dental Treatment", "Cosmetic / Plastic Surgery", "Urology",
  "Bariatric / Weight Loss Surgery", "General Surgery", "Other",
] as const;

const enCountries = Object.fromEntries(countryKeys.map((key) => [key, key]));
const enTreatments = Object.fromEntries(treatmentKeys.map((key) => [key, key]));

const en: PopupCopy = {
  close: "Close consultation popup",
  badge: "Trusted International Patient Support",
  region: "Central Asia to India",
  coordination: "24-hour care coordination",
  journeyTitle: "Your Treatment Journey in India",
  journeySubtitle: "From Medical Opinion to Full Recovery Support",
  journeyDescription: "MedPobeda Group coordinates hospital options, doctor access, travel planning, and patient support for families across Central Asia.",
  step: "STEP",
  journeySteps: [
    ["Medical Report Review", "Share your reports and receive expert medical guidance."],
    ["Doctor & Hospital Selection", "We help you choose suitable hospitals and specialists in India."],
    ["Treatment Cost Estimate", "Get transparent estimated treatment packages before travel."],
    ["Visa & Travel Support", "Medical visa, flight planning, and airport pickup guidance."],
    ["Hospital Admission Assistance", "Admission, interpreter, and care coordination support."],
    ["Post-Treatment Follow-up", "Continued coordination after discharge and return home."],
  ],
  coordinated: "Coordinated patient support",
  confidentialHandling: "Confidential medical handling",
  freeConsultation: "Free Consultation",
  formTitle: "Get a Free Treatment Plan & Cost Estimate",
  formDescription: "Connect with trusted hospitals and expert doctors in India within 24 hours.",
  formIntro: "Share your medical details and our team will help you get hospital options, estimated treatment cost, and expert medical guidance.",
  fullName: "Full Name", fullNamePlaceholder: "Enter your full name",
  country: "Select Country", chooseCountry: "Choose your country",
  phone: "Phone Number", age: "Age", agePlaceholder: "Enter age",
  email: "Email Address", treatment: "Select Treatment / Medical Concern",
  chooseTreatment: "Choose treatment or concern",
  concern: "Describe Your Medical Concern",
  concernPlaceholder: "Tell us about the diagnosis, current symptoms, or treatment advice you have received so far.",
  reports: "Upload Medical Reports",
  reportHint: "You can send reports directly on WhatsApp after submitting.",
  selectedFile: "Selected file", submit: "Get Free Consultation",
  confidential: "Your information is 100% confidential.",
  requiredStatus: "Please fill in the required fields before continuing.",
  successStatus: "Your details are ready. Please continue on WhatsApp to send your request.",
  required: {
    fullName: "Full name is required.", country: "Please select your country.",
    phone: "Phone number is required.", age: "Age is required.",
    validAge: "Please enter a valid age.", treatment: "Please select a treatment.",
    concern: "Please describe the medical concern.",
  },
  countries: enCountries, treatments: enTreatments,
  whatsappIntro: "Hello MedPobeda Group, I want a free medical consultation.",
  patientDetails: "Patient details", notProvided: "Not provided",
  whatsappClosing: "Please help me get a treatment plan and cost estimate from hospitals in India.",
};

const localized: Partial<Record<AppLocale, Partial<PopupCopy>>> = {
  uz: {
    close: "Konsultatsiya oynasini yopish", badge: "Ishonchli xalqaro bemorlar yordami",
    region: "Markaziy Osiyodan Hindistonga", coordination: "24 soatlik muvofiqlashtirish",
    journeyTitle: "Hindistondagi davolanish yo‘lingiz",
    journeySubtitle: "Tibbiy fikrdan to to‘liq tiklanishgacha",
    journeyDescription: "MedPobeda Group Markaziy Osiyodagi oilalar uchun shifoxona, shifokor, safar va bemor yordamini muvofiqlashtiradi.",
    step: "BOSQICH",
    journeySteps: [
      ["Tibbiy hujjatlarni ko‘rib chiqish", "Hisobotlaringizni yuboring va ekspert tibbiy fikrini oling."],
      ["Shifokor va shifoxona tanlash", "Hindistondagi mos shifoxona va mutaxassisni tanlashga yordam beramiz."],
      ["Davolash narxini baholash", "Safardan oldin taxminiy davolash smetasini oling."],
      ["Viza va safar yordami", "Tibbiy viza, parvoz va aeroport kutib olish bo‘yicha yordam."],
      ["Shifoxonaga yotqizish yordami", "Qabul, tarjimon va davolashni muvofiqlashtirish."],
      ["Davolashdan keyingi kuzatuv", "Uyga qaytgandan keyin ham muvofiqlashtirish davom etadi."],
    ],
    coordinated: "Muvofiqlashtirilgan bemor yordami", confidentialHandling: "Tibbiy ma’lumotlar maxfiyligi",
    freeConsultation: "Bepul konsultatsiya", formTitle: "Bepul davolash rejasi va narx smetasini oling",
    formDescription: "24 soat ichida Hindistondagi ishonchli shifoxona va ekspert shifokorlar bilan bog‘laning.",
    formIntro: "Tibbiy ma’lumotlaringizni yuboring — jamoamiz shifoxona variantlari, taxminiy narx va ekspert fikrini olishga yordam beradi.",
    fullName: "To‘liq ism", fullNamePlaceholder: "To‘liq ismingizni kiriting",
    country: "Mamlakatni tanlang", chooseCountry: "Mamlakatingizni tanlang",
    phone: "Telefon raqami", age: "Yosh", agePlaceholder: "Yoshingizni kiriting",
    email: "Email manzil", treatment: "Davolash yo‘nalishi / tibbiy muammo",
    chooseTreatment: "Davolash yoki muammoni tanlang", concern: "Tibbiy muammoingizni tasvirlang",
    concernPlaceholder: "Tashxis, hozirgi alomatlar yoki sizga berilgan davolash tavsiyasini yozing.",
    reports: "Tibbiy hujjatlarni yuklash", reportHint: "Arizadan keyin hujjatlarni WhatsApp orqali yuborishingiz mumkin.",
    selectedFile: "Tanlangan fayl", submit: "Bepul konsultatsiya olish",
    confidential: "Ma’lumotlaringiz 100% maxfiy saqlanadi.",
    requiredStatus: "Davom etishdan oldin majburiy maydonlarni to‘ldiring.",
    successStatus: "Ma’lumotlaringiz tayyor. So‘rovni yuborish uchun WhatsApp’da davom eting.",
    required: {
      fullName: "To‘liq ism majburiy.", country: "Mamlakatni tanlang.", phone: "Telefon raqami majburiy.",
      age: "Yosh majburiy.", validAge: "To‘g‘ri yosh kiriting.", treatment: "Davolash yo‘nalishini tanlang.",
      concern: "Tibbiy muammoni tasvirlang.",
    },
    countries: { Uzbekistan: "O‘zbekiston", Kazakhstan: "Qozog‘iston", Kyrgyzstan: "Qirg‘iziston", Tajikistan: "Tojikiston", Turkmenistan: "Turkmaniston", Russia: "Rossiya", Other: "Boshqa" },
    treatments: { "Cancer Treatment": "Saratonni davolash", "Cardiac Surgery": "Yurak jarrohligi", "Pediatric Cardiac Surgery": "Bolalar yurak jarrohligi", "Orthopedic Surgery": "Ortopedik jarrohlik", "Spine Surgery": "Umurtqa jarrohligi", Neurosurgery: "Neyroxirurgiya", "Kidney Treatment": "Buyrakni davolash", "Kidney Transplant": "Buyrak transplantatsiyasi", "Liver Treatment": "Jigarni davolash", "Liver Transplant": "Jigar transplantatsiyasi", "Organ Transplant": "Organ transplantatsiyasi", "Bone Marrow Transplant": "Suyak iligi transplantatsiyasi", "IVF / Fertility Treatment": "IVF / bepushtlikni davolash", "Eye Treatment": "Ko‘zni davolash", "Dental Treatment": "Stomatologiya", "Cosmetic / Plastic Surgery": "Kosmetik / plastik jarrohlik", Urology: "Urologiya", "Bariatric / Weight Loss Surgery": "Bariatrik jarrohlik", "General Surgery": "Umumiy jarrohlik", Other: "Boshqa" },
    whatsappIntro: "Salom MedPobeda Group, men bepul tibbiy konsultatsiya olmoqchiman.",
    patientDetails: "Bemor ma’lumotlari", notProvided: "Ko‘rsatilmagan",
    whatsappClosing: "Hindiston shifoxonalaridan davolash rejasi va narx smetasini olishga yordam bering.",
  },
  ru: {
    close: "Закрыть окно консультации", badge: "Надёжная поддержка международных пациентов",
    region: "Из Центральной Азии в Индию", coordination: "Координация в течение 24 часов",
    journeyTitle: "Ваш путь лечения в Индии", journeySubtitle: "От медицинского заключения до полного восстановления",
    journeyDescription: "MedPobeda Group координирует выбор клиники и врача, поездку и поддержку пациентов из Центральной Азии.",
    step: "ЭТАП",
    journeySteps: [
      ["Рассмотрение меддокументов", "Отправьте документы и получите экспертное медицинское заключение."],
      ["Выбор врача и клиники", "Поможем выбрать подходящую клинику и специалиста в Индии."],
      ["Расчёт стоимости лечения", "Получите предварительную смету до поездки."],
      ["Виза и поездка", "Помощь с медицинской визой, перелётом и встречей в аэропорту."],
      ["Госпитализация", "Поддержка при приёме, переводе и координации лечения."],
      ["Наблюдение после лечения", "Продолжение координации после выписки и возвращения домой."],
    ],
    coordinated: "Координированная поддержка пациента", confidentialHandling: "Конфиденциальная обработка документов",
    freeConsultation: "Бесплатная консультация", formTitle: "Получите план лечения и расчёт стоимости",
    formDescription: "Свяжитесь с надёжными клиниками и экспертами Индии в течение 24 часов.",
    formIntro: "Отправьте медицинские данные — мы поможем получить варианты клиник, предварительную стоимость и экспертное заключение.",
    fullName: "ФИО", fullNamePlaceholder: "Введите полное имя", country: "Выберите страну",
    chooseCountry: "Выберите вашу страну", phone: "Номер телефона", age: "Возраст",
    agePlaceholder: "Введите возраст", email: "Email", treatment: "Лечение / медицинская проблема",
    chooseTreatment: "Выберите лечение или проблему", concern: "Опишите медицинскую проблему",
    concernPlaceholder: "Расскажите о диагнозе, симптомах и полученных рекомендациях.",
    reports: "Загрузить медицинские документы", reportHint: "После отправки формы документы можно переслать через WhatsApp.",
    selectedFile: "Выбранный файл", submit: "Получить бесплатную консультацию",
    confidential: "Ваши данные на 100% конфиденциальны.",
    requiredStatus: "Заполните обязательные поля.", successStatus: "Данные готовы. Продолжите в WhatsApp, чтобы отправить запрос.",
    required: { fullName: "Укажите полное имя.", country: "Выберите страну.", phone: "Укажите номер телефона.", age: "Укажите возраст.", validAge: "Введите корректный возраст.", treatment: "Выберите направление лечения.", concern: "Опишите медицинскую проблему." },
    countries: { Uzbekistan: "Узбекистан", Kazakhstan: "Казахстан", Kyrgyzstan: "Кыргызстан", Tajikistan: "Таджикистан", Turkmenistan: "Туркменистан", Russia: "Россия", Other: "Другая" },
    treatments: { "Cancer Treatment": "Лечение рака", "Cardiac Surgery": "Кардиохирургия", "Pediatric Cardiac Surgery": "Детская кардиохирургия", "Orthopedic Surgery": "Ортопедическая хирургия", "Spine Surgery": "Хирургия позвоночника", Neurosurgery: "Нейрохирургия", "Kidney Treatment": "Лечение почек", "Kidney Transplant": "Трансплантация почки", "Liver Treatment": "Лечение печени", "Liver Transplant": "Трансплантация печени", "Organ Transplant": "Трансплантация органов", "Bone Marrow Transplant": "Трансплантация костного мозга", "IVF / Fertility Treatment": "ЭКО / лечение бесплодия", "Eye Treatment": "Офтальмология", "Dental Treatment": "Стоматология", "Cosmetic / Plastic Surgery": "Пластическая хирургия", Urology: "Урология", "Bariatric / Weight Loss Surgery": "Бариатрическая хирургия", "General Surgery": "Общая хирургия", Other: "Другое" },
    whatsappIntro: "Здравствуйте, MedPobeda Group. Я хочу получить бесплатную медицинскую консультацию.",
    patientDetails: "Данные пациента", notProvided: "Не указано",
    whatsappClosing: "Помогите получить план лечения и расчёт стоимости в клиниках Индии.",
  },
  kk: {
    close: "Кеңес терезесін жабу", badge: "Халықаралық пациенттерге сенімді қолдау",
    region: "Орталық Азиядан Үндістанға", coordination: "24 сағаттық үйлестіру",
    journeyTitle: "Үндістандағы емделу жолыңыз", journeySubtitle: "Медициналық қорытындыдан толық қалпына келуге дейін",
    journeyDescription: "MedPobeda Group клиника мен дәрігерді таңдауды, сапарды және пациентке қолдауды үйлестіреді.",
    step: "КЕЗЕҢ", journeySteps: [
      ["Медициналық құжаттарды қарау", "Құжаттарыңызды жіберіп, сараптамалық медициналық пікір алыңыз."],
      ["Дәрігер мен клиниканы таңдау", "Үндістандағы қолайлы клиника мен маманды таңдауға көмектесеміз."],
      ["Емдеу құнын есептеу", "Сапарға дейін алдын ала смета алыңыз."],
      ["Виза және сапар", "Медициналық виза, ұшу және әуежайдан қарсы алу бойынша көмек."],
      ["Ауруханаға жатқызу", "Қабылдау, аударма және емдеуді үйлестіру."],
      ["Емнен кейінгі бақылау", "Үйге оралғаннан кейін де үйлестіру жалғасады."],
    ],
    coordinated: "Пациентке үйлестірілген қолдау", confidentialHandling: "Медициналық деректер құпиялығы",
    freeConsultation: "Тегін кеңес", formTitle: "Тегін емдеу жоспары мен құн есебін алыңыз",
    formDescription: "24 сағат ішінде Үндістандағы сенімді клиникалар мен мамандарға хабарласыңыз.",
    formIntro: "Медициналық деректерді жіберіңіз — клиника нұсқаларын, алдын ала құнды және сарапшы пікірін алуға көмектесеміз.",
    fullName: "Толық аты-жөні", fullNamePlaceholder: "Толық аты-жөніңізді енгізіңіз",
    country: "Елді таңдаңыз", chooseCountry: "Еліңізді таңдаңыз", phone: "Телефон нөмірі",
    age: "Жасы", agePlaceholder: "Жасыңызды енгізіңіз", email: "Email",
    treatment: "Емдеу бағыты / медициналық мәселе", chooseTreatment: "Емдеу бағытын таңдаңыз",
    concern: "Медициналық мәселені сипаттаңыз", concernPlaceholder: "Диагнозды, белгілерді және берілген ұсыныстарды жазыңыз.",
    reports: "Медициналық құжаттарды жүктеу", reportHint: "Өтінімнен кейін құжаттарды WhatsApp арқылы жібере аласыз.",
    selectedFile: "Таңдалған файл", submit: "Тегін кеңес алу", confidential: "Деректеріңіз 100% құпия сақталады.",
    requiredStatus: "Міндетті жолдарды толтырыңыз.", successStatus: "Деректер дайын. Сұрауды жіберу үшін WhatsApp-та жалғастырыңыз.",
    required: { fullName: "Толық аты-жөні міндетті.", country: "Елді таңдаңыз.", phone: "Телефон нөмірін енгізіңіз.", age: "Жасыңызды енгізіңіз.", validAge: "Дұрыс жасты енгізіңіз.", treatment: "Емдеу бағытын таңдаңыз.", concern: "Медициналық мәселені сипаттаңыз." },
    whatsappIntro: "Сәлеметсіз бе, MedPobeda Group. Мен тегін медициналық кеңес алғым келеді.",
    patientDetails: "Пациент деректері", notProvided: "Көрсетілмеген",
    whatsappClosing: "Үндістан клиникаларынан емдеу жоспары мен құн есебін алуға көмектесіңіз.",
  },
  ky: {
    close: "Кеңеш терезесин жабуу", badge: "Эл аралык бейтаптарга ишенимдүү колдоо",
    region: "Борбор Азиядан Индияга", coordination: "24 сааттык координация",
    journeyTitle: "Индиядагы дарылануу жолуңуз", journeySubtitle: "Медициналык корутундудан толук калыбына келүүгө чейин",
    journeyDescription: "MedPobeda Group оорукана, дарыгер, сапар жана бейтаптарды колдоону координациялайт.",
    step: "КАДАМ", journeySteps: [
      ["Медициналык документтерди кароо", "Документтериңизди жөнөтүп, эксперттик медициналык пикир алыңыз."],
      ["Дарыгер жана оорукана тандоо", "Индиядагы ылайыктуу оорукана менен адисти тандоого жардам беребиз."],
      ["Дарылоо баасын эсептөө", "Сапарга чейин болжолдуу смета алыңыз."],
      ["Виза жана сапар", "Медициналык виза, учуу жана аэропорттон тосуп алуу боюнча жардам."],
      ["Ооруканага жаткыруу", "Кабыл алуу, котормочу жана дарылоону координациялоо."],
      ["Дарылоодон кийинки көзөмөл", "Үйгө кайткандан кийин да колдоо уланат."],
    ],
    coordinated: "Бейтапты координацияланган колдоо", confidentialHandling: "Медициналык маалыматтардын купуялыгы",
    freeConsultation: "Акысыз кеңеш", formTitle: "Акысыз дарылоо планын жана баа эсебин алыңыз",
    formDescription: "24 саат ичинде Индиядагы ишенимдүү ооруканалар жана адистер менен байланышыңыз.",
    formIntro: "Медициналык маалыматыңызды жөнөтүңүз — оорукана варианттарын, бааны жана эксперттик пикирди алууга жардам беребиз.",
    fullName: "Толук аты-жөнү", fullNamePlaceholder: "Толук аты-жөнүңүздү жазыңыз", country: "Өлкөнү тандаңыз",
    chooseCountry: "Өлкөңүздү тандаңыз", phone: "Телефон номери", age: "Жашы", agePlaceholder: "Жашыңызды жазыңыз",
    email: "Email", treatment: "Дарылоо багыты / медициналык көйгөй", chooseTreatment: "Дарылоо багытын тандаңыз",
    concern: "Медициналык көйгөйдү сүрөттөңүз", concernPlaceholder: "Диагноз, белгилер жана берилген сунуштар жөнүндө жазыңыз.",
    reports: "Медициналык документтерди жүктөө", reportHint: "Арыздан кийин документтерди WhatsApp аркылуу жөнөтө аласыз.",
    selectedFile: "Тандалган файл", submit: "Акысыз кеңеш алуу", confidential: "Маалыматыңыз 100% купуя сакталат.",
    requiredStatus: "Милдеттүү талааларды толтуруңуз.", successStatus: "Маалымат даяр. Сурамды жөнөтүү үчүн WhatsApp-та улантыңыз.",
    required: { fullName: "Толук аты-жөнү талап кылынат.", country: "Өлкөнү тандаңыз.", phone: "Телефон номерин жазыңыз.", age: "Жашыңызды жазыңыз.", validAge: "Туура жашты жазыңыз.", treatment: "Дарылоо багытын тандаңыз.", concern: "Медициналык көйгөйдү сүрөттөңүз." },
    whatsappIntro: "Саламатсызбы, MedPobeda Group. Мен акысыз медициналык кеңеш алгым келет.",
    patientDetails: "Бейтаптын маалыматы", notProvided: "Көрсөтүлгөн эмес",
    whatsappClosing: "Индиядагы ооруканалардан дарылоо планын жана баа эсебин алууга жардам бериңиз.",
  },
  tg: {
    close: "Пӯшидани равзанаи машварат", badge: "Дастгирии боэътимоди беморони байналмилалӣ",
    region: "Аз Осиёи Марказӣ ба Ҳиндустон", coordination: "Ҳамоҳангсозӣ дар давоми 24 соат",
    journeyTitle: "Роҳи табобати шумо дар Ҳиндустон", journeySubtitle: "Аз хулосаи тиббӣ то барқароршавии пурра",
    journeyDescription: "MedPobeda Group интихоби беморхонаву табиб, сафар ва дастгирии беморро ҳамоҳанг мекунад.",
    step: "ҚАДАМ", journeySteps: [
      ["Баррасии ҳуҷҷатҳои тиббӣ", "Ҳуҷҷатҳоро фиристед ва хулосаи мутахассис гиред."],
      ["Интихоби табиб ва беморхона", "Барои интихоби беморхона ва мутахассиси мувофиқ кумак мекунем."],
      ["Ҳисоби арзиши табобат", "Пеш аз сафар сметаи пешакӣ гиред."],
      ["Раводид ва сафар", "Кумак бо раводиди тиббӣ, парвоз ва пешвозгирӣ."],
      ["Бистарӣ шудан", "Дастгирӣ ҳангоми қабул, тарҷума ва ҳамоҳангсозии табобат."],
      ["Назорати баъди табобат", "Дастгирӣ пас аз ҷавоб шудан ва бозгашт идома меёбад."],
    ],
    coordinated: "Дастгирии ҳамоҳангшудаи бемор", confidentialHandling: "Махфияти маълумоти тиббӣ",
    freeConsultation: "Машварати ройгон", formTitle: "Нақшаи табобат ва ҳисоби арзишро ройгон гиред",
    formDescription: "Дар давоми 24 соат бо беморхонаҳо ва мутахассисони Ҳиндустон пайваст шавед.",
    formIntro: "Маълумоти тиббиро фиристед — мо барои гирифтани имконоти беморхона, арзиш ва хулосаи коршинос кумак мекунем.",
    fullName: "Ному насаб", fullNamePlaceholder: "Ному насаби худро ворид кунед", country: "Кишварро интихоб кунед",
    chooseCountry: "Кишвари худро интихоб кунед", phone: "Рақами телефон", age: "Синну сол", agePlaceholder: "Синну солро ворид кунед",
    email: "Email", treatment: "Самти табобат / мушкили тиббӣ", chooseTreatment: "Самти табобатро интихоб кунед",
    concern: "Мушкили тиббиро шарҳ диҳед", concernPlaceholder: "Дар бораи ташхис, аломатҳо ва тавсияҳои гирифташуда нависед.",
    reports: "Боркунии ҳуҷҷатҳои тиббӣ", reportHint: "Пас аз дархост ҳуҷҷатҳоро тавассути WhatsApp фиристода метавонед.",
    selectedFile: "Файли интихобшуда", submit: "Гирифтани машварати ройгон", confidential: "Маълумоти шумо 100% махфӣ аст.",
    requiredStatus: "Майдонҳои ҳатмиро пур кунед.", successStatus: "Маълумот омода аст. Барои фиристодани дархост дар WhatsApp идома диҳед.",
    required: { fullName: "Ному насаб ҳатмист.", country: "Кишварро интихоб кунед.", phone: "Рақами телефонро ворид кунед.", age: "Синну солро ворид кунед.", validAge: "Синну соли дурустро ворид кунед.", treatment: "Самти табобатро интихоб кунед.", concern: "Мушкили тиббиро шарҳ диҳед." },
    whatsappIntro: "Салом, MedPobeda Group. Ман машварати ройгони тиббӣ мехоҳам.",
    patientDetails: "Маълумоти бемор", notProvided: "Нишон дода нашудааст",
    whatsappClosing: "Барои гирифтани нақшаи табобат ва ҳисоби арзиш аз беморхонаҳои Ҳиндустон кумак кунед.",
  },
  tk: {
    close: "Maslahat penjiresini ýapmak", badge: "Halkara hassalar üçin ygtybarly goldaw",
    region: "Merkezi Aziýadan Hindistana", coordination: "24 sagatlyk utgaşdyrma",
    journeyTitle: "Hindistandaky bejergi ýoluňyz", journeySubtitle: "Lukmançylyk netijesinden doly dikelişe çenli",
    journeyDescription: "MedPobeda Group hassahana, lukman, syýahat we hassa goldawyny utgaşdyrýar.",
    step: "ÄDIM", journeySteps: [
      ["Lukmançylyk resminamalaryna seretmek", "Resminamalaryňyzy iberiň we hünärmeniň pikirini alyň."],
      ["Lukman we hassahana saýlamak", "Hindistandaky laýyk hassahana we hünärmen saýlamaga kömek edýäris."],
      ["Bejerginiň bahasyny hasaplamak", "Syýahatdan öň çaklama çykdajyny alyň."],
      ["Wiza we syýahat", "Lukmançylyk wizasy, uçuş we aeroportda garşylamak boýunça kömek."],
      ["Hassahana ýerleşdirmek", "Kabul ediş, terjime we bejergini utgaşdyrmak."],
      ["Bejergiden soňky gözegçilik", "Öýe dolananyňyzdan soň hem goldaw dowam edýär."],
    ],
    coordinated: "Utgaşdyrylan hassa goldawy", confidentialHandling: "Lukmançylyk maglumatlarynyň gizlinligi",
    freeConsultation: "Mugt maslahat", formTitle: "Mugt bejergi meýilnamasyny we çykdajy hasabyny alyň",
    formDescription: "24 sagadyň dowamynda Hindistandaky hassahanalar we hünärmenler bilen habarlaşyň.",
    formIntro: "Lukmançylyk maglumatlaryňyzy iberiň — hassahana görnüşlerini, bahany we hünärmen pikirini almaga kömek ederis.",
    fullName: "Doly ady", fullNamePlaceholder: "Doly adyňyzy giriziň", country: "Ýurdy saýlaň",
    chooseCountry: "Ýurduňyzy saýlaň", phone: "Telefon belgisi", age: "Ýaş", agePlaceholder: "Ýaşyňyzy giriziň",
    email: "Email", treatment: "Bejergi ugry / lukmançylyk meselesi", chooseTreatment: "Bejergi ugruny saýlaň",
    concern: "Lukmançylyk meseläňizi beýan ediň", concernPlaceholder: "Diagnoz, alamatlar we berlen maslahatlar barada ýazyň.",
    reports: "Lukmançylyk resminamalaryny ýüklemek", reportHint: "Arzadan soň resminamalary WhatsApp arkaly iberip bilersiňiz.",
    selectedFile: "Saýlanan faýl", submit: "Mugt maslahat almak", confidential: "Maglumatlaryňyz 100% gizlin saklanýar.",
    requiredStatus: "Hökmany meýdanlary dolduryň.", successStatus: "Maglumat taýýar. Talaby ibermek üçin WhatsApp-da dowam ediň.",
    required: { fullName: "Doly ady hökmany.", country: "Ýurdy saýlaň.", phone: "Telefon belgisini giriziň.", age: "Ýaşyňyzy giriziň.", validAge: "Dogry ýaşy giriziň.", treatment: "Bejergi ugruny saýlaň.", concern: "Lukmançylyk meseläňizi beýan ediň." },
    whatsappIntro: "Salam, MedPobeda Group. Men mugt lukmançylyk maslahatyny almak isleýärin.",
    patientDetails: "Hassanyň maglumatlary", notProvided: "Görkezilmedi",
    whatsappClosing: "Hindistandaky hassahanalardan bejergi meýilnamasyny we çykdajy hasabyny almaga kömek ediň.",
  },
};

// The closely related Central Asian locale packs use their native page chrome.
// Until editorially reviewed long-form translations are supplied, Uzbek is a
// more useful regional fallback than displaying an English-only medical form.
export function getFreeConsultationPopupCopy(locale: AppLocale): PopupCopy {
  const fallback = en;
  const override = localized[locale] ?? fallback;

  return {
    ...en,
    ...fallback,
    ...override,
    required: { ...en.required, ...fallback.required, ...override.required },
    countries: { ...en.countries, ...fallback.countries, ...override.countries },
    treatments: { ...en.treatments, ...fallback.treatments, ...override.treatments },
  };
}

export const popupCountryKeys = countryKeys;
export const popupTreatmentKeys = treatmentKeys;
