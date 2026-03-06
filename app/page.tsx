import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AccordionItem } from "@/src/components/AccordionItem";
import { notices } from "@/src/data/notices";
import { ServicesSections } from "@/src/pages/Services";

const Hero = () => (
  <header
    data-section="home-hero"
    className="pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-[80rem] mx-auto"
  >
    <p className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-widest mb-8 m-0">
      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
      Boutique Digital Agency
    </p>
    <h1 className="tracking-tight leading-[0.95] text-black mb-4">
      Crafting digital
      <br />
      experiences with <em className="italic text-gray-400">soul.</em>
    </h1>
    <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
      <p className="text-gray-600 max-w-xl leading-relaxed">
        We blend strategic thinking with organic design to create meaningful
        connections between brands and people.
      </p>
      <Link
        href="/#services-sections"
        className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-500 group"
      >
        <p className="text-sm font-medium m-0">Explore</p>
        <ArrowRight
          size={16}
          className="ml-2 transform group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  </header>
);

const SelectedWork = () => {
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
    <section data-section="home-work" className="page-section bg-gray-100">
      <div data-block="work-container" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2>Selected Work</h2>
          <Link
            href="/overview"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors mt-6 md:mt-0 flex items-center border-b border-gray-400/30 pb-1"
          >
            View All Projects <ArrowRight size={16} className="ml-2" />
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

const AboutSnippet = () => (
  <section data-section="home-about" className="page-section max-w-[80rem] mx-auto text-center">
    <Sparkles size={32} className="text-gray-400 mx-auto mb-8" />
    <h2 className="leading-tight mb-10">
      An international digital design studio reimagining how people connect with
      brands. We create work we're proud of for people and brands we believe in.
    </h2>
    <Link
      href="/#services-sections"
      className="inline-flex items-center text-sm font-medium text-black border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
    >
      Discover Our Story <ArrowRight size={16} className="ml-2" />
    </Link>
  </section>
);

const Clients = () => {
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
    <section data-section="home-clients" className="page-section border-t border-black/10">
      <div
        data-block="clients-container"
        className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-4 gap-12"
      >
        <div className="lg:col-span-1">
          <h2>
            Featured
            <br />
            Clients
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

const Brands = () => {
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
    <section data-section="home-brands" className="page-section bg-black text-white">
      <div data-block="brands-container" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="mb-16 text-center">Brands We've Worked With</h2>
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

const Team = () => {
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
    <section data-section="home-team" className="page-section border-t border-black/10">
      <div data-block="team-container" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-16">
          <h2>The Team</h2>
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

const Awards = () => {
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
    <section data-section="home-awards" className="page-section bg-gray-100">
      <div
        data-block="awards-container"
        className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-4 gap-12"
      >
        <div className="lg:col-span-1">
          <h2>Recognition</h2>
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

const NewsAnnouncements = () => (
  <section data-section="home-news" className="page-section border-t border-black/10 bg-gray-50">
    <div data-block="news-container" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-end mb-16">
        <h2>News & Announcements</h2>
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

const Articles = () => {
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
    <section data-section="home-articles" className="page-section border-t border-black/10">
      <div data-block="articles-container" className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-16">
          <h2>Latest Thinking</h2>
          <Link
            href="/insights"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center border-b border-gray-400/30 pb-1"
          >
            View All Articles <ArrowRight size={16} className="ml-2" />
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

const HomeSouvenirsMovedSection = () => {
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
      data-section="home-souvenirs-moved"
      className="page-section border-t border-black/10 bg-gray-50"
    >
      <div
        data-block="home-souvenirs-moved-container"
        className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24"
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
                  <div key={`home-list-${row.size}`} className="py-4 grid grid-cols-[64px_1fr] sm:grid-cols-[72px_1fr] items-center gap-3 sm:gap-4">
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

export default function HomePage() {
  return (
    <main data-page="home" className="animate-in fade-in duration-1000">
      <Hero />
      <SelectedWork />
      <AboutSnippet />
      <Clients />
      <Brands />
      <Team />
      <Awards />
      <NewsAnnouncements />
      <Articles />
      <ServicesSections />
      <HomeSouvenirsMovedSection />
    </main>
  );
}
