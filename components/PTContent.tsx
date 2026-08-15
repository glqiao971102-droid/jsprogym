"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ImagePopup from "@/components/ImagePopup";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const WA = "60137111613";

type Photo = { url: string; alt: string };

const PT: Record<Lang, Record<string, string>> = {
  en: {
    heroEyebrow: "Personal Training",
    heroTitle: 'Get stronger. <span class="gold">Move better.</span>',
    heroSub: "A training plan built for your body, your goals, and your lifestyle.",
    heroCta: "Book a free consultation",
    cue: "Scroll ↓",
    introEyebrow: "Why personal training",
    introTitle: 'Coaching that is <span class="gold">100% yours</span>',
    introP: "No cookie-cutter plans. Every session, every meal and every milestone is designed around your body, your schedule and your ambition — with a coach in your corner the whole way.",
    f1t: "Exclusive 1-to-1 Coaching",
    f1d: "Private, undivided attention from a dedicated coach. Programming tailored to your level and adjusted every single week.",
    f2t: "Personalised Nutrition",
    f2d: "A meal and nutrition plan made just for you — hit your goals without the guesswork, with guidance that fits real life.",
    f3t: "Bodybuilding Competition Prep",
    f3d: "Dreaming of the stage? Full contest prep — training, peak week, posing and mindset to get you show-ready.",
    perksTitle: "What's included",
    perk1: "Custom training program",
    perk2: "Personalised meal plan",
    perk3: "Weekly progress reviews",
    perk4: "Body-composition tracking",
    perk5: "Competition & posing coaching",
    perk6: "Direct coach support",
    galleryTitle: "Inside our sessions",
    gallerySub: "Real members, real coaching, real results.",
    galleryCtaEyebrow: "See it for yourself",
    galleryCtaTitle: 'Real coaching. <span class="gold">Real results.</span>',
    galleryCtaText: "Step inside our personal training sessions — real members, real sweat, real progress. See the moments that make JSPROGYM.",
    galleryCtaBtn: "View the photo gallery",
    ctaEyebrow: "Ready to start?",
    ctaTitle: 'Your transformation <span class="gold">starts here</span>',
    ctaP: "Tell us your goal and we'll build your plan. Leave your details — we'll reach out on WhatsApp.",
    fName: "Your name",
    fPhone: "Phone number",
    fGoal: "Your goal",
    gGeneral: "General fitness",
    gLoss: "Weight loss",
    gGain: "Muscle gain",
    gComp: "Competition prep",
    submit: "Send via WhatsApp",
    back: "← Back to JSPROGYM",
    home: "Home",
  },
  "zh-Hans": {
    heroEyebrow: "私人教练",
    heroTitle: '变得更强，<span class="gold">动得更好。</span>',
    heroSub: "为你的身体、你的目标和你的生活方式量身打造的训练计划。",
    heroCta: "预约免费咨询",
    cue: "向下滑 ↓",
    introEyebrow: "为什么选私人教练",
    introTitle: '<span class="gold">100% 属于你</span>的指导',
    introP: "没有千篇一律的方案。每一次训练、每一餐、每一个里程碑,都围绕你的身体、你的时间和你的目标设计 —— 全程有专属教练陪着你。",
    f1t: "专属一对一指导",
    f1d: "专属教练全程一对一、毫无保留地关注你。训练完全按你的水平定制,每周调整。",
    f2t: "专属饮食计划",
    f2d: "为你量身打造的饮食与营养计划 —— 不用瞎猜就能达成目标,贴合真实生活的指导。",
    f3t: "健美比赛备赛",
    f3d: "梦想登上舞台?完整的健美比赛备赛 —— 训练、赛前冲刺、posing 和心态,助你以最佳状态登台。",
    perksTitle: "包含内容",
    perk1: "定制训练计划",
    perk2: "专属饮食计划",
    perk3: "每周进度检视",
    perk4: "身体成分追踪",
    perk5: "比赛与 posing 指导",
    perk6: "教练随时支持",
    galleryTitle: "训练现场",
    gallerySub: "真实的会员,真实的指导,真实的成果。",
    galleryCtaEyebrow: "亲眼看看",
    galleryCtaTitle: '真实指导,<span class="gold">真实成果。</span>',
    galleryCtaText: "走进我们的私教训练现场 —— 真实的会员、真实的汗水、真实的进步。看看属于 JSPROGYM 的精彩瞬间。",
    galleryCtaBtn: "查看照片相册",
    ctaEyebrow: "准备好了吗?",
    ctaTitle: '你的蜕变<span class="gold">从这里开始</span>',
    ctaP: "告诉我们你的目标,我们为你制定计划。留下你的资料,我们会通过 WhatsApp 联系你。",
    fName: "你的名字",
    fPhone: "电话号码",
    fGoal: "你的目标",
    gGeneral: "一般健身",
    gLoss: "减脂",
    gGain: "增肌",
    gComp: "比赛备赛",
    submit: "通过 WhatsApp 发送",
    back: "← 返回 JSPROGYM",
    home: "首页",
  },
  "zh-Hant": {
    heroEyebrow: "私人教練",
    heroTitle: '變得更強，<span class="gold">動得更好。</span>',
    heroSub: "為你的身體、你的目標和你的生活方式量身打造的訓練計劃。",
    heroCta: "預約免費諮詢",
    cue: "向下滑 ↓",
    introEyebrow: "為什麼選私人教練",
    introTitle: '<span class="gold">100% 屬於你</span>的指導',
    introP: "沒有千篇一律的方案。每一次訓練、每一餐、每一個里程碑,都圍繞你的身體、你的時間和你的目標設計 —— 全程有專屬教練陪著你。",
    f1t: "專屬一對一指導",
    f1d: "專屬教練全程一對一、毫無保留地關注你。訓練完全按你的程度定制,每週調整。",
    f2t: "專屬飲食計劃",
    f2d: "為你量身打造的飲食與營養計劃 —— 不用瞎猜就能達成目標,貼合真實生活的指導。",
    f3t: "健美比賽備賽",
    f3d: "夢想登上舞台?完整的健美比賽備賽 —— 訓練、賽前衝刺、posing 和心態,助你以最佳狀態登台。",
    perksTitle: "包含內容",
    perk1: "定制訓練計劃",
    perk2: "專屬飲食計劃",
    perk3: "每週進度檢視",
    perk4: "身體成分追蹤",
    perk5: "比賽與 posing 指導",
    perk6: "教練隨時支援",
    galleryTitle: "訓練現場",
    gallerySub: "真實的會員,真實的指導,真實的成果。",
    galleryCtaEyebrow: "親眼看看",
    galleryCtaTitle: '真實指導,<span class="gold">真實成果。</span>',
    galleryCtaText: "走進我們的私教訓練現場 —— 真實的會員、真實的汗水、真實的進步。看看屬於 JSPROGYM 的精彩瞬間。",
    galleryCtaBtn: "查看照片相簿",
    ctaEyebrow: "準備好了嗎?",
    ctaTitle: '你的蛻變<span class="gold">從這裡開始</span>',
    ctaP: "告訴我們你的目標,我們為你制定計劃。留下你的資料,我們會透過 WhatsApp 聯繫你。",
    fName: "你的名字",
    fPhone: "電話號碼",
    fGoal: "你的目標",
    gGeneral: "一般健身",
    gLoss: "減脂",
    gGain: "增肌",
    gComp: "比賽備賽",
    submit: "透過 WhatsApp 傳送",
    back: "← 返回 JSPROGYM",
    home: "首頁",
  },
  ms: {
    heroEyebrow: "Latihan Peribadi",
    heroTitle: 'Jadi lebih kuat. <span class="gold">Bergerak lebih baik.</span>',
    heroSub: "Pelan latihan yang dibina untuk tubuh, matlamat dan gaya hidup anda.",
    heroCta: "Tempah perundingan percuma",
    cue: "Skrol ↓",
    introEyebrow: "Kenapa latihan peribadi",
    introTitle: 'Bimbingan yang <span class="gold">100% milik anda</span>',
    introP: "Tiada pelan generik. Setiap sesi, setiap hidangan dan setiap pencapaian direka mengikut badan, jadual dan cita-cita anda — dengan jurulatih di sisi anda sepanjang jalan.",
    f1t: "Bimbingan 1-dengan-1 Eksklusif",
    f1d: "Perhatian penuh daripada jurulatih khas. Program disesuaikan mengikut tahap anda dan dilaras setiap minggu.",
    f2t: "Pemakanan Peribadi",
    f2d: "Pelan pemakanan yang dibuat khas untuk anda — capai matlamat tanpa meneka, dengan panduan yang praktikal.",
    f3t: "Persediaan Pertandingan Bodybuilding",
    f3d: "Impikan pentas? Persediaan pertandingan penuh — latihan, peak week, posing dan minda untuk anda bersedia ke pentas.",
    perksTitle: "Apa yang disertakan",
    perk1: "Program latihan tersuai",
    perk2: "Pelan pemakanan peribadi",
    perk3: "Semakan kemajuan mingguan",
    perk4: "Penjejakan komposisi badan",
    perk5: "Bimbingan pertandingan & posing",
    perk6: "Sokongan jurulatih terus",
    galleryTitle: "Dalam sesi kami",
    gallerySub: "Ahli sebenar, bimbingan sebenar, hasil sebenar.",
    galleryCtaEyebrow: "Lihat sendiri",
    galleryCtaTitle: 'Bimbingan sebenar. <span class="gold">Hasil sebenar.</span>',
    galleryCtaText: "Langkah masuk ke sesi latihan peribadi kami — ahli sebenar, peluh sebenar, kemajuan sebenar. Lihat detik-detik JSPROGYM.",
    galleryCtaBtn: "Lihat galeri foto",
    ctaEyebrow: "Sedia untuk mula?",
    ctaTitle: 'Transformasi anda <span class="gold">bermula di sini</span>',
    ctaP: "Beritahu kami matlamat anda dan kami bina pelan anda. Tinggalkan butiran — kami akan hubungi melalui WhatsApp.",
    fName: "Nama anda",
    fPhone: "Nombor telefon",
    fGoal: "Matlamat anda",
    gGeneral: "Kecergasan umum",
    gLoss: "Turun berat",
    gGain: "Tambah otot",
    gComp: "Persediaan pertandingan",
    submit: "Hantar melalui WhatsApp",
    back: "← Kembali ke JSPROGYM",
    home: "Utama",
  },
};

type Trainer = { name: string; initial: string; badge?: string; specialty: string; bio: string };
const TRAINERS: Trainer[] = [
  {
    name: "JSKOO",
    initial: "J",
    badge: "Master Coach",
    specialty: "Bodybuilding & Contest Prep",
    bio: "15+ years' experience — off-season to peak week.",
  },
  {
    name: "Dewi Lin",
    initial: "D",
    specialty: "Women's Fitness · All Ages",
    bio: "Coaching women of every age — warm and approachable.",
  },
  {
    name: "Darren",
    initial: "D",
    specialty: "Bodybuilding-Style Training",
    bio: "Bodybuilding and body coordination, taught simply.",
  },
  {
    name: "Kate",
    initial: "K",
    specialty: "Women's Fitness",
    bio: "Women's fitness that's fun — never boring.",
  },
  {
    name: "Bliss",
    initial: "B",
    specialty: "Functional Training",
    bio: "Functional training that corrects muscle imbalances.",
  },
];

const ICONS: ReactNode[] = [
  <><circle cx="9" cy="7" r="3" strokeWidth="1.6" /><path d="M3 21c0-4 3-6 6-6s6 2 6 6M17 8l2 2 4-4" strokeWidth="1.6" /></>,
  <><path d="M6 3h9a3 3 0 0 1 0 6H6zM6 9h11a3 3 0 0 1 0 6H6zM6 15h8" strokeWidth="1.6" /><path d="M4 3v18" strokeWidth="1.6" /></>,
  <><path d="m12 2 2.4 5.5L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.5z" strokeWidth="1.6" /></>,
];

export default function PTContent({ photos, cover }: { photos: Photo[]; cover: string | null }) {
  const { lang } = useLang();
  const c = PT[lang] || PT.en;
  const heroBg = cover || photos[0]?.url;
  const featPics = [photos[0]?.url, photos[Math.floor(photos.length / 2)]?.url, photos[photos.length - 1]?.url];

  // promo popup — opens shortly after landing on the page
  const [promoOpen, setPromoOpen] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setPromoOpen(true), 450);
    return () => clearTimeout(id);
  }, []);

  const onEnquire = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg =
      "Hi JSPROGYM! I'm interested in Personal Training.\n" +
      `Name: ${d.get("name") || ""}\n` +
      `Phone: ${d.get("phone") || ""}\n` +
      `Goal: ${d.get("goal") || ""}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <div className="t-premium">
      <ImagePopup
        open={promoOpen}
        onClose={() => setPromoOpen(false)}
        images={["/personal-trainer.jpg", "/personal-trainer.png", "/personal-trainer.jpeg", "/personal-trainer.webp"]}
        alt="JSPROGYM Personal Trainer session promotion"
        waText="Hi JSPROGYM! I'm interested in the Personal Trainer session promotion."
      />
      {/* nav */}
      <SiteNav />

      {/* hero */}
      <section className="pt-hero">
        {heroBg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="pt-hero-bg" src={heroBg} alt="" />
        )}
        <div className="pt-hero-scrim" />
        <div className="wrap pt-hero-in">
          <div className="eyebrow r">{c.heroEyebrow}</div>
          <h1 className="r" dangerouslySetInnerHTML={{ __html: c.heroTitle }} />
          <p className="r">{c.heroSub}</p>
          <a className="btn gold r" href="#pt-cta">{c.heroCta}</a>
        </div>
        <div className="pt-cue">{c.cue}</div>
      </section>

      {/* intro */}
      <section className="sec">
        <div className="wrap sec-h center r" style={{ maxWidth: 640 }}>
          <div className="eyebrow">{c.introEyebrow}</div>
          <h2 dangerouslySetInnerHTML={{ __html: c.introTitle }} />
          <p>{c.introP}</p>
        </div>
      </section>

      {/* features */}
      <section className="sec alt">
        <div className="wrap">
          <div className="pt-feats">
            {[
              { t: c.f1t, d: c.f1d, pic: featPics[0], icon: ICONS[0], bright: false },
              { t: c.f2t, d: c.f2d, pic: "/nutrition.jpeg", icon: ICONS[1], bright: true },
              { t: c.f3t, d: c.f3d, pic: "/competition-prep.jpeg", icon: ICONS[2], bright: true },
            ].map((f, k) => (
              <div className="pt-feat r" key={k}>
                <div className={`pt-feat-img${f.bright ? " bright" : ""}`}>
                  {f.pic && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.pic} alt="" loading="lazy" />
                  )}
                  <span className="pt-feat-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </span>
                </div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* perks */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-h center r"><h2>{c.perksTitle}</h2></div>
          <ul className="pt-perks r">
            {[c.perk1, c.perk2, c.perk3, c.perk4, c.perk5, c.perk6].map((p, k) => (
              <li key={k}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* trainers */}
      <section className="sec alt" id="trainers">
        <div className="wrap">
          <div className="sec-h center r">
            <div className="eyebrow">Our team</div>
            <h2>Meet our <span className="gold">trainers</span></h2>
            <p>Five certified coaches, each with their own specialty — find the right fit for your goals.</p>
          </div>
          <div className="pt-team">
            {TRAINERS.map((tr) => (
              <div className={`pt-trainer r${tr.badge ? " lead" : ""}`} key={tr.name}>
                {tr.badge && <span className="pt-trainer-badge">{tr.badge}</span>}
                <div className="pt-trainer-photo"><b>{tr.initial}</b></div>
                <h3>{tr.name}</h3>
                <div className="pt-trainer-spec">{tr.specialty}</div>
                <p>{tr.bio}</p>
                <a
                  className="btn outline pt-trainer-btn"
                  href={`https://wa.me/${WA}?text=${encodeURIComponent(
                    `Hi JSPROGYM! I'd like to book a personal training session with ${tr.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a session
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery call-to-action */}
      <section className="sec pt-gallery-cta">
        <div className="wrap sec-h center r" style={{ maxWidth: 660 }}>
          <div className="eyebrow">{c.galleryCtaEyebrow}</div>
          <h2 dangerouslySetInnerHTML={{ __html: c.galleryCtaTitle }} />
          <p>{c.galleryCtaText}</p>
          <Link className="btn gold pt-gallery-btn" href="/area#personal-trainer-class">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="6" width="18" height="14" rx="2" />
              <circle cx="12" cy="13" r="3.2" />
              <path d="M8 6l1.5-2h5L16 6" />
            </svg>
            {c.galleryCtaBtn}
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-cta" id="pt-cta">
        <div className="wrap pt-cta-grid">
          <div className="r">
            <div className="eyebrow">{c.ctaEyebrow}</div>
            <div className="sec-h" style={{ maxWidth: "none", margin: "10px 0 0" }}>
              <h2 dangerouslySetInnerHTML={{ __html: c.ctaTitle }} />
            </div>
            <p className="pt-cta-p">{c.ctaP}</p>
          </div>
          <form className="form-card pt-form r" onSubmit={onEnquire}>
            <div className="form">
              <input type="text" name="name" placeholder={c.fName} required />
              <input type="tel" name="phone" placeholder={c.fPhone} required />
              <select name="goal" defaultValue="" required>
                <option value="" disabled>{c.fGoal}</option>
                <option value={c.gGeneral}>{c.gGeneral}</option>
                <option value={c.gLoss}>{c.gLoss}</option>
                <option value={c.gGain}>{c.gGain}</option>
                <option value={c.gComp}>{c.gComp}</option>
              </select>
              <button className="btn gold" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                {c.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>© 2026 JSPROGYM</span>
          <Link href="/" className="back">{c.back}</Link>
        </div>
      </footer>
    </div>
  );
}
