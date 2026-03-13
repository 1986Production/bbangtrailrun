"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Download, Map as MapIcon, Clock, Calendar, AlertCircle } from 'lucide-react';

type EquipmentItem = {
  name: string;
  icon: string;
};

type CourseEntry = {
  title: string;
  mapDescription: string;
  mapStops: { label: string; value: string }[];
  timeLimit: string;
  gallery: { id: string; title: string; src: string }[];
  schedule: { time: string; desc: string; isDate: boolean }[];
  required: EquipmentItem[];
  recommended: EquipmentItem[];
};

const requiredEquipment: EquipmentItem[] = [
  { name: '트레일 러닝화', icon: '👟' },
  { name: '러닝 베스트(또는 배낭)', icon: '🎒' },
  { name: '개인 물병(또는 컵)', icon: '🥤' },
  { name: '비상식량', icon: '🍫' },
  { name: '배번호표', icon: '🎫' },
  { name: '휴대폰', icon: '📱' }
];

const recommendedEquipment: EquipmentItem[] = [
  { name: '트레일 러닝화', icon: '👟' },
  { name: '개인 물병', icon: '🥤' },
  { name: '에너지젤', icon: '⚡' },
  { name: '호루라기', icon: '📣' },
  { name: '응급처치 키트', icon: '🩹' },
  { name: '서바이벌 블랭킷', icon: '🆘' },
  { name: '방수 자켓(우천 시)', icon: '🧥' }
];

const requiredEquipment30K: EquipmentItem[] = [
  { name: '트레일 러닝화', icon: '👟' },
  { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
  { name: '호루라기', icon: '📣' },
  { name: '응급처치 키트', icon: '🩹' },
  { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
  { name: '서바이벌 블랭킷', icon: '🆘' },
  { name: '방수 자켓(우천 시)', icon: '🧥' },
  { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
];

const requiredEquipment20K: EquipmentItem[] = [
  { name: '트레일 러닝화(또는 등산화)', icon: '👟' },
  { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
  { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
  { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
];

const requiredEquipment12K: EquipmentItem[] = [
  { name: '트레일 러닝화(또는 등산화)', icon: '👟' },
  { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
  { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
  { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
];

const createCourseGalleryItems = (course: string) =>
  Array.from({ length: 6 }, (_, index) => {
    const order = String(index + 1).padStart(2, '0');
    const courseKey = course.toLowerCase();

    return {
      id: `${courseKey}-gallery-${order}`,
      title: `${course} 현장 사진 ${index + 1}`,
      src: `/images/${course}/course-${courseKey}-${order}.jpg`,
    };
  });

const courseData: Record<string, CourseEntry> = {
  '30K': {
    title: '30K',
    mapDescription: '도전을 즐기는, 강철 체력, 모든 CP 풀로 달리는 코스',
    mapStops: [
      { label: 'START', value: '잔디 광장' },
      { label: 'CP1. 브런치 카페', value: '도롱이 연못' },
      { label: 'CP2. 과자집', value: '하이원 호텔' },
      { label: 'CP3. 초콜릿 공장', value: '밸리 콘도' },
      { label: 'CP4. 아이스크림 가게', value: '마운틴 탑' },
      { label: 'FINISH', value: '잔디 광장' }
    ],
    timeLimit: '8시간',
    gallery: createCourseGalleryItems('30K'),
    schedule: [
      { time: '9월 11일(금)', desc: '', isDate: true },
      { time: '14:00', desc: '참가자 등록 및 장비 체크', isDate: false },
      { time: '17:00', desc: '참가자 등록 종료', isDate: false },
      { time: '9월 12일(토)', desc: '', isDate: true },
      { time: '07:30', desc: '참가자 등록 및 장비 체크', isDate: false },
      { time: '07:30', desc: '물품보관소 오픈', isDate: false },
      { time: '08:00', desc: '출발 (A그룹 08:00 / B그룹 08:20)', isDate: false },
      { time: '12:00', desc: '기념품 수령소 오픈', isDate: false },
      { time: '15:00', desc: '시상식', isDate: false },
      { time: '17:00', desc: '종료', isDate: false }
    ],
    required: requiredEquipment30K,
    recommended: []
  },
  '20K': {
    title: '20K',
    mapDescription: '운탄고도 풍광 어쩌고 즐기는 코스',
    mapStops: [
      { label: 'START', value: '잔디 광장' },
      { label: 'CP1. 브런치 카페', value: '도롱이 연못' },
      { label: 'CP2. 과자집', value: '하이원 호텔' },
      { label: 'CP3. 아이스크림 가게', value: '마운틴 탑' },
      { label: 'FINISH', value: '잔디 광장' }
    ],
    timeLimit: '6시간',
    gallery: createCourseGalleryItems('20K'),
    schedule: [
      { time: '9월 11일(금)', desc: '', isDate: true },
      { time: '14:00', desc: '참가자 등록 및 장비 체크 (1, 2일차 참가자 모두 가능)', isDate: false },
      { time: '17:00', desc: '참가자 등록 종료', isDate: false },
      { time: '9월 12일(토) 1일차', desc: '', isDate: true },
      { time: '08:00', desc: '참가자 등록 및 장비 체크 (1, 2일차 참가자 모두 가능)', isDate: false },
      { time: '08:00', desc: '물품보관소 오픈', isDate: false },
      { time: '09:00', desc: '출발 (A그룹 08:50 / B그룹 09:10 / C그룹 09:40 / D그룹 10:00)', isDate: false },
      { time: '12:00', desc: '기념품 수령소 오픈', isDate: false },
      { time: '17:00', desc: '1일차 종료', isDate: false },
      { time: '9월 13일(일) 2일차', desc: '', isDate: true },
      { time: '08:00', desc: '참가자 등록 및 장비 체크', isDate: false },
      { time: '08:00', desc: '물품보관소 오픈', isDate: false },
      { time: '09:00', desc: '출발 (A그룹 08:50 / B그룹 09:10 / C그룹 09:40 / D그룹 10:00)', isDate: false },
      { time: '12:00', desc: '기념품 수령소 오픈', isDate: false },
      { time: '17:00', desc: '2일차 및 공식 행사 종료', isDate: false }
    ],
    required: requiredEquipment20K,
    recommended: []
  },
  '12K': {
    title: '12K',
    mapDescription: '트레일런 스타터 비기너 시작을 위한 어쩌고 코스',
    mapStops: [
      { label: 'START', value: '잔디 광장' },
      { label: 'CP1. 브런치 카페', value: '도롱이 연못' },
      { label: 'CP2. 아이스크림 가게', value: '마운틴 탑' },
      { label: 'FINISH', value: '잔디 광장' }
    ],
    timeLimit: '5시간',
    gallery: createCourseGalleryItems('12K'),
    schedule: [
      { time: '9월 11일(금)', desc: '', isDate: true },
      { time: '14:00', desc: '참가자 등록 및 장비 체크 (1, 2일차 참가자 모두 가능)', isDate: false },
      { time: '17:00', desc: '참가자 등록 종료', isDate: false },
      { time: '9월 12일(토) 1일차', desc: '', isDate: true },
      { time: '08:00', desc: '참가자 등록 및 장비 체크 (1, 2일차 참가자 모두 가능)', isDate: false },
      { time: '08:00', desc: '물품보관소 오픈', isDate: false },
      { time: '09:00', desc: '출발 (A그룹 10:10 / B그룹 10:20 / C그룹 10:30)', isDate: false },
      { time: '12:00', desc: '기념품 수령소 오픈', isDate: false },
      { time: '17:00', desc: '1일차 종료', isDate: false },
      { time: '9월 13일(일) 2일차', desc: '', isDate: true },
      { time: '08:00', desc: '참가자 등록 및 장비 체크', isDate: false },
      { time: '08:00', desc: '물품보관소 오픈', isDate: false },
      { time: '09:00', desc: '출발 (A그룹 09:40 / B그룹 09:50 / C그룹 10:00)', isDate: false },
      { time: '12:00', desc: '기념품 수령소 오픈', isDate: false },
      { time: '17:00', desc: '2일차 및 공식 행사 종료', isDate: false }
    ],
    required: requiredEquipment12K,
    recommended: []
  }
};

type CourseType = keyof typeof courseData;

const Course = () => {
  const [activeTab, setActiveTab] = useState<CourseType>('30K');
  const courseGalleryScrollRef = useRef<HTMLDivElement | null>(null);
  const courseGalleryAutoplayPausedRef = useRef(false);
  const courseGalleryDragStateRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });
  const data = courseData[activeTab];
  const normalizeEquipmentName = (name: string) =>
    name.replace(/\(.*?\)/g, '').replace(/\s/g, '').replace('스마트폰', '휴대폰');
  const requiredNameSet = new Set(data.required.map((item) => normalizeEquipmentName(item.name)));
  const dedupedRecommended = data.recommended.filter(
    (item) => !requiredNameSet.has(normalizeEquipmentName(item.name))
  );
  const hasRecommendedEquipment = dedupedRecommended.length > 0;

  useEffect(() => {
    const courseGalleryScrollElement = courseGalleryScrollRef.current;
    if (!courseGalleryScrollElement) {
      return;
    }

    courseGalleryScrollElement.scrollTo({ left: 0, behavior: 'auto' });
  }, [activeTab]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const autoplayIntervalId = window.setInterval(() => {
      const courseGalleryScrollElement = courseGalleryScrollRef.current;

      if (
        !courseGalleryScrollElement ||
        courseGalleryAutoplayPausedRef.current ||
        courseGalleryDragStateRef.current.active
      ) {
        return;
      }

      const listElement = courseGalleryScrollElement.firstElementChild as HTMLElement | null;
      const firstCardElement = listElement?.querySelector<HTMLElement>('article');

      if (!listElement || !firstCardElement) {
        return;
      }

      const listStyles = window.getComputedStyle(listElement);
      const gap = Number.parseFloat(listStyles.columnGap || listStyles.gap || '0');
      const step = firstCardElement.getBoundingClientRect().width + gap;
      const maxScrollLeft = courseGalleryScrollElement.scrollWidth - courseGalleryScrollElement.clientWidth;
      const nextScrollLeft = courseGalleryScrollElement.scrollLeft + step;

      if (maxScrollLeft <= 0) {
        return;
      }

      courseGalleryScrollElement.scrollTo({
        left: nextScrollLeft >= maxScrollLeft - 8 ? 0 : nextScrollLeft,
        behavior: nextScrollLeft >= maxScrollLeft - 8 ? 'auto' : 'smooth',
      });
    }, 3500);

    return () => {
      window.clearInterval(autoplayIntervalId);
    };
  }, [activeTab]);

  const handleCourseGalleryPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !courseGalleryScrollRef.current) {
      return;
    }

    courseGalleryDragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: courseGalleryScrollRef.current.scrollLeft,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleCourseGalleryPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = courseGalleryDragStateRef.current;
    const courseGalleryScrollElement = courseGalleryScrollRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId || !courseGalleryScrollElement) {
      return;
    }

    courseGalleryScrollElement.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    event.preventDefault();
  };

  const finishCourseGalleryDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = courseGalleryDragStateRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    courseGalleryDragStateRef.current = {
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
    <main data-page="course" className="course animate-in fade-in duration-1000 bg-white">
      <section
        data-section="course"
        className="course layout-pad layout-pad-nav"
      >
        <div data-block="course-wrap" className="course-wrap max-w-[80rem] mx-auto">
        
        {/* Header */}
        <div data-block="course-title" className="course-title text-center pb-[30px]">
          <h1 className="tracking-tight text-black mb-[15px]">코스</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-[30px]">
          {(Object.keys(courseData) as CourseType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-role="course-tab-button"
              data-course={tab}
              data-selected={activeTab === tab ? "true" : "false"}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] scale-105'
                  : 'bg-gray-100 text-gray-500 border border-transparent hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500" key={activeTab}>
          {/* Map Section */}
          <div data-block="course-map" className="course-map mb-20">
            <h3 data-force-ko-heading="true" className="mb-0 heading-ko">{data.title} 코스</h3>
            <p className="mt-0 mb-[15px] typo-body-medium text-[#181818]">{data.mapDescription}</p>
            <div className="flex flex-col gap-6">
              {/* Map Image Placeholder */}
              <div className="w-full bg-[#F5F5F5] rounded-[2rem] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center border border-black/5 relative overflow-hidden group">
                <h3 className="m-0 text-white tracking-widest z-10">COMING SOON</h3>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Map Info */}
              <div className="w-full flex flex-col justify-center">
                <div className="bg-[#F5F5F5] rounded-[2rem] p-8 md:p-12 border border-black/5 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="w-full md:w-[20%]">
                      <h5 data-force-ko-heading="true" className="heading-ko text-black m-0">코스 안내</h5>
                    </div>
                    <div className="w-full md:w-[80%]">
                      <div>
                        {data.mapStops.map((stop, index) => (
                          <div
                            key={`${stop.label}-${index}`}
                            className={`grid grid-cols-[6fr_4fr] md:grid-cols-[3fr_7fr] items-center gap-x-4 gap-y-2 ${
                              index === data.mapStops.length - 1 ? '' : 'mb-[15px] pb-[15px] border-b border-gray-200'
                            }`}
                          >
                            <p className="font-bold text-black m-0">{stop.label}</p>
                            <p className="text-gray-600 font-medium m-0">{stop.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-6 mb-6 flex items-center gap-2">
                  <AlertCircle size={16} />
                  코스 내용은 주최 측의 사정에 따라 일부 변경될 수 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    data-role="course-map-action-button"
                    data-course={activeTab}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 text-black font-bold transition-colors"
                  >
                    {data.title} GPX <Download size={18} />
                  </button>
                  <button
                    data-role="course-map-action-button"
                    data-course={activeTab}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 text-black font-bold transition-colors"
                  >
                    Google Maps <MapIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div data-block="course-details" className="course-details mb-20">
            <h3 className="mb-[15px] heading-ko">{data.title} 코스 상세 내용</h3>
            <div className="bg-[#F5F5F5] rounded-[2rem] p-8 md:p-12 border border-black/5 hover:bg-gray-100 transition-colors">
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 border-b border-gray-200 pb-12">
                <div className="w-full md:w-[20%]">
                  <h5 className="flex items-center gap-2 text-black">
                    <Clock size={20} className="text-gray-400" /> 제한 시간
                  </h5>
                </div>
                <div className="w-full md:w-[80%]">
                  <p className="text-gray-800"><strong>{data.timeLimit}</strong></p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="w-full md:w-[20%]">
                  <h5 className="flex items-center gap-2 text-black">
                    <Calendar size={20} className="text-gray-400" /> 참가일정
                  </h5>
                </div>
                <div className="w-full md:w-[80%]">
                  <div>
                    {data.schedule.map((item, index) => (
                      item.isDate ? (
                        <div key={index} className={`${index === 0 ? 'mt-0' : 'mt-[30px]'} pb-[15px] border-b border-gray-200`}>
                          <p className="mb-0 font-bold text-black">{item.time}</p>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 ${
                            index === 0
                              ? ''
                              : data.schedule[index - 1]?.isDate
                                ? 'mt-[15px]'
                                : 'mt-4'
                          }`}
                        >
                          <p className="w-full sm:w-[30%] font-bold text-black m-0">{item.time}</p>
                          <p className="w-full sm:w-[70%] text-gray-600 font-medium m-0">{item.desc}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <p className="text-sm text-gray-400 mt-6 flex items-center gap-2">
              <AlertCircle size={16} />
              상기 내용은 주최측의 사정에 따라 일부 변경될 수 있습니다.
            </p>
          </div>

          {/* Equipment Section */}
          <div data-block="course-gear" className="course-gear mb-20">
            <h3 className="mb-[15px] heading-ko">장비 안내</h3>
            <div className="bg-[#F5F5F5] rounded-[2rem] p-8 md:p-12 border border-black/5 hover:bg-gray-100 transition-colors">
              
              <div className={`flex flex-col md:flex-row gap-6 md:gap-12 ${hasRecommendedEquipment ? 'mb-12 border-b border-gray-200 pb-12' : ''}`}>
                <div className="w-full md:w-[20%] flex items-start">
                  <h5 className="text-black">필수 장비</h5>
                </div>
                <div className="w-full md:w-[80%]">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.required.map((item, index) => (
                      <div key={index} className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <p className="text-4xl mb-3 m-0">{item.icon}</p>
                        <p className="font-bold text-sm text-gray-800 m-0">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {hasRecommendedEquipment && (
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="w-full md:w-[20%] flex items-start">
                    <h5 className="text-black">추천 장비</h5>
                  </div>
                  <div className="w-full md:w-[80%]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dedupedRecommended.map((item, index) => (
                        <div key={index} className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                          <p className="text-4xl mb-3 m-0">{item.icon}</p>
                          <p className="font-bold text-sm text-gray-800 m-0">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-6">
                <div className="hidden md:block md:w-[20%]" />
                <div className="w-full md:w-[80%]">
                  <p className="text-sm text-gray-400 mb-0">
                    ※ CP에서 일회용품은 제공 되지 않습니다.
                  </p>
                </div>
              </div>

            </div>
            <p className="text-sm text-gray-400 mt-6 flex items-center gap-2">
              <AlertCircle size={16} />
              상기 내용은 주최측의 사정에 따라 일부 변경될 수 있습니다.
            </p>
          </div>

          <div data-block="course-gallery" className="course-gallery mb-20">
            <h3 className="mb-[15px] heading-ko">{data.title} 코스 사진</h3>
            <div
              ref={courseGalleryScrollRef}
              className="course-gallery-scroll cursor-grab overflow-x-auto snap-x snap-proximity scroll-smooth select-none active:cursor-grabbing"
              onMouseEnter={() => {
                courseGalleryAutoplayPausedRef.current = true;
              }}
              onMouseLeave={() => {
                courseGalleryAutoplayPausedRef.current = false;
              }}
              onTouchStart={() => {
                courseGalleryAutoplayPausedRef.current = true;
              }}
              onTouchEnd={() => {
                courseGalleryAutoplayPausedRef.current = false;
              }}
              onPointerDown={handleCourseGalleryPointerDown}
              onPointerMove={handleCourseGalleryPointerMove}
              onPointerUp={finishCourseGalleryDrag}
              onPointerCancel={finishCourseGalleryDrag}
            >
              <div className="flex gap-4 md:gap-6 min-w-max">
                {data.gallery.map((item) => (
                  <article
                    key={item.id}
                    className="snap-start shrink-0 w-[72vw] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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

          {/* Bottom Button */}
          <div className="flex justify-center mt-16">
            <button className="px-16 py-5 rounded-2xl bg-gray-300 text-white font-bold text-lg cursor-not-allowed">
              접수 예정
            </button>
          </div>

        </div>
        </div>
      </section>
    </main>
  );
};

export default Course;
