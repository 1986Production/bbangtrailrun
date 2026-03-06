"use client";

import { useEffect } from "react";

const HEADING_SELECTOR = "h1,h2,h3,h4,h5,h6";
const HANGUL_REGEX = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]/;
const FORCE_KO_ATTR = "data-force-ko-heading";

const markKoreanHeadings = () => {
  document.querySelectorAll(HEADING_SELECTOR).forEach((node) => {
    const isKoreanHeading = HANGUL_REGEX.test(node.textContent || "");
    const isForcedKoreanHeading = node.hasAttribute(FORCE_KO_ATTR);
    node.classList.toggle("heading-ko", isKoreanHeading || isForcedKoreanHeading);
  });
};

export default function KoreanHeadingMarker() {
  useEffect(() => {
    let rafId = 0;

    const scheduleMark = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(markKoreanHeadings);
    };

    scheduleMark();

    const observer = new MutationObserver(scheduleMark);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, []);

  return null;
}
