"use client";

import { useLang } from "./LanguageProvider";
import { LANGS, type Lang } from "@/lib/i18n";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <label className="lang-switch" aria-label="Language">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
      </svg>
      <span className="lang-cur">{current.short}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
