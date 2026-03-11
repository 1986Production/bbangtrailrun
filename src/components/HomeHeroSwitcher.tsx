"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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

const HomeHeroSwitcher = () => {
  const [selectedHeroId, setSelectedHeroId] = useState(heroOptions[0].id);
  const selectedHero = heroOptions.find((option) => option.id === selectedHeroId) ?? heroOptions[0];

  return (
    <>
      <header
        data-section="home-hero-visual"
        className="pb-24 relative left-1/2 w-screen -translate-x-1/2"
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

      <section
        data-section="home-hero"
        className="pb-24 px-6 md:px-12 lg:px-24 max-w-[80rem] mx-auto"
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

        <div className="flex justify-center mb-[30px] pt-4">
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
      </section>
    </>
  );
};

export default HomeHeroSwitcher;
