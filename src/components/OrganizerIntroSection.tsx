"use client";

import { useEffect, useRef } from 'react';

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

const resetCardTilt = (card: HTMLElement) => {
  card.style.removeProperty('--tilt-x');
  card.style.removeProperty('--tilt-y');
  card.style.removeProperty('--pan-x');
  card.style.removeProperty('--pan-y');
};

export default function OrganizerIntroSection() {
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

        if (
          !isActive &&
          Math.abs(state.currentX) < 0.001 &&
          Math.abs(state.currentY) < 0.001
        ) {
          resetCardTilt(card);
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
        resetCardTilt(card);
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
}
