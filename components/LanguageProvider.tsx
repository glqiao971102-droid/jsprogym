"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);
const HTML_LANG: Record<Lang, string> = {
  en: "en",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  ms: "ms",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("jspro_lang");
    } catch {}
    if (saved && saved in translations) setLangState(saved as Lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    try {
      localStorage.setItem("jspro_lang", lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(translations[l] ? l : "en");
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = translations[lang][key] ?? translations.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replaceAll(`%${k}%`, String(v));
        }
      }
      return s;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
