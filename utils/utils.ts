import { Media, ProjectTag } from "@/payload-types";

export function isMedia(val: unknown): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val;
}

export function isProjectTag(val: unknown): val is ProjectTag {
  return typeof val === 'object' && val !== null && 'title' in val;
}