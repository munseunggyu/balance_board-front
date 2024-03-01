"use client";

import Image from "next/image";
import React from "react";

import { userImgUrl } from "@/utils/userImgUrl";

import { IProfileData } from "../page";
import styles from "./profileUserInfo.module.css";

export default function ProfileUserInfo({ profileData }: { profileData: IProfileData }) {
  return (
    <div className={styles.info_container}>
      <Image src={userImgUrl(profileData.imageType)} alt="프로필 이미지" width={70} height={70} />
      <div className={styles.user_name_container}>
        <span className={styles.name_position}>{profileData.nickname}</span>
        <Image src={"/pencil-gray-md.svg"} width={24} height={24} alt="닉네임 편집하기" />
      </div>
      <div className={styles.user_email_area}>{profileData.email}</div>
    </div>
  );
}
