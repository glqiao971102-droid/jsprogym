"use client";

import { type ElementType } from "react";
import { useLang } from "./LanguageProvider";

/**
 * Renders a translated string. Some values contain markup (e.g.
 * <span class="gold">…</span>), so it renders as HTML.
 */
export default function Trans({
  id,
  as,
  className,
  vars,
}: {
  id: string;
  as?: ElementType;
  className?: string;
  vars?: Record<string, string | number>;
}) {
  const { t } = useLang();
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: t(id, vars) }} />
  );
}
