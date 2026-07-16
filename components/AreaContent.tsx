"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Trans from "@/components/Trans";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

export type Photo = { url: string; alt: string };
export type AreaData = {
  slug: string;
  name: Partial<Record<Lang, string>>;
  photos: Photo[];
};

export default function AreaContent({ areas }: { areas: AreaData[] }) {
  const { lang, t } = useLang();
  const nameOf = (a: AreaData) => a.name[lang] || a.name.en || a.slug;

  // lightbox: which area + which photo index
  const [box, setBox] = useState<{ area: number; i: number } | null>(null);
  const close = useCallback(() => setBox(null), []);
  const move = useCallback(
    (d: number) =>
      setBox((b) => {
        if (!b) return b;
        const list = areas[b.area].photos;
        return { area: b.area, i: (b.i + d + list.length) % list.length };
      }),
    [areas]
  );

  useEffect(() => {
    if (!box) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [box, close, move]);

  const current = box ? areas[box.area].photos[box.i] : null;

  return (
    <div className="t-premium">
      {/* nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="logo">
            <span className="dot" />
            JSPROGYM
          </Link>
          <nav className="nav-links">
            <Link href="/">{t("nav.home") !== "nav.home" ? t("nav.home") : "Home"}</Link>
            <Link href="/#programs">{t("nav.pt")}</Link>
            <Link href="/champion">{t("nav.champions")}</Link>
            <Link href="/#tour">{t("nav.contact")}</Link>
          </nav>
          <div className="nav-right">
            <LangSwitcher />
            <Link className="btn gold" href="/#tour">
              {t("nav.freeTour")}
            </Link>
          </div>
        </div>
      </header>

      {/* header (background is left for you to style) */}
      <section className="area-hero">
        <div className="wrap">
          <div className="eyebrow r">{t("nav.gallery")}</div>
          <h1 className="r">
            Our <span className="gold">Gym</span>
          </h1>
          <p className="r">
            Step inside JSPROGYM — explore every zone, from the free-weight floor
            to Hyrox and personal training. Tap any photo to view it full-size.
          </p>
        </div>
      </section>

      {/* per-area galleries */}
      <div className="wrap area-wrap">
        {areas.map((a, ai) => (
          <section className="area-sec" id={a.slug} key={a.slug}>
            <div className="area-head">
              <h2>{nameOf(a)}</h2>
              <span>{a.photos.length} photos</span>
            </div>
            <div className="area-grid">
              {a.photos.map((p, i) => (
                <button
                  className="area-cell"
                  key={p.url + i}
                  onClick={() => setBox({ area: ai, i })}
                  aria-label={`Open ${nameOf(a)} photo ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* lightbox */}
      {box && current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">
            ✕
          </button>
          <button
            className="lb-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lb-img"
            src={current.url}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="lb-count">
            {box.i + 1} / {areas[box.area].photos.length}
          </div>
        </div>
      )}

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>{t("foot.rights")}</span>
          <Link href="/" className="back">
            ← JSPROGYM
          </Link>
        </div>
      </footer>
    </div>
  );
}
