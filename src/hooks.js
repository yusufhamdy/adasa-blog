import { useEffect, useState } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | عدسة` : "عدسة - عالم التصوير";
  }, [title]);
}

// Returns the id of the section that is currently near the top of the screen
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
}
