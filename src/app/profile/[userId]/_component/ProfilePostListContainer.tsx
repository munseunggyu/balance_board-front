"use client";
import React from "react";

import { useQueryGetProfileData } from "../_hook/useQueryGetProfileData";
import ProfilePostCard from "./ProfilePostCard";
import styles from "./profilePostListContainer.module.css";
export default function ProfilePostListContainer({ userId }: { userId: number }) {
  const { isLoading, allData } = useQueryGetProfileData(userId);

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <ul className={styles.post_ul}>
        {allData.map((post, i) => (
          <li key={`${post.postId} - ${i}`} className={styles.post_list}>
            <ProfilePostCard profilePostData={post} userId={userId} />
          </li>
        ))}
      </ul>
    </div>
  );
}
