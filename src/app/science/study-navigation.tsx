"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";

export const subscribeLocation = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => { window.removeEventListener("hashchange", callback); window.removeEventListener("popstate", callback); };
};
export const getLocation = () => window.location.search + window.location.hash;
export const serverLocation = () => "";
const noteAnchor = /^study-(?:pmid-\d+|pmcid-pmc\d+)$/;

function browseParams(location: string) {
  const current = new URLSearchParams(location.split("#")[0]);
  const params = new URLSearchParams();
  for (const key of ["q", "type", "year", "sort", "page", "view"]) {
    const value = current.get(key);
    if (value) params.set(key, value);
  }
  return params;
}

export function StudyReaderLink({ slug, pmid, className, children }: { slug: string; pmid: string; className?: string; children: ReactNode }) {
  const location = useSyncExternalStore(subscribeLocation, getLocation, serverLocation);
  const params = browseParams(location);
  const hash = location.includes("#") ? location.slice(location.indexOf("#") + 1) : "";
  if (noteAnchor.test(hash)) {
    params.set("view", "explained");
    params.set("returnNote", hash);
  }
  return <Link className={className} href={`/science/${slug}/${pmid}${params.size ? `?${params}` : ""}`} prefetch={false}>{children}</Link>;
}

export function StudyCollectionLink({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  const location = useSyncExternalStore(subscribeLocation, getLocation, serverLocation);
  const params = browseParams(location);
  const note = new URLSearchParams(location.split("#")[0]).get("returnNote") ?? "";
  const anchor = noteAnchor.test(note) ? `#${note}` : params.size ? "#publication-results" : "";
  return <Link className={className} href={`/science/${slug}${params.size ? `?${params}` : ""}${anchor}`}>{children}</Link>;
}
