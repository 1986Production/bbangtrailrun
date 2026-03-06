import React from 'react';
import { ArrowRight } from 'lucide-react';
import ContactSection from '@/src/components/ContactSection';

export const ServicesSections = () => {
  const services = [
    {
      num: "01",
      title: "Branding",
      desc: "Branding is arguably the most important part of any business. We design brands with memorable identities that cultivate trust and emotional connection.",
      tags: ["Brand Identity", "Creative Direction", "Naming"],
      img: "/images/branding-1200x800.jpg"
    },
    {
      num: "02",
      title: "E-Commerce",
      desc: "We create bespoke E-commerce solutions that are as beautiful as they are functional, and as meaningful as they are profitable.",
      tags: ["Shopify", "UX/UI Design", "Conversion"],
      img: "/images/ecommerce-1200x800.jpg"
    },
    {
      num: "03",
      title: "Websites",
      desc: "We design and develop beautifully crafted and scalable digital experiences with meaningful interactions that drive change.",
      tags: ["React / Next.js", "Webflow", "WebGL / 3D"],
      img: "/images/websites-1200x800.jpg"
    }
  ];
  const aboutArticles = [
    { type: "Article", title: "Why strong brand identity is important in web design", date: "03.02.24", img: "/images/art4-800x600.jpg" },
    { type: "Article", title: "The benefits of aligning your team with business objectives", date: "03.03.24", img: "/images/art5-800x600.jpg" },
    { type: "Interview", title: "Sneaker LAB x New Balance Sneaker Wipes", date: "12.10.21", img: "/images/art6-800x600.jpg" },
  ];
  const aboutTeam = [
    { role: "Founder / MD", name: "Julian Dallamore", img: "/images/julian-600x800.jpg" },
    { role: "UI/UX Designer", name: "Chev Beckley", img: "/images/chev-600x800.jpg" },
    { role: "Founder / CD", name: "Rogan Jansen", img: "/images/rogan-600x800.jpg" },
    { role: "Developer", name: "James Blyth", img: "/images/james-600x800.jpg" },
  ];
  const workProjects = [
    { img: "/images/solar-1200x800.jpg", tags: "Research / Strategy / Design", title: "Enpower" },
    { img: "/images/sneaker1-1200x800.jpg", tags: "Design / Development", title: "Fitsole" },
    { img: "/images/orange-1200x800.jpg", tags: "Strategy / Design", title: "Vana" },
    { img: "/images/sneaker2-1200x800.jpg", tags: "Research / Design", title: "Lemkus" },
    { img: "/images/watch-1200x800.jpg", tags: "Strategy / Design", title: "Timepiece" },
    { img: "/images/bag-1200x800.jpg", tags: "Research / Development", title: "Carry" },
  ];
  const workOverviewCopy = {
    eventName: "빵트레일런",
    eventDate: "2026년 9월 11일(금) - 13일(일)",
    eventTime: "8:00 ~ 18:00",
    venueLine1: "하이원 리조트 잔디광장 및",
    venueLine2: "하늘길 트레킹 코스 일대",
  };
  const workType = {
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

  return (
    <>
      <header
        id="services-sections"
        data-section="services-hero"
        className="px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[80rem] mx-auto text-center"
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

      {/* Services List */}
      <section
        data-section="services-list"
        className="px-6 md:px-12 lg:px-24 pb-32 max-w-[80rem] mx-auto flex flex-col gap-16"
      >
        {services.map((srv, i) => (
          <div key={i} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-black/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
            <div className={`flex flex-col ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <p className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 mb-8 m-0">{srv.num}</p>
              <h2 className="mb-6">{srv.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-10">
                {srv.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                {srv.tags.map((tag, j) => (
                  <p key={j} className="px-4 py-2 rounded-full border border-black/10 text-xs font-medium text-gray-600 m-0">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <div className={`overflow-hidden rounded-[2rem] aspect-[4/3] ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <img src={srv.img} alt={srv.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
            </div>
          </div>
        ))}
      </section>

      {/* Services Unpacked */}
      <section data-section="services-unpacked" className="py-32 bg-black text-white rounded-t-[3rem]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
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

      {/* About Featured Insight */}
      <section data-section="services-about-featured" className="px-6 md:px-12 lg:px-24 pb-24 pt-24 max-w-[80rem] mx-auto">
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

      {/* About Articles Grid */}
      <section data-section="services-about-articles" className="px-6 md:px-12 lg:px-24 pb-32 max-w-[80rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutArticles.map((art, i) => (
            <div key={i} className="flex flex-col group cursor-pointer bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5">
              <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3] mb-6">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="px-2 pb-2">
                <div className="flex items-center gap-3 mb-3">
                  <p className="px-3 py-1 bg-gray-100 rounded-full text-[0.6667rem] uppercase tracking-widest text-gray-600 m-0">{art.type}</p>
                  <p className="text-xs text-gray-500 m-0">{art.date}</p>
                </div>
                <h3 className="leading-snug group-hover:text-gray-500 transition-colors">{art.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Team Section */}
      <section data-section="services-about-team" className="py-24 bg-gray-100">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-16">
            <h2>The Team</h2>
            <p className="text-sm font-medium text-gray-600 m-0">04 Members</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {aboutTeam.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
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

      {/* About Offices */}
      <section data-section="services-about-offices" className="py-24 max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
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

      {/* Featured Project */}
      <section data-section="work-featured" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl shadow-black/5 border border-black/5">
          <div className="overflow-hidden rounded-[2rem] aspect-[16/9] mb-10">
            <img src="/images/featuredwork-1920x1080.jpg" alt="Featured Work" className="w-full h-full object-cover hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
            <div>
              <h3 className="mb-3">Nike Air Max Day</h3>
              <p className={workType.featuredDesc}>
                A complete digital overhaul for the launch of the new Air Max, focusing on interactive 3D elements and seamless e-commerce integration.
              </p>
            </div>
            <button className="mt-8 md:mt-0 inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-black typo-h6-medium hover:bg-gray-200 transition-all">
              View Project <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section data-section="work-projects" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {workProjects.map((project, i) => (
            <div key={i} className={`flex flex-col group cursor-pointer ${i % 2 !== 0 ? 'md:mt-24' : ''}`}>
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

      {/* Event Overview - Bento Box Style */}
      <section data-section="work-overview-bento" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-black/10 pb-8">
          <div>
            <h6 className="mb-3">
              {workOverviewCopy.eventName}
            </h6>
            <h2>대회개요</h2>
          </div>
          <p className={`mt-6 lg:mt-0 ${workType.metaText}`}>
            (주)1986프로덕션 주최/주관
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6">
          <div className="md:col-span-2 lg:col-span-6 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
            <h6 className="mb-4">행사일시</h6>
            <h5 className="m-0 mb-6 leading-snug">
              {workOverviewCopy.eventDate}<br />{workOverviewCopy.eventTime}
            </h5>
            <div className="text-gray-500 space-y-2">
              <p className={workType.overviewBody}>* 참가자의 안전과 쾌적한 코스 환경을 위해 출발시간을 나누어 운영합니다.</p>
              <p className={workType.overviewBody}>* 모든 대회 기념품 및 배번호표는 현장 배부입니다.</p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
            <h6 className="mb-4">행사장소</h6>
            <h5 className="m-0 leading-relaxed mb-4">
              {workOverviewCopy.venueLine1}<br />{workOverviewCopy.venueLine2}
            </h5>
            <p className={`${workType.overviewBody} mt-4`}>
              강원도 정선군 고한읍 하이원길 265-1<br />
              (강원도 정선군 고한읍 고한리 483)
            </p>
          </div>

          <div className="lg:col-span-3 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
            <h6 className="mb-6">참가비</h6>
            <ul className="space-y-4 text-black">
              <li className="flex justify-between items-center border-b border-black/5 pb-3">
                <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">30K</span>
                <h5 className={workType.priceText}>99,000원</h5>
              </li>
              <li className="flex justify-between items-center border-b border-black/5 pb-3">
                <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">20K</span>
                <h5 className={workType.priceText}>89,000원</h5>
              </li>
              <li className="flex justify-between items-center">
                <span className="bg-white border border-black/10 px-3 py-1 rounded-full typo-h6-medium">12K</span>
                <h5 className={workType.priceText}>79,000원</h5>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors">
            <h6 className="mb-6">코스 및 시상</h6>
            <div className="mb-6">
              <span className="block typo-h6-medium text-gray-500 mb-2">코스</span>
              <h5 data-force-ko-heading className={`${workType.priceText} heading-ko`}>30K / 20K / 12K</h5>
            </div>
            <div className="mb-6">
              <span className="block typo-h6-medium text-gray-500 mb-2">시상</span>
              <h5 className={`${workType.priceText} heading-ko`}>30K / 20K 부문 남녀 1위</h5>
            </div>
            <div>
              <span className="block typo-h6-medium text-gray-500 mb-2">UTMB 인덱스</span>
              <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full typo-h6-medium border border-blue-200">20K M</span>
            </div>
          </div>

          <div className="lg:col-span-3 bg-gray-50 p-8 rounded-[2rem] border border-black/5 hover:bg-gray-100 transition-colors flex flex-col justify-center items-center text-center">
            <h6 className="text-orange-600 mb-3">기부 캠페인</h6>
            <h5 className={workType.campaignMessage}>
              강원 지역 내 소외계층<br />아동에게 빵 기부
            </h5>
          </div>
        </div>
      </section>

      {/* Campaign Section - Editorial Split Style */}
      <section data-section="work-campaign-editorial" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h6 className="text-orange-600 mb-4">
                Donation Campaign
              </h6>
              <h2 className="mb-6">
                역대 캠페인
              </h2>
              <p className={`${workType.campaignLead} mb-12`}>
                빵에 진심인 러너들의 따뜻한 여정을 담아,
                <br />
                강원 지역 내 아동복지센터에 전하는 기부 캠페인을 확인하세요.
              </p>

              <div className="bg-orange-50 rounded-3xl p-8 border border-orange-200">
                <div className={`${workType.donationCount} pb-8 mb-6 border-b border-orange-200`}>31,100<span className={workType.donationUnit}>개</span></div>
                <h5 className="m-0 mb-2 text-orange-600">총 기부된 빵(베이커리류) 수</h5>
                <p className={workType.donationNote}>
                  *빵빵런, 커피 빵빵런, 빵트레일런 역대 캠페인
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 flex flex-col">
            {[
              { year: "2025", title: "빵(베이커리류) 기부", amount: "11,000", org: "사단법인 프렌즈 및 대전, 강릉, 정선 지역아동센터" },
              { year: "2024", title: "빵(베이커리류) 기부", amount: "10,000", org: "사단법인 프렌즈 및 대전, 정선 지역아동센터" },
              { year: "2023", title: "빵(베이커리류) 기부", amount: "4,000", org: "사단법인 프렌즈 및 서울 지역아동센터" },
              { year: "2022", title: "빵 기부", amount: "3,300", org: "사단법인 프렌즈 및 서울 지역아동센터" },
              { year: "2021", title: "빵(베이커리류) 기부", amount: "2,800", org: "사단법인 프렌즈 및 서울 지역아동센터" }
            ].map((item, i) => (
              <div key={i} className={`py-10 border-t border-black/10 flex flex-col md:flex-row gap-6 md:gap-12 ${i === 4 ? 'border-b' : ''}`}>
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

      <ContactSection />
    </>
  );
};

const Services = () => {
  return (
    <main data-page="services" className="animate-in fade-in duration-1000 bg-white pt-32">
      <ServicesSections />
    </main>
  );
};

export default Services;
