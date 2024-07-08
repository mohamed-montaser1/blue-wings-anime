import { slugifyOptions } from "@/lib/slugifyOptions";
import slugify from "slugify";

export function isValidSlug(slug: string) {
  return slug === slugify(slug, slugifyOptions)
}