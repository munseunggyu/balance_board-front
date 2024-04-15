"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useAuthStore } from "@/stores/user";
import { userImgUrl } from "@/utils/userImgUrl";

import profileImg from "../../../public/profile-md-test.png";

export default function NavUserProfile() {
  const userInfo = useAuthStore((state) => state.userInfo);

  if (userInfo.isLogin === 1) {
    return (
      <Link href={`/profile/${userInfo.userId}`}>
        <Image src={userImgUrl(userInfo.imageType)} width={24} height={24} alt="유저 이미지" />
      </Link>
    );
  } else {
    return (
      <Link href={"/login"}>
        <Image src={profileImg} width={24} height={24} alt="유저 이미지" />
      </Link>
    );
  }
}
