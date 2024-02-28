import Image from "next/image";

import { formatRelativeTime } from "@/utils/foramattime";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface IUserInfoProps {
  postData: IPostData;
}

export default function UserInfo({ postData }: IUserInfoProps) {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.usermageContainer}>
        <Image src="/participate-sm.png" alt="유저 이미지" width={24} height={24} />
      </div>
      <div className={styles.userInfoContainer}>
        <span className={styles.userName}>{postData.nickname}</span>
        <span className={styles.userPostTime}>{formatRelativeTime(postData.created)}</span>
      </div>
      <div className={styles.topicContainer}>
        <span className={styles.userTopic}>{postData.category}</span>
      </div>
    </div>
  );
}
