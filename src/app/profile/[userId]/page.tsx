import React from "react";

import { Profiletab } from "@/app/_component/Tabs";
import { constant } from "@/utils/constant";

import ProfilePostListContainer from "./_component/ProfilePostListContainer";
import ProfileUserInfo from "./_component/ProfileUserInfo";

interface IProfilePostData {
  postId: number;
  title: string;
  created: string;
  category: string;
  content: string;
  voteCount: number;
  isVoted: boolean;
  isWrite: boolean;
}

export interface IProfileData {
  userId: number;
  email: string;
  nickname: string;
  imageType: number;
  userPosts: IProfilePostData[];
  votedPosts: IProfilePostData[];
}

export default async function ProfilePage() {
  const res = await fetch(constant.apiUrl + "api/user/profile/1", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const profileData: IProfileData = await res.json();

  return (
    <div>
      <ProfileUserInfo profileData={profileData} />
      <Profiletab totalCount={0} votedCount={0} writtenCount={0} />
      <ProfilePostListContainer profileData={profileData} />
    </div>
  );
}
