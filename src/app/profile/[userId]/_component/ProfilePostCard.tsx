import "dayjs/locale/ko";

import Link from "next/link";
import React from "react";

import { dateFormat } from "@/utils/dateFormat";

import { IProfilePost } from "../page";
import DelBtn from "./DelBtn";
import styles from "./profilePostCard.module.css";

export default function ProfilePostCard({
  profilePostData,
  userId,
}: {
  profilePostData: IProfilePost;
  userId: number;
}) {
  return (
    <article className={styles.profile_post_card_container}>
      <div className={styles.chip_container}>
        {profilePostData?.voted && <span className={styles.voted_chip}>투표</span>}
        {profilePostData?.writed && <span className={styles.write_chip}>작성</span>}
        {profilePostData?.writed && <DelBtn userId={userId} postId={profilePostData.postId} />}
      </div>
      <h4 className={styles.title}>{profilePostData.title}</h4>
      <Link href={`/postDetail/${profilePostData.postId}`}>
        <p className={styles.content}>{profilePostData.content}</p>
      </Link>
      <div
        className={styles.bottom}
      >{`${profilePostData.category} ・ ${dateFormat(profilePostData.created)} ・ 참여 ${profilePostData.voteCount}`}</div>
    </article>
  );
}
