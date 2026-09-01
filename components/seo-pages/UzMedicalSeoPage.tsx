import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { UzMedicalSeoPage } from "@/lib/uz-medical-seo-pages";

const details = [
  "bemorning yoshi va umumiy sog‘lig‘i",
  "kasallikning turi, bosqichi va avvalgi davolashlar",
  "tasviriy tekshiruv, patologiya va laborator natijalarning sifati",
  "tanlangan shifoxona jamoasining aynan shu holat bo‘yicha tajribasi",
];

const paragraphs = {
  planning:
    "Xorijda davolanish haqida qaror bitta reklama va’dasi yoki faqat narxga asoslanmasligi kerak. Eng foydali yondashuv — avval tibbiy savolni aniq qo‘yish, hujjatlarni xronologik tartibga keltirish, kamida bitta mutaxassis fikrini olish va tavsiya etilgan rejaning foydasi, xavfi hamda muqobillarini solishtirishdir. Bemor reja nima uchun tavsiya etilayotganini, undan qanday natija kutilishini va qaror qabul qilmaslik oqibatini tushunishi lozim.",
  safety:
    "Barcha dori nomlari, dozalari, allergiyalar, oldingi operatsiyalar va hamroh kasalliklar shifokorga to‘liq aytilishi kerak. Qon suyultiruvchi preparat, insulin, steroid yoki immunitetga ta’sir qiluvchi dorilarni o‘zboshimchalik bilan to‘xtatish xavfli. Safar oldidan dori bo‘yicha o‘zgarish faqat davolovchi shifokor va qabul qiluvchi jamoa bilan kelishiladi.",
  evidence:
    "Yaxshi klinik qaror zamonaviy dalillar bilan birga bemorning qadriyatlari va real holatini hisobga oladi. Bir bemorga mos muolaja boshqasiga mos bo‘lmasligi mumkin. Shuning uchun internetdagi o‘rtacha natija, narx yoki tiklanish muddati individual kafolat hisoblanmaydi. Aniq prognoz faqat to‘liq ko‘rik va tegishli mutaxassis bahosidan keyin muhokama qilinadi.",
};

function TextBlock({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-8 text-slate-700">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function UzMedicalSeoPageView({ page }: { page: UzMedicalSeoPage }) {
  const toc = [
    ["umumiy-malumot", "Davolash haqida umumiy ma’lumot"],
    ["alomatlar", "Alomatlar va qachon shifokorga borish"],
    ["diagnostika", "Diagnostika"],
    ["davolash", "Davolash variantlari"],
    ["hindiston-afzalliklari", "Hindistonda davolanishning jihatlari"],
    ["narx", "Narx va shifoxona tanlash"],
    ["viza", "Tibbiy viza"],
    ["safar", "Safar jarayoni"],
    ["tiklanish", "Tiklanish va kuzatuv"],
    ["savollar", "Ko‘p so‘raladigan savollar"],
  ];

  return (
    <article className="bg-white">
      <nav aria-label="Sahifa yo‘li" className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm text-slate-600">
          <li><Link className="hover:text-blue-700" href="/uz">Bosh sahifa</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link className="hover:text-blue-700" href="/uz/treatments">Davolash yo‘nalishlari</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-slate-900">{page.shortTitle}</li>
        </ol>
      </nav>

      <header className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              O‘zbekistonlik bemorlar uchun tibbiy qo‘llanma
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              {page.condition} bo‘yicha tashxisni aniqlashtirish, {page.procedure.toLowerCase()}, safar,
              xavfsizlik va tiklanishni tushunarli rejalashtirish uchun dalillarga asoslangan ma’lumot.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm text-slate-600">
              <span>MedPobeda Group tahririyat jamoasi tomonidan tayyorlangan</span>
              <span aria-hidden="true">•</span>
              <time dateTime="2026-07-26">2026-yil 26-iyulda yangilangan</time>
              <span aria-hidden="true">•</span>
              <Link className="font-medium text-blue-700 hover:underline" href="/uz/medical-disclaimer">
                Tibbiy ogohlantirish
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild><Link href="/uz/contact">Tibbiy hujjat yuborish</Link></Button>
              <Button asChild variant="outline"><Link href="/uz/second-medical-opinion">Ikkinchi fikr olish</Link></Button>
            </div>
          </div>
          <figure>
            <Image
              src={page.image.src}
              alt={page.image.alt}
              title={page.image.title}
              width={900}
              height={650}
              className="aspect-[4/3] rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 1024px) 100vw, 42vw"
              loading="eager"
            />
            <figcaption className="mt-3 text-sm leading-6 text-slate-600">{page.image.caption}</figcaption>
          </figure>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside>
          <Card className="sticky top-24 p-5">
            <p className="font-semibold text-slate-950">Mundarija</p>
            <ol className="mt-4 space-y-2 text-sm leading-6">
              {toc.map(([id, label]) => (
                <li key={id}><a className="text-slate-600 hover:text-blue-700" href={`#${id}`}>{label}</a></li>
              ))}
            </ol>
          </Card>
        </aside>

        <div className="min-w-0 space-y-14">
          <section
            aria-labelledby="tahririyat-usuli"
            className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6"
          >
            <h2 id="tahririyat-usuli" className="text-xl font-semibold text-slate-950">
              Ushbu qo‘llanma qanday tayyorlangan
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Kontent bemorga qaror jarayonini tushuntirish uchun tuzilgan: klinik baholash,
              davolash muqobillari, xavfsizlik, safar va kuzatuv alohida ko‘rib chiqiladi.
              U tashxis yoki individual davolash tavsiyasi emas. Tibbiy ma’lumot va xizmat
              talablari o‘zgarishi mumkin; yakuniy qaror litsenziyalangan shifokor hamda
              tegishli rasmiy manbalar bilan tekshirilishi kerak.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Mas’ul tashkilot:{" "}
              <Link className="font-medium text-blue-700 hover:underline" href="/uz/about">
                MedPobeda Group MCHJ
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="kirish">
            <h2 id="kirish" className="text-3xl font-bold text-slate-950">Kirish</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                {page.audience} uchun birinchi vazifa “qaysi shifoxona eng yaxshi?” degan savoldan oldin
                klinik holatni to‘g‘ri tushunishdir. {page.condition} turli bemorlarda turlicha kechadi;
                davolash tanlovi simptom, tekshiruv natijasi, avvalgi muolaja va umumiy sog‘liq bilan belgilanadi.
                Ushbu qo‘llanma {page.specialty} yo‘nalishida xavfsiz qaror qilishga yordam beradi, ammo shaxsiy
                shifokor konsultatsiyasini almashtirmaydi.
              </TextBlock>
              <TextBlock>{paragraphs.planning}</TextBlock>
              <TextBlock>
                MedPobeda Group O‘zbekistondagi bemor va Hindistondagi litsenziyalangan shifoxona o‘rtasida
                aloqa, hujjatlarni tartiblash, uchrashuv va safar bo‘yicha koordinatsiya beradi. Kompaniya tashxis
                qo‘ymaydi, retsept yozmaydi va natijani kafolatlamaydi. Klinik qaror bemor bilan davolovchi
                shifokor o‘rtasida qabul qilinadi.
              </TextBlock>
            </div>
          </section>

          <section id="umumiy-malumot" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">{page.procedure}: umumiy ma’lumot</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                {page.procedure} — {page.condition} bilan bog‘liq muammoni baholash va individual klinik
                maqsadga erishish uchun qo‘llanadigan tibbiy yo‘lning bir qismidir. Maqsad faqat bitta tahlilni
                “normallashtirish” emas; simptomlarni kamaytirish, hayot sifati va funksiyani yaxshilash,
                asorat xavfini pasaytirish ham muhim. Ba’zan kuzatuv yoki dori yetarli bo‘ladi, boshqa holatda
                interventsion muolaja, operatsiya yoxud ko‘p tarmoqli terapiya kerak bo‘lishi mumkin.
              </TextBlock>
              <TextBlock>{paragraphs.evidence}</TextBlock>
              <TextBlock>
                Hindistondagi markazdan dastlabki fikr so‘ralganda klinik savol aniq yoziladi: tashxis
                tasdiqlanganmi, yana qaysi tekshiruv zarur, {page.procedure.toLowerCase()} uchun ko‘rsatma bormi,
                qanday muqobillar mavjud va taxminiy qolish muddati qancha? Shu savollar umumiy marketing
                javobidan ko‘ra foydaliroq yozma reja olishga yordam beradi.
              </TextBlock>
              <BulletList items={details} />
            </div>
          </section>

          <section id="alomatlar" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Alomatlar va shifokorga murojaat qilish</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                {page.condition} alomatlari boshqa kasalliklarda ham uchrashi mumkin. Alomatning borligi
                tashxisni isbotlamaydi, yo‘qligi esa kasallikni to‘liq istisno qilmaydi. Davomiylik, kuchayish
                sur’ati, kundalik hayotga ta’siri va hamroh belgilar shifokor uchun muhim. O‘zboshimchalik bilan
                tashxis qo‘yish yoki internetdagi davoni boshlash tekshiruvni kechiktirishi mumkin.
              </TextBlock>
              <BulletList items={page.symptoms} />
              <TextBlock>
                To‘satdan kuchli og‘riq, nafas yetishmasligi, hushdan ketish, falajlik, nazorat qilib bo‘lmaydigan
                qon ketish, tutqanoq yoki ahvolning tez yomonlashuvi bo‘lsa, Hindistonga safar rejasini kutmang.
                O‘zbekistondagi tez yordamga murojaat qiling. Bemor avval barqarorlashtirilishi, keyin shifokor
                parvozga yaroqliligini baholashi kerak.
              </TextBlock>
              <TextBlock>
                Rejalashtirilgan holatda simptom kundaligini yuritish foydali: alomat qachon boshlanishi,
                qancha davom etishi, nima kuchaytirishi, qaysi dori yordam berishi va tana harorati, bosim yoki
                boshqa o‘lchovlar qayd etiladi. Bu ma’lumot masofaviy konsultatsiyani aniqroq qiladi.
              </TextBlock>
            </div>
          </section>

          <section id="diagnostika" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Diagnostika va hujjatlarni tayyorlash</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Diagnostika odatda anamnez va fizik ko‘rikdan boshlanadi. Keyingi testlar shifokorning klinik
                savoliga javob berishi kerak. Bir xil tekshiruvni sababsiz takrorlash xarajat va vaqtni oshiradi,
                ammo eski, sifatsiz yoki qarorga yetarli bo‘lmagan natijani qayta bajarish zarur bo‘lishi mumkin.
                Hindiston markazi original tasvirlarni DICOM formatida, patologiya oynachalari yoki bloklarini
                qayta ko‘rishni so‘rashi ehtimol.
              </TextBlock>
              <BulletList items={page.diagnostics} />
              <TextBlock>
                Hujjatlar sanasi bo‘yicha joylashtiriladi: bir sahifalik klinik xulosa, tashxislar, doimiy
                dorilar va allergiya, oldingi davolash, operatsiya bayonnomasi, laboratoriya, tasviriy xulosa va
                original fayllar. Tarjimada ism, sana, birlik va dori dozasi o‘zgarmasligi kerak. Pasportdagi
                ism bilan tibbiy hujjatlardagi ism farq qilsa, bu oldindan tushuntiriladi.
              </TextBlock>
              <TextBlock>
                Shifokorga “qaysi test kerak?” degan ochiq savol bilan birga mavjud natijalar beriladi. Natijani
                faqat “yaxshi” yoki “yomon” deb emas, klinik kontekstda talqin qilish muhim. Har bir testning
                xato-musbat, xato-manfiy va tasodifiy topilma ehtimoli bor; yakuniy tashxis bir nechta dalil
                uyg‘unligiga asoslanadi.
              </TextBlock>
            </div>
          </section>

          <section id="davolash" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Davolash variantlari</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Davolashning maqbul varianti kasallik nomigagina emas, uning og‘irligi, maqsad, xavf va bemor
                xohishiga bog‘liq. Shifokordan tavsiya etilgan yo‘lning foydasi, eng ko‘p va eng jiddiy xavflari,
                muqobili, davolamaslik oqibati va natijani qanday o‘lchash haqida so‘rash kerak. Yozma rozilik
                imzolashdan oldin tarjimon orqali barcha tushunarsiz jihatlar izohlanadi.
              </TextBlock>
              <BulletList items={page.treatments} />
              <TextBlock>
                {page.procedure} rejasida anesteziya, qon mahsulotlari, implant, dori, intensiv yordam yoki
                reabilitatsiya ehtiyoji bo‘lishi mumkin. Har bir band aynan barcha bemorga kerak emas.
                Multidisiplinar konsilium murakkab holatda turli mutaxassislar fikrini bitta reja ichida
                uyg‘unlashtiradi. Bu ayniqsa bir nechta organ tizimi zararlanganda yoki katta muolaja
                rejalanganda muhim.
              </TextBlock>
              <TextBlock>{paragraphs.safety}</TextBlock>
              <TextBlock>
                Davolash natijasi hech qachon kafolatlanmaydi. Kutiladigan foyda ehtimol bilan ifodalanadi va
                asorat bo‘lishi mumkin. Bemor natija ko‘rsatkichlarini — og‘riq, funksional test, tasviriy javob,
                laborator marker yoki hayot sifati — oldindan shifokor bilan kelishsa, keyingi kuzatuv aniqroq
                bo‘ladi.
              </TextBlock>
            </div>
          </section>

          <section id="hindiston-afzalliklari" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Nega bemorlar Hindistonni ko‘rib chiqadi?</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Ayrim bemorlar Hindistonni ko‘p tarmoqli markazlar, katta bemor oqimi, murakkab muolajalar
                tajribasi va xalqaro bemor bo‘limlari sabab ko‘rib chiqadi. Biroq mamlakat nomining o‘zi sifat
                belgisi emas. Natija aniq shifoxona, jamoa, tashxis, infeksiya nazorati va davolashdan keyingi
                kuzatuvga bog‘liq. Har bir markazning kuchli yo‘nalishi boshqacha bo‘lishi mumkin.
              </TextBlock>
              <TextBlock>
                Markaz tanlashda tegishli akkreditatsiya, shifokorning aynan {page.condition} bo‘yicha tajribasi,
                zarur texnologiyaning mavjudligi, 24/7 intensiv yordam, qon banki, patologiya va reabilitatsiya
                imkonlari tekshiriladi. “Eng yaxshi” degan umumiy reytingdan ko‘ra, bemorning holatiga eng mos
                jamoani topish maqsadga muvofiq.
              </TextBlock>
              <TextBlock>
                Xalqaro bemor bo‘limi klinik jamoani almashtirmaydi. Davolovchi konsultant kimligi, operatsiyani
                kim bajarishi, dam olish kunlari kim javob berishi va uyga qaytgach savollar kimga yuborilishi
                yozma aniqlashtiriladi. Tarjimon tibbiy terminlarni tushunishi va bemorning maxfiyligini saqlashi
                kerak.
              </TextBlock>
              <TextBlock>
                Sifatni baholashda shifoxona binosi yoki uskunaning yangi ko‘rinishi yetarli mezon emas. Bemor
                xavfsizligi uchun qo‘l gigiyenasi, antibiotiklardan oqilona foydalanish, dori berishda ikki
                bosqichli tekshiruv, operatsiya oldi xavfsizlik ro‘yxati va nojo‘ya hodisalarni boshqarish tartibi
                muhim. Markazdan aynan kerakli muolaja yiliga taxminan necha marta bajarilishi, murakkab holatlar
                qanday konsiliumdan o‘tishi va zarur paytda boshqa mutaxassis qanchalik tez jalb qilinishi haqida
                so‘rash mumkin. Raqamlar klinik kontekstsiz talqin qilinmaydi: og‘ir bemorlarni ko‘proq qabul
                qiladigan markazning xom asorat ko‘rsatkichi boshqacha bo‘lishi tabiiy.
              </TextBlock>
              <TextBlock>
                Shifokorning malakasi haqida ma’lumot tekshiriladigan bo‘lishi kerak. Mutaxassislik diplomi,
                professional ro‘yxatdan o‘tishi, amaldagi klinik faoliyati va bemorning aniq muammosiga oid
                tajribasi umumiy mashhurlikdan muhimroq. Ijtimoiy tarmoqdagi obunachi soni, bemor fikri yoki
                “yuz foiz natija” va’dasi tibbiy sifat isboti emas. Masofaviy konsultatsiyada kim javob
                berayotgani, yakuniy davoni kim bajarishi va kundalik kuzatuvni qaysi jamoa olib borishi aniq
                yozilishi kerak. Bemor shifokordan ikkinchi fikr olish istagini yashirmasligi kerak; asosli
                mutaxassis bunday savolni xavfsiz qarorning tabiiy qismi deb biladi.
              </TextBlock>
              <TextBlock>
                Katta muolaja oldidan “preabilitatsiya” foydali bo‘lishi mumkin. Bu shifokor ruxsat bergan
                jismoniy faollik, nafas mashqlari, oqsil va energiya yetarliligini tekshirish, kamqonlik yoki
                qandni boshqarish, chekishni to‘xtatish va uyquni yaxshilashni anglatadi. Maqsad bemorni ideal
                holatga keltirish emas, oldindan o‘zgartirish mumkin bo‘lgan xavflarni kamaytirishdir. Biroq
                shoshilinch davoni uzoq tayyorgarlik uchun kechiktirish ham zararli bo‘lishi mumkin. Tayyorlanish
                muddati va mashq darajasi {page.specialty} jamoasi bilan individual belgilanadi.
              </TextBlock>
              <TextBlock>
                Ovqatlanishda mo‘jizaviy parhez mavjud emas. Bemorning vazni, yutishi, buyrak-jigar faoliyati,
                diabeti va davolash turi hisobga olinadi. O‘simlik preparati, yuqori dozali vitamin yoki biologik
                faol qo‘shimcha “tabiiy” bo‘lsa ham qon ketishi, jigar zarari yoki dori ta’sirining o‘zgarishiga
                olib kelishi mumkin. Qabul qilinayotgan barcha qo‘shimchalar nomi va dozasi shifokorga aytiladi.
                Jarrohlik yoki muolaja oldidan och qolish bo‘yicha ko‘rsatma aynan shifoxonadan olinadi; o‘zboshimcha
                uzoq och qolish suvsizlanish va kuchsizlanishni kuchaytiradi.
              </TextBlock>
              <TextBlock>
                Ruhiy tayyorgarlik ham davolash jarayonining amaliy qismidir. Noaniqlik, boshqa mamlakatda bo‘lish,
                til va moliyaviy tashvish uyqu hamda qaror qabul qilishga ta’sir qiladi. Bemor savollarni oldindan
                yozishi, konsultatsiyada hamroh yoki professional tarjimon ishtirokini so‘rashi va javoblarni
                qayta aytib tushunganini tekshirishi mumkin. Rozilik qo‘rquv ostida shoshirib olinmasligi kerak.
                Agar bemorning qaror qabul qilish qobiliyati cheklangan bo‘lsa, qonuniy vakil hujjatlari va
                bemorning o‘z xohishi imkon qadar hisobga olinadi.
              </TextBlock>
              <TextBlock>
                Maxfiylik uchun pasport, tibbiy hisobot va tasvirlar tasodifiy ochiq messenjer guruhlariga
                yuborilmaydi. Qabul qiluvchi tashkilot, yuborish maqsadi va saqlash tartibi tushunarli bo‘lishi
                kerak. Keraksiz shaxsiy ma’lumot olib tashlanadi, biroq xavfsiz tibbiy qaror uchun zarur klinik
                tafsilot yashirilmaydi. Bemor o‘z hujjatlarining nusxasini saqlaydi va kimga ruxsat berganini
                biladi. Tibbiy tarjima aniq bo‘lishi, taxminiy so‘z yoki tashxis qo‘shmasligi, asl hujjat bilan
                bog‘lanishi lozim.
              </TextBlock>
              <TextBlock>
                Safar sug‘urtasi tanlansa, mavjud kasallik, rejalashtirilgan davolash, asorat, reys o‘zgarishi va
                tibbiy evakuatsiya qoplanadimi, mayda yozuvigacha tekshiriladi. Ko‘plab odatiy polislar oldindan
                ma’lum kasallik yoki rejali operatsiyani qoplamaydi. Sug‘urta borligi shifoxonaning oldindan
                depozit talabini avtomatik bekor qilmaydi. Qoplama bo‘yicha va’da yozma olinadi, da’vo uchun
                hisob-faktura, to‘lov kvitansiyasi, tibbiy xulosa va retseptlar saqlanadi.
              </TextBlock>
              <TextBlock>
                Muolajadan oldingi suhbatda bemor o‘z ustuvor maqsadini aniq aytishi foydali: og‘riqni kamaytirish,
                umrni uzaytirish, harakatni tiklash, fertilitet yoki ma’lum bir kundalik vazifani saqlash kabi
                maqsadlar davolash tanloviga ta’sir qiladi. Bir nechta variant tibbiy jihatdan maqbul bo‘lsa,
                bemorning ish, oila, safar va tiklanish imkonlari ham qarorga kiradi. Shifokordan ehtimollarni
                mutlaq sonlarda tushuntirish, eng yaxshi, odatiy va eng og‘ir ssenariyni muhokama qilish so‘ralishi
                mumkin. Bu qo‘rqitish emas, xabardor va realistik qaror tayyorlashdir.
              </TextBlock>
              <TextBlock>
                Davolash rejasining nusxasi o‘zbek yoki bemor yaxshi tushunadigan tilda qisqacha qayd etiladi.
                Unda klinik maqsad, keyingi qadam, sanalar, javobgar mutaxassis va reja o‘zgarishiga sabab bo‘ladigan
                belgilar bo‘ladi. Konsultatsiyadan keyin yangi savol tug‘ilishi odatiy; shu sabab xalqaro bo‘limning
                tekshirilgan elektron manzili va javob berish tartibi olinadi. Og‘zaki va’da bilan yozma hujjat
                farq qilsa, to‘lov yoki safardan oldin aniqlik so‘raladi. Tushunarli hujjatlashtirish bemor,
                hamroh, tarjimon va ikki mamlakatdagi shifokorlar orasida xatoni kamaytiradi.
              </TextBlock>
            </div>
          </section>

          <section id="narx" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Narx, smeta va shifoxona tanlash</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Davolash narxi hujjatlarsiz aniq aytilmaydi. Smeta tarkibida konsultatsiya, tekshiruv, jarroh va
                anesteziya haqi, operatsiya xonasi, implant yoki dori, palata, reanimatsiya, reabilitatsiya va
                soliqlar bor-yo‘qligi tekshiriladi. Asorat, qo‘shimcha tun, qon mahsuloti va rejadan tashqari
                tekshiruv qanday hisoblanishi ham so‘raladi.
              </TextBlock>
              <TextBlock>
                Eng past narx har doim eng yaxshi qiymat emas. Juda umumiy “paket” klinik murakkablikni
                yashirishi mumkin. Ikki smetani solishtirganda davolash mazmuni, shifokor, implant yoki dori
                markasi, yotish kuni va follow-up bir xil ekaniga ishonch hosil qilinadi. To‘lov faqat
                shifoxonaning tasdiqlangan kanali yoki rasmiy shartnoma bo‘yicha amalga oshiriladi.
              </TextBlock>
              <TextBlock>
                Tibbiy xarajatdan tashqari viza, aviachipta, mehmonxona, mahalliy transport, ovqat, tarjimon,
                hamroh va sanani o‘zgartirish xarajatlari rejalashtiriladi. Kutilmagan uzayish uchun moliyaviy
                zaxira kerak. Batafsil individual baho uchun <Link className="text-blue-700 underline" href="/uz/contact">MedPobeda Group bilan bog‘lanish</Link> mumkin.
              </TextBlock>
            </div>
          </section>

          <section id="viza" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Hindiston tibbiy vizasi</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Davolanish maqsadi uchun mos viza turi tanlanadi. Odatda shifoxonaning bemor ismi, pasport
                ma’lumoti, taxminiy tashxis va qabul sanasi ko‘rsatilgan taklif xati kerak bo‘ladi. Hamroh uchun
                alohida toifa va hujjatlar talab qilinishi mumkin. Viza qoidalari o‘zgarishi mumkinligi sabab
                ariza berishdan oldin Hindiston hukumatining rasmiy manbasi yoki vakolatli diplomatik idora
                talabi tekshiriladi.
              </TextBlock>
              <TextBlock>
                Pasport amal qilish muddati, bo‘sh sahifalar, fotosurat talabi, arizadagi ism yozilishi va
                shifoxona xatidagi ma’lumotlar bir-biriga mos bo‘lishi kerak. Viza tasdiqlanmasdan qaytarib
                bo‘lmaydigan chipta olish moliyaviy xavf tug‘diradi. Vizani tezlashtirish haqidagi norasmiy
                va’dalardan ehtiyot bo‘lish lozim.
              </TextBlock>
              <TextBlock>
                Viza davolash kafolati emas va shifoxona qabulining o‘rnini bosmaydi. Safardan oldin qabul sanasi,
                shifokor, manzil va favqulodda aloqa tasdiqlanadi. Ayrim uzoq muddatli qolish holatida mahalliy
                ro‘yxatdan o‘tish yoki muddatni uzaytirish talabi bo‘lishi mumkin; buni xalqaro bemor bo‘limidan
                yozma aniqlashtirish kerak.
              </TextBlock>
              <p><Link className="inline-flex items-center gap-2 font-semibold text-blue-700" href="/uz/medical-visa-support">Tibbiy viza yordami <ArrowRight className="h-4 w-4" /></Link></p>
            </div>
          </section>

          <section id="safar" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Davolanish safari qanday o‘tadi?</h2>
            <div className="mt-6 grid gap-4">
              {[
                ["1. Hujjatlarni ko‘rib chiqish", "Tibbiy xulosa, tekshiruv va tasvirlar tegishli mutaxassisga xavfsiz yuboriladi."],
                ["2. Yozma reja olish", "Dastlabki tashxis, tavsiya, taxminiy muddat va smeta savollar bilan birga aniqlashtiriladi."],
                ["3. Viza va logistika", "Taklif xati, viza, parvoz, shifoxonaga yaqin turar joy va hamroh rejasi tuziladi."],
                ["4. Hindistonda qabul", "Shifokor fizik ko‘rik o‘tkazadi; zarur testlardan keyin yakuniy reja va rozilik muhokama qilinadi."],
                ["5. Davolash va chiqarish", `${page.procedure}dan keyin dori, yara yoki simptom nazorati va xavfsiz qaytish mezonlari yozib olinadi.`],
                ["6. O‘zbekistonda follow-up", `Chiqarish xulosasi mahalliy shifokorga beriladi; ${page.recoveryFocus} bo‘yicha reja davom ettiriladi.`],
              ].map(([title, text]) => (
                <Card key={title} className="p-5">
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{text}</p>
                </Card>
              ))}
            </div>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Qo‘l yukida pasport, viza, shifoxona xati, dori ro‘yxati, muhim dorilarning yetarli zaxirasi,
                sug‘urta ma’lumoti va tibbiy xulosaning qog‘oz-elektron nusxasi bo‘ladi. Dori original qadoqda
                olib yuriladi. Sovuq zanjir, kislorod, nogironlik aravachasi yoki maxsus ovqat kerak bo‘lsa,
                aviakompaniya bilan oldindan kelishiladi.
              </TextBlock>
              <TextBlock>
                Bemor yolg‘iz bora oladimi, buni shifokor va amaliy ehtiyoj belgilaydi. Katta operatsiya,
                sedatsiya, harakat cheklanishi yoki murakkab qarorlar kutilsa, voyaga yetgan ishonchli hamroh
                muhim. Hamroh dori jadvali, hujjat va shifokor bilan aloqaga yordam beradi, lekin bemorning
                rozilik huquqini almashtirmaydi.
              </TextBlock>
            </div>
          </section>

          <section id="tiklanish" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Tiklanish va O‘zbekistonda kuzatuv</h2>
            <div className="mt-5 space-y-5">
              <TextBlock>
                Tiklanish “kasalxonadan chiqish” bilan tugamaydi. {page.recoveryFocus} ushbu yo‘nalishdagi asosiy
                maqsadlardan biridir. Chiqarishdan oldin dori nomi va davomiyligi, ovqatlanish, harakat
                cheklovi, yara parvarishi, favqulodda belgilar, nazorat testi va konsultatsiya sanasi yozma
                olinadi. Retseptdagi savdo nomi bilan birga faol modda nomini bilish O‘zbekistonda muqobil dori
                topishga yordam beradi.
              </TextBlock>
              <TextBlock>
                Parvoz sanasi shifokor ruxsati bilan belgilanadi. Uzoq o‘tirish tromboz xavfini oshirishi mumkin;
                yurish, suyuqlik, kompression paypoq yoki dori hamma uchun bir xil emas va faqat klinik tavsiya
                bilan qo‘llanadi. Isitma, yara qizarishi, nafas qisishi, yangi kuchsizlanish yoki kuchli og‘riq
                paydo bo‘lsa, darhol tibbiy yordam kerak.
              </TextBlock>
              <TextBlock>
                Mahalliy shifokor xorijdagi jamoaning o‘rnini egallamaydi, xorijiy markaz ham kundalik mahalliy
                yordamni bera olmaydi. Eng xavfsiz model — ikkala jamoa vazifasini oldindan ajratish. Kim qon
                tahlilini ko‘radi, kim dori dozasini o‘zgartiradi, favqulodda holatda qayerga boriladi va qaysi
                natija Hindistonga yuboriladi — bular chiqarish rejasida bo‘lishi kerak.
              </TextBlock>
              <TextBlock>
                Sog‘ayish tezligi individual. Uyqu, oqsil va energiya yetarli ovqatlanish, shifokor ruxsatidagi
                harakat, chekishdan saqlanish va ruhiy qo‘llab-quvvatlash tiklanishga yordam beradi. “Tezroq
                natija” uchun tasdiqlanmagan qo‘shimcha yoki muolajani boshlash dorilar bilan o‘zaro ta’sir va
                zarar xavfini tug‘diradi.
              </TextBlock>
            </div>
          </section>

          <section id="savollar" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Ko‘p so‘raladigan savollar</h2>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer font-semibold text-slate-950">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="related">
            <h2 id="related" className="text-3xl font-bold text-slate-950">Foydali sahifalar</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["/uz/hospitals", "Hamkor shifoxonalar", "Yo‘nalish va klinik imkoniyatlarni ko‘ring."],
                ["/uz/doctors", "Shifokorlar", "Mutaxassisliklar bo‘yicha ma’lumot oling."],
                ["/uz/treatment-in-india", "Hindistonda davolanish", "Xalqaro bemor jarayonini tushuning."],
                ["/uz/about", "MedPobeda Group haqida", "Koordinatsiya xizmatlari va mas’uliyatini biling."],
                ["/uz/blog", "Tibbiy turizm blogi", "Safar va davolanishga oid maqolalarni o‘qing."],
                ["/uz/contact", "Bog‘lanish", "Hujjatlaringiz bo‘yicha koordinatordan javob oling."],
              ].map(([href, title, description]) => (
                <Link key={href} href={href} className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50">
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </Link>
              ))}
            </div>
          </section>

          <Card className="border-blue-200 bg-blue-50 p-7">
            <div className="flex gap-4">
              <FileText className="h-7 w-7 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Tibbiy hujjatlaringizni ko‘rib chiqishga yuboring</h2>
                <p className="mt-3 leading-7 text-slate-700">
                  MedPobeda Group hujjatlarni tartiblash, mos Hindiston shifoxonasiga so‘rov yuborish va yozma
                  javobni tushunishga yordam beradi. Klinik qaror va davolash faqat litsenziyalangan shifokor
                  tomonidan amalga oshiriladi.
                </p>
                <Button asChild className="mt-5"><Link href="/uz/contact">Koordinator bilan bog‘lanish</Link></Button>
              </div>
            </div>
          </Card>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-6" aria-labelledby="disclaimer">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <h2 id="disclaimer" className="font-bold text-slate-950">Tibbiy ogohlantirish</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Ushbu material faqat umumiy ma’lumot uchun. U tashxis, individual tibbiy maslahat, retsept yoki
                  shoshilinch yordam o‘rnini bosmaydi. Davolash qarorini litsenziyalangan shifokor to‘liq ko‘rik
                  asosida qabul qiladi. Natija va xarajat kafolatlanmaydi. Favqulodda alomatlarda mahalliy tez
                  yordamga murojaat qiling.
                </p>
                <Link className="mt-3 inline-block text-sm font-semibold text-amber-900 underline" href="/uz/medical-disclaimer">
                  To‘liq tibbiy ogohlantirish
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
