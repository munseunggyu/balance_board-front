"use client";
import Image from "next/image";
import React from "react";

import Button, { IButton } from "@/app/_component/Button";

import styles from "./voteBtnContainer.module.css";

interface IProps {
  btnType: number;
  option1: string;
  option2: string;
  option1Count: number;
  option2Count: number;
  voteCount: number;
}

export default function VoteBtnsContainer({
  btnType,
  voteCount,
  option1,
  option2,
  option1Count,
  option2Count,
}: IProps) {
  console.log(voteCount, option1Count, option2Count);
  // const [isClickVoteBtn, setIsClickVoteBtn] = useState(false);
  // const btnType = 1; // 0. 미선택(미투표), 1. 선택(미투표), 2. 더 적음(투표완), 3. 더 많음(투표완)
  const btnStyle: IButton = {
    bgColor: btnType === 3 ? "primary" : btnType === 2 ? "primary_50" : "body_100",
    border: btnType === 1 || btnType === 2 ? "primary" : "gray",
  };

  return (
    <div className={styles.container}>
      <Button bgColor={btnStyle.bgColor} border={btnStyle.border} className={styles.btn} rounded={"large"}>
        <div className={styles.btn_contents}>
          <div className={styles.btn_left}>
            {btnType === 2 && (
              <Image
                className={styles.ico_check}
                src={"/check-pressed-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            {btnType === 3 && (
              <Image
                className={styles.ico_check}
                src={"/check-white-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            <span>{option1}</span>
          </div>
          <div>45.8%(27명)</div>
        </div>
      </Button>
      <Button bgColor={btnStyle.bgColor} border={btnStyle.border} className={styles.btn} rounded={"large"}>
        <div className={styles.btn_contents}>
          <div className={styles.btn_left}>
            {btnType === 2 && (
              <Image
                className={styles.ico_check}
                src={"/check-pressed-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            {btnType === 3 && (
              <Image
                className={styles.ico_check}
                src={"/check-white-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            <span>{option2}</span>
          </div>
          <div>45.8%(27명)</div>
        </div>
      </Button>
      <Button className={styles.vote_btn} border={"gray"} bgColor={"title_400"}>
        투표하기
      </Button>
    </div>
  );
}
