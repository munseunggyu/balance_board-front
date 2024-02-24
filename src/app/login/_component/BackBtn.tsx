"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "../login.module.css";

export default function BackBtn() {
  const router = useRouter();

  const back = () => {
    router.back();
  };
  return (
    <button onClick={back} className={styles.back_btn}>
      <Image src="/image5.png" alt="Page 1" width={24} height={24} />
    </button>
  );
}
