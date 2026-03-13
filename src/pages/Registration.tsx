"use client";

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type RegistrationEquipmentItem = {
  name: string;
  icon: string;
};

const registrationRequiredEquipment: Record<string, RegistrationEquipmentItem[]> = {
  '30K': [
    { name: '트레일 러닝화', icon: '👟' },
    { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
    { name: '호루라기', icon: '📣' },
    { name: '응급처치 키트', icon: '🩹' },
    { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
    { name: '서바이벌 블랭킷', icon: '🆘' },
    { name: '방수 자켓(우천 시)', icon: '🧥' },
    { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
  ],
  '20K': [
    { name: '트레일 러닝화(또는 등산화)', icon: '👟' },
    { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
    { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
    { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
  ],
  '12K': [
    { name: '트레일 러닝화(또는 등산화)', icon: '👟' },
    { name: '러닝 베스트(또는 벨트)', icon: '🎒' },
    { name: '개인 물병(또는 컵/500ml 이상)', icon: '🥤' },
    { name: '휴대폰(레이스 중 GPS 유지)', icon: '📱' },
  ],
};

const Registration = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('30K');
  const [isSouvenirOpen, setIsSouvenirOpen] = useState(false);
  const [openEquipmentCourses, setOpenEquipmentCourses] = useState<Record<string, boolean>>({
    '30K': false,
    '20K': false,
    '12K': false,
  });

  return (
    <main
      data-page="registration"
      className="registration animate-in fade-in duration-1000 bg-white"
      style={{ width: 'min(100%, 83.3333rem)' }}
    >
      <section
        data-section="registration"
        className="registration layout-pad layout-pad-nav"
      >
        <div
          data-block="registration-wrap"
          className="registration-wrap max-w-[83.3333rem] mx-auto"
        >
        
        <div data-block="registration-title" className="registration-title text-center pb-[30px]">
          <h1 className="tracking-tight text-black mb-[15px]">참가권</h1>
          <p>대회 참가 전 유의사항 및 규정을 반드시 확인해 주세요.</p>
        </div>

        <div
          data-block="registration-body"
          className="registration-body flex flex-col lg:flex-row gap-12 lg:gap-16 relative"
        >
          
          {/* Left Content: Terms and Conditions */}
          <div data-block="registration-terms" className="registration-terms w-full lg:w-2/3">
            
            <div className="flex flex-col gap-16">
              {/* Section 1 */}
              <div>
                <h4 className="mb-[15px]">1. 참가자 유의사항</h4>
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <ul className="space-y-6 text-gray-600 leading-relaxed text-base">
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <div>
                        <p className="m-0">빵트레일런은 만 19세 이상의 건강한 성인에 한하여 참가가 가능합니다.</p>
                        <p className="text-gray-400 text-sm mt-1 m-0">※ 만 19세 미만 참가자는 보호자와 동반하여 안전 관리가 가능한 경우에 한해 12K 코스로 참여가 가능합니다. (유사한 난이도의 코스를 완주한 경험 필수)</p>
                        <p className="text-gray-400 text-sm mt-1 m-0">만 19세 미만 참가를 희망하시는 경우, 1:1 문의 게시판을 통해 개별 문의 부탁드립니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="m-0">주최 측은 만일의 안전사고에 대비하여 의료진과 안전요원, 그리고 구급차를 대회장 주변에 배치하고 모든 참가자를 대상으로 단체 보험에 가입합니다.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <div>
                        <p className="m-0">DNF 픽업은 CP에서만 진행 되며, 그 외 지역에서는 CP까지 개별 이동하셔야합니다.</p>
                        <p className="text-gray-400 text-sm mt-1 m-0">※ DNF 차량 이용시 약간의 대기시간이 있을 수도 있다는 점 양해 부탁드립니다.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="m-0">주최 측은 대회 도중 발생한 자발적 부상, 사고 등에 대해 1차 응급조치(현장 조치 후 병원 후송까지)를 진행하며, 보험에 가입된 한도 내에서 보험사가 부담합니다.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="m-0">대회의 특성상 긴급 상황 발생 시 즉각적인 조치가 어려울 수 있습니다. 모든 참가자는 예기치 않은 사고에 대비할 수 있도록 준비해야 합니다.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0"></span>
                      <p className="font-bold text-black m-0">위 내용을 모두 숙지하였으며 후에 주최 측에 책임을 묻지 않을 것임을 참가신청으로 서약합니다.</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="mb-[15px]">2. 참가자 안내</h4>
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="mb-[15px] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <p className="text-sm font-bold text-black m-0">A</p>
                      </div>
                      <h5 className="text-black">취소 및 환불</h5>
                    </div>
                  <ul className="space-y-5 text-gray-600 leading-relaxed text-base ml-11">
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="m-0">8월 14일(금) 17시 이전까지 참가 취소 요청 시, 전액 환불이 가능합니다.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="text-orange-600 font-medium m-0">8월 14일(금) 17시 이후에는 참가 취소 및 환불과 참가권 변경이 되지 않습니다. (공식 티셔츠 사이즈 변경도 불가)</p>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                      <p className="m-0">참가권 취소는 '마이페이지'에서 구매 내역 확인 후 취소하실 수 있습니다.</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h4 className="mb-[15px]">3. 대회 운영 안내</h4>
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-12">
                  
                  {/* Subsection 1 */}
                  <div>
                    <div className="mb-[15px] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <p className="text-sm font-bold text-black m-0">A</p>
                      </div>
                      <h5 className="text-black">대회 규정</h5>
                    </div>
                    <ul className="space-y-5 text-gray-600 leading-relaxed text-base ml-11">
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 대회 참여 전 현장에서 참가 등록 후 배번호표를 필수로 수령해야 합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">배번호표는 분실 및 훼손 시 재발급되지 않습니다. 사전 기념품은 배번호표, 티셔츠, 기록칩이 해당됩니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 본인의 배번호를 반드시 착용하고 대회에 참가해야 합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">배번호의 대리 수령이나 대리 참가 행위는 허용되지 않으며, 적발 시 시상 및 기록 인증에서 자동 실격 처리됩니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 대회 필수 장비와 권장 장비를 확인하여 대회에 적절한 의류와 장비를 준비해야 합니다. 필수 장비 미지참 시 입상에서 제외되며 실격처리 등 불이익이 있을 수 있습니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 대회 코스, CP 정보, 대회 규정을 반드시 사전 숙지하여야 하며, 정보 미숙지로 인한 결과에 대한 책임은 참가자 본인에게 있습니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 대회 전에 홈페이지에 제공된 GPX 파일과 코스맵을 확인하여 코스 정보를 충분히 숙지해야 합니다. 대회 중에는 안내된 코스를 따라야 하며, 지름길 사용은 금지됩니다. 코스를 벗어난 경우 실격 처리될 수 있으며, 참가자는 코스맵과 GPX 파일을 활용해 제한 시간 내에 완주할 수 있도록 준비가 필요합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">모든 참가자는 제한 시간 이내에 코스를 완주하여야 합니다. 제한 시간이 지나면 참가자는 레이스를 중지하고 대회 운영진의 안내에 따라야 합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">대회 도중 부상을 당했을 경우, 가까운 체크포인트(CP)로 직접 이동해야 합니다. 어려울 경우, 배번호표에 기재된 비상 연락처로 연락합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">CP 지점을 통과하지 않을 경우, 시상 및 기록으로 인정하지 않습니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">CP 이외의 장소에서 경기 중도 포기가 불가합니다. 중도 포기자는 CP까지 직접 이동해야 합니다. 포기 시, CP 담당자에게 알리고 배번호와 기록칩을 무효화합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">행사장 및 코스 전 구역은 금연 구역입니다. 코스 내 자연을 보호하기 위해 훼손 행위를 삼가주시기 바랍니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">참가 신청을 하지 않은 외부인의 동반 레이스는 불가합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">갑작스러운 기상악화에도 대회는 진행될 수 있으며, 이에 따른 코스 변경 및 단축이 있을 수 있습니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">고의로 코스 표지를 훼손하는 경우, 해당 참가자는 실격 처리됩니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">대회의 순위는 기록칩을 기준으로 결정되며, 기록 측정 방식은 출발 지점을 지나는 순간부터 계측되는 넷타임(Net-time)입니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0 text-orange-600">시상은 20K 부문 요일별 남녀 1위를 시상합니다.</p>
                      </li>
                    </ul>
                  </div>

                  {/* Subsection 2 */}
                  <div className="pt-8 border-t border-gray-100">
                    <div className="mb-[15px] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <p className="text-sm font-bold text-black m-0">B</p>
                      </div>
                      <h5 className="text-black">장비 규정</h5>
                    </div>
                    <ul className="space-y-5 text-gray-600 leading-relaxed text-base ml-11">
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">참가자는 참가 등록 간 필수장비를 지참하여 선수등록을 진행하셔야 하며, 필수 장비 미지참시, 선수 등록 및 대회 참가가 절대 불가합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">참가자들은 대회 도중 필수 장비를 반드시 착용하고 있어야 합니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">본 대회에서는 일회용 컵과 같은 일회용 물품을 제공하지 않습니다. 참가자는 개인 물병을 반드시 지참해야 하며, 코스 내 쓰레기 투기는 엄격히 금지됩니다.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                        <p className="m-0">우천 예보 시(대회 전일 기준), 방수 재킷 또는 우비 지참 안내 예정입니다.</p>
                      </li>
                    </ul>
                    <div className="ml-11 mt-8 space-y-4">
                      {Object.entries(registrationRequiredEquipment).map(([courseLabel, items]) => (
                        <div key={courseLabel} className="rounded-[1.5rem] border border-black/10 bg-gray-50 px-4 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenEquipmentCourses((prev) => ({
                                ...prev,
                                [courseLabel]: !prev[courseLabel],
                              }))
                            }
                            className="flex w-full items-center justify-between gap-4 text-left"
                            aria-expanded={openEquipmentCourses[courseLabel]}
                          >
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-3 typo-h6-medium text-black">
                                {courseLabel}
                              </span>
                              <span className="typo-h6-medium text-black">필수 장비</span>
                            </span>
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">
                              <ChevronDown
                                size={18}
                                className={`text-black transition-transform duration-200 ${openEquipmentCourses[courseLabel] ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                              />
                            </span>
                          </button>

                          {openEquipmentCourses[courseLabel] ? (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {items.map((item) => (
                                <div
                                  key={`${courseLabel}-${item.name}`}
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3"
                                >
                                  <span className="text-xl leading-none" aria-hidden="true">{item.icon}</span>
                                  <span className="typo-h6-medium text-gray-800">{item.name}</span>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subsection 3 */}
                  <div className="pt-8 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsSouvenirOpen((prev) => !prev)}
                      className="mb-[15px] flex w-full items-center justify-between gap-4 text-left"
                      aria-expanded={isSouvenirOpen}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-black">C</span>
                        </span>
                        <h5 className="m-0 text-black">기념품</h5>
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-gray-50">
                        <ChevronDown
                          size={18}
                          className={`text-black transition-transform duration-200 ${isSouvenirOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                    {isSouvenirOpen ? (
                      <ul className="space-y-5 text-gray-600 leading-relaxed text-base ml-11">
                        <li className="flex items-start">
                          <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                          <p className="m-0">사전 기념품은 9월 11일(금) 오후 2시부터 레이스 등록 시 현장에서 받을 수 있으며, 한 번 지급된 후에는 재발급되지 않습니다.</p>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                          <p className="m-0">기념품 수령 시 구매자 확인이 필요하며, 본인만 수령 가능합니다.</p>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                          <p className="m-0">티셔츠는 사전 신청 시 선택한 사이즈로 지급되며 8월 14일 오후 5시 이후 다른 사이즈로 교환은 불가합니다.</p>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0"></span>
                          <p className="m-0">모든 참가자는 완주 후 기념품 수령소 부스에서 완주 메달을 포함한 나머지 기념품을 받을 수 있습니다.</p>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div
              data-role="agreement-box"
              className="mt-[30px] md:mt-16 p-8 md:p-10 bg-black rounded-[2rem] border-2 border-black hover:border-gray-800 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              <label className="flex items-center gap-4 cursor-pointer group">
                <div
                  data-role="agreement-check-indicator"
                  data-agreed={isAgreed ? "true" : "false"}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors shrink-0 ${isAgreed ? 'bg-white border-white' : 'border-gray-500 group-hover:border-gray-400 bg-transparent'}`}
                >
                  <Check className={`w-5 h-5 transition-opacity ${isAgreed ? 'text-black opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <p className="text-white select-none m-0">
                  (필수) 위 참가자 유의사항 및 대회 규정을 모두 읽었으며, 이에 동의합니다.
                </p>
              </label>
            </div>

          </div>

          {/* Right Content: Sticky Registration Panel */}
          <div
            data-block="registration-side"
            className="registration-side w-full lg:w-1/3 md:pt-[50px]"
          >
            <div className="sticky top-32 bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              
              {/* Registration Image */}
              <div className="rounded-2xl overflow-hidden mb-8 bg-white aspect-[4/3] relative">
                <img 
                  src="/images/registration-600x450.jpg" 
                  alt="Registration" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mb-8">
                <h4 className="text-black mb-[15px]">빵트레일런</h4>
                
                {/* Course Selection */}
                <div className="pt-2 pb-2">
                  <h6 className="text-black mb-[15px]">참가 부문 선택</h6>
                  <div className="grid grid-cols-3 gap-2">
                    {['30K', '20K', '12K'].map((course) => (
                      <button
                        key={course}
                        onClick={() => setSelectedCourse(course)}
                        data-course={course}
                        data-role="registration-course-button"
                        data-selected={selectedCourse === course ? "true" : "false"}
                        className="py-3 rounded-xl text-sm font-bold transition-all duration-300 border bg-white text-gray-500 border-gray-200 hover:text-black"
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={!isAgreed}
                data-role="registration-submit-button"
                className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
                  ${isAgreed 
                    ? 'bg-[#A8FF00] text-black hover:bg-[#95E600] shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer' 
                    : 'bg-[#E5E5E5] text-gray-400 cursor-not-allowed'
                  }`}
                onClick={() => {
                  if (isAgreed) {
                    alert(`${selectedCourse} 부문 참가권 페이지로 이동합니다.`);
                  }
                }}
              >
                참가권
              </button>
              
            </div>
            {!isAgreed && (
              <p className="mt-4 text-sm text-orange-600 font-medium m-0 text-center">
                좌측 하단의 필수 약관에 동의해 주세요.
              </p>
            )}
          </div>

        </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
