export const imageTypesAllowed = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export type imageTypesAllowedKey = (typeof imageTypesAllowed)[number];
