import Image from "next/image";
import React from "react";

import BackBtn from "./_component/BackBtn";
import LoginForm from "./_component/LoginForm";
import styles from "./login.module.css";

export default function SingUp() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <BackBtn />
      </nav>
      <div className={styles.container}>
        <Image src="/image2.png" alt="Balance Board 로고" width={268} height={30} priority />
        <LoginForm />
      </div>
    </div>
  );
}
