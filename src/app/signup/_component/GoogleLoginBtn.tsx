"use client";
import Image from "next/image";
// import { signIn } from "next-auth/react";
import React from "react";

import styles from "./googleloginbtn.module.css";

export default function GoogleLoginBtn() {
  const goJoinPage = () => {};
  return (
    <button onClick={goJoinPage} className={styles.google_btn}>
      <Image src="/googleLogo.svg" alt="google 로고" width={18} height={18} />
      Google로 로그인
    </button>
  );
}
