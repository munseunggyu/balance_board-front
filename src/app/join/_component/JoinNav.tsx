"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { useJoinDataContext } from "../_context/JoinContext";
import styles from "./joinNav.module.css";
export default function JoinNav() {
  const router = useRouter();

  const {
    data: { processType },
    setProcessType,
  } = useJoinDataContext();

  const handleBack = () => {
    if (processType === 0) {
      router.back();
    } else {
      setProcessType(processType - 1);
    }
  };

  return (
    <nav>
      <div className={styles.nav}>
        <button className={styles.back_btn} onClick={handleBack}>
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
          <h1 className={styles.title}>Join</h1>
        </button>
      </div>
      <div className={styles.progress_container}>
        <div className={styles.progress}>
          <div className={styles.bar} style={{ width: (processType + 1) * 20 + "%" }}></div>
        </div>
      </div>
    </nav>
  );
}
