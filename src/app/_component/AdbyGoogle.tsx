"use client";
import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[]; // 또는 원하는 타입으로 지정
  }
}

export default function AdbyGoogle() {
  const AdInit = () => {
    if (window?.adsbygoogle) {
      console.log(window.adsbygoogle);
      window.adsbygoogle.push({});
    }
  };
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1919598055512436"
        crossOrigin="anonymous"
        onLoad={AdInit}
      ></Script>
      <ins className="adsbygoogle" data-ad-client="ca-pub-1919598055512436" data-ad-slot="1678485541"></ins>
    </>
  );
}
