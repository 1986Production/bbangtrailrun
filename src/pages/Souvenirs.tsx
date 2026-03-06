import React from 'react';

const Souvenirs = () => {
  const sizeChartRows = [
    { size: 'S', chest: '48', length: '65.5' },
    { size: 'M', chest: '50.5', length: '66.5' },
    { size: 'L', chest: '53', length: '69' },
    { size: 'XL', chest: '60', length: '72' },
    { size: '2XL', chest: '63', length: '74' }
  ];

  return (
    <main data-page="souvenirs" className="animate-in fade-in duration-1000 bg-white">
      <section data-section="souvenirs-main" className="page-section page-section-nav">
        <div data-block="souvenirs-container" className="max-w-[80rem] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-[30px]">
          <h1 className="tracking-tight text-black mb-4">참가자 기념품</h1>
          <p>기념품은 일부 변경될 수 있습니다.</p>
        </div>

        {/* T-Shirt Section */}
        <div data-block="souvenirs-tshirt" className="mb-20">
          {/* Single Full-Width Image Box */}
          <div className="bg-[#FFF9E6] rounded-[2rem] mb-[30px] overflow-hidden border border-orange-50/50 aspect-[16/9] md:aspect-[21/9] relative group">
            <img 
              src="/images/tshirt-official-1200x600.jpg" 
              alt="Official T-shirt" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Info & Size Chart Split */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Info */}
            <div className="flex-1">
              <h3 className="mb-4">공식 티셔츠</h3>
              <p className="text-gray-800 mb-[15px] leading-relaxed font-medium">
                참가자 전원에게 제공되는 빵트레일런 공식 티셔츠입니다.<br/>
                남녀 공용 사이즈이며, 기능성 폴리에스테르 재질입니다.
              </p>
              <div className="space-y-3">
                <p className="m-0 typo-h6-medium text-gray-500">* 본 이미지는 시안이며, 추후 변경될 수 있습니다.</p>
                <p className="m-0 typo-h6-medium text-gray-500">* 실측 사이즈는 단면 길이(cm)이며 측정 방식에 따라 오차가 발생할 수 있습니다.</p>
              </div>
            </div>

            {/* Right: Size Chart */}
            <div className="flex-1">
              <div className="flex justify-center pb-[15px]">
                <img 
                  src="/images/티셔츠-사이즈표.png" 
                  alt="Size Chart Guide" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full font-[var(--font-body)] text-[var(--fs-body)] leading-[var(--leading-default)]">
                  {sizeChartRows.map((row) => (
                    <div
                      key={`badge-${row.size}`}
                      className="w-full flex items-center justify-between gap-3 rounded-[2rem] border border-black/5 bg-white p-[10.8px] pr-[13.34px]"
                    >
                      <span className="inline-flex items-center justify-center w-[36.8px] h-[36.8px] rounded-full bg-[#6000FF] text-white font-bold">
                        {row.size}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">A</span>
                        <span className="font-semibold text-black">{row.chest}cm</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">B</span>
                        <span className="font-semibold text-black">{row.length}cm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Other Souvenirs Grid */}
        <div data-block="souvenirs-items" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Bib & Chip */}
          <div className="bg-[#F5F5F5] rounded-[2rem] p-10 flex flex-col items-center text-center border border-black/5 hover:bg-gray-100 transition-colors group">
            <h4 className="text-black mb-8">배번호표 & 기록칩</h4>
            <div className="flex-grow flex items-center justify-center mb-8 w-full">
              <img 
                src="/images/bib-400x300.jpg" 
                alt="Bib Number" 
                className="w-full max-w-[260px] object-contain drop-shadow-md rounded-xl group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-gray-400 m-0 font-medium">* 디자인은 곧 공개됩니다 *</p>
          </div>

          {/* Medal */}
          <div className="bg-[#F5F5F5] rounded-[2rem] p-10 flex flex-col items-center text-center border border-black/5 hover:bg-gray-100 transition-colors group">
            <h4 className="text-black mb-8">완주메달</h4>
            <div className="flex-grow flex items-center justify-center mb-8 w-full">
              <img 
                src="/images/medal-300x350.jpg" 
                alt="Finisher Medal" 
                className="w-full max-w-[160px] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-gray-400 m-0 font-medium">* 디자인은 곧 공개됩니다 *</p>
          </div>

          {/* Jeju Bread */}
          <div className="bg-[#F5F5F5] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center border border-black/5 hover:bg-gray-100 transition-colors aspect-square md:aspect-auto md:h-[350px]">
            <h4 className="text-black mb-8">제주 빵</h4>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-8xl md:text-9xl font-black text-gray-300 m-0">?</p>
            </div>
          </div>

          {/* Veggie Package */}
          <div className="bg-[#F5F5F5] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center border border-black/5 hover:bg-gray-100 transition-colors aspect-square md:aspect-auto md:h-[350px]">
            <h4 className="text-black mb-8">구좌 야채 꾸러미</h4>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-8xl md:text-9xl font-black text-gray-300 m-0">?</p>
            </div>
          </div>
        </div>

        {/* More Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-400 font-bold hover:border-gray-300 hover:text-gray-600 transition-colors">
            + and more
          </button>
        </div>

        </div>
      </section>
    </main>
  );
};

export default Souvenirs;
