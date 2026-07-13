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

type Dict = Record<string, string>;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  img: (key: string) => string | undefined;
};

const LanguageContext = createContext<Ctx | null>(null);
const HTML_LANG: Record<Lang, string> = {
  en: "en",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  ms: "ms",
};

export function LanguageProvider({
  children,
  overrides,
  images,
}: {
  children: ReactNode;
  /** Payload-managed strings: { locale: { key: value } } — take priority over static i18n. */
  overrides?: Partial<Record<Lang, Dict>>;
  /** Payload-managed images: { key: url }. */
  images?: Record<string, string>;
}) {
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
      let s =
        overrides?.[lang]?.[key] ??
        translations[lang][key] ??
        overrides?.en?.[key] ??
        translations.en[key] ??
        key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replaceAll(`%${k}%`, String(v));
        }
      }
      return s;
    },
    [lang, overrides]
  );

  const img = useCallback((key: string) => images?.[key], [images]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, img }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
