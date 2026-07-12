import type { CollectionConfig } from "payload";

// Admin users — the auth that protects /admin.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};
