"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

const TOUR_WA = "60137111613";

type L4 = { en: string; "zh-Hans": string; "zh-Hant": string; ms: string };
const T: Record<string, L4> = {
  cta: { en: "Enquire on WhatsApp", "zh-Hans": "WhatsApp 咨询", "zh-Hant": "WhatsApp 諮詢", ms: "Tanya di WhatsApp" },
  close: { en: "Close", "zh-Hans": "关闭", "zh-Hant": "關閉", ms: "Tutup" },
};

/**
 * Controlled modal that shows a promo image. Pass a list of candidate
 * `images` (first that loads wins); if none exist the modal stays hidden.
 */
export default function ImagePopup({
  open,
  onClose,
  images,
  alt,
  waText,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  alt: string;
  waText?: string;
}) {
  const { lang } = useLang();
  const tr = (k: string) => T[k][lang];
  const [srcIndex, setSrcIndex] = useState(0);
  const [dead, setDead] = useState(false);

  // Reset the image search each time it opens.
  useEffect(() => {
    if (open) {
      setSrcIndex(0);
      setDead(false);
    }
  }, [open]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || dead) return null;

  const waHref = `https://wa.me/${TOUR_WA}?text=${encodeURIComponent(
    waText || "Hi JSPROGYM! I'd like to enquire."
  )}`;

  return (
    <div className="mk-pop" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <div className="mk-pop-card" onClick={(e) => e.stopPropagation()}>
        <button className="mk-pop-x" onClick={onClose} aria-label={tr("close")}>
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mk-pop-img"
          src={images[srcIndex]}
          alt={alt}
          onError={() => {
            if (srcIndex < images.length - 1) setSrcIndex((i) => i + 1);
            else setDead(true);
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
