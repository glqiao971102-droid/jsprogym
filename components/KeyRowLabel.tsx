"use client";

import { useRowLabel } from "@payloadcms/ui";

// Shows each Strings/Images row by its `key` (and English value) in the admin.
export const KeyRowLabel = () => {
  const { data } = useRowLabel<{ key?: string; value?: string }>();
  const key = data?.key || "row";
  const val = typeof data?.value === "string" ? data.value : "";
  return (
    <span>
      <strong>{key}</strong>
      {val ? ` — ${val.slice(0, 60)}` : ""}
    </span>
  );
};
