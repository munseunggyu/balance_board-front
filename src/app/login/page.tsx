import Image from "next/image";
import React from "react";

import LoginForm from "./_component/LoginForm";
import styles from "./login.module.css";

export default function SingUp() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <button className={styles.back_btn}>
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
        </button>
      </nav>
      <div className={styles.container}>
        <Image src="/image2.png" alt="Balance Board 로고" width={268} height={30} priority />
        <LoginForm />
      </div>
    </div>
  );
}
