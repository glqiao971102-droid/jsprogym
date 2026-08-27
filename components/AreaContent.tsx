"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Trans from "@/components/Trans";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

export type Photo = { url: string; alt: string; video?: boolean };
export type AreaData = {
  slug: string;
  name: Partial<Record<Lang, string>>;
  group: string;
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
      <SiteNav />

      {/* header (background is left for you to style) */}
      <section className="area-hero">
        <div className="wrap">
          <div className="eyebrow r">{t("nav.gallery")}</div>
          <h1 className="r">
            Our <span className="gold">Gym</span>
          </h1>
          <p className="r">
            Step inside JSPROGYM — explore every zone, from the free-weight floor
            to group classes and recovery. Tap any photo to view it full-size.
          </p>
        </div>
      </section>

      {/* per-area galleries, grouped under a heading */}
      <div className="wrap area-wrap">
        {areas.map((a, ai) => {
          const prevGroup = ai > 0 ? areas[ai - 1].group : "";
          const showGroupHead = !!a.group && a.group !== prevGroup;
          // Groups with more than one area (e.g. Equipment) get per-area
          // sub-headings. A single-area group is its own big heading.
          const groupSize = a.group ? areas.filter((x) => x.group === a.group).length : 1;
          const showSubHead = !a.group || groupSize > 1;
          return (
            <Fragment key={a.slug}>
              {showGroupHead && (
                <div className="area-group-head">
                  <h2>{a.group}</h2>
                </div>
              )}
              <section className="area-sec" id={a.slug}>
                {showSubHead ? (
                  <div className="area-head">
                    <h3>{nameOf(a)}</h3>
                    <span>{a.photos.length} photos</span>
                  </div>
                ) : (
                  <div className="area-head area-head-solo">
                    <span>{a.photos.length} photos</span>
                  </div>
                )}
                <div className="area-grid">
                  {a.photos.map((p, i) => (
                    <button
                      className={`area-cell${p.video ? " is-video" : ""}`}
                      key={p.url + i}
                      onClick={() => setBox({ area: ai, i })}
                      aria-label={`Open ${nameOf(a)} ${p.video ? "video" : "photo"} ${i + 1}`}
                    >
                      {p.video ? (
                        <>
                          <video src={p.url} muted loop playsInline autoPlay preload="metadata" />
                          <span className="area-cell-play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </span>
                        </>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.url} alt={p.alt} loading="lazy" decoding="async" />
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </Fragment>
          );
        })}
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
          {current.video ? (
            <video
              className="lb-img"
              src={current.url}
              controls
              autoPlay
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="lb-img"
              src={current.url}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
            />
          )}
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
