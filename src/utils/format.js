export function formatDate(isoDate) {
  return new Intl.DateTimeFormat("ar-EG-u-nu-arab", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

// Splits the post content into headings (## ...) and paragraphs
export function parseContent(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      line.startsWith("## ")
        ? { type: "heading", text: line.slice(3) }
        : { type: "paragraph", text: line }
    );
}

export function formatShortDate(isoDate) {
  return new Intl.DateTimeFormat("ar-EG-u-nu-arab", { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(isoDate));
}
