"use client";

import Image from "next/image";
import React from "react";

import { experienceRange } from "@/utils/user/experienceRange";
import { userImgUrl } from "@/utils/userImgUrl";

import icoQuestion from "../../.././../../public/question-sm.svg";
import { useQueryGetProfileData } from "../_hook/useQueryGetProfileData";
import styles from "./profileUserInfo.module.css";

export default function ProfileUserInfo({ userId }: { userId: number }) {
  const { data } = useQueryGetProfileData(userId);
  let gradeName = "입문자";
  let leftLevel = 0;
  let nextValue = 30;
  if (data) {
    const { name, left, nextValue: next } = experienceRange(data.experiencePoints);
    gradeName = name;
    leftLevel = left;
    nextValue = next;
  }

  if (!data) return <>데이터 없음</>;

  return (
    <div className={styles.info_container}>
      <div className={styles.info_shadow}>
        <Image src={userImgUrl(1)} alt="프로필 이미지" width={70} height={70} />
        <div className={styles.user_name_container}>
          <span className={styles.name_position}>{data.nickname}</span>
          <Image src={"/pencil-gray-md.svg"} width={24} height={24} alt="닉네임 편집하기" />
        </div>
        <div className={styles.user_email_area}>
          <span>Lv.{data.level}</span>
          <span>|</span>
          <span>{gradeName}</span>
        </div>
        <div className="w-full">
          <div className="text-[14px] flex justify-between">
            <span className="">
              <span className="font-bold">Lv.{data.level + 1} </span>까지 <span>{leftLevel}점</span>
              남았어요!
            </span>
            <Image src={icoQuestion} alt="유저 레벨 안내 링크" />
          </div>
          <div className={styles.progress_container}>
            <div
              className="bg-main-primary-500 h-[10px] rounded-[100px] relative"
              style={{ width: (data.experiencePoints / nextValue) * 100 + "%" }}
            >
              <div className="absolute text-main-primary-500 text-[12px] -right-1.5 top-2.5">
                {data.experiencePoints}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
