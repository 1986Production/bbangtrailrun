import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import KoreanHeadingMarker from "@/src/components/KoreanHeadingMarker";
import SiteNavbar from "@/src/components/SiteNavbar";
import SiteFooter from "@/src/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "빵트레일런",
  description:
    "빵트레일런 공식 홈페이지",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var key="theme-preference";var stored=localStorage.getItem(key);var mode=(stored==="light"||stored==="dark")?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.classList.toggle("dark",mode==="dark");root.dataset.theme=mode;}catch(e){}})();`}
        </Script>
        <Script id="typekit-loader" strategy="beforeInteractive">
          {`(function(d){var config={kitId:"mbz0ita",scriptTimeout:3000,async:true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src="https://use.typekit.net/"+config.kitId+".js";tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config);}catch(e){}};s.parentNode.insertBefore(tk,s);})(document);`}
        </Script>
      </head>
      <body
        id="top"
        className="min-h-screen bg-white text-black selection:bg-gray-200 selection:text-black flex flex-col"
      >
        <KoreanHeadingMarker />
        <SiteNavbar />
        <div className="flex-grow">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
