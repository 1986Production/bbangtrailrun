"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from "react";
import ThemeToggle from "@/src/components/ThemeToggle";

const navLinks = [
  { href: "/overview", label: "대회 개요" },
  { href: "/souvenirs", label: "기념품" },
  { href: "/course", label: "코스안내" },
  { href: "/registration", label: "참가신청" },
  { href: "/accommodation", label: "숙박권" },
  { href: "/notice", label: "공지사항" },
];

const SiteNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const currentPath = pathname ?? "";
  const [activeUnderlineStyle, setActiveUnderlineStyle] = useState<CSSProperties>({
    opacity: 0,
  });

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);

  useEffect(() => {
    const updateUnderline = () => {
      const container = desktopNavRef.current;
      if (!container) return;

      const activeLink = container.querySelector<HTMLAnchorElement>('[data-active="true"]');
      if (!activeLink) {
        setActiveUnderlineStyle({ opacity: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();

      setActiveUnderlineStyle({
        width: activeRect.width - 24,
        transform: `translateX(${activeRect.left - containerRect.left + 12}px)`,
        opacity: 1,
      });
    };

    const rafId = window.requestAnimationFrame(updateUnderline);
    window.addEventListener("resize", updateUnderline);
    document.fonts?.ready.then(updateUnderline).catch(() => {});

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateUnderline);
    };
  }, [currentPath]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (currentPath === href) {
      event.preventDefault();
      return;
    }

    const documentWithViewTransition = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (!documentWithViewTransition.startViewTransition) {
      return;
    }

    event.preventDefault();
    documentWithViewTransition.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav data-section="site-nav" className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div data-block="nav-container" className="relative p-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="liquid-glass-shell inline-flex w-auto rounded-full px-[9.23px] py-[7.37px] items-center gap-6 text-black">
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <Link
                href="/"
                aria-label="빵트레일런 홈"
                onClick={() => setIsMenuOpen(false)}
                className="shrink-0 h-10 w-10 rounded-full bg-[#A8FF00] text-black flex items-center justify-center text-sm font-bold"
              >
                빵
              </Link>
              <div ref={desktopNavRef} className="hidden lg:flex items-center gap-3 lg:gap-4 relative pb-[3px]">
                <span
                  aria-hidden="true"
                  className="site-nav-underline"
                  style={activeUnderlineStyle}
                />
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    data-active={isActive(item.href) ? "true" : "false"}
                    className={`site-nav-link whitespace-nowrap transition-colors ${
                      isActive(item.href) ? "site-nav-link-active" : "hover:text-gray-600"
                    }`}
                  >
                    <h5 className="m-0 text-current">{item.label}</h5>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 shrink-0 lg:hidden">
              <button
                type="button"
                aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="h-10 w-10 rounded-full text-[#A8FF00] flex items-center justify-center bg-transparent border-0 shadow-none"
              >
                {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          <div className="inline-flex w-auto items-center text-black">
            <ThemeToggle />
          </div>
        </div>

        {isMenuOpen && (
          <div className="liquid-glass-panel lg:hidden mt-4 w-[min(92vw,28rem)] rounded-[2rem] p-5">
            <div className="flex flex-col gap-6 px-2 pb-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`site-nav-link transition-colors ${
                    isActive(item.href) ? "site-nav-link-active" : "text-black hover:opacity-70"
                  }`}
                >
                  <h5 className="m-0 text-current">{item.label}</h5>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteNavbar;
