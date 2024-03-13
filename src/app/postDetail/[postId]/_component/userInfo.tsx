import "dayjs/locale/ko";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

import { userImgUrl } from "@/utils/userImgUrl";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface IUserInfoProps {
  postData: IPostData;
}

export default function UserInfo({ postData }: IUserInfoProps) {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.usermageContainer}>
        <Image src={userImgUrl(postData.imageType)} alt="유저 이미지" width={24} height={24} />
      </div>
      <div className={styles.userInfoContainer}>
        <span className={styles.userName}>{postData.nickname}</span>
        <span className={styles.userPostTime}>{dayjs(postData.created).fromNow()}</span>
      </div>
      <div className={styles.topicContainer}>
        <span className={styles.userTopic}>{postData.category}</span>
      </div>
    </div>
  );
}
