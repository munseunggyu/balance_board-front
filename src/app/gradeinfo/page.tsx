"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import activity_guide from "../../../public/activity_guide.png";
import direct_left_md from "../../../public/direction-left-md.svg";
import grade_guide from "../../../public/grade_guide.png";
import styles from "./gradeinfo.module.css";
export default function Gradeinfo() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={() => router.back()} className={styles.backPage}>
          <Image src={direct_left_md} alt="홈으로 가기 버튼" width={24} height={24} />
        </button>
      </nav>
      <div className="mt-[40px] pb-[60px] px-[20px]">
        <strong className="text-xl">등급별 레벨 및 점수</strong>
        <p className="mt-[10px] text-[14px]">밸런스보드에는 5개의 등급과 10개의 레벨이 있어요!</p>
        <p className="text-[14px]">활동에 따라 점수를 받고 레벨업하는 재미를 느껴보세요!</p>
        <Image className="mt-[40px] mb-[58px] w-[100%]" src={grade_guide} alt="등급별 레벨 및 점수" height={512} />

        <strong className="text-xl">활동별 점수</strong>
        <p className="mt-[10px] text-[14px]">밸런스보드에서 점수를 얻을 수 있는 활동이에요.</p>
        <p className="text-[14px]">매너와 존중이 담긴 여러분의 활동을 기대할게요!</p>
        <Image className="mt-[40px]  w-[100%]" src={activity_guide} alt="등급별 레벨 및 점수" height={512} />
      </div>
    </div>
  );
}
