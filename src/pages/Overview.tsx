"use client";

import React, { useEffect, useRef, useState } from 'react';

const overviewType = {
  introText: "m-0 typo-body-medium text-[#181818]",
  overviewLabel: "m-0 text-gray-400",
  overviewValue: "m-0 text-[#181818]",
  overviewBodyList: "m-0 pl-4 typo-h6-medium text-gray-500",
  overviewBody: "m-0 typo-h6-medium text-gray-500",
  priceText: "m-0 text-[#181818]",
  campaignIntro: "m-0 typo-body-medium text-[#181818]",
  donationCount: "typo-h2-black text-orange-600",
  donationUnit: "typo-h5",
  donationNote: "m-0 typo-h6-medium text-orange-600",
  historyYear: "m-0 typo-h4 text-[#181818]",
  historyBody: "m-0 typo-body-medium text-neutral-700",
  timetableIntro: "m-0 mt-[15px] lg:mt-0 typo-body-medium text-[#181818] text-left lg:text-right",
  timetableTime: "m-0 text-[#181818]",
  timetableEvent: "m-0 mb-2",
  timetableDesc: "m-0 typo-h6-medium text-gray-500",
  mapPlaceholderText: "m-0 typo-h6-label",
  locationHighlight: "m-0 typo-body-bold text-[#A8FF00]",
  locationBody: "m-0 typo-h6-medium text-neutral-700",
};

const campaignHistory = [
  { year: "2025", title: "빵(베이커리류) 기부", amount: "11,000", org: "사단법인 프렌즈 및 대전, 강릉, 정선 지역아동센터" },
  { year: "2024", title: "빵(베이커리류) 기부", amount: "10,000", org: "사단법인 프렌즈 및 대전, 정선 지역아동센터" },
  { year: "2023", title: "빵(베이커리류) 기부", amount: "4,000", org: "사단법인 프렌즈 및 서울 지역아동센터" },
  { year: "2022", title: "빵 기부", amount: "3,300", org: "사단법인 프렌즈 및 서울 지역아동센터" },
  { year: "2021", title: "빵(베이커리류) 기부", amount: "2,800", org: "사단법인 프렌즈 및 서울 지역아동센터" },
];

const overviewProjects = [
  {
    img: "/images/side-program-awards-ceremony.jpeg",
    title: "시상식",
    desc: "30K·20K 요일별 남녀 1위 시상식",
  },
  {
    img: "/images/side-program-opening-session.jpeg",
    title: "오프닝 세션",
    desc: "국가대표에게 배우는 트레일런 꿀팁",
  },
  {
    img: "/images/side-program-bbanglympics.jpeg",
    title: "빵림픽",
    desc: "잔디광장에서 즐기는 몸풀기 게임",
  },
  {
    img: "/images/side-program-photo-zone.jpeg",
    title: "포토존",
    desc: "귀여운 빵 소품과 함께 찍는 포토존",
  },
];

const overviewConveniences = [
  {
    name: "물품보관소",
    desc: "잔디광장에서 물품을 무료로 맡길 수 있습니다.",
  },
  {
    name: "완주 메달 각인 서비스",
    desc: "완주 메달에 이름과 기록을 레이저로 각인합니다.\n*비용: 3,000원",
  },
  {
    name: "하이원 워터월드",
    desc: "최대 할인된 금액으로 샤워 및 휴식을 즐길 수 있습니다.\n*하이원 호텔 사우나는 공사로 인해 미운영",
  },
];

type OverviewTimetableDay = 'day1' | 'day2';

const overviewTimetableDays: Array<{
  id: OverviewTimetableDay;
  label: string;
  items: Array<{ time: string; event: string; desc: string }>;
}> = [
  {
    id: 'day1',
    label: '9/12(토)',
    items: [
      { time: '07:30 - 08:00', event: '참가자 등록 및 장비 체크', desc: '30K 참가자 등록 및 현장 체크' },
      { time: '07:30', event: '물품보관소 오픈', desc: '행사장 내 물품보관소 운영 시작' },
      { time: '08:00', event: '30K 출발', desc: 'A그룹 08:00 / B그룹 08:20' },
      { time: '09:00', event: '20K 출발', desc: 'A그룹 08:50 / B그룹 09:10 / C그룹 09:40 / D그룹 10:00' },
      { time: '10:10', event: '12K 출발', desc: 'A그룹 10:10 / B그룹 10:20 / C그룹 10:30' },
      { time: '12:00', event: '기념품 수령소 오픈', desc: '완주자 대상 기념품 수령 시작' },
      { time: '15:00', event: '시상식', desc: '30K·20K 요일별 남녀 1위 시상' },
      { time: '17:00', event: '1일차 종료', desc: '현장 운영 마감' },
    ],
  },
  {
    id: 'day2',
    label: '9/13(일)',
    items: [
      { time: '08:00', event: '참가자 등록 및 장비 체크', desc: '20K·12K 참가자 등록 및 현장 체크' },
      { time: '08:00', event: '물품보관소 오픈', desc: '행사장 내 물품보관소 운영 시작' },
      { time: '09:00', event: '20K 출발', desc: 'A그룹 08:50 / B그룹 09:10 / C그룹 09:40 / D그룹 10:00' },
      { time: '09:40', event: '12K 출발', desc: 'A그룹 09:40 / B그룹 09:50 / C그룹 10:00' },
      { time: '12:00', event: '기념품 수령소 오픈', desc: '완주자 대상 기념품 수령 시작' },
      { time: '17:00', event: '2일차 및 공식 행사 종료', desc: '현장 운영 마감' },
    ],
  },
];

type OrganizerCard = {
  id: string;
  variant: 'far-left' | 'left' | 'center' | 'right' | 'far-right';
  src: string;
  alt: string;
  href?: string;
};

const organizerCards: OrganizerCard[] = [
  {
    id: 'far-left',
    variant: 'far-left',
    src: 'https://cdn.imweb.me/thumbnail/20251218/13abbdd89b906.png',
    alt: '',
  },
  {
    id: 'left',
    variant: 'left',
    src: 'https://cdn.imweb.me/thumbnail/20260108/70abe3b7e8a16.png',
    alt: '',
  },
  {
    id: 'center',
    variant: 'center',
    src: 'https://cdn.imweb.me/upload/S20230823e2ec8d23b14a0/fb6263b399875.png',
    alt: '라이프마라톤',
    href: 'https://lifemarathon.co.kr/',
  },
  {
    id: 'right',
    variant: 'right',
    src: 'https://cdn.imweb.me/thumbnail/20250624/148b1fd8a7ee8.png',
    alt: '',
  },
  {
    id: 'far-right',
    variant: 'far-right',
    src: 'https://cdn.imweb.me/thumbnail/20251211/60bd992e90028.png',
    alt: '',
  },
];

const resetOrganizerCardTilt = (card: HTMLElement) => {
  card.style.removeProperty('--tilt-x');
  card.style.removeProperty('--tilt-y');
  card.style.removeProperty('--pan-x');
  card.style.removeProperty('--pan-y');
};

const OverviewProjectsSection = () => (
  <section data-section="projects" className="projects layout-pad-bottom">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {overviewProjects.map((project, index) => (
        <div key={project.title} className={`flex flex-col group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
          <div className="overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 shadow-xl shadow-black/5">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="px-2">
            <h3 className="m-0">{project.title}</h3>
            <p className="m-0 typo-body-medium text-gray-500">{project.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const OverviewConvenienceSection = () => (
  <section data-section="cases" className="cases layout-frame">
    <div data-block="cases-wrap" className="cases-wrap grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
      <h2>편의 시설</h2>
      {overviewConveniences.map((item) => (
        <div
          key={item.name}
          className="h-full bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5"
        >
          <h4 className="text-black mb-4">{item.name}</h4>
          <p className="m-0 whitespace-pre-line">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const OverviewOrganizerSection = () => {
  const cardsRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cardsRoot = cardsRootRef.current;
    if (!cardsRoot) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let revealTimeoutId: number | null = null;
    let firstRafId = 0;
    let secondRafId = 0;
    let observer: IntersectionObserver | null = null;
    let revealed = false;

    const revealCards = () => {
      if (revealed) return;
      revealed = true;

      cardsRoot.classList.add('is-ready');
      cardsRoot.classList.remove('is-visible');

      firstRafId = window.requestAnimationFrame(() => {
        secondRafId = window.requestAnimationFrame(() => {
          cardsRoot.classList.add('is-visible', 'is-animating');
          revealTimeoutId = window.setTimeout(() => {
            cardsRoot.classList.remove('is-animating');
          }, 2420);
        });
      });
    };

    if (reduceMotion) {
      cardsRoot.classList.add('is-ready', 'is-visible');
      return () => undefined;
    }

    cardsRoot.classList.add('is-ready');

    const rect = cardsRoot.getBoundingClientRect();
    const viewTop = window.innerHeight * 0.15;
    const viewBottom = window.innerHeight * 0.85;
    const alreadyInView = rect.bottom > viewTop && rect.top < viewBottom;

    if (alreadyInView || !('IntersectionObserver' in window)) {
      revealCards();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealCards();
            observer?.disconnect();
          });
        },
        { threshold: 0.01 }
      );

      observer.observe(cardsRoot);
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(firstRafId);
      window.cancelAnimationFrame(secondRafId);
      if (revealTimeoutId !== null) {
        window.clearTimeout(revealTimeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const cardsRoot = cardsRootRef.current;
    if (!cardsRoot) return;

    const canHoverFine = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (!canHoverFine || reduceMotion) return;

    const cards = Array.from(cardsRoot.querySelectorAll<HTMLElement>('.meonji-wireframe-card'));
    const cleanups = cards.map((card) => {
      const maxTilt = 7;
      const maxPanX = 14;
      const maxPanY = 10;

      let rafId = 0;
      let isActive = false;

      const state = {
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0,
      };

      const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

      const tick = () => {
        rafId = 0;

        if (!isActive && Math.abs(state.currentX) < 0.001 && Math.abs(state.currentY) < 0.001) {
          resetOrganizerCardTilt(card);
          return;
        }

        state.currentX += (state.targetX - state.currentX) * 0.12;
        state.currentY += (state.targetY - state.currentY) * 0.12;

        const tiltY = state.currentX * maxTilt;
        const tiltX = state.currentY * -maxTilt;
        const panX = state.currentX * maxPanX;
        const panY = state.currentY * maxPanY;

        card.style.setProperty('--tilt-x', `${tiltX.toFixed(3)}deg`);
        card.style.setProperty('--tilt-y', `${tiltY.toFixed(3)}deg`);
        card.style.setProperty('--pan-x', `${panX.toFixed(3)}px`);
        card.style.setProperty('--pan-y', `${panY.toFixed(3)}px`);

        rafId = window.requestAnimationFrame(tick);
      };

      const schedule = () => {
        if (!rafId) {
          rafId = window.requestAnimationFrame(tick);
        }
      };

      const updateFromPointer = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        state.targetX = clamp((x - 0.5) * 2, -1, 1);
        state.targetY = clamp((y - 0.5) * 2, -1, 1);
        schedule();
      };

      const handlePointerEnter = (event: PointerEvent) => {
        isActive = true;
        updateFromPointer(event);
      };

      const handlePointerMove = (event: PointerEvent) => {
        updateFromPointer(event);
      };

      const handlePointerLeave = () => {
        isActive = false;
        state.targetX = 0;
        state.targetY = 0;
        schedule();
      };

      card.addEventListener('pointerenter', handlePointerEnter);
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        window.cancelAnimationFrame(rafId);
        resetOrganizerCardTilt(card);
        card.removeEventListener('pointerenter', handlePointerEnter);
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section data-section="organizer" className="organizer layout-frame">
      <div className="flex flex-col items-center text-center mb-12">
        <div>
          <h2 className="mb-[15px]">주최사 소개</h2>
        </div>
        <div className="max-w-[32rem]">
          <p className="m-0 typo-body-medium text-[#181818]">
            1986프로덕션은 삶을 재미있게 큐레이션하는 문화기획사입니다.
          </p>
        </div>
      </div>

      <div>
        <div
          ref={cardsRootRef}
          className="meonji-wireframe-cards"
          aria-label="주최사 소개 카드 스택"
        >
          <div className="meonji-wireframe-cards__stack">
            {organizerCards.map((card) => {
              const className = `meonji-wireframe-card meonji-wireframe-card--${card.variant}`;

              if (card.href) {
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="meonji-wireframe-card__img"
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                );
              }

              return (
                <div key={card.id} className={className} aria-hidden="true">
                  <img
                    className="meonji-wireframe-card__img"
                    src={card.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .meonji-wireframe-cards {
          --bg: transparent;
          --stroke: #e6e6e6;
          --shadow: 0 24px 56px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05);
          --radius: clamp(22px, 2.2vw, 32px);
          --card-w: clamp(220px, 28vw, 360px);
          --card-h: calc(var(--card-w) * 1.55);
          --bottom-cut: clamp(120px, 14vw, 210px);
          --lift: clamp(18px, 2.4vw, 34px);
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          height: clamp(260px, 36vw, 430px);
          position: relative;
          overflow: visible;
          clip-path: inset(-9999px -9999px 0px -9999px);
          background: var(--bg);
          perspective: 900px;
          perspective-origin: 50% 55%;
        }

        .meonji-wireframe-cards,
        .meonji-wireframe-cards *,
        .meonji-wireframe-cards *::before,
        .meonji-wireframe-cards *::after {
          box-sizing: border-box;
        }

        .meonji-wireframe-cards__stack {
          position: absolute;
          inset: 0;
          transform: translateY(0) scale(0.92);
          transform-origin: 50% 80%;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-cards__stack {
          transition: transform 1650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .meonji-wireframe-card {
          --tx: 0px;
          --ty: 0px;
          --rot: 0deg;
          --z: 1;
          --scale: 1;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --pan-x: 0px;
          --pan-y: 0px;
          --hover-z: 0px;

          position: absolute;
          left: 50%;
          bottom: calc(var(--bottom-cut) * -1);
          width: var(--card-w);
          height: var(--card-h);
          border-radius: var(--radius);
          border: none;
          background: var(--bg);
          box-shadow: var(--shadow);
          overflow: hidden;
          transform-origin: 50% 85%;
          transform:
            translateX(calc(-50% + var(--tx)))
            translateY(var(--ty))
            rotate(var(--rot))
            scale(var(--scale))
            translate3d(var(--pan-x), var(--pan-y), var(--hover-z))
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y));
          z-index: var(--z);
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform 160ms ease, box-shadow 160ms ease;
          cursor: pointer;
          text-decoration: none;
          display: block;
        }

        .meonji-wireframe-cards.is-ready:not(.is-visible) .meonji-wireframe-card {
          pointer-events: none;
          --tx: 0px;
          --ty: calc(var(--card-h) * 0.55);
          --rot: 0deg;
          --scale: 0.96;
        }

        .meonji-wireframe-cards.is-ready:not(.is-visible) .meonji-wireframe-cards__stack {
          transform: translateY(42%) scale(0.9);
        }

        .meonji-wireframe-cards.is-visible .meonji-wireframe-card {
          pointer-events: auto;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card {
          transition: transform 1650ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 160ms ease;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card--far-left {
          transition-delay: 0ms;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card--left {
          transition-delay: 99ms;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card--center {
          transition-delay: 198ms;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card--right {
          transition-delay: 297ms;
        }

        .meonji-wireframe-cards.is-animating .meonji-wireframe-card--far-right {
          transition-delay: 396ms;
        }

        .meonji-wireframe-card__img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          object-position: top center;
          border-radius: inherit;
          pointer-events: none;
        }

        .meonji-wireframe-card:hover {
          --scale: 1.06;
          --hover-z: 80px;
          box-shadow: 0 54px 103px rgba(0, 0, 0, 0.2), 0 18px 37px rgba(0, 0, 0, 0.12);
          z-index: 100 !important;
        }

        .meonji-wireframe-card--far-left {
          --tx: calc(var(--card-w) * -1);
          --rot: -10.5deg;
          --z: 1;
          --scale: 0.98;
        }

        .meonji-wireframe-card--left {
          --tx: calc(var(--card-w) * -0.55);
          --ty: calc(var(--lift) * -1.25);
          --rot: -6.3deg;
          --z: 2;
          --scale: 0.995;
        }

        .meonji-wireframe-card--center {
          --tx: 0px;
          --ty: calc(var(--lift) * -2.8);
          --rot: 0deg;
          --z: 4;
        }

        .meonji-wireframe-card--right {
          --tx: calc(var(--card-w) * 0.55);
          --ty: calc(var(--lift) * -1.25);
          --rot: 6.3deg;
          --z: 2;
          --scale: 0.995;
        }

        .meonji-wireframe-card--far-right {
          --tx: calc(var(--card-w) * 1);
          --rot: 10.5deg;
          --z: 1;
          --scale: 0.98;
        }

        @media (max-width: 720px) {
          .meonji-wireframe-cards {
            --card-w: clamp(150px, 46vw, 180px);
            --bottom-cut: clamp(80px, 18vw, 120px);
            height: clamp(280px, 72vw, 380px);
          }

          .meonji-wireframe-card--far-left {
            --tx: calc(var(--card-w) * -0.5);
            --rot: -8.5deg;
            --scale: 0.985;
          }

          .meonji-wireframe-card--left {
            --tx: calc(var(--card-w) * -0.27);
            --rot: -5.2deg;
          }

          .meonji-wireframe-card--right {
            --tx: calc(var(--card-w) * 0.27);
            --rot: 5.2deg;
          }

          .meonji-wireframe-card--far-right {
            --tx: calc(var(--card-w) * 0.5);
            --rot: 8.5deg;
            --scale: 0.985;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .meonji-wireframe-cards__stack {
            transform: translateY(0) scale(0.92);
          }
        }
      `}</style>
    </section>
  );
};

const OverviewCampaignSection = () => (
  <section data-section="overview-campaign" className="overview-campaign layout-frame">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-0 lg:gap-4 mb-12 border-b border-black/10 pb-[15px]">
      <div>
        <h2 className="mb-0">캠페인</h2>
      </div>
      <div className="mt-[15px] lg:mt-0 max-w-[32rem] text-left lg:text-right">
        <p className={overviewType.campaignIntro}>
          {"<빵트레일런> "}은 빵에 진심인 마라톤 ‘빵빵런’의 취지를 이어
          <br className="hidden lg:block" />
          강원 지역 소외계층 아동에게 빵(베이커리류)을 기부합니다.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col justify-center border border-orange-200 rounded-[2rem] bg-orange-50 p-8 md:p-12 md:col-span-2 lg:col-span-1">
        <div className={`${overviewType.donationCount} pb-8 mb-6 border-b border-orange-200`}>31,100<span className={overviewType.donationUnit}>개</span></div>
        <h5 className="m-0 mb-2 text-orange-600">총 기부된 빵(베이커리류) 수</h5>
        <p className={overviewType.donationNote}>
          빵빵런, 커피 빵빵런, 빵트레일런 등 <br />역대 캠페인
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:col-span-2 lg:col-span-2">
        {campaignHistory.map((item, i) => (
          <div key={i} className="flex flex-col justify-between border border-black/5 rounded-[2rem] bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/5">
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
                <h4 className={overviewType.historyYear}>{item.year}</h4>
                <span className="inline-block border border-orange-200 rounded-full bg-orange-50 px-3 py-1 typo-h6-bold text-orange-600">
                  총 {item.amount}개
                </span>
              </div>
              <h5 className={`${overviewType.overviewValue} mb-3`}>{item.title}</h5>
            </div>
            <p className={overviewType.historyBody}>
              {item.org}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Overview = () => {
  const [activeTimetableDay, setActiveTimetableDay] = useState<OverviewTimetableDay>('day1');
  const overviewCopy = {
    eventName: "빵트레일런",
    eventDate: "2026년 9월 11일(금) - 13일(일)",
    eventTime: "8:00 ~ 18:00",
    venueLine1: "하이원 리조트 잔디광장 및",
    venueLine2: "하늘길 트레킹 코스 일대",
  };
  const type = overviewType;

  return (
    <main data-page="overview" className="overview animate-in fade-in duration-1000 bg-white">
      {/* Event Overview - Editorial Split Style */}
      <section
        data-section="overview-summary"
        className="overview-summary layout-frame-nav"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="mb-[15px]">
                대회개요
              </h2>
              <p className={type.introText}>
                빵에 진심인 러너들을 위한 트레일러닝 축제,<br/> 빵트레일런의 상세 개요를 확인하세요.
              </p>
            </div>
          </div>
          
          {/* Right: Content List */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Item 1 */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>대회명</h6></div>
              <div className="md:w-[77%]"><h5 className={type.overviewValue}>{overviewCopy.eventName}</h5></div>
            </div>
            {/* Item 2 */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>행사일시</h6></div>
              <div className="md:w-[77%]">
                <h5 className={`${type.overviewValue} mb-4`}>{overviewCopy.eventDate}<br />{overviewCopy.eventTime}</h5>
                <ul className={`${type.overviewBodyList} space-y-2 list-disc list-inside`}>
                  <li>참가자의 안전과 쾌적한 코스 환경을 위해 출발시간을 나누어 운영합니다.</li>
                  <li>모든 대회 기념품 및 배번호표는 현장 배부입니다.</li>
                </ul>
              </div>
            </div>
            {/* Item 3 */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>행사장소</h6></div>
              <div className="md:w-[77%]">
                <h5 className={`${type.overviewValue} mb-4`}>{overviewCopy.venueLine1}<br />{overviewCopy.venueLine2}</h5>
                <p className={type.overviewBody}>강원도 정선군 고한읍 하이원길 265-1<br />(강원도 정선군 고한읍 고한리 483)</p>
              </div>
            </div>
            {/* Item 4 */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>참가비</h6></div>
              <div className="md:w-[77%] flex flex-col gap-4">
                <div className="flex items-center gap-4"><span className="bg-gray-100 px-3 py-1 rounded-full typo-h6-medium">30K</span> <h5 className={type.priceText}>99,000원</h5></div>
                <div className="flex items-center gap-4"><span className="bg-gray-100 px-3 py-1 rounded-full typo-h6-medium">20K</span> <h5 className={type.priceText}>89,000원</h5></div>
                <div className="flex items-center gap-4"><span className="bg-gray-100 px-3 py-1 rounded-full typo-h6-medium">12K</span> <h5 className={type.priceText}>79,000원</h5></div>
              </div>
            </div>
            {/* Item 5 */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>코스 및 시상</h6></div>
              <div className="md:w-[77%]">
                <div className="mb-6">
                  <span className="block typo-h6-medium text-gray-500 mb-1">코스</span>
                  <h5 data-force-ko-heading className={`${type.priceText} heading-ko`}>30K / 20K / 12K</h5>
                </div>
                <div className="mb-6">
                  <span className="block typo-h6-medium text-gray-500 mb-1">시상</span>
                  <h5 className={`${type.priceText} heading-ko`}>30K / 20K 부문 남녀 1위</h5>
                </div>
                <div>
                  <span className="block typo-h6-medium text-gray-500 mb-2">UTMB 인덱스</span>
                  <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full typo-h6-medium border border-blue-200">20K M</span>
                </div>
              </div>
            </div>
            {/* Item 6 */}
            <div className="py-8 border-t border-b border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-[23%] mt-1"><h6 className={type.overviewLabel}>주최 · 주관</h6></div>
              <div className="md:w-[77%]"><h5 className={type.overviewValue}>(주)1986프로덕션</h5></div>
            </div>
          </div>
        </div>
      </section>

      <OverviewProjectsSection />
      <OverviewConvenienceSection />

      {/* Timetable Section */}
      <section
        data-section="overview-timetable"
        className="overview-timetable layout-frame"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-0 lg:gap-4 mb-12 border-b border-black/10 pb-[15px]">
          <div>
            <h2 className="mb-0">타임테이블</h2>
          </div>
          <p className={type.timetableIntro}>
            대회 당일 타임테이블을 확인하세요. 
            <br className="hidden lg:block" />
            (현장 상황에 따라 변동될 수 있습니다)
          </p>
        </div>

        <div className="border border-black/5 rounded-[2rem] bg-gray-50 p-8 md:p-12">
          <div className="mb-8 flex justify-center">
            <div className="bg-white p-1 rounded-full inline-flex border border-black/5">
              {overviewTimetableDays.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setActiveTimetableDay(day.id)}
                  className={`px-6 py-2.5 rounded-full typo-h6-medium transition-colors ${
                    activeTimetableDay === day.id ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            {overviewTimetableDays
              .find((day) => day.id === activeTimetableDay)
              ?.items.map((item, i, items) => (
              <div
                key={`${activeTimetableDay}-${item.time}-${item.event}`}
                className={`flex flex-col md:flex-row gap-4 md:gap-12 py-6 ${i !== items.length - 1 ? 'border-b border-black/5' : ''}`}
              >
                <div className="md:w-1/3">
                  <h4 className={type.timetableTime}>{item.time}</h4>
                </div>
                <div className="md:w-2/3">
                  <h5 className={type.timetableEvent}>{item.event}</h5>
                  <p className={type.timetableDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OverviewOrganizerSection />
      <OverviewCampaignSection />
    </main>
  );
};

export default Overview;
