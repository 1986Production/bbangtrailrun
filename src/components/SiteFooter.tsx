"use client";

import { ArrowUp, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ModalType = "terms" | "privacy" | "business" | null;

const TERMS_TEXT = `제1조 목적
본 이용약관은 “빵트레일런”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.

제2조 용어의 정의
본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.
1. 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자
2. 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약
3. 회원 아이디(ID) : 회원 식별을 위한 고유 문자/숫자 조합
4. 비밀번호 : 회원 인증 및 권익 보호를 위해 회원이 선정한 문자/숫자 조합
5. 운영자 : 서비스를 개설하여 운영하는 자
6. 해지 : 회원이 이용계약을 해약하는 것

제3조 약관 외 준칙
운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.

제4조 이용계약 체결
1. 이용계약은 약관 동의 + 가입신청 + 운영자 승낙으로 성립합니다.
2. 회원가입 시 "동의합니다" 선택은 약관 동의 의사표시로 봅니다.

제5조 서비스 이용 신청
1. 회원가입 시 사이트가 요구하는 정보를 제공해야 합니다.
2. 타인정보 도용 또는 허위정보 등록 시 관련 법령에 따라 처벌될 수 있습니다.

제6조 개인정보처리방침
사이트 및 운영자는 관계 법령에 따라 회원 개인정보 보호를 위해 노력하며, 세부 사항은 개인정보처리방침을 따릅니다.

제7조 운영자의 의무
1. 정당한 의견/불만은 가능한 신속히 처리합니다.
2. 안정적 서비스 제공을 위해 설비 장애 시 복구를 요청/수행할 수 있습니다.

제8조 회원의 의무
1. 관련 법령, 공지사항, 운영정책 준수
2. 이용권한의 양도/증여/담보 제공 금지
3. ID/비밀번호의 안전한 관리
4. 사이트 및 제3자의 권리 침해 금지

제9조 서비스 이용 시간
연중무휴 1일 24시간을 원칙으로 하나, 점검/장애/불가항력 사유로 중단될 수 있습니다.

제10조 서비스 이용 해지
회원은 온라인으로 해지 신청할 수 있으며, 해지 시 관련 기능 및 데이터 처리 정책이 적용됩니다.

제11조 서비스 이용 제한
허위정보 등록, 타인정보 도용, 권리침해, 범죄 관련 행위 등은 서비스 이용 제한 또는 계약 해지 사유가 됩니다.

제12조 게시물의 관리
불량 게시물은 운영 정책 및 관련 법령에 따라 삭제/이동/제한될 수 있습니다.

제13조 게시물의 보관
사이트 중단 시 사전 공지 및 필요한 조치를 위해 노력합니다.

제14조 게시물 저작권
게시물 저작권은 작성자에게 귀속되며, 운영정책 및 관련 법령에 따릅니다.

제15조 손해배상
회원의 귀책사유 및 불가항력 상황에 대한 손해배상은 제한될 수 있습니다.

제16조 면책
서비스 특성, 통신장애, 제3자 행위, 불가항력 등으로 인한 손해는 면책될 수 있습니다.

부칙
이 약관은 사이트 개설일부터 시행합니다.`;

const PRIVACY_TEXT = `개인정보처리방침
㈜1986프로덕션(이하 ‘회사’)은 개인정보 보호법 제30조에 따라 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위해 본 방침을 수립/공개합니다.

제1조 개인정보의 처리목적
1. 회원 가입 및 관리
2. 재화/서비스 제공
3. 고충 처리
4. 현장 사진 및 영상 촬영(홍보 목적 포함)

제2조 개인정보 처리 및 보유기간
관련 법령 또는 동의 받은 기간 내에서 개인정보를 처리/보유합니다.

제3조 개인정보의 제3자 제공
법령 또는 정보주체 동의가 있는 경우에 한해 제3자 제공이 이루어집니다.

제4조 개인정보처리 위탁
원활한 서비스 운영을 위해 일부 업무를 수탁사에 위탁할 수 있으며 관련 법령에 따라 관리/감독합니다.

제5조 정보주체 권리 행사
열람, 정정, 삭제, 처리정지 요구 등 개인정보 보호법상 권리를 행사할 수 있습니다.

제6조 처리하는 개인정보 항목
회원관리, 서비스 제공, 결제, 민원처리 과정에서 필요한 최소 항목을 처리합니다.

제7조 개인정보 파기
보유기간 경과 또는 처리목적 달성 시 지체없이 파기합니다.

제8조 안전성 확보조치
관리적/기술적/물리적 보호조치를 시행합니다.

제9조 쿠키 운영
맞춤형 서비스 제공을 위해 쿠키를 사용할 수 있으며 브라우저 설정으로 거부 가능합니다.

제10조 개인정보 보호책임자
개인정보 처리 관련 문의/불만/피해구제는 지정된 보호책임자 및 담당부서로 문의할 수 있습니다.

제11조 개인정보 열람청구
개인정보 열람청구 접수/처리 부서를 통해 열람 청구를 할 수 있습니다.

제12조 권익침해 구제방법
개인정보 침해신고센터, 분쟁조정위원회 등 관계 기관을 통해 구제 절차를 진행할 수 있습니다.

제13조 시행 및 변경
본 방침은 사이트 개설일부터 적용됩니다.`;

const BUSINESS_INFO = [
  "홈페이지 관리자 : (주)1986프로덕션",
  "사업자등록번호 : 852-87-00417",
  "대표자명 : 윤명호",
  "사업장주소 : 서울특별시 서초구 언남길64, 2층 (양재동, 덕성빌딩)",
  "연락처 : 1986@1986.co.kr",
  "통신판매신고번호 : 2019-서울서초-0810",
  "호스팅제공자 : ㈜아임웹",
];

const MODAL_TITLES: Record<Exclude<ModalType, null>, string> = {
  terms: "이용약관",
  privacy: "개인정보처리방침",
  business: "사업자정보확인",
};

const SiteFooter = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    if (!activeModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModal(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModal]);

  const modalBody = useMemo(() => {
    if (activeModal === "terms") {
      return <p className="m-0 whitespace-pre-wrap typo-h6-medium text-gray-600">{TERMS_TEXT}</p>;
    }
    if (activeModal === "privacy") {
      return <p className="m-0 whitespace-pre-wrap typo-h6-medium text-gray-600">{PRIVACY_TEXT}</p>;
    }
    if (activeModal === "business") {
      return (
        <ul className="m-0 p-0 list-none space-y-3">
          {BUSINESS_INFO.map((item) => (
            <li key={item} className="typo-h6-medium text-gray-600">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }, [activeModal]);

  return (
    <>
      <footer data-section="site-footer" className="bg-black text-white pt-24 pb-8 rounded-t-[3rem]">
        <div data-block="footer-container" className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="flex flex-col gap-10">
              <div className="space-y-10">
                <div>
                  <h6 className="m-0 mb-4 text-white/50">주최</h6>
                  <a href="https://www.1986.co.kr/" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img
                      src="/images/footer-logo-1986.png"
                      alt="1986production Logo"
                      className="h-11 w-auto footer-logo-image"
                    />
                  </a>
                </div>

                <div>
                  <h6 className="m-0 mb-4 text-white/50">주관</h6>
                  <a href="https://www.1986.co.kr/" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <img
                      src="/images/footer-logo-1986.png"
                      alt="1986production Logo"
                      className="h-11 w-auto footer-logo-image"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14 pt-1">
              <div className="flex flex-col">
                <h6 className="m-0 mb-6 text-white/50 typo-h6-medium">ENQUIRIES</h6>
                <a
                  href="https://coffeebbangrun.com/shop_mypage/?m2=qna"
                  className="inline-block text-white no-underline hover:text-gray-300 transition-colors typo-h6-medium"
                >
                  1:1 문의하기
                </a>
                <p className="m-0 mt-2 text-white/80 typo-h6-medium">
                  (운영시간 : 평일 10:00 ~ 17:00
                  <br />
                  점심시간 12:30 ~ 13:30)
                </p>
                <p className="m-0 mt-3 text-white typo-h6-medium">
                  파트너십 문의{" "}
                  <a className="underline underline-offset-4" href="mailto:1986@1986.co.kr">
                    1986@1986.co.kr
                  </a>
                </p>
              </div>

              <div className="flex flex-col">
                <h6 className="m-0 mb-6 text-white/50 typo-h6-medium">SOCIAL</h6>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="w-fit mb-2 bg-transparent border-0 p-0 text-white cursor-pointer hover:text-gray-300 transition-colors typo-h6-medium"
                >
                  이용약관
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="w-fit bg-transparent border-0 p-0 text-white cursor-pointer hover:text-gray-300 transition-colors typo-h6-medium"
                >
                  개인정보처리방침
                </button>
              </div>

              <div className="sm:col-span-2">
                <h6 className="m-0 mb-6 text-white/50 typo-h6-medium">LOCATION</h6>
                <button
                  type="button"
                  onClick={() => setActiveModal("business")}
                  className="bg-transparent border-0 p-0 text-white cursor-pointer hover:text-gray-300 transition-colors typo-h6-medium"
                >
                  사업자정보확인
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/50 typo-h6-medium">
            <p className="m-0 text-white/50 typo-h6-medium">Copyright © bbangtrailrun All rights Reserved</p>
            <a href="#top" className="mt-4 md:mt-0 hover:text-white transition-colors flex items-center typo-h6-medium">
              Back to Top <ArrowUp size={14} className="ml-2" />
            </a>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            aria-label="모달 닫기"
            onClick={() => setActiveModal(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            className="footer-modal-content relative z-10 w-full max-w-[900px] max-h-[90vh] overflow-auto bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 md:top-5 md:right-5 h-9 w-9 rounded-full bg-gray-100 border border-gray-200 text-black flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label="모달 닫기"
            >
              <X size={18} />
            </button>
            <h5 id="footer-modal-title" className="m-0 mb-[15px] text-black">
              {MODAL_TITLES[activeModal]}
            </h5>
            <div className="pr-1">{modalBody}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteFooter;
