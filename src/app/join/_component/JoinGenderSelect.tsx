"use client";
import React from "react";

import Button from "@/app/_component/Button";

import { ISetSumbitProps } from "../page";
import styles from "./joinGenderSelect.module.css";

export default function JoinGenderSelect({ setVisibleBtn, setSubmitData, submitData }: ISetSumbitProps) {
  const selectGender = (value: string) => {
    // setGender(value);
  };
  return (
    <div>
      <p className={styles.txt01}>더 정확한 투표 결과를 알려드릴게요.</p>
      <div className={styles.btn_container}>
        <Button
          onClick={() => selectGender("man")}
          className={styles.button}
          bgColor={submitData?.gender === "man" ? "primary" : "background_200"}
        >
          남성
        </Button>
        <Button
          onClick={() => selectGender("girl")}
          className={styles.button}
          bgColor={submitData?.gender === "girl" ? "primary" : "background_200"}
        >
          여성
        </Button>
      </div>
    </div>
  );
}
