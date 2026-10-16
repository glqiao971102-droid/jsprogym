"use client";

import { useState } from "react";
import Link from "next/link";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";

// Absolute links so the nav works identically from every page.
const NAV: { k: string; href: string }[] = [
  { k: "nav.pt", href: "/personal-training" },
  { k: "nav.gc", href: "/#group-class" },
  { k: "nav.membership", href: "/membership" },
  { k: "nav.rewards", href: "/rewards" },
  { k: "nav.reviews", href: "/#reviews" },
  { k: "nav.gallery", href: "/area" },
  { k: "nav.contact", href: "/#tour" },
];

const FB_URL = "https://www.facebook.com/jsprogym";
const IG_URL = "https://www.instagram.com/jspro_gym/";

function SocialLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="JSPROGYM on Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.4 2 17 2 15.9 2 13 2 11 3.7 11 6.7V10H8v4h3v8z" />
        </svg>
      </a>
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="JSPROGYM on Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  );
}

export default function SiteNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="logo">
          <span className="dot" />
          JSPROGYM
        </Link>
        <nav className="nav-links">
          {NAV.map((n) => (
            <Link href={n.href} key={n.k}>
              {t(n.k)}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <SocialLinks className="nav-social" />
          <Link className="btn gold" href="/#tour">
            {t("nav.freetour")}
          </Link>
          <button
            className={`nav-burger${open ? " open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav-mobile">
          <div className="wrap">
            {NAV.map((n) => (
              <Link href={n.href} key={n.k} onClick={() => setOpen(false)}>
                {t(n.k)}
              </Link>
            ))}
            <Link className="btn gold" href="/#tour" onClick={() => setOpen(false)}>
              {t("nav.freetour")}
            </Link>
            <SocialLinks className="nav-mobile-social" />
          </div>
        </nav>
      )}
    </header>
  );
}
