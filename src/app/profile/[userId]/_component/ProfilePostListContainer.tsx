"use client";
import React from "react";

import { IProfileData } from "../page";

export default function ProfilePostListContainer({ profileData }: { profileData: IProfileData }) {
  console.log(profileData);
  // const userPosts = profileData.userPosts.map((v) => {
  //   return {
  //     ...v,
  //     isWrite: true,
  //   };
  // });

  // const votedPosts = profileData.userPosts.map((v) => {
  //   return {
  //     ...v,
  //     isVoted: true,
  //   };
  // });

  // const dupArr = [...profileData.userPosts, ...profileData.votedPosts];

  // const allData = dupArr.filter((obj, index, self) => index === self.findIndex((o) => o.postId === obj.postId));
  // const [data] = useState(allData);
  return (
    <div>
      <ul>
        {/* {data.map((v, i) => (
          <li key={i}>{v.title}</li>
        ))} */}
      </ul>
    </div>
  );
}
