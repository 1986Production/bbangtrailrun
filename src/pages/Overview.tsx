"use client";

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const Overview = () => {
  const [mapType, setMapType] = useState('course');
  const overviewCopy = {
    eventName: "빵트레일런",
    eventDate: "2026년 9월 11일(금) - 13일(일)",
    eventTime: "8:00 ~ 18:00",
    venueLine1: "하이원 리조트 잔디광장 및",
    venueLine2: "하늘길 트레킹 코스 일대",
  };
  const type = {
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

  return (
    <main data-page="overview" className="animate-in fade-in duration-1000 bg-white">
      {/* Event Overview - Editorial Split Style */}
      <section data-section="work-overview-editorial" className="page-section-nav max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
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

      {/* Campaign Section */}
      <section data-section="work-campaign-grid" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-0 lg:gap-4 mb-12 border-b border-black/10 pb-[15px]">
          <div>
            <h2 className="mb-0">역대 캠페인</h2>
          </div>
          <div className="mt-[15px] lg:mt-0 max-w-[32rem] text-left lg:text-right">
            <p className={type.campaignIntro}>
              빵에 진심인 러너들의 따뜻한 여정을 담아,
              <br className="hidden lg:block" />
              강원 지역 내 아동복지센터에 전하는 기부 캠페인을 확인하세요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Donation Card */}
          <div className="flex flex-col justify-center border border-orange-200 rounded-[2rem] bg-orange-50 p-8 md:p-12 md:col-span-2 lg:col-span-1">
            <div className={`${type.donationCount} pb-8 mb-6 border-b border-orange-200`}>31,100<span className={type.donationUnit}>개</span></div>
            <h5 className="m-0 mb-2 text-orange-600">총 기부된 빵(베이커리류) 수</h5>
            <p className={type.donationNote}>
              빵빵런, 커피 빵빵런, 빵트레일런 등 <br/>역대 캠페인
            </p>
          </div>

          {/* History Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:col-span-2 lg:col-span-2">
            {[
              { year: "2025", title: "빵(베이커리류) 기부", amount: "11,000", org: "사단법인 프렌즈 및 대전, 강릉, 정선 지역아동센터" },
              { year: "2024", title: "빵(베이커리류) 기부", amount: "10,000", org: "사단법인 프렌즈 및 대전, 정선 지역아동센터" },
              { year: "2023", title: "빵(베이커리류) 기부", amount: "4,000", org: "사단법인 프렌즈 및 서울 지역아동센터" },
              { year: "2022", title: "빵 기부", amount: "3,300", org: "사단법인 프렌즈 및 서울 지역아동센터" },
              { year: "2021", title: "빵(베이커리류) 기부", amount: "2,800", org: "사단법인 프렌즈 및 서울 지역아동센터" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col justify-between border border-black/5 rounded-[2rem] bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/5">
                <div>
                  <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
                    <h4 className={type.historyYear}>{item.year}</h4>
                    <span className="inline-block border border-orange-200 rounded-full bg-orange-50 px-3 py-1 typo-h6-bold text-orange-600">
                      총 {item.amount}개
                    </span>
                  </div>
                  <h5 className={`${type.overviewValue} mb-3`}>{item.title}</h5>
                </div>
                <p className={type.historyBody}>
                  {item.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section data-section="work-timetable" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
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
          <div className="flex flex-col">
            {[
              { time: "08:00 - 09:00", event: "참가자 집결 및 물품 보관", desc: "행사장 내 물품보관소 이용" },
              { time: "09:00 - 09:30", event: "개회식 및 준비운동", desc: "메인 무대 앞" },
              { time: "09:30", event: "30K 부문 출발", desc: "출발선 대기 및 순차 출발" },
              { time: "10:00", event: "20K 부문 출발", desc: "출발선 대기 및 순차 출발" },
              { time: "10:30", event: "12K 부문 출발", desc: "출발선 대기 및 순차 출발" },
              { time: "14:00 - 15:00", event: "시상식 및 럭키드로우", desc: "각 부문별 시상 및 경품 추첨" },
              { time: "18:00", event: "행사 종료", desc: "안전 귀가" }
            ].map((item, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-4 md:gap-12 py-6 ${i !== 6 ? 'border-b border-black/5' : ''}`}>
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

      {/* Location Section */}
      <section data-section="work-location" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        {/* Toggle */}
        <div className="flex justify-center mb-[30px] pt-4">
            <div className="bg-gray-100 p-1 rounded-full inline-flex border border-black/5">
              <button
                onClick={() => setMapType('course')}
                className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${mapType === 'course' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                코스맵
              </button>
              <button
                onClick={() => setMapType('venue')}
                className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${mapType === 'venue' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                행사장 안내
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center mb-[15px]">오시는길</h2>

          <div className="flex flex-col gap-6">
            {/* Map Placeholder */}
            <div className="bg-gray-50 border border-black/5 rounded-[2rem] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center overflow-hidden relative">
               {mapType === 'course' ? (
                 <div className="text-gray-400 flex flex-col items-center">
                   <MapPin size={48} className="mb-4 opacity-50" />
                   <p className={type.mapPlaceholderText}>Course Map Area</p>
                 </div>
               ) : (
                 <div className="text-gray-400 flex flex-col items-center">
                   <MapPin size={48} className="mb-4 opacity-50" />
                   <p className={type.mapPlaceholderText}>Venue Layout Area</p>
                 </div>
               )}
            </div>

            {/* Details Card (White) */}
            <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5">
              <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
                <div>
                  <h4 className="mb-3">하이원 리조트 잔디광장</h4>
                  <p className={`${type.locationHighlight} m-0`}>강원도 정선군 / High1 Resort</p>
                </div>
                <a
                  data-role="location-map-button"
                  href="https://naver.me/xnOaPnoI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto bg-[#A8FF00] hover:bg-[#95E600] text-black px-10 py-5 rounded-xl typo-h5-bold flex items-center justify-center transition-colors lg:shrink-0"
                >
                  지도보기 <MapPin size={20} className="ml-2" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#A8FF00]"></div>
                    <h5 className="m-0">버스 이용시</h5>
                  </div>
                  <p className={type.locationBody}>
                    고한사북공용버스터미널 하차 후<br/>
                    택시 또는 리조트 셔틀버스 이용<br/>
                    (대회 당일 셔틀 증편 운행)
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#A8FF00]"></div>
                    <h5 className="m-0">자차 이용시</h5>
                  </div>
                  <p className={type.locationBody}>
                    하이원 리조트 마운틴 콘도 주차장<br/>
                    강원도 정선군 고한읍 하이원길 265-1<br/>
                    (대회 참가자 무료 주차 지원)
                  </p>
              </div>
            </div>
          </div>
            </div>
          </div>
      </section>
    </main>
  );
};

export default Overview;
