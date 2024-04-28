"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import backIco from "../../../../public/direction-left-md.svg";
import styles from "./joinNav.module.css";
export default function JoinNav() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <nav>
      <div className={styles.nav}>
        <button className={styles.back_btn} onClick={handleBack}>
          <Image src={backIco} alt="뒤로가기" width={24} height={24} />
          <h1 className={styles.title}>Join</h1>
        </button>
      </div>
    </nav>
  );
}
