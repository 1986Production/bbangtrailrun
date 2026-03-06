"use client";

import { Fragment, useEffect, useState } from 'react';
import { AlertCircle, ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';

const pricingData = [
  { category: '마운틴', type: '마운틴 디럭스 (35평)', prices: ['120,000원', '190,000원', '100,000원'], status: ['green', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 디럭스 온돌 (35평)', prices: ['120,000원', '190,000원', '100,000원'], status: ['green', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 그랜드 디럭스 (35평)', prices: ['120,000원', '190,000원', '100,000원'], status: ['green', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 클린룸 (35평)', prices: ['120,000원', '190,000원', '100,000원'], status: ['green', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 패밀리룸 (35평)', prices: ['120,000원', '190,000원', '100,000원'], status: ['red', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 패밀리가든 (50평)', prices: ['170,000원', '250,000원', '140,000원'], status: ['green', 'green', 'green'] },
  { category: '마운틴', type: '마운틴 패밀리 스위트 (50평)', prices: ['170,000원', '250,000원', '140,000원'], status: ['green', 'green', 'green'] },
  { category: '힐', type: '힐 슈페리어 (30평)', prices: ['100,000원', '160,000원', ''], status: ['red', 'green', 'none'] },
  { category: '힐', type: '힐 슈페리어 온돌 (30평)', prices: ['100,000원', '160,000원', ''], status: ['green', 'green', 'none'] },
  { category: '힐', type: '힐 그랜드 디럭스 (35평)', prices: ['110,000원', '180,000원', ''], status: ['green', 'green', 'none'] },
  { category: '힐', type: '힐 갤러리 스위트 (40평)', prices: ['120,000원', '190,000원', ''], status: ['green', 'green', 'none'] },
  { category: '힐', type: '힐 펫 룸', prices: ['150,000원', '230,000원', ''], status: ['green', 'green', 'none'] },
  { category: '그랜드호텔', type: '컨벤션 슈페리어 더블', prices: ['160,000원', '210,000원', ''], status: ['green', 'green', 'none'] },
  { category: '그랜드호텔', type: '컨벤션 슈페리어 트윈', prices: ['160,000원', '210,000원', ''], status: ['green', 'green', 'none'] },
];

const weekHeader = ['일', '월', '화', '수', '목', '금', '토'];
const pricingDateHeaders = ['9/11(금)', '9/12(토)', '9/13(일)'];
const BOOKING_PANEL_COACHMARK_KEY = 'bbangtrailrun-accommodation-booking-coachmark-v1';

type PricingAvailabilityStatus = 'green' | 'red' | 'none';

const getPricingStatusMeta = (status: string | undefined) => {
  return {
    label: '판매전',
    badgeClass: 'inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-2.5 py-1 typo-h6-medium text-gray-500',
  };
};

const getDateColumnStatus = (columnIndex: number): PricingAvailabilityStatus => {
  const statuses = pricingData.map((row) => row.status[columnIndex]);
  const hasAvailable = statuses.some((status) => status && status !== 'none');

  if (!hasAvailable) return 'none';
  if (statuses.some((status) => status === 'red')) return 'red';
  return 'green';
};

type CalendarEventTone = 'event' | 'holiday';

type CalendarEvent = {
  label: string;
  tone: CalendarEventTone;
};

type CalendarCell = {
  day: string;
  muted?: boolean;
  events?: CalendarEvent[];
};

type WeekEventBar = {
  startCol: number;
  endCol: number;
  label: string;
  tone: CalendarEventTone;
};

type LodgingMapType = 'hill' | 'mountain' | 'grand';

type LodgingMethod = {
  label: string;
  text: string;
  detail?: string;
};

type LodgingLocationContent = {
  name: string;
  mapLabel: string;
  routeToVenue: string;
  address: string;
  methods: LodgingMethod[];
};

const septemberCalendar: CalendarCell[][] = [
  [
    { day: '30', muted: true },
    { day: '31', muted: true },
    { day: '1' },
    { day: '2' },
    { day: '3' },
    { day: '4' },
    { day: '5' },
  ],
  [
    { day: '6' },
    { day: '7' },
    { day: '8' },
    { day: '9' },
    { day: '10' },
    { day: '11', events: [{ label: '행사 일정', tone: 'event' }] },
    { day: '12', events: [{ label: '행사 일정', tone: 'event' }] },
  ],
  [
    { day: '13', events: [{ label: '행사 일정', tone: 'event' }] },
    { day: '14' },
    { day: '15' },
    { day: '16' },
    { day: '17' },
    { day: '18' },
    { day: '19' },
  ],
  [
    { day: '20' },
    { day: '21' },
    { day: '22' },
    { day: '23' },
    { day: '24', events: [{ label: '추석', tone: 'holiday' }] },
    { day: '25', events: [{ label: '추석', tone: 'holiday' }] },
    { day: '26', events: [{ label: '추석', tone: 'holiday' }] },
  ],
  [
    { day: '27' },
    { day: '28' },
    { day: '29' },
    { day: '30' },
    { day: '1', muted: true },
    { day: '2', muted: true },
    { day: '3', muted: true },
  ],
];

const calendarEventToneClass = (tone: CalendarEventTone) => {
  if (tone === 'event') return 'bg-[#A8FF00] border border-[#A8FF00] text-black';
  return 'bg-[#FFF4E8] border border-[#FFD099] text-[#FF9000]';
};

const weekdayClass = (index: number) => {
  if (index === 0) return 'text-[#FF9000]';
  if (index === 6) return 'text-[#FF9000]';
  return 'text-gray-500';
};

const buildWeekEventBars = (week: CalendarCell[]): WeekEventBar[] => {
  const bars: WeekEventBar[] = [];
  let cursor = 0;

  while (cursor < week.length) {
    const event = week[cursor].events?.[0];
    if (!event) {
      cursor += 1;
      continue;
    }

    let endCol = cursor;
    while (endCol + 1 < week.length) {
      const nextEvent = week[endCol + 1].events?.[0];
      if (!nextEvent || nextEvent.label !== event.label || nextEvent.tone !== event.tone) break;
      endCol += 1;
    }

    bars.push({
      startCol: cursor,
      endCol,
      label: event.label,
      tone: event.tone,
    });
    cursor = endCol + 1;
  }

  return bars;
};

const lodgingLocationContent: Record<LodgingMapType, LodgingLocationContent> = {
  hill: {
    name: '힐콘도',
    mapLabel: '힐콘도 지도 영역',
    routeToVenue: '힐콘도 → 잔디광장(행사장)',
    address: '강원 정선군 고한읍 하이원길 424, 하이원 리조트',
    methods: [
      { label: '방법 1.', text: '힐콘도 정문(드롭오프 구역)으로 진입' },
      { label: '방법 2.', text: '힐콘도 주차장 주차 후 이동' },
      {
        label: '방법 3.',
        text: '힐콘도에서 잔디광장(행사장)으로 이동',
        detail: '현장 표지판 또는 운영 스태프 안내에 따라 이동해 주세요.',
      },
    ],
  },
  mountain: {
    name: '마운틴콘도',
    mapLabel: '마운틴콘도 지도 영역',
    routeToVenue: '마운틴콘도 → 잔디광장(행사장)',
    address: '강원 정선군 고한읍 하이원길 265-1',
    methods: [
      { label: '방법 1.', text: '마운틴콘도 정문(드롭오프 구역)으로 진입' },
      { label: '방법 2.', text: '마운틴콘도 주차장 주차 후 이동' },
      {
        label: '방법 3.',
        text: '마운틴콘도에서 잔디광장(행사장)으로 이동',
        detail: '현장 표지판 또는 운영 스태프 안내에 따라 이동해 주세요.',
      },
    ],
  },
  grand: {
    name: '그랜드호텔',
    mapLabel: '그랜드호텔 지도 영역',
    routeToVenue: '그랜드호텔 → 잔디광장(행사장)',
    address: '강원 정선군 사북읍 하이원길 265',
    methods: [
      { label: '방법 1.', text: '그랜드호텔 정문(드롭오프 구역)으로 진입' },
      { label: '방법 2.', text: '그랜드호텔 주차장 주차 후 이동' },
      {
        label: '방법 3.',
        text: '그랜드호텔에서 잔디광장(행사장)으로 이동',
        detail: '현장 표지판 또는 운영 스태프 안내에 따라 이동해 주세요.',
      },
    ],
  },
};

const Accommodation = () => {
  const [mapType, setMapType] = useState<LodgingMapType>('hill');
  const [hoveredPricingCell, setHoveredPricingCell] = useState<{ row: number | null; col: number | null }>({
    row: null,
    col: null,
  });
  const [activePricingCell, setActivePricingCell] = useState<{ row: number | null; col: number | null }>({
    row: null,
    col: null,
  });
  const [isBookingPanelVisible, setIsBookingPanelVisible] = useState(false);
  const [isBookingPanelAttention, setIsBookingPanelAttention] = useState(false);
  const visibleCalendarWeeks = septemberCalendar.filter((week) =>
    week.some((cell) => !cell.muted || (cell.events?.length ?? 0) > 0)
  );
  const activeLodgingLocation = lodgingLocationContent[mapType];
  const dateColumnStatuses = pricingDateHeaders.map((_, index) => getDateColumnStatus(index));
  const selectedPricing =
    activePricingCell.row !== null &&
    activePricingCell.col !== null &&
    activePricingCell.col >= 2 &&
    activePricingCell.col <= 4
      ? (() => {
          const selectedRow = pricingData[activePricingCell.row];
          if (!selectedRow) return null;

          const priceIndex = activePricingCell.col - 2;
          const selectedPrice = selectedRow.prices[priceIndex];
          const selectedStatus = selectedRow.status[priceIndex];
          if (!selectedPrice || selectedStatus === 'none') return null;

          return {
            category: selectedRow.category,
            type: selectedRow.type,
            dateLabel: pricingDateHeaders[priceIndex],
            price: selectedPrice,
          };
        })()
      : null;
  const selectedBookingHref = selectedPricing
    ? `/registration?category=${encodeURIComponent(selectedPricing.category)}&type=${encodeURIComponent(selectedPricing.type)}&date=${encodeURIComponent(
        selectedPricing.dateLabel
      )}&price=${encodeURIComponent(selectedPricing.price)}`
    : null;
  const getPricingCrossHighlightClass = (isRowActive: boolean, isColActive: boolean) => {
    if (isRowActive && isColActive) return 'bg-black/[0.08]';
    if (isRowActive || isColActive) return 'bg-black/[0.04]';
    return '';
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsBookingPanelVisible(true));
    let timer: ReturnType<typeof setTimeout> | null = null;

    try {
      const hasSeenCoachmark = window.localStorage.getItem(BOOKING_PANEL_COACHMARK_KEY) === 'seen';

      if (!hasSeenCoachmark) {
        setIsBookingPanelAttention(true);
        window.localStorage.setItem(BOOKING_PANEL_COACHMARK_KEY, 'seen');
        timer = setTimeout(() => setIsBookingPanelAttention(false), 2200);
      } else {
        setIsBookingPanelAttention(false);
      }
    } catch {
      // Fallback when storage is blocked: still surface the coachmark once in-session.
      setIsBookingPanelAttention(true);
      timer = setTimeout(() => setIsBookingPanelAttention(false), 2200);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <main data-page="accommodation" className="animate-in fade-in duration-1000 bg-white">
      
      {/* Intro & Calendar Section */}
      <section className="page-section-nav max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="rounded-[2rem] text-center mb-[30px]">
          <h1 className="tracking-tight text-black mb-[15px] heading-ko">하이원 예약</h1>
          <p className="m-0 typo-body-medium text-[#181818]">
            빵트레일런 참가자를 위한 숙박권 예약 안내입니다.
            <br />
            예약 일정과 객실 정보를 확인해 주세요.
          </p>
        </div>


          <h2 className="heading-ko mb-[15px]">9월 달력</h2>
        <div className="rounded-[2rem] transition-colors" data-role="accommodation-calendar">
          <div className="overflow-x-auto rounded-[1.5rem] border border-gray-200" data-role="accommodation-calendar-shell">
            <table className="w-full min-w-[46rem] table-fixed border-collapse" data-role="accommodation-calendar-table">
              <thead>
                <tr className="bg-[#F5F5F5]" data-role="accommodation-calendar-head-row">
                  {weekHeader.map((day, dayIndex) => (
                    <th
                      key={day}
                      data-role="accommodation-calendar-head-cell"
                      className={`border-b border-gray-200 px-3 py-3 text-center typo-h6-bold ${weekdayClass(dayIndex)}`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleCalendarWeeks.map((week, rowIndex) => {
                  const weekEventBars = buildWeekEventBars(week);
                  const hasEventBars = weekEventBars.length > 0;
                  const isLastVisibleWeek = rowIndex === visibleCalendarWeeks.length - 1;

                  return (
                    <Fragment key={`week-${rowIndex}`}>
                      <tr key={`week-days-${rowIndex}`}>
                        {week.map((cell, colIndex) => (
                          <td
                            key={`cell-${rowIndex}-${colIndex}`}
                            data-role="accommodation-calendar-day-cell"
                            data-muted={cell.muted ? 'true' : 'false'}
                            className={`h-16 align-top px-2 py-2 md:h-20 md:px-3 md:py-3 ${
                              colIndex !== weekHeader.length - 1 ? 'border-r border-gray-200' : ''
                            } ${!hasEventBars && !isLastVisibleWeek ? 'border-b border-gray-200' : ''} ${
                              cell.muted ? 'bg-gray-50 text-gray-400' : 'bg-white text-black'
                            }`}
                          >
                            <div className="flex justify-end">
                              {!cell.muted ? (
                                <span data-role="accommodation-calendar-day-badge" className="inline-flex min-w-7 items-center justify-center rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 typo-h6-bold text-black">
                                  {cell.day}
                                </span>
                              ) : null}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {hasEventBars ? (
                        <tr key={`week-events-${rowIndex}`}>
                          <td
                            colSpan={7}
                            data-role="accommodation-calendar-event-row"
                            className={`overflow-hidden p-0 ${!isLastVisibleWeek ? 'border-b border-gray-200' : ''}`}
                          >
                            <div className="grid grid-cols-7 py-2 md:py-3">
                              {weekEventBars.map((bar) => (
                                <span
                                  key={`bar-${rowIndex}-${bar.startCol}-${bar.endCol}-${bar.label}`}
                                  data-role="accommodation-calendar-event-bar"
                                  style={{ gridColumn: `${bar.startCol + 1} / ${bar.endCol + 2}` }}
                                  className={`mx-auto inline-flex h-7 w-[calc(100%-0.605rem)] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg px-2.5 typo-h6-medium leading-none md:w-[calc(100%-0.9075rem)] ${calendarEventToneClass(bar.tone)}`}
                                >
                                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                                  {bar.label}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="typo-h6-medium text-gray-400 mt-6 flex items-center gap-2">
            <AlertCircle size={16} />
            상기 내용은 운영 상황에 따라 일부 변경될 수 있습니다.
          </p>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-0 lg:gap-4 mb-[15px]">
          <div>
            <h2 className="heading-ko">객실 요금 및 예약</h2>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center typo-h6-medium text-gray-500" data-role="pricing-status">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5" data-role="pricing-status-pill">
              <span className="w-2 h-2 rounded-full bg-black/70" data-role="pricing-status-dot"></span>
              현재 판매전
            </span>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto rounded-[1.25rem] border border-black/10 bg-white">
            <table
              className="w-full min-w-[46rem] text-left whitespace-nowrap font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)] text-gray-500"
              onMouseLeave={() => setHoveredPricingCell({ row: null, col: null })}
            >
              <thead className="border-b border-black/10 text-black">
                <tr>
                  <th
                    className={`py-6 px-8 font-bold w-24 transition-colors ${getPricingCrossHighlightClass(false, hoveredPricingCell.col === 0)}`}
                    onMouseEnter={() => setHoveredPricingCell({ row: null, col: 0 })}
                  >
                    구분
                  </th>
                  <th
                    className={`py-6 px-8 font-bold transition-colors ${getPricingCrossHighlightClass(false, hoveredPricingCell.col === 1)}`}
                    onMouseEnter={() => setHoveredPricingCell({ row: null, col: 1 })}
                  >
                    타입
                  </th>
                  {pricingDateHeaders.map((dateHeader, dateIndex) => {
                    const tableCol = dateIndex + 2;
                    const headerStatusMeta = getPricingStatusMeta(dateColumnStatuses[dateIndex]);
                    return (
                      <th
                        key={dateHeader}
                        className={`py-6 px-8 font-bold text-center w-32 transition-colors ${getPricingCrossHighlightClass(false, hoveredPricingCell.col === tableCol)}`}
                        onMouseEnter={() => setHoveredPricingCell({ row: null, col: tableCol })}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span>{dateHeader}</span>
                          <span className={headerStatusMeta.badgeClass}>
                            {headerStatusMeta.label}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {pricingData.map((row, idx) => {
                  const isFirstOfCategory = idx === 0 || pricingData[idx - 1].category !== row.category;
                  const categoryRowSpan = pricingData.filter(r => r.category === row.category).length;
                  const isHoveredRow = hoveredPricingCell.row === idx || activePricingCell.row === idx;
                  const isCategoryRowHovered =
                    (hoveredPricingCell.row !== null &&
                      hoveredPricingCell.row >= idx &&
                      hoveredPricingCell.row < idx + categoryRowSpan) ||
                    (activePricingCell.row !== null &&
                      activePricingCell.row >= idx &&
                      activePricingCell.row < idx + categoryRowSpan);
                  
                  return (
                    <tr key={idx} className="transition-colors">
                      {isFirstOfCategory && (
                        <td
                          rowSpan={categoryRowSpan}
                          className={`py-6 px-8 font-bold text-black align-top border-r border-black/5 transition-colors ${getPricingCrossHighlightClass(
                            isCategoryRowHovered,
                            hoveredPricingCell.col === 0 || activePricingCell.col === 0
                          )}`}
                          onMouseEnter={() => setHoveredPricingCell({ row: idx, col: 0 })}
                        >
                          {row.category}
                        </td>
                      )}
                      <td
                        className={`py-6 px-8 font-medium text-gray-500 transition-colors ${getPricingCrossHighlightClass(
                          isHoveredRow,
                          hoveredPricingCell.col === 1 || activePricingCell.col === 1
                        )}`}
                        onMouseEnter={() => setHoveredPricingCell({ row: idx, col: 1 })}
                      >
                        {row.type}
                      </td>
                      {[0, 1, 2].map((priceIndex) => {
                        const tableCol = priceIndex + 2;
                        const price = row.prices[priceIndex];
                        const status = row.status[priceIndex];
                        const isAvailable = Boolean(price) && status !== 'none';
                        const isActiveCell = activePricingCell.row === idx && activePricingCell.col === tableCol;

                        return (
                          <td
                            key={`${idx}-${priceIndex}`}
                            className={`py-6 px-8 text-center transition-colors ${getPricingCrossHighlightClass(
                              isHoveredRow,
                              hoveredPricingCell.col === tableCol || activePricingCell.col === tableCol
                            )} ${isAvailable ? 'group relative cursor-pointer' : ''} ${isActiveCell ? 'bg-black/[0.08]' : ''}`}
                            onMouseEnter={() => setHoveredPricingCell({ row: idx, col: tableCol })}
                            onClick={
                              isAvailable
                                ? () =>
                                    setActivePricingCell((prev) =>
                                      prev.row === idx && prev.col === tableCol
                                        ? { row: null, col: null }
                                        : { row: idx, col: tableCol }
                                    )
                                : undefined
                            }
                          >
                            {isAvailable ? (
                              <>
                                <span className={`inline-flex flex-col items-center gap-1 transition-opacity duration-200 sm:group-hover:opacity-0 sm:group-focus-visible:opacity-0 ${isActiveCell ? 'sm:opacity-0' : ''}`}>
                                  <span className="inline-flex items-center gap-1.5">
                                    <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-2 py-1 typo-h6-medium text-gray-500">판매전</span>
                                    <span className="font-medium text-black">{price}</span>
                                  </span>
                                  <span className={`sm:hidden typo-h6-medium ${isActiveCell ? 'text-black font-medium' : 'text-transparent'}`}>
                                    {isActiveCell ? '선택됨' : '선택됨'}
                                  </span>
                                </span>
                              </>
                            ) : (
                              <span className="font-medium text-gray-300">-</span>
                            )}
                            {isAvailable ? (
                              <span className={`hidden sm:flex pointer-events-none absolute inset-0 items-center justify-center gap-1 typo-h6-medium text-black transition-opacity duration-200 ${isActiveCell ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}>
                                {isActiveCell ? '선택됨' : '예약하기'}
                                {!isActiveCell ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
                              </span>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="typo-h6-medium text-gray-400 mt-6 flex items-center gap-2">
          <AlertCircle size={16} />
          객실 요금 및 재고는 운영 상황에 따라 변경될 수 있습니다.
        </p>
      </section>

      <div
        className={`fixed inset-x-4 bottom-4 z-40 md:inset-x-auto md:right-6 md:w-[26rem] transition-all duration-500 ease-out ${
          isBookingPanelVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        } ${isBookingPanelAttention ? 'scale-[1.02]' : 'scale-100'}`}
      >
        <div
          className={`pointer-events-none absolute -top-10 right-2 transition-all duration-300 ${
            isBookingPanelAttention ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          }`}
          aria-hidden="true"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 px-3 py-1 typo-h6-medium text-black shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            여기서 예약 진행
            <ArrowDown size={12} aria-hidden="true" />
          </span>
        </div>
        <div
          className={`rounded-[2rem] border border-black/5 bg-[#F5F5F5] p-5 md:p-6 transition-shadow duration-300 ${
            isBookingPanelAttention
              ? 'animate-pulse shadow-[0_0_0_2px_rgba(0,0,0,0.08),0_12px_34px_rgba(0,0,0,0.08)]'
              : 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }`}
        >
          <div className="mb-[15px] grid grid-cols-2 gap-2.5">
            <div
              className={`rounded-xl border px-3 py-2.5 text-center transition-all ${
                selectedPricing
                  ? 'border-black/25 bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                  : 'border-black/15 bg-white text-gray-500'
              }`}
            >
              <p className="m-0 typo-h6-medium tracking-[0.02em] opacity-70">Step 1</p>
              <p className="m-0 typo-h6-bold text-current">객실 선택</p>
            </div>
            <div
              className={`rounded-xl border px-3 py-2.5 text-center transition-all ${
                selectedPricing
                  ? 'border-black/25 bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                  : 'border-black/15 bg-white text-gray-500'
              }`}
            >
              <p className="m-0 typo-h6-medium tracking-[0.02em] opacity-70">Step 2</p>
              <p className="m-0 typo-h6-bold text-current">예약하기</p>
            </div>
          </div>

          {selectedPricing ? (
            <>
              <p className="m-0 typo-h6-medium text-gray-500">
                {selectedPricing.category} · {selectedPricing.type}
              </p>
              <p className="m-0 mt-1 typo-body-bold text-black">
                {selectedPricing.dateLabel} · {selectedPricing.price}
              </p>
            </>
          ) : (
            <>
              <p className="m-0 typo-h6-medium text-gray-500">가격 셀을 선택해 객실을 고르세요.</p>
              <p className="m-0 mt-1 typo-body-bold text-black">선택된 객실 없음</p>
            </>
          )}

          {selectedBookingHref ? (
            <a
              href={selectedBookingHref}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-black text-white py-3 typo-h6-medium"
            >
              선택한 객실 예약하기
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400 py-3 typo-h6-medium"
            >
              선택한 객실 예약하기
            </button>
          )}
        </div>
      </div>

      {/* Policies Section */}
      <section className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-0 lg:gap-4 mb-12 border-b border-black/10 pb-[15px]">
          <div>
            <h2 className="heading-ko">이용 규정</h2>
          </div>
          <p className="m-0 mt-6 lg:mt-0 typo-body-medium text-left lg:text-right">
            숙박권 구매 전 반드시 확인해 주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5 font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)] text-gray-500">
            <h6 className="mb-6 heading-ko">숙박 필독사항</h6>
            <ul className="space-y-4 leading-relaxed font-medium">
              <li className="flex gap-3">
                <span className="text-black mt-1">•</span>
                <span><strong className="text-black">빵트레일런 참가권을 구매해야만</strong> 숙박권 신청이 가능합니다.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-black mt-1">•</span>
                <span>예약한 숙소는 빵트레일런 참가권을 구매하지 않은 가족 및 지인들도 함께 숙박이 가능합니다.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5 font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)] text-gray-500">
            <h6 className="mb-6 heading-ko">취소 및 환불 규정</h6>
            <div className="overflow-hidden">
              <table className="w-full table-fixed font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)]">
                <thead className="border-b border-black/10 text-black">
                  <tr>
                    <th className="py-4 px-6 font-bold w-1/2 text-left align-middle">취소 시점</th>
                    <th className="py-4 px-6 font-bold w-1/2 text-center align-middle">취소 수수료</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-gray-500 font-medium">
                  <tr>
                    <td className="py-4 px-6 text-left align-middle">입실 28일~15일 전</td>
                    <td className="py-4 px-6 text-center align-middle">10%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-left align-middle">입실 14일 전~8일 전</td>
                    <td className="py-4 px-6 text-center align-middle">30%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-left align-middle text-black font-bold">입실 7일 전~숙박일 당일</td>
                    <td className="py-4 px-6 text-center align-middle text-black font-bold">환불 불가</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Room Information (Editorial Split Style) */}
      <section className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="mb-[15px] heading-ko">객실 안내</h2>
              <p className="m-0 typo-body-medium text-[#181818]">
                체크인/체크아웃 시간 및 객실 이용 시 주의사항, 비품 안내를 확인해 주세요.
              </p>
            </div>
          </div>
          
          {/* Right: Content List */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Check-in/out */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-1/3 mt-1"><h6 className="text-gray-400 m-0 heading-ko">체크인 / 체크아웃</h6></div>
              <div className="md:w-2/3">
                <p className="typo-h6-medium text-gray-500 mb-2">마운틴콘도 / 힐콘도 / 그랜드호텔</p>
                <h3 className="typo-h4 m-0 heading-ko">오후 3시 <span className="text-gray-300 mx-2">→</span> 오전 11시</h3>
              </div>
            </div>

            {/* Room Rules */}
            <div className="py-8 border-t border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-1/3 mt-1"><h6 className="text-gray-400 m-0 heading-ko">객실 안내 사항</h6></div>
              <div className="md:w-2/3 space-y-10">
                <div>
                  <h4 className="mb-4 heading-ko">힐콘도 / 마운틴콘도</h4>
                  <ul className="space-y-3 text-gray-500 leading-relaxed typo-body-medium">
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>퇴실 전 객실점검(주방정비, 쓰레기 분리배출)을 해주시고, 퇴실 시 프런트에서 체크아웃 해주시기 바랍니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>숙박 중 파손된 물건은 리조트 측에서 확인 후 비용이 청구됩니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>객실 내에서는 화재예방 차원으로 휴대용 버너 및 전기 조리 기구를 사용할 수 없습니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>수건은 1박 투숙 시 객실 정원 수 만큼 제공됩니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>반려동물을 동반하여 객실 이용은 어렵습니다. (힐 펫 룸 제외)</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>투숙정원 초과 시 1인당 5,000원의 추가 요금이 부과됩니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>투숙정원 초과 시 주방기물은 (밥그릇, 국그릇, 수저세트) 추가되지 않습니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>인원 초과 요금에는 침구, 수건 요금이 포함되어 있지 않습니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>추가 침구: 1채당 15,000원(1박) / 추가 타올(1장당): 1,000원(소), 2,000원(대)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 heading-ko">그랜드호텔</h4>
                  <ul className="space-y-3 text-gray-500 leading-relaxed typo-body-medium">
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>퇴실 전 객실점검(주방정비, 쓰레기 분리배출)을 해주시고, 퇴실 시 프런트에서 체크아웃 해주시기 바랍니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>수건은 1박 투숙시 객실 정원 수 만큼 제공됩니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>반려동물을 동반하여 객실 이용은 어렵습니다. 반려동물 동반 시, 벨 데스크를 방문하여 보관 후 입실해 주시기 바랍니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>객실 내에서는 화재예방 차원으로 휴대용 버너 및 전기 조리 기구를 사용할 수 없습니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>객실 비품의 훼손 및 불출은 금지되며, 가구 이동 또한 삼가 주시기 바랍니다.</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>귀중품(현금 포함)은 객실 내 비치된 금고 또는 프런트에 맡겨 주시기 바랍니다.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="py-8 border-t border-b border-black/10 flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-1/3 mt-1"><h6 className="text-gray-400 m-0 heading-ko">객실 비품</h6></div>
              <div className="md:w-2/3 space-y-10">
                <div>
                  <h4 className="mb-4 heading-ko">힐콘도 / 마운틴콘도</h4>
                  <ul className="space-y-3 text-gray-500 leading-relaxed typo-body-medium">
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>가전류 TV, 전화기, 냉장고, 에어컨, 인덕션레인지(전용냄비, 프라이팬 사용), 헤어드라이기(머리빗X), 전기밥솥, 커피포트</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>식기류 투숙정원 기준 - 밥공기, 국그릇, 커피잔, 물컵, 숟가락, 젓가락 기본세팅 - 국자, 가위, 주걱, 식도, 과도, 도마, 믹싱볼, 접시류, 냄비받침, 주방세제, 행주, 쟁반, 뒤집개</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>식기류 및 가전류 추가 투입 불가 / 조리용 집게 X</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>객실 정비에 따라 일부 차이가 있을 수 있습니다. 프론트로 연락주시면 조치해드리겠습니다.</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 heading-ko">그랜드호텔</h4>
                  <ul className="space-y-3 text-gray-500 leading-relaxed typo-body-medium">
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>타올류 - 바스타올, 페이스타올, 핸드타올, 가운</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>비품류 - TV, 미니냉장고, 미니바(유료), 금고, 전화기, 전기포트, 휴대폰 충전기, 무료생수(2병), 커피, 티, 헤어드라이어, 비데</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>소모품류 - 욕실용품, 머리빗, 면봉, 슬리퍼</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>인쇄물류 - 객실 디렉토리, 편지봉투, 편지지, 메모지, 엽서, 고객설문지 등</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>대여용품 - 노트북(유료), 추가침구(유료), 담요, 아기침대, 다리미/판, 가습기, 젖병소독기, 유선 인터넷 케이블</span></li>
                    <li className="flex gap-3"><span className="text-gray-300 mt-0.5">•</span><span>객실 정비에 따라 일부 차이가 있을 수 있습니다. 프론트로 연락주시면 조치해드리겠습니다.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        {/* Toggle */}
        <div className="flex justify-center mb-[30px] pt-4">
            <div className="bg-gray-100 p-1 rounded-full inline-flex border border-black/5">
              <button
                onClick={() => setMapType('hill')}
                className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${mapType === 'hill' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                힐콘도
              </button>
              <button
                onClick={() => setMapType('mountain')}
                className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${mapType === 'mountain' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                마운틴콘도
              </button>
              <button
                onClick={() => setMapType('grand')}
                className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${mapType === 'grand' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                그랜드호텔
              </button>
            </div>
          </div>

          <h2 className="text-center mb-[15px] heading-ko">숙소 위치</h2>
          
          <div className="flex flex-col gap-6">
          {/* Map Placeholder */}
          <div className="bg-gray-50 border border-black/5 rounded-[2rem] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center overflow-hidden relative">
             <div className="text-gray-400 flex flex-col items-center">
               <MapPin size={48} className="mb-4 opacity-50" />
               <p className="m-0 typo-h6-label">{activeLodgingLocation.mapLabel}</p>
             </div>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5">
            <div className="pb-[15px] mb-[15px] border-b border-gray-200">
              <h4 className="m-0 mb-[15px]">{activeLodgingLocation.name} 오시는 길</h4>
              <p className="m-0 typo-body-medium text-[#181818]">{activeLodgingLocation.routeToVenue}</p>
            </div>

            <div className="space-y-[15px] typo-body-medium text-gray-500">
              {activeLodgingLocation.methods.map((method) => (
                <div key={`${mapType}-${method.label}`} className="flex gap-4">
                  <span className="font-bold text-black shrink-0">{method.label}</span>
                  <div>
                    <p className="m-0">{method.text}</p>
                    {method.detail ? (
                      <p className="m-0 mt-[15px] text-gray-500 flex items-center gap-2">
                        <span className="text-gray-300">↳</span>
                        {method.detail}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5 font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)] text-gray-500">
            <div className="grid grid-cols-1 sm:grid-cols-[12rem_minmax(0,1fr)] gap-2 sm:gap-4 sm:items-center sm:min-h-[2.5rem] pb-[15px] mb-[15px] border-b border-gray-200">
              <span className="font-bold text-black sm:self-center">숙소</span>
              <p className="m-0 sm:self-center">{activeLodgingLocation.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[12rem_minmax(0,1fr)] gap-2 sm:gap-4 sm:items-center sm:min-h-[2.5rem] pb-[15px] mb-[15px] border-b border-gray-200">
              <span className="font-bold text-black sm:self-center">주소</span>
              <p className="m-0 sm:self-center">{activeLodgingLocation.address}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[12rem_minmax(0,1fr)] gap-2 sm:gap-4 sm:items-center sm:min-h-[2.5rem]">
              <span className="font-bold text-black sm:self-center">행사장 이동</span>
              <p className="m-0 sm:self-center">{activeLodgingLocation.routeToVenue}</p>
            </div>
          </div>
          </div>

          <p className="typo-h6-medium text-gray-400 mt-6 flex items-center gap-2">
            <AlertCircle size={16} />
            차량 이동 동선은 대회 당일 통제 상황에 따라 달라질 수 있습니다.
          </p>
      </section>
    </main>
  );
};

export default Accommodation;
