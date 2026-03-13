"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AccordionItem } from "@/src/components/AccordionItem";
import { notices } from "@/src/data/notices";

const heroOptions = [
  {
    id: "option-1",
    label: "1안",
    src: "/images/home-hero-section-v1.png",
    aspectRatio: "3418 / 2753",
  },
  {
    id: "option-2",
    label: "2안",
    src: "/images/home-hero-section-v2.png",
    aspectRatio: "3418 / 2222",
  },
  {
    id: "option-3",
    label: "3안",
    src: "/images/home-hero-section-v3.png",
    aspectRatio: "6836 / 4443",
  },
  {
    id: "option-4",
    label: "4안",
    src: "/images/home-hero-section-v4.png",
    aspectRatio: "6836 / 4443",
  },
  {
    id: "option-6",
    label: "5안",
    src: "/images/home-hero-section-v5.png",
    aspectRatio: "3418 / 2222",
  },
  {
    id: "option-5",
    label: "1-2안",
    src: "/images/home-hero-section-v1-2.png",
    aspectRatio: "3418 / 2753",
  },
  {
    id: "option-7",
    label: "Finish",
    src: "/images/home-hero-section-finish.png",
    aspectRatio: "3418 / 2222",
  },
];

const heroCarouselItems = Array.from({ length: 10 }, (_, index) => {
  const order = String(index + 1).padStart(2, "0");

  return {
    id: `hero-carousel-${order}`,
    title: `캐러셀 이미지 ${order}`,
    src: `/images/home-hero-carousel-${order}.jpg`,
  };
});

const heroServicePreview = {
  title: "나무 13 X 빵트레일런",
  desc: "감각적인 일러스트로 사랑받는 일러스트레이터 ‘나무13’과 빵트레일런이 만났습니다. 빵트레일런2026에서만 만나볼 수 있는 한정판 굿즈!",
  ctaLabel: "기념품 전체 보러가기",
  ctaHref: "/souvenirs",
  img: "/images/ecommerce-1200x800.jpg",
};

const homeFrameClassName = "layout-frame";
const homeBottomFrameClassName = "layout-frame-bottom";

const HomeHeroIntro = () => {
  const heroCarouselScrollRef = useRef<HTMLDivElement | null>(null);
  const heroCarouselAutoplayPausedRef = useRef(false);
  const heroCarouselDragStateRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const autoplayIntervalId = window.setInterval(() => {
      const heroCarouselScrollElement = heroCarouselScrollRef.current;

      if (
        !heroCarouselScrollElement ||
        heroCarouselAutoplayPausedRef.current ||
        heroCarouselDragStateRef.current.active
      ) {
        return;
      }

      const listElement = heroCarouselScrollElement.firstElementChild as HTMLElement | null;
      const firstCardElement = listElement?.querySelector<HTMLElement>("article");

      if (!listElement || !firstCardElement) {
        return;
      }

      const listStyles = window.getComputedStyle(listElement);
      const gap = Number.parseFloat(listStyles.columnGap || listStyles.gap || "0");
      const step = firstCardElement.getBoundingClientRect().width + gap;
      const maxScrollLeft = heroCarouselScrollElement.scrollWidth - heroCarouselScrollElement.clientWidth;
      const nextScrollLeft = heroCarouselScrollElement.scrollLeft + step;

      if (maxScrollLeft <= 0) {
        return;
      }

      heroCarouselScrollElement.scrollTo({
        left: nextScrollLeft >= maxScrollLeft - 8 ? 0 : nextScrollLeft,
        behavior: nextScrollLeft >= maxScrollLeft - 8 ? "auto" : "smooth",
      });
    }, 3500);

    return () => {
      window.clearInterval(autoplayIntervalId);
    };
  }, []);

  const handleHeroCarouselPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !heroCarouselScrollRef.current) {
      return;
    }

    heroCarouselDragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: heroCarouselScrollRef.current.scrollLeft,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleHeroCarouselPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = heroCarouselDragStateRef.current;
    const heroCarouselScrollElement = heroCarouselScrollRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId || !heroCarouselScrollElement) {
      return;
    }

    heroCarouselScrollElement.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    event.preventDefault();
  };

  const finishHeroCarouselDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = heroCarouselDragStateRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    heroCarouselDragStateRef.current = {
      active: false,
      pointerId: -1,
      startX: 0,
      scrollLeft: 0,
    };

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      data-section="home-hero"
      className={`home-hero ${homeBottomFrameClassName}`}
    >
      <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
        <div className="max-w-xl">
          <h2 className="tracking-tight leading-[0.95] text-black mb-[30px]">
            어디서도 본 적 없는{" "}
            <span className="text-gray-400 italic tracking-normal [font-family:var(--font-heading-en)]">
              CP
            </span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            달릴수록 더 맛있어진다! <br />
            브런치카페와 과자집, 아이스크림 가게, 초콜릿 공장 컨셉으로 꾸며진 CP를 만나보세요.
          </p>
        </div>
        <Link
          href="/#services-sections"
          className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-black/20 text-[var(--text-primary)] transition-all duration-500 group hover:bg-black hover:text-[var(--color-key-lime)]"
        >
          <span className="text-sm font-medium text-current">
            Line up
          </span>
          <ArrowRight
            size={16}
            className="ml-2 text-current transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div
        data-block="home-hero-list"
        className="home-hero-list mt-[30px] max-w-full overflow-hidden"
      >
        <div
          ref={heroCarouselScrollRef}
          className="home-hero-scroll cursor-grab overflow-x-auto snap-x snap-proximity scroll-smooth select-none active:cursor-grabbing"
          onMouseEnter={() => {
            heroCarouselAutoplayPausedRef.current = true;
          }}
          onMouseLeave={() => {
            heroCarouselAutoplayPausedRef.current = false;
          }}
          onTouchStart={() => {
            heroCarouselAutoplayPausedRef.current = true;
          }}
          onTouchEnd={() => {
            heroCarouselAutoplayPausedRef.current = false;
          }}
          onPointerDown={handleHeroCarouselPointerDown}
          onPointerMove={handleHeroCarouselPointerMove}
          onPointerUp={finishHeroCarouselDrag}
          onPointerCancel={finishHeroCarouselDrag}
        >
          <div className="flex gap-3 md:gap-6 min-w-max">
            {heroCarouselItems.map((item) => (
              <article
                key={item.id}
                className="snap-start shrink-0 w-[72vw] sm:w-[18rem] md:w-[19rem] lg:w-[21rem] xl:w-[24rem] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-xl shadow-black/5"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="block w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeHeroServicePreview = () => (
  <section
    data-section="home-souvenir"
    className={`home-souvenir ${homeBottomFrameClassName}`}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-stretch">
      <div className="flex flex-col lg:order-2 lg:h-full">
        <Link
          href={heroServicePreview.ctaHref}
          className="group inline-flex self-end items-center justify-center rounded-full border border-black/10 bg-gray-100 px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-black hover:bg-black hover:text-[var(--color-key-lime)]"
        >
          <span className="text-current">
            {heroServicePreview.ctaLabel}
          </span>
        </Link>
        <div className="mt-12 lg:mt-auto">
          <h3 className="mb-[15px]">{heroServicePreview.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-0">{heroServicePreview.desc}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-[2rem] aspect-[4/3] lg:order-1">
        <img
          src={heroServicePreview.img}
          alt={heroServicePreview.title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </section>
);

const HomeVideoSection = () => (
  <section
    data-section="home-video"
    className="home-video relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black"
  >
    <div className="aspect-video w-full">
      <iframe
        src="https://www.youtube-nocookie.com/embed/ViVXuuLmsjo?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=ViVXuuLmsjo&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0"
        title="빵트레일런 메인 영상"
        className="pointer-events-none h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  </section>
);

const HomeHeroSwitcher = () => {
  const [selectedHeroId, setSelectedHeroId] = useState(heroOptions[0].id);
  const selectedHero = heroOptions.find((option) => option.id === selectedHeroId) ?? heroOptions[0];

  return (
    <>
      <header
        data-section="home-visual"
        className="home-visual relative left-1/2 w-screen -translate-x-1/2"
      >
        <div className="w-full bg-gray-100">
          <img
            src={selectedHero.src}
            alt="빵트레일런 메인 비주얼"
            className="block w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <div className="flex justify-center mb-[30px]">
        <div className="bg-gray-100 p-1 rounded-full inline-flex border border-black/5">
          {heroOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedHeroId(option.id)}
              className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${
                selectedHeroId === option.id
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const HomeEventIntroSection = () => (
  <section
    data-section="home-event"
    className={`home-event ${homeFrameClassName} text-center`}
  >
    <Sparkles size={32} className="text-gray-400 mx-auto mb-8" />
    <h2 className="leading-tight mb-[30px]">
      빵 따라 산 달리는
      <br />
      빵트레일런
    </h2>
    <p className="text-black/70">
      2026년 9월 12일(토) ~ 13일(일)
      <br />
      하이원 리조트 및 하늘길
    </p>
    <Link
      href="/#services-sections"
      className="group inline-flex items-center justify-center gap-2 mt-10 rounded-full border border-black/10 bg-gray-100 px-8 py-3 text-[var(--text-primary)] typo-h6-medium transition-colors hover:bg-black hover:text-[var(--color-key-lime)] hover:border-black"
    >
      <span className="text-current">참가권</span>
      <ArrowRight
        size={16}
        className="text-current transition-transform group-hover:translate-x-1"
      />
    </Link>
  </section>
);

const HomeNoticesSection = () => (
  <section
    data-section="home-notices"
    className="home-notices relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gray-50 layout-band"
  >
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-0 h-px w-[110vw] -translate-x-1/2 bg-black/10"
    />
    <div
      data-block="home-notices-wrap"
      className="home-notices-wrap layout-shell"
    >
      <div className="flex justify-between items-end mb-[30px]">
        <h2>공지사항</h2>
      </div>
      <div className="flex flex-col border-t border-black/10">
        {notices.map((item) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            date={item.date}
            content={item.content}
          />
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main data-page="home" className="home animate-in fade-in duration-1000">
      <HomeHeroSwitcher />
      <HomeEventIntroSection />
      <HomeHeroIntro />
      <HomeHeroServicePreview />
      <HomeVideoSection />
      <HomeNoticesSection />
    </main>
  );
}
