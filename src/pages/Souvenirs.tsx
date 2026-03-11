"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus, Search, X } from 'lucide-react';

type SafariGestureEvent = Event & {
  scale: number;
};

const Souvenirs = () => {
  const tshirtMockupOptions = [
    { id: 'mockup-1', label: '1안', src: '/images/tshirt-mockup-v1.png' },
    { id: 'mockup-2', label: '2안', src: '/images/tshirt-mockup-v3.png' },
    { id: 'mockup-3', label: '3안', src: '/images/tshirt-mockup-v2.png' }
  ];
  const previewZoomStep = 0.25;
  const previewZoomMin = 1;
  const previewZoomMax = 2;
  const sizeChartRows = [
    { size: 'S', chest: '48', length: '65.5' },
    { size: 'M', chest: '50.5', length: '66.5' },
    { size: 'L', chest: '53', length: '69' },
    { size: 'XL', chest: '60', length: '72' },
    { size: '2XL', chest: '63', length: '74' }
  ];
  const [selectedTshirtMockupId, setSelectedTshirtMockupId] = useState(tshirtMockupOptions[0].id);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(previewZoomMin);
  const [previewViewportSize, setPreviewViewportSize] = useState({ width: 0, height: 0 });
  const [previewImageSize, setPreviewImageSize] = useState({ width: 0, height: 0 });
  const [isPreviewDragging, setIsPreviewDragging] = useState(false);
  const previewViewportRef = useRef<HTMLDivElement | null>(null);
  const previewZoomRef = useRef(previewZoomMin);
  const previewGestureStartZoomRef = useRef(previewZoomMin);
  const previewContentSizeRef = useRef({ width: 0, height: 0 });
  const previewDragStateRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  const clampPreviewZoom = (zoomValue: number) =>
    Math.min(previewZoomMax, Math.max(previewZoomMin, Number(zoomValue.toFixed(2))));
  const selectedTshirtMockup =
    tshirtMockupOptions.find((option) => option.id === selectedTshirtMockupId) ?? tshirtMockupOptions[0];
  const tshirtMockupSrc = selectedTshirtMockup.src;

  useEffect(() => {
    previewZoomRef.current = previewZoom;
  }, [previewZoom]);

  useEffect(() => {
    setPreviewImageSize({ width: 0, height: 0 });
    previewContentSizeRef.current = { width: 0, height: 0 };
  }, [tshirtMockupSrc]);

  useEffect(() => {
    if (!isPreviewOpen) {
      document.body.style.removeProperty('overflow');
      setPreviewZoom(previewZoomMin);
      setPreviewViewportSize({ width: 0, height: 0 });
      setIsPreviewDragging(false);
      previewContentSizeRef.current = { width: 0, height: 0 };
      previewDragStateRef.current = {
        active: false,
        pointerId: -1,
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
      };
      return;
    }

    const previewViewportElement = previewViewportRef.current;

    if (!previewViewportElement) {
      return;
    }

    const updatePreviewViewportSize = () => {
      setPreviewViewportSize({
        width: previewViewportElement.clientWidth,
        height: previewViewportElement.clientHeight
      });
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPreviewOpen(false);
      }
    };

    const handlePreviewWheelZoom = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      event.preventDefault();
      setPreviewZoom((currentZoom) => clampPreviewZoom(currentZoom + (-event.deltaY * 0.01)));
    };

    const handlePreviewGestureStart = (event: Event) => {
      const gestureEvent = event as SafariGestureEvent;

      gestureEvent.preventDefault();
      previewGestureStartZoomRef.current = previewZoomRef.current;
    };

    const handlePreviewGestureChange = (event: Event) => {
      const gestureEvent = event as SafariGestureEvent;

      gestureEvent.preventDefault();
      setPreviewZoom(clampPreviewZoom(previewGestureStartZoomRef.current * gestureEvent.scale));
    };

    const handlePreviewGestureEnd = (event: Event) => {
      event.preventDefault();
      previewGestureStartZoomRef.current = previewZoomRef.current;
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', updatePreviewViewportSize);
    previewViewportElement.addEventListener('wheel', handlePreviewWheelZoom, { passive: false });
    previewViewportElement.addEventListener('gesturestart', handlePreviewGestureStart, { passive: false });
    previewViewportElement.addEventListener('gesturechange', handlePreviewGestureChange, { passive: false });
    previewViewportElement.addEventListener('gestureend', handlePreviewGestureEnd, { passive: false });

    const animationFrameId = window.requestAnimationFrame(updatePreviewViewportSize);

    return () => {
      document.body.style.removeProperty('overflow');
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', updatePreviewViewportSize);
      previewViewportElement.removeEventListener('wheel', handlePreviewWheelZoom);
      previewViewportElement.removeEventListener('gesturestart', handlePreviewGestureStart);
      previewViewportElement.removeEventListener('gesturechange', handlePreviewGestureChange);
      previewViewportElement.removeEventListener('gestureend', handlePreviewGestureEnd);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isPreviewOpen]);

  const handlePreviewZoomOut = () => {
    setPreviewZoom((currentZoom) => clampPreviewZoom(currentZoom - previewZoomStep));
  };

  const handlePreviewZoomIn = () => {
    setPreviewZoom((currentZoom) => clampPreviewZoom(currentZoom + previewZoomStep));
  };

  const handlePreviewImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setPreviewImageSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight
    });
  };

  const handlePreviewPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (previewZoom <= previewZoomMin || !previewViewportRef.current) {
      return;
    }

    previewDragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: previewViewportRef.current.scrollLeft,
      scrollTop: previewViewportRef.current.scrollTop
    };

    setIsPreviewDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePreviewPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const previewViewportElement = previewViewportRef.current;
    const dragState = previewDragStateRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId || !previewViewportElement) {
      return;
    }

    previewViewportElement.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    previewViewportElement.scrollTop = dragState.scrollTop - (event.clientY - dragState.startY);
    event.preventDefault();
  };

  const finishPreviewDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = previewDragStateRef.current;

    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    previewDragStateRef.current = {
      active: false,
      pointerId: -1,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0
    };

    setIsPreviewDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const canMeasurePreviewImage =
    previewViewportSize.width > 0 &&
    previewViewportSize.height > 0 &&
    previewImageSize.width > 0 &&
    previewImageSize.height > 0;

  const previewFittedWidth = canMeasurePreviewImage
    ? Math.min(
        previewViewportSize.width,
        (previewViewportSize.height / previewImageSize.height) * previewImageSize.width
      )
    : 0;

  const previewFittedHeight =
    canMeasurePreviewImage && previewImageSize.width > 0
      ? (previewFittedWidth / previewImageSize.width) * previewImageSize.height
      : 0;

  const previewZoomedWidth = canMeasurePreviewImage ? previewFittedWidth * previewZoom : 0;
  const previewZoomedHeight = canMeasurePreviewImage ? previewFittedHeight * previewZoom : 0;
  const isPreviewHorizontallyScrollable = previewZoomedWidth > previewViewportSize.width;
  const isPreviewVerticallyScrollable = previewZoomedHeight > previewViewportSize.height;

  useEffect(() => {
    const previewViewportElement = previewViewportRef.current;

    if (!previewViewportElement || !canMeasurePreviewImage) {
      return;
    }

    const previousContentSize = previewContentSizeRef.current;
    const fallbackCenterX = previewViewportElement.clientWidth / 2;
    const fallbackCenterY = previewViewportElement.clientHeight / 2;
    const previousCenterX =
      previousContentSize.width > 0
        ? previewViewportElement.scrollLeft + previewViewportElement.clientWidth / 2
        : fallbackCenterX;
    const previousCenterY =
      previousContentSize.height > 0
        ? previewViewportElement.scrollTop + previewViewportElement.clientHeight / 2
        : fallbackCenterY;
    const nextCenterX =
      previousContentSize.width > 0 ? (previousCenterX / previousContentSize.width) * previewZoomedWidth : previewZoomedWidth / 2;
    const nextCenterY =
      previousContentSize.height > 0 ? (previousCenterY / previousContentSize.height) * previewZoomedHeight : previewZoomedHeight / 2;
    const nextScrollLeft = isPreviewHorizontallyScrollable
      ? Math.max(0, Math.min(nextCenterX - previewViewportElement.clientWidth / 2, previewZoomedWidth - previewViewportElement.clientWidth))
      : 0;
    const nextScrollTop = isPreviewVerticallyScrollable
      ? Math.max(0, Math.min(nextCenterY - previewViewportElement.clientHeight / 2, previewZoomedHeight - previewViewportElement.clientHeight))
      : 0;

    previewViewportElement.scrollLeft = nextScrollLeft;
    previewViewportElement.scrollTop = nextScrollTop;
    previewContentSizeRef.current = {
      width: previewZoomedWidth,
      height: previewZoomedHeight
    };
  }, [
    canMeasurePreviewImage,
    isPreviewHorizontallyScrollable,
    isPreviewVerticallyScrollable,
    previewZoomedHeight,
    previewZoomedWidth
  ]);

  return (
    <>
      <main data-page="souvenirs" className="animate-in fade-in duration-1000 bg-white">
        <section data-section="souvenirs-main" className="page-section page-section-nav pb-32">
          <div data-block="souvenirs-container" className="max-w-[80rem] mx-auto">
        
          {/* Header */}
          <div className="text-center mb-[30px]">
            <h1 className="tracking-tight text-black mb-4">참가자 기념품</h1>
            <p>기념품은 일부 변경될 수 있습니다.</p>
          </div>

          {/* T-Shirt Section */}
          <div data-block="souvenirs-tshirt" className="mb-20">
            <div className="flex justify-center mb-[30px] pt-4">
              <div className="bg-gray-100 p-1 rounded-full inline-flex border border-black/5">
                {tshirtMockupOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedTshirtMockupId(option.id)}
                    className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${
                      selectedTshirtMockupId === option.id
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Single Full-Width Image Box */}
            <div className="bg-[#FFF9E6] rounded-[2rem] mb-[30px] overflow-hidden border border-orange-50/50 aspect-[16/9] md:aspect-[16/9] relative group">
              <img 
                src={tshirtMockupSrc}
                alt="Official T-shirt mockup" 
                className="absolute inset-0 block h-full w-full object-cover object-center transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="absolute right-4 top-4 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full border border-black/10 bg-white/92 text-black shadow-[0_6px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 group-hover:scale-105 hover:bg-white"
                aria-label="티셔츠 이미지를 크게 보기"
              >
                <Search size={20} aria-hidden="true" />
              </button>
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
                    src="/images/tshirt-size-chart.png" 
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
                        <span className="inline-flex items-center justify-center w-[36.8px] h-[36.8px] rounded-full bg-[#abe2fe] text-black font-bold">
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
      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 px-5 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="티셔츠 이미지 확대 보기"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-[min(92vw,1280px)] overflow-hidden rounded-[2rem] bg-[#FFF9E6] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/96 p-1.5 shadow-[0_5px_15px_rgba(0,0,0,0.06)] backdrop-blur-sm">
              <button
                type="button"
                onClick={handlePreviewZoomOut}
                disabled={previewZoom <= previewZoomMin}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label="이미지 축소"
              >
                <Minus size={18} aria-hidden="true" />
              </button>
              <span className="min-w-[3.5rem] text-center font-[var(--font-body)] text-[var(--fs-h6)] leading-[var(--leading-default)] text-black">
                {Math.round(previewZoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handlePreviewZoomIn}
                disabled={previewZoom >= previewZoomMax}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label="이미지 확대"
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/96 text-black shadow-[0_5px_15px_rgba(0,0,0,0.06)] transition-colors hover:bg-white"
              aria-label="확대 이미지 닫기"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div
              ref={previewViewportRef}
              className={`preview-modal-content max-h-[84vh] overflow-auto overscroll-contain ${previewZoom > previewZoomMin ? (isPreviewDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
              onPointerDown={handlePreviewPointerDown}
              onPointerMove={handlePreviewPointerMove}
              onPointerUp={finishPreviewDrag}
              onPointerCancel={finishPreviewDrag}
            >
              <div
                className={`flex min-h-full min-w-full ${isPreviewVerticallyScrollable ? 'items-start' : 'items-center'} ${isPreviewHorizontallyScrollable ? 'justify-start' : 'justify-center'}`}
              >
                <div
                  className={canMeasurePreviewImage ? 'shrink-0' : 'w-full'}
                  style={canMeasurePreviewImage ? { width: `${previewZoomedWidth}px` } : undefined}
                >
                  <img
                    src={tshirtMockupSrc}
                    alt="Official T-shirt mockup enlarged preview"
                    onLoad={handlePreviewImageLoad}
                    className={canMeasurePreviewImage ? 'block h-auto w-full max-w-none' : 'block h-auto max-h-[84vh] w-full object-contain'}
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Souvenirs;
