/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Script from "next/script";
import React from "react";

export default function KakaoScript() {
  return (
    <>
      <Script src="//developers.kakao.com/sdk/js/kakao.min.js"></Script>
    </>
  );
}
