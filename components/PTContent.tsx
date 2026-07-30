"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const WA = "60137111613";

type Photo = { url: string; alt: string };

const PT: Record<Lang, Record<string, string>> = {
  en: {
    heroEyebrow: "Personal Training",
    heroTitle: 'Train 1-on-1. <span class="gold">Transform for real.</span>',
    heroSub: "Fully personalised coaching, nutrition and stage-ready competition prep — built entirely around you and your goals.",
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
    heroTitle: '一对一训练，<span class="gold">真正蜕变。</span>',
    heroSub: "完全为你量身定制的训练、饮食，以及登台级别的健美比赛备赛 —— 一切都围绕你和你的目标。",
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
    heroTitle: '一對一訓練，<span class="gold">真正蛻變。</span>',
    heroSub: "完全為你量身打造的訓練、飲食,以及登台級別的健美比賽備賽 —— 一切都圍繞你和你的目標。",
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
    heroTitle: 'Latihan 1-dengan-1. <span class="gold">Transformasi sebenar.</span>',
    heroSub: "Bimbingan, pemakanan dan persediaan pertandingan yang disesuaikan sepenuhnya — dibina sekeliling anda dan matlamat anda.",
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

  // lightbox
  const [i, setI] = useState<number | null>(null);
  const close = useCallback(() => setI(null), []);
  const move = useCallback((d: number) => setI((p) => (p === null ? p : (p + d + photos.length) % photos.length)), [photos.length]);
  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [i, close, move]);

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
      {/* nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="logo"><span className="dot" />JSPROGYM</Link>
          <nav className="nav-links">
            <Link href="/">{c.home}</Link>
            <Link href="/area">Gallery</Link>
            <Link href="/champion">Champions</Link>
          </nav>
          <div className="nav-right">
            <LangSwitcher />
            <a className="btn gold" href="#pt-cta">{c.heroCta}</a>
          </div>
        </div>
      </header>

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
              { t: c.f1t, d: c.f1d, pic: featPics[0], icon: ICONS[0] },
              { t: c.f2t, d: c.f2d, pic: featPics[1], icon: ICONS[1] },
              { t: c.f3t, d: c.f3d, pic: featPics[2], icon: ICONS[2] },
            ].map((f, k) => (
              <div className="pt-feat r" key={k}>
                <div className="pt-feat-img">
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

      {/* gallery */}
      {photos.length > 0 && (
        <section className="sec alt">
          <div className="wrap">
            <div className="sec-h center r">
              <h2>{c.galleryTitle}</h2>
              <p>{c.gallerySub}</p>
            </div>
            <div className="area-grid">
              {photos.map((p, k) => (
                <button className="area-cell" key={p.url + k} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* lightbox */}
      {i !== null && photos[i] && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">✕</button>
          <button className="lb-arrow prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lb-img" src={photos[i].url} alt={photos[i].alt} onClick={(e) => e.stopPropagation()} />
          <button className="lb-arrow next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next">›</button>
          <div className="lb-count">{i + 1} / {photos.length}</div>
        </div>
      )}
    </div>
  );
}
