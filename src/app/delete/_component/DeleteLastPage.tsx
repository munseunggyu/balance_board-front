"use client";

import Image from "next/image";

import balance_together from "../../../../public/balance-together.svg";
import styles from "../delete.module.css";
import DeleteHeader from "./DeleteHeader";

export default function DeleteLastPage() {
  return (
    <div className={styles.deleteBox}>
      <div className={styles.deleteContainer}>
        <DeleteHeader
          headerMainText="아쉽지만"
          headerSubText="다음에 또 만나요!"
          subText="밸런스보드를 이용해주셔서 감사합니다."
        />
      </div>

      <Image src={balance_together} alt="밸런스보드 로그 이미지" width={320} height={160} className={styles.logoImg} />
    </div>
  );
}
