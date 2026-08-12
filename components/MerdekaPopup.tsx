"use client";

import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/components/LanguageProvider";

// WhatsApp enquiry number (same as the rest of the site).
const TOUR_WA = "60137111613";

// Candidate filenames — drop your poster into /public as any of these.
const IMAGE_CANDIDATES = ["/merdeka.jpg", "/merdeka.png", "/merdeka.jpeg", "/merdeka.webp"];

type L4 = { en: string; "zh-Hans": string; "zh-Hant": string; ms: string };
const T: Record<string, L4> = {
  alt: { en: "JSPROGYM Merdeka Special promotion", "zh-Hans": "JSPROGYM 国庆特惠促销", "zh-Hant": "JSPROGYM 國慶特惠促銷", ms: "Promosi Merdeka Special JSPROGYM" },
  cta: { en: "Enquire on WhatsApp", "zh-Hans": "WhatsApp 咨询优惠", "zh-Hant": "WhatsApp 諮詢優惠", ms: "Tanya di WhatsApp" },
  close: { en: "Close", "zh-Hans": "关闭", "zh-Hant": "關閉", ms: "Tutup" },
};

export default function MerdekaPopup() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const [dead, setDead] = useState(false); // image not found → never show

  const tr = (k: string) => T[k][lang];

  // Open on every page load / refresh.
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 450);
    return () => clearTimeout(id);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (dead || !open) return null;

  const waHref = `https://wa.me/${TOUR_WA}?text=${encodeURIComponent(
    "Hi JSPROGYM! I'm interested in the Merdeka Special promotion."
  )}`;

  return (
    <div className="mk-pop" role="dialog" aria-modal="true" aria-label={tr("alt")} onClick={close}>
      <div className="mk-pop-card" onClick={(e) => e.stopPropagation()}>
        <button className="mk-pop-x" onClick={close} aria-label={tr("close")}>
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mk-pop-img"
          src={IMAGE_CANDIDATES[srcIndex]}
          alt={tr("alt")}
          onError={() => {
            if (srcIndex < IMAGE_CANDIDATES.length - 1) setSrcIndex((i) => i + 1);
            else setDead(true); // no poster in /public → don't show a broken popup
          }}
        />
        <a className="btn gold mk-pop-cta" href={waHref} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
          </svg>
          {tr("cta")}
        </a>
      </div>
    </div>
  );
}
