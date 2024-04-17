"use client";
import Image from "next/image";
import React from "react";

import logo from "../../../public/logo.png";
import BackBtn from "./_component/BackBtn";
import LoginForm from "./_component/LoginForm";
import styles from "./login.module.css";

export default function SingUp() {
  const kakaoLogin = () => {
    const KAKAO_REDIRECT_URI = "http://localhost:3000/join";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const kakao = (window as any).Kakao;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    kakao.Auth.authorize({
      redirectUri: KAKAO_REDIRECT_URI,
      prompts: "select_account",
    });
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={kakaoLogin}>kakaoLogin</button>
      <nav className={styles.nav}>
        <BackBtn />
      </nav>
      <div className={styles.container}>
        <Image src={logo} alt="Balance Board 로고" width={168} height={49} priority />
        <LoginForm />
      </div>
    </div>
  );
}
