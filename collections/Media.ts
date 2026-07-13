import type { CollectionConfig } from "payload";

// Images/videos — stored on the shared simmieco S3 bucket (jsprogym/ prefix).
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image / Media", plural: "Media" },
  access: { read: () => true },
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text (for accessibility)",
    },
  ],
};
