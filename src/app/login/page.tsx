/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";

import { constant } from "@/utils/constant";

import kakaoIcon from "../../../public/ico_kakao.svg";
import logo from "../../../public/logo.png";
import BackBtn from "./_component/BackBtn";
import styles from "./login.module.css";

export default function SingUp() {
  const kakaoLogin = () => {
    const kakao = (window as any).Kakao;
    kakao.Auth.authorize({
      redirectUri: constant.kakaoLoginRedirectUri,
      prompts: "select_account",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const kakao = (window as any).Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <BackBtn />
      </nav>
      <div className={styles.container}>
        <p className="mb-[20px]">게임처럼 즐거운 토론 커뮤니티</p>
        <Image src={logo} alt="Balance Board 로고" width={212} height={61} priority />
        <button onClick={kakaoLogin} className={styles.kakaoBtn}>
          <Image src={kakaoIcon} width={18} height={18} alt="카카오 아이콘" /> 카카오로 3초만에 시작하기
        </button>
        <p className="mt-[20px] text-[13px] text-body-600">
          로그인 시 <span className="underline">개인정보처리방침</span>과 <span className="underline">이용약관</span>에
          동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
