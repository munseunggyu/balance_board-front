"use client";
import Image from "next/image";
import React, { useState } from "react";

import Button from "../_component/Button";
import JoinGenderSelect from "./_component/JoinGenderSelect";
import JoinName from "./_component/JoinName";
import InputForm from "./_component/MultiInput";
import styles from "./join.module.css";

export default function Join() {
  const [processType, setProcessType] = useState(2);
  const [gender, setGender] = useState("");
  const userName = "동글동글";

  const disabledBtn = true;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button className={styles.back_btn}>
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
          <h1 className={styles.title}>Join</h1>
        </button>
      </nav>
      <h2 className={styles.h2}>
        {processType === 1 ? (
          <span>
            밸런스보드에서 사용할
            <br />
            닉네임을 입력해주세요.
          </span>
        ) : processType === 2 ? (
          <span>
            {userName}님,
            <br />
            성별을 알려주세요
          </span>
        ) : (
          <span>
            {userName}님,
            <br />
            태어난 년도를 알려주세요
          </span>
        )}
      </h2>
      {processType === 1 ? (
        <JoinName />
      ) : processType === 2 ? (
        <JoinGenderSelect gender={gender} setGender={setGender} />
      ) : (
        <InputForm />
      )}

      <Button
        className={styles.submit_btn}
        bgColor={disabledBtn ? "body_200" : "background_100"}
        border={disabledBtn ? "gray" : "primary"}
      >
        다음
      </Button>
    </div>
  );
}
