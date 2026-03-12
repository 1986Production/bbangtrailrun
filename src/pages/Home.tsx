"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { AccordionItem } from "@/src/components/AccordionItem";
import { notices } from "@/src/data/notices";

const heroOptions = [
  {
    id: "option-1",
    label: "1안",
    src: "/images/home-hero-section-v7.png",
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
    src: "/images/home-hero-section-v1.png",
    aspectRatio: "3248 / 1827",
  },
  {
    id: "option-4",
    label: "1-2안",
    src: "/images/home-hero-section-v9.png",
    aspectRatio: "3418 / 2753",
  },
  {
    id: "option-5",
    label: "1-3안",
    src: "/images/home-hero-section-v6.png",
    aspectRatio: "3418 / 2753",
  },
  {
    id: "option-9",
    label: "4안",
    src: "/images/home-hero-section-v10.png",
    aspectRatio: "3248 / 2258",
  },
  {
    id: "option-7",
    label: "2-2안",
    src: "/images/home-hero-section-v3.png",
    aspectRatio: "6836 / 4443",
  },
  {
    id: "option-6",
    label: "2-3안",
    src: "/images/home-hero-section-v4.png",
    aspectRatio: "6836 / 4443",
  },
  {
    id: "option-8",
    label: "2-4안",
    src: "/images/home-hero-section-v5.png",
    aspectRatio: "3418 / 2222",
  },
];

const heroCarouselItems = [
  {
    id: "hero-carousel-1",
    title: "캐러셀 이미지 01",
    src: "/images/team1-600x800.jpg",
  },
  {
    id: "hero-carousel-2",
    title: "캐러셀 이미지 02",
    src: "/images/team2-600x800.jpg",
  },
  {
    id: "hero-carousel-3",
    title: "캐러셀 이미지 03",
    src: "/images/team3-600x800.jpg",
  },
  {
    id: "hero-carousel-4",
    title: "캐러셀 이미지 04",
    src: "/images/team4-600x800.jpg",
  },
];

const heroServicePreview = {
  title: "나무 13 X 빵트레일런",
  desc: "감각적인 일러스트로 사랑받는 일러스트레이터 ‘나무13’과 빵트레일런이 만났습니다. 빵트레일런2026에서만 만나볼 수 있는 한정판 굿즈!",
  ctaLabel: "기념품 전체 보러가기",
  ctaHref: "/souvenirs",
  img: "/images/ecommerce-1200x800.jpg",
};

const homeFrameClassName = "layout-frame";
const homeBorderFrameClassName = "layout-frame-border";
const homeBottomFrameClassName = "layout-frame-bottom";

const HomeHeroIntro = () => {
  const heroCarouselScrollRef = useRef<HTMLDivElement | null>(null);
  const heroCarouselDragStateRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });

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
        <div className="w-full bg-gray-100" style={{ aspectRatio: selectedHero.aspectRatio }}>
          <img
            src={selectedHero.src}
            alt="빵트레일런 메인 비주얼"
            className="block w-full h-full object-cover"
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

export const FeaturedProjectsSection = () => {
  const items = [
    {
      tags: "Strategy / Design",
      title: "Enpower",
      img: "/images/solar-1200x800.jpg",
    },
    {
      tags: "Design / Development",
      title: "Fitsole",
      img: "/images/sneaker1-1200x800.jpg",
    },
    {
      tags: "Research / Design",
      title: "Lemkus",
      img: "/images/sneaker2-1200x800.jpg",
    },
  ];

  return (
    <section
      data-section="featured-projects"
      className={`featured-projects ${homeFrameClassName} bg-gray-100`}
    >
      <div data-block="projects-wrap" className="projects-wrap">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2>대표 프로젝트</h2>
          <Link
            href="/overview"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors mt-6 md:mt-0 flex items-center border-b border-gray-400/30 pb-1"
          >
            전체 프로젝트 보기 <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col group cursor-pointer ${
                i === 1 ? "md:mt-16" : ""
              } ${i === 2 ? "lg:mt-32" : ""}`}
            >
              <div className="overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 shadow-xl shadow-black/5">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-black">{item.title}</h3>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest m-0">
                  {item.tags}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <span className="text-current">참가신청</span>
      <ArrowRight
        size={16}
        className="text-current transition-transform group-hover:translate-x-1"
      />
    </Link>
  </section>
);

export const CaseStudiesSection = () => {
  const clients = [
    {
      name: "Lemkus",
      desc: "Creating a new design system and conducting an overhaul of the brand's digital experience.",
    },
    {
      name: "Tiger Wheel & Tyre",
      desc: "Building a robust eCommerce capability that re-imagined the way consumers purchase online.",
    },
    {
      name: "KIA",
      desc: "Creating a best-in-class eCommerce experience underpinned by an in-depth research study.",
    },
  ];

  return (
    <section
      data-section="cases"
      className={`cases ${homeBorderFrameClassName}`}
    >
      <div
        data-block="cases-wrap"
        className="cases-wrap grid grid-cols-1 lg:grid-cols-4 gap-12"
      >
        <div className="lg:col-span-1">
          <h2>
            주요
            <br />
            사례
          </h2>
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5"
            >
              <h3 className="text-black mb-4">{client.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{client.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BrandListSection = () => {
  const brands = [
    "Woolworths",
    "Sneaker LAB",
    "HKLM",
    "Digital Liquorice",
    "Batoka Hospitality",
    "Sendmarc",
    "Vana",
    "Fairways to Africa",
  ];

  return (
    <section
      data-section="brands"
      className={`brands ${homeFrameClassName} bg-black text-white`}
    >
      <div data-block="brands-wrap" className="brands-wrap">
        <h2 className="mb-16 text-center">함께한 브랜드</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((brand) => (
            <p
              key={brand}
              className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium m-0"
            >
              {brand}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TeamShowcaseSection = () => {
  const team = [
    {
      img: "/images/team1-600x800.jpg",
      name: "Julian Dallamore",
      role: "Founder / MD",
    },
    {
      img: "/images/team2-600x800.jpg",
      name: "Chev Beckley",
      role: "UI/UX Designer",
    },
    {
      img: "/images/team3-600x800.jpg",
      name: "Rogan Jansen",
      role: "Founder / CD",
    },
    {
      img: "/images/team4-600x800.jpg",
      name: "James Blyth",
      role: "Developer",
    },
  ];

  return (
    <section
      data-section="team"
      className={`team ${homeBorderFrameClassName}`}
    >
      <div data-block="team-wrap" className="team-wrap">
        <div className="flex justify-between items-end mb-16">
          <h2>팀 소개</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden mb-5 border-4 border-white group-hover:border-gray-200 transition-colors duration-500">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-black mb-1">{member.name}</h3>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AwardsListSection = () => {
  const awards = [
    {
      name: "AWWWARDS",
      details:
        "1x Studio of the Year Nominee\n1x Site of the Month\n5x Site of the Day",
    },
    { name: "THE FWA", details: "8x FWA of the Day" },
    {
      name: "CSS DESIGN AWARDS",
      details: "1x Website of the Year Nominee\n10x Website of the Day",
    },
  ];

  return (
    <section
      data-section="awards"
      className={`awards ${homeFrameClassName} bg-gray-100`}
    >
      <div
        data-block="awards-wrap"
        className="awards-wrap grid grid-cols-1 lg:grid-cols-4 gap-12"
      >
        <div className="lg:col-span-1">
          <h2>수상 및 성과</h2>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-6">
          {awards.map((award) => (
            <div
              key={award.name}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 flex flex-col md:flex-row md:items-center justify-between"
            >
              <h3 className="text-black mb-4 md:mb-0">{award.name}</h3>
              <div className="text-sm text-gray-600 whitespace-pre-line text-left md:text-right leading-relaxed">
                {award.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeNoticesSection = () => (
  <section
    data-section="home-notices"
    className="home-notices relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gray-50"
  >
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-0 h-px w-[110vw] -translate-x-1/2 bg-black/10"
    />
    <div
      data-block="home-notices-wrap"
      className={`home-notices-wrap ${homeFrameClassName}`}
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

export const InsightsGridSection = () => {
  const articles = [
    {
      type: "Interview",
      title: "Sneaker LAB x New Balance Sneaker Wipes",
      date: "12.10.21",
      img: "/images/art1-800x600.jpg",
    },
    {
      type: "Article",
      title: "Top tips to take care of your running shoes",
      date: "12.10.21",
      img: "/images/art2-800x600.jpg",
    },
    {
      type: "Article",
      title: "The top 25 best sneakers of 2021",
      date: "11.10.21",
      img: "/images/art3-800x600.jpg",
    },
  ];

  return (
    <section
      data-section="insights"
      className={`insights ${homeBorderFrameClassName}`}
    >
      <div data-block="insights-wrap" className="insights-wrap">
        <div className="flex justify-between items-end mb-16">
          <h2>최신 인사이트</h2>
          <Link
            href="/insights"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center border-b border-gray-400/30 pb-1"
          >
            전체 인사이트 보기 <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.title} className="flex flex-col group cursor-pointer">
              <div className="overflow-hidden rounded-[2rem] aspect-[4/3] mb-6 shadow-xl shadow-black/5">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <p className="px-3 py-1 bg-gray-100 rounded-full text-[0.6667rem] uppercase tracking-widest text-gray-600 m-0">
                  {article.type}
                </p>
                <p className="text-xs text-gray-500 m-0">{article.date}</p>
              </div>
              <h3 className="text-black leading-snug group-hover:text-gray-500 transition-colors">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SouvenirSizeGuideSection = () => {
  const sizeChartRows = [
    { size: "S", chest: "48", length: "65.5" },
    { size: "M", chest: "50.5", length: "66.5" },
    { size: "L", chest: "53", length: "69" },
    { size: "XL", chest: "60", length: "72" },
    { size: "2XL", chest: "63", length: "74" },
  ];
  const maxChest = Math.max(...sizeChartRows.map((row) => Number(row.chest)));
  const maxLength = Math.max(...sizeChartRows.map((row) => Number(row.length)));

  return (
    <section
      data-section="souvenir-size"
      className={`souvenir-size ${homeBorderFrameClassName} bg-gray-50`}
    >
      <div
        data-block="souvenir-size-wrap"
        className="souvenir-size-wrap"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-center text-base">
                <thead>
                  <tr className="bg-[#F5F5F5]">
                    <th className="py-5 font-medium text-gray-700">사이즈</th>
                    <th className="py-5 font-medium text-gray-700">A. 가슴단면</th>
                    <th className="py-5 font-medium text-gray-700">B. 총기장</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {sizeChartRows.map((row) => (
                    <tr
                      key={`home-base-${row.size}`}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-5 font-bold text-gray-900">{row.size}</td>
                      <td className="py-5">{row.chest}</td>
                      <td className="py-5">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-5">
              <table className="w-full text-center text-base bg-white">
                <thead>
                  <tr className="bg-[#FFF9E6]">
                    <th className="py-4 font-semibold text-orange-600">사이즈</th>
                    <th className="py-4 font-semibold text-orange-600">A. 가슴단면</th>
                    <th className="py-4 font-semibold text-orange-600">B. 총기장</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {sizeChartRows.map((row) => (
                    <tr key={`home-alt-${row.size}`} className="border-t border-gray-200">
                      <td className="py-4 font-bold">{row.size}</td>
                      <td className="py-4">{row.chest}</td>
                      <td className="py-4">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sizeChartRows.map((row) => (
                  <div
                    key={`home-card-${row.size}`}
                    className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <p className="text-black font-bold m-0 mb-2">{row.size}</p>
                    <p className="text-sm text-gray-500 m-0">A. 가슴단면 {row.chest}cm</p>
                    <p className="text-sm text-gray-500 m-0">B. 총기장 {row.length}cm</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 bg-[#F5F5F5] rounded-[2rem] border border-black/5 p-5 md:p-6">
              <p className="m-0 mb-4 text-sm text-gray-600 font-semibold tracking-wide">
                SIZE GUIDE / BAR VIEW
              </p>
              <div className="space-y-3">
                {sizeChartRows.map((row) => (
                  <div
                    key={`home-bar-${row.size}`}
                    className="bg-white rounded-2xl border border-gray-200 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="m-0 text-black font-bold">{row.size}</p>
                      <p className="m-0 text-xs text-gray-500">
                        A {row.chest}cm / B {row.length}cm
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="m-0 text-xs text-gray-500">A. 가슴단면</p>
                          <p className="m-0 text-xs text-black font-semibold">{row.chest}cm</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#A8FF00]"
                            style={{ width: `${(Number(row.chest) / maxChest) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="m-0 text-xs text-gray-500">B. 총기장</p>
                          <p className="m-0 text-xs text-black font-semibold">{row.length}cm</p>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#FF9000]"
                            style={{ width: `${(Number(row.length) / maxLength) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] overflow-hidden font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)]">
              <div className="divide-y divide-gray-200 w-[90%] mx-auto">
                {sizeChartRows.map((row) => (
                  <div
                    key={`home-list-${row.size}`}
                    className="py-4 grid grid-cols-[64px_1fr] sm:grid-cols-[72px_1fr] items-center gap-3 sm:gap-4"
                  >
                    <div className="inline-flex items-center justify-center w-[52px] sm:w-[56px] h-9 rounded-full bg-[#A8FF00]/20 text-black font-bold">
                      {row.size}
                    </div>
                    <div className="text-left text-gray-500 grid grid-cols-[88px_minmax(0,1fr)_70px_minmax(0,1fr)] sm:grid-cols-[90px_72px_80px_72px] items-center gap-x-1 sm:gap-x-2">
                      <span>A. 가슴단면</span>
                      <span className="text-black font-semibold whitespace-nowrap">{row.chest}cm</span>
                      <span>B. 총기장</span>
                      <span className="text-black font-semibold whitespace-nowrap">{row.length}cm</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
