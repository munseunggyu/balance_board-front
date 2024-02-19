import Image from "next/image";
import React from "react";

import GoogleLoginBtn from "./_component/GoogleLoginBtn";
import styles from "./signup.module.css";

export default function SingUp() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>세상의 모든 이슈에 투표하다</h1>
        <Image src="/image2.png" alt="Balance Board 로고" width={268} height={30} priority />
      </div>
      <GoogleLoginBtn />
    </div>
  );
}
