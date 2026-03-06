import React from 'react';
import { notices } from '../data/notices';
import { AccordionItem } from '../components/AccordionItem';

const Notice = () => {
  return (
    <main data-page="notice" className="animate-in fade-in duration-1000 bg-white">
      <section data-section="notice-main" className="page-section page-section-nav">
        <div data-block="notice-container" className="max-w-[80rem] mx-auto">
        <div data-block="notice-header" className="text-center mb-16">
          <h1 className="tracking-tight text-black mb-4">공지사항</h1>
          <p className="font-medium text-gray-600">DashDigital의 새로운 소식과 안내를 확인하세요.</p>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {notices.map((item, i) => (
            <AccordionItem key={i} title={item.title} date={item.date} content={item.content} />
          ))}
        </div>
        </div>
      </section>
    </main>
  );
};

export default Notice;
