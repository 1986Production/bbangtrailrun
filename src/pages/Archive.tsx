import AccommodationCalendarSection from "@/src/components/AccommodationCalendarSection";
import {
  AwardsListSection,
  BrandListSection,
  CaseStudiesSection,
  FeaturedProjectsSection,
  InsightsGridSection,
  SouvenirSizeGuideSection,
  TeamShowcaseSection,
} from "@/src/pages/Home";
import { LocationGuideSection } from "@/src/pages/Overview";
import { ServicesSections } from "@/src/pages/Services";

export default function Archive() {
  return (
    <main data-page="archive" className="archive animate-in fade-in duration-1000 bg-white">
      <section
        data-section="archive"
        className="archive layout-pad layout-pad-nav"
      >
        <div data-block="archive-wrap" className="archive-wrap max-w-[80rem] mx-auto">
          <div data-block="archive-title" className="archive-title text-center mb-16">
            <h1 className="tracking-tight text-black mb-4">보관용</h1>
            <p className="font-medium text-gray-600 m-0">
              메인 페이지에서 분리한 보관 섹션을 모아둔 페이지입니다.
            </p>
          </div>
        </div>
      </section>
      <FeaturedProjectsSection />
      <CaseStudiesSection />
      <BrandListSection />
      <TeamShowcaseSection />
      <AwardsListSection />
      <InsightsGridSection />
      <ServicesSections />
      <SouvenirSizeGuideSection />
      <AccommodationCalendarSection />
      <LocationGuideSection />
    </main>
  );
}
