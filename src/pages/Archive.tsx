"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import AccommodationCalendarSection from "@/src/components/AccommodationCalendarSection";
import ServicesContactSection from "@/src/components/ContactSection";

const archiveFrameClassName = "layout-frame";
const archiveBorderFrameClassName = "layout-frame-border";

const archiveFeaturedProjects = [
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

const archiveConveniences = [
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

const archiveBrands = [
  "Woolworths",
  "Sneaker LAB",
  "HKLM",
  "Digital Liquorice",
  "Batoka Hospitality",
  "Sendmarc",
  "Vana",
  "Fairways to Africa",
];

const archiveTeam = [
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

const archiveAwards = [
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

const archiveInsights = [
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

const archiveSizeChartRows = [
  { size: "S", chest: "48", length: "65.5" },
  { size: "M", chest: "50.5", length: "66.5" },
  { size: "L", chest: "53", length: "69" },
  { size: "XL", chest: "60", length: "72" },
  { size: "2XL", chest: "63", length: "74" },
];

const archiveWorkOverviewCopy = {
  eventName: "빵트레일런",
  eventDate: "2026년 9월 11일(금) - 13일(일)",
  eventTime: "8:00 ~ 18:00",
  venueLine1: "하이원 리조트 잔디광장 및",
  venueLine2: "하늘길 트레킹 코스 일대",
};

const archiveWorkType = {
  overviewBody: "m-0 typo-h6-medium text-gray-500",
  priceText: "m-0 text-[#181818]",
  metaText: "text-gray-500 typo-h6-medium text-left lg:text-right",
  campaignLead: "m-0 typo-body-medium text-[#181818]",
  campaignMessage: "m-0",
  donationCount: "typo-h2-black text-orange-600",
  donationUnit: "typo-h5",
  donationNote: "m-0 typo-h6-medium text-orange-600",
  featuredDesc: "m-0 max-w-[36rem]",
};

const archiveWorkProjects = [
  {
    img: "/images/side-program-awards-ceremony.jpeg",
    tags: "Research / Strategy / Design",
    title: "시상식",
    desc: "30K·20K 요일별 남녀 1위 시상식",
  },
  {
    img: "/images/side-program-opening-session.jpeg",
    tags: "Design / Development",
    title: "오프닝 세션",
    desc: "국가대표에게 배우는 트레일런 꿀팁",
  },
  {
    img: "/images/side-program-bbanglympics.jpeg",
    tags: "Strategy / Design",
    title: "빵림픽",
    desc: "잔디광장에서 즐기는 몸풀기 게임",
  },
  {
    img: "/images/side-program-photo-zone.jpeg",
    tags: "Research / Design",
    title: "포토존",
    desc: "귀여운 빵 소품과 함께 찍는 포토존",
  },
  { img: "/images/watch-1200x800.jpg", tags: "Strategy / Design", title: "Timepiece" },
  { img: "/images/bag-1200x800.jpg", tags: "Research / Development", title: "Carry" },
];

const archiveServiceCards = [
  {
    num: "01",
    title: "Branding",
    desc: "Branding is arguably the most important part of any business. We design brands with memorable identities that cultivate trust and emotional connection.",
    tags: ["Brand Identity", "Creative Direction", "Naming"],
    img: "/images/branding-1200x800.jpg",
  },
  {
    num: "02",
    title: "E-Commerce",
    desc: "We create bespoke E-commerce solutions that are as beautiful as they are functional, and as meaningful as they are profitable.",
    tags: ["Shopify", "UX/UI Design", "Conversion"],
    img: "/images/ecommerce-1200x800.jpg",
  },
  {
    num: "03",
    title: "Websites",
    desc: "We design and develop beautifully crafted and scalable digital experiences with meaningful interactions that drive change.",
    tags: ["React / Next.js", "Webflow", "WebGL / 3D"],
    img: "/images/websites-1200x800.jpg",
  },
];

const archiveServiceArticles = [
  { type: "Article", title: "Why strong brand identity is important in web design", date: "03.02.24", img: "/images/art4-800x600.jpg" },
  { type: "Article", title: "The benefits of aligning your team with business objectives", date: "03.03.24", img: "/images/art5-800x600.jpg" },
  { type: "Interview", title: "Sneaker LAB x New Balance Sneaker Wipes", date: "12.10.21", img: "/images/art6-800x600.jpg" },
];

const archiveServiceTeam = [
  { role: "Founder / MD", name: "Julian Dallamore", img: "/images/julian-600x800.jpg" },
  { role: "UI/UX Designer", name: "Chev Beckley", img: "/images/chev-600x800.jpg" },
  { role: "Founder / CD", name: "Rogan Jansen", img: "/images/rogan-600x800.jpg" },
  { role: "Developer", name: "James Blyth", img: "/images/james-600x800.jpg" },
];

const archiveCampaignHistory = [
  { year: "2025", title: "빵(베이커리류) 기부", amount: "11,000", org: "사단법인 프렌즈 및 대전, 강릉, 정선 지역아동센터" },
  { year: "2024", title: "빵(베이커리류) 기부", amount: "10,000", org: "사단법인 프렌즈 및 대전, 정선 지역아동센터" },
  { year: "2023", title: "빵(베이커리류) 기부", amount: "4,000", org: "사단법인 프렌즈 및 서울 지역아동센터" },
  { year: "2022", title: "빵 기부", amount: "3,300", org: "사단법인 프렌즈 및 서울 지역아동센터" },
  { year: "2021", title: "빵(베이커리류) 기부", amount: "2,800", org: "사단법인 프렌즈 및 서울 지역아동센터" },
];

const archiveLocationType = {
  mapPlaceholderText: "m-0 typo-h6-label",
  locationHighlight: "m-0 typo-body-bold text-[#A8FF00]",
  locationBody: "m-0 typo-h6-medium text-neutral-700",
};

const ArchiveFeaturedProjectsSection = () => (
  <section data-section="featured-projects" className={`featured-projects ${archiveFrameClassName} bg-gray-100`}>
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
        {archiveFeaturedProjects.map((item, index) => (
          <div
            key={item.title}
            className={`flex flex-col group cursor-pointer ${
              index === 1 ? "md:mt-16" : ""
            } ${index === 2 ? "lg:mt-32" : ""}`}
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

const ArchiveCaseStudiesSection = () => (
  <section data-section="cases" className={`cases ${archiveBorderFrameClassName}`}>
    <div data-block="cases-wrap" className="cases-wrap grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-1">
        <h2>편의 시설</h2>
      </div>
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
        {archiveConveniences.map((item) => (
          <div
            key={item.name}
            className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5"
          >
            <h4 className="text-black mb-4">{item.name}</h4>
            <p className="m-0 whitespace-pre-line">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ArchiveBrandListSection = () => (
  <section data-section="brands" className={`brands ${archiveFrameClassName} bg-black text-white`}>
    <div data-block="brands-wrap" className="brands-wrap">
      <h2 className="mb-16 text-center">함께한 브랜드</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {archiveBrands.map((brand) => (
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

const ArchiveTeamShowcaseSection = () => (
  <section data-section="team" className={`team ${archiveBorderFrameClassName}`}>
    <div data-block="team-wrap" className="team-wrap">
      <div className="flex justify-between items-end mb-16">
        <h2>팀 소개</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {archiveTeam.map((member) => (
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

const ArchiveAwardsListSection = () => (
  <section data-section="awards" className={`awards ${archiveFrameClassName} bg-gray-100`}>
    <div data-block="awards-wrap" className="awards-wrap grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-1">
        <h2>수상 및 성과</h2>
      </div>
      <div className="lg:col-span-3 flex flex-col gap-6">
        {archiveAwards.map((award) => (
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

const ArchiveInsightsGridSection = () => (
  <section data-section="insights" className={`insights ${archiveBorderFrameClassName}`}>
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
        {archiveInsights.map((article) => (
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

const ArchiveProjectGallerySection = () => (
  <section data-section="projects" className="projects layout-pad-bottom">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {archiveWorkProjects.map((project, index) => (
        <div key={project.title} className={`flex flex-col group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
          <div className="overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 shadow-xl shadow-black/5">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className="flex justify-between items-center px-2">
            <h3 className="m-0">{project.title}</h3>
            <h6 className="m-0">{project.tags}</h6>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ArchiveServicesEventOverviewSection = () => (
  <section data-section="services-overview" className="services-overview layout-pad-bottom">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-black/10 pb-8">
      <div>
        <h6 className="mb-3">{archiveWorkOverviewCopy.eventName}</h6>
        <h2>대회개요</h2>
      </div>
      <p className={`mt-6 lg:mt-0 ${archiveWorkType.metaText}`}>
        (주)1986프로덕션 주최/주관
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6">
      <div className="md:col-span-2 lg:col-span-6 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
        <h6 className="mb-4">행사일시</h6>
        <h5 className="m-0 mb-6 leading-snug">
          {archiveWorkOverviewCopy.eventDate}<br />{archiveWorkOverviewCopy.eventTime}
        </h5>
        <div className="text-gray-500 space-y-2">
          <p className={archiveWorkType.overviewBody}>* 참가자의 안전과 쾌적한 코스 환경을 위해 출발시간을 나누어 운영합니다.</p>
          <p className={archiveWorkType.overviewBody}>* 모든 대회 기념품 및 배번호표는 현장 배부입니다.</p>
        </div>
      </div>

      <div className="lg:col-span-4 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
        <h6 className="mb-4">행사장소</h6>
        <h5 className="m-0 leading-relaxed mb-4">
          {archiveWorkOverviewCopy.venueLine1}<br />{archiveWorkOverviewCopy.venueLine2}
        </h5>
        <p className={`${archiveWorkType.overviewBody} mt-4`}>
          강원도 정선군 고한읍 하이원길 265-1<br />
          (강원도 정선군 고한읍 고한리 483)
        </p>
      </div>

      <div className="lg:col-span-3 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
        <h6 className="mb-6">참가비</h6>
        <ul className="space-y-4 text-black">
          <li className="flex justify-between items-center border-b border-black/5 pb-3">
            <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">30K</span>
            <h5 className={archiveWorkType.priceText}>99,000원</h5>
          </li>
          <li className="flex justify-between items-center border-b border-black/5 pb-3">
            <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">20K</span>
            <h5 className={archiveWorkType.priceText}>89,000원</h5>
          </li>
          <li className="flex justify-between items-center">
            <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">12K</span>
            <h5 className={archiveWorkType.priceText}>79,000원</h5>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-4 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
        <h6 className="mb-6">코스 및 시상</h6>
        <div className="mb-6">
          <span className="block typo-h6-medium text-gray-500 mb-2">코스</span>
          <h5 data-force-ko-heading className={`${archiveWorkType.priceText} heading-ko`}>30K / 20K / 12K</h5>
        </div>
        <div className="mb-6">
          <span className="block typo-h6-medium text-gray-500 mb-2">시상</span>
          <h5 className={`${archiveWorkType.priceText} heading-ko`}>30K / 20K 부문 남녀 1위</h5>
        </div>
        <div>
          <span className="block typo-h6-medium text-gray-500 mb-2">UTMB 인덱스</span>
          <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full typo-h6-medium border border-blue-200">20K M</span>
        </div>
      </div>

      <div className="lg:col-span-3 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors flex flex-col justify-center items-center text-center">
        <h6 className="text-orange-600 mb-3">기부 캠페인</h6>
        <h5 className={archiveWorkType.campaignMessage}>
          강원 지역 내 소외계층<br />아동에게 빵 기부
        </h5>
      </div>
    </div>
  </section>
);

const ArchiveServicesSections = () => (
  <>
    <header
      id="services-sections"
      data-section="services-hero"
      className="services-hero layout-pad layout-pad-nav text-center"
    >
      <p className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-widest mb-8 m-0">
        Expertise
      </p>
      <h1 className="tracking-tighter leading-none text-black mb-8">
        Our Services
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Transforming ideas into digital experiences. Creatively driven, solution orientated.
      </p>
    </header>

    <section data-section="services-cards" className="services-cards layout-pad-bottom flex flex-col gap-16">
      {archiveServiceCards.map((item, index) => (
        <div key={item.num} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-black/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
          <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
            <p className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 mb-8 m-0">{item.num}</p>
            <h2 className="mb-6">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-10">{item.desc}</p>
            <div className="flex flex-wrap gap-3">
              {item.tags.map((tag) => (
                <p key={tag} className="px-4 py-2 rounded-full border border-black/10 text-xs font-medium text-gray-600 m-0">
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className={`overflow-hidden rounded-[2rem] aspect-[4/3] ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
            <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
        </div>
      ))}
    </section>

    <section data-section="services-capabilities" className="services-capabilities layout-band bg-black text-white rounded-t-[3rem]">
      <div className="layout-shell">
        <h2 className="mb-20 text-center">Services Unpacked</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="bg-gray-900 p-8 rounded-[2rem]">
            <h6 className="text-gray-400 mb-6 border-b border-white/10 pb-4">01 / Research</h6>
            <ul className="text-sm font-medium text-white/80 space-y-4">
              <li>Customer Research</li>
              <li>Trends Analysis</li>
              <li>Competitor Review</li>
              <li>Usability Testing</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-[2rem]">
            <h6 className="text-gray-400 mb-6 border-b border-white/10 pb-4">02 / Strategy</h6>
            <ul className="text-sm font-medium text-white/80 space-y-4">
              <li>Brand Positioning</li>
              <li>Brand Naming</li>
              <li>Target Audience</li>
              <li>Journey Mapping</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-[2rem]">
            <h6 className="text-gray-400 mb-6 border-b border-white/10 pb-4">03 / Design</h6>
            <ul className="text-sm font-medium text-white/80 space-y-4">
              <li>Art Direction</li>
              <li>Brand Identity</li>
              <li>UI/UX Design</li>
              <li>Prototyping</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-[2rem]">
            <h6 className="text-gray-400 mb-6 border-b border-white/10 pb-4">04 / Dev</h6>
            <ul className="text-sm font-medium text-white/80 space-y-4">
              <li>React / Next.js</li>
              <li>Shopify / Webflow</li>
              <li>WebGL / 3D</li>
              <li>Performance SEO</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section data-section="services-article" className="services-article layout-pad">
      <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5 group cursor-pointer">
        <div className="overflow-hidden rounded-[2rem] aspect-[16/9] mb-10">
          <img src="/images/featuredinsight-1920x1080.jpg" alt="Featured Insight" className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <p className="px-3 py-1 bg-gray-100 rounded-full text-[0.6667rem] uppercase tracking-widest text-gray-600 m-0">Article</p>
              <p className="text-xs text-gray-500 m-0">03.04.24</p>
            </div>
            <h2 className="group-hover:text-gray-600 transition-colors">The future of digital experiences in a post-screen world</h2>
          </div>
          <button className="mt-8 md:mt-0 inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all whitespace-nowrap">
            Read Article <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>

    <section data-section="services-articles" className="services-articles layout-pad-bottom">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {archiveServiceArticles.map((article) => (
          <div key={article.title} className="flex flex-col group cursor-pointer bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5">
            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-6">
              <img src={article.img} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="px-2 pb-2">
              <div className="flex items-center gap-3 mb-3">
                <p className="px-3 py-1 bg-gray-100 rounded-full text-[0.6667rem] uppercase tracking-widest text-gray-600 m-0">{article.type}</p>
                <p className="text-xs text-gray-500 m-0">{article.date}</p>
              </div>
              <h3 className="leading-snug group-hover:text-gray-500 transition-colors">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section data-section="services-team" className="services-team layout-band bg-gray-100">
      <div className="layout-shell">
        <div className="flex justify-between items-end mb-16">
          <h2>The Team</h2>
          <p className="text-sm font-medium text-gray-600 m-0">04 Members</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {archiveServiceTeam.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-full aspect-square rounded-full overflow-hidden mb-5 border-4 border-white group-hover:border-gray-200 transition-colors duration-500">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="mb-1">{member.name}</h3>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section data-section="services-offices" className="services-offices layout-pad">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="mb-6">Offices</h2>
          <p className="font-medium leading-relaxed text-gray-600">
            Two offices on two continents and a global network of creative experts collaborating from all across the world.
          </p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5 flex flex-col group">
            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-6">
              <img src="/images/london-800x600.jpg" alt="London Office" className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="px-4 pb-4 flex justify-between items-center">
              <h3 className="text-black">London</h3>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">03:36:27 AM</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5 flex flex-col group">
            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-6">
              <img src="/images/capetown-800x600.jpg" alt="Cape Town Office" className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="px-4 pb-4 flex justify-between items-center">
              <h3 className="text-black">Cape Town</h3>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">05:36:27 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section data-section="services-project" className="services-project layout-pad-bottom">
      <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5">
        <div className="overflow-hidden rounded-[2rem] aspect-[16/9] mb-10">
          <img src="/images/featuredwork-1920x1080.jpg" alt="Featured Work" className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
          <div>
            <h3 className="mb-3">Nike Air Max Day</h3>
            <p className={archiveWorkType.featuredDesc}>
              A complete digital overhaul for the launch of the new Air Max, focusing on interactive 3D elements and seamless e-commerce integration.
            </p>
          </div>
          <button className="mt-8 md:mt-0 inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-black typo-h6-medium hover:bg-gray-200 transition-all">
            View Project <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>

    <ArchiveProjectGallerySection />

    <ArchiveServicesEventOverviewSection />

    <section data-section="services-campaign" className="services-campaign layout-pad-bottom">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <h6 className="text-orange-600 mb-4">Donation Campaign</h6>
            <h2 className="mb-6">역대 캠페인</h2>
            <p className={`${archiveWorkType.campaignLead} mb-12`}>
              빵에 진심인 러너들의 따뜻한 여정을 담아,
              <br />
              강원 지역 내 아동복지센터에 전하는 기부 캠페인을 확인하세요.
            </p>

            <div className="bg-orange-50 rounded-3xl p-8 border border-orange-200">
              <div className={`${archiveWorkType.donationCount} pb-8 mb-6 border-b border-orange-200`}>31,100<span className={archiveWorkType.donationUnit}>개</span></div>
              <h5 className="m-0 mb-2 text-orange-600">총 기부된 빵(베이커리류) 수</h5>
              <p className={archiveWorkType.donationNote}>
                *빵빵런, 커피 빵빵런, 빵트레일런 역대 캠페인
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          {archiveCampaignHistory.map((item, index) => (
            <div key={item.year} className={`py-10 border-t border-black/10 flex flex-col md:flex-row gap-6 md:gap-12 ${index === archiveCampaignHistory.length - 1 ? 'border-b' : ''}`}>
              <div className="md:w-1/4">
                <h4 className="m-0 typo-h4 text-black">{item.year}</h4>
              </div>
              <div className="md:w-3/4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h5 className="m-0">{item.title}</h5>
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full typo-h6-bold text-orange-600 w-fit ${
                      item.amount === "4,000"
                        ? "bg-white border border-orange-200"
                        : "bg-orange-50 border border-orange-200"
                    }`}
                  >
                    총 {item.amount}개
                  </span>
                </div>
                <p className="m-0 typo-body-medium">
                  {item.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ServicesContactSection />
  </>
);

const ArchiveSouvenirSizeGuideSection = () => {
  const maxChest = Math.max(...archiveSizeChartRows.map((row) => Number(row.chest)));
  const maxLength = Math.max(...archiveSizeChartRows.map((row) => Number(row.length)));

  return (
    <section data-section="souvenir-size" className={`souvenir-size ${archiveBorderFrameClassName} bg-gray-50`}>
      <div data-block="souvenir-size-wrap" className="souvenir-size-wrap">
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
                  {archiveSizeChartRows.map((row) => (
                    <tr
                      key={`archive-base-${row.size}`}
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
                  {archiveSizeChartRows.map((row) => (
                    <tr key={`archive-alt-${row.size}`} className="border-t border-gray-200">
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
                {archiveSizeChartRows.map((row) => (
                  <div
                    key={`archive-card-${row.size}`}
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
                {archiveSizeChartRows.map((row) => (
                  <div
                    key={`archive-bar-${row.size}`}
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
                {archiveSizeChartRows.map((row) => (
                  <div
                    key={`archive-list-${row.size}`}
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

const ArchiveLocationGuideSection = () => {
  const [mapType, setMapType] = useState<'course' | 'venue'>('course');

  return (
    <section data-section="location" className="location layout-frame">
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

      <h2 className="text-center mb-[15px]">오시는길</h2>

      <div className="flex flex-col gap-6">
        <div className="bg-gray-50 border border-black/5 rounded-[2rem] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center overflow-hidden relative">
          {mapType === 'course' ? (
            <div className="text-gray-400 flex flex-col items-center">
              <MapPin size={48} className="mb-4 opacity-50" />
              <p className={archiveLocationType.mapPlaceholderText}>Course Map Area</p>
            </div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <MapPin size={48} className="mb-4 opacity-50" />
              <p className={archiveLocationType.mapPlaceholderText}>Venue Layout Area</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-black/5">
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
              <div>
                <h4 className="mb-3">하이원 리조트 잔디광장</h4>
                <p className={`${archiveLocationType.locationHighlight} m-0`}>강원도 정선군 / High1 Resort</p>
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
                <p className={archiveLocationType.locationBody}>
                  고한사북공용버스터미널 하차 후<br />
                  택시 또는 리조트 셔틀버스 이용<br />
                  (대회 당일 셔틀 증편 운행)
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#A8FF00]"></div>
                  <h5 className="m-0">자차 이용시</h5>
                </div>
                <p className={archiveLocationType.locationBody}>
                  하이원 리조트 마운틴 콘도 주차장<br />
                  강원도 정선군 고한읍 하이원길 265-1<br />
                  (대회 참가자 무료 주차 지원)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Archive() {
  return (
    <main data-page="archive" className="archive animate-in fade-in duration-1000 bg-white">
      <section data-section="archive" className="archive layout-pad layout-pad-nav">
        <div data-block="archive-wrap" className="archive-wrap max-w-[80rem] mx-auto">
          <div data-block="archive-title" className="archive-title text-center mb-16">
            <h1 className="tracking-tight text-black mb-4">보관용</h1>
            <p className="font-medium text-gray-600 m-0">
              메인 페이지에서 분리한 보관 섹션을 모아둔 페이지입니다.
            </p>
          </div>
        </div>
      </section>
      <ArchiveFeaturedProjectsSection />
      <ArchiveCaseStudiesSection />
      <ArchiveBrandListSection />
      <ArchiveTeamShowcaseSection />
      <ArchiveAwardsListSection />
      <ArchiveInsightsGridSection />
      <ArchiveServicesSections />
      <ArchiveSouvenirSizeGuideSection />
      <AccommodationCalendarSection />
      <ArchiveLocationGuideSection />
    </main>
  );
}
