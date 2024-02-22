"use client";
import Image from "next/image";
import React from "react";

import Button from "../_component/Button";
import JoinGenderSelect from "./_component/JoinGenderSelect";
import JoinName from "./_component/JoinName";
import InputForm from "./_component/MultiInput";
import SignupInputs from "./_component/SignupInputs";
import { useJoinDataContext } from "./_context/JoinContext";
import styles from "./join.module.css";

export default function Join() {
  // const { submitData, setSubmitData, processType, visibleBtn, setVisibleBtn } = useJoinSubmitData();

  const {
    data: { submitData, visibleBtn, processType },
  } = useJoinDataContext();

  // const signup = async () => {
  //   const res = await fetch(constant.apiUrl + "api/user/register", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: submitData.email,
  //       password: submitData.password,
  //       nickname: submitData.nickName,
  //       gender: submitData.gender,
  //       birthYear: submitData.birthDay,
  //     }),
  //   });
  //   console.log(await res.json());
  // };

  // const nextBtn = () => {
  //   // if(processType === 0 && )
  // };

  return (
    <div>
      <nav className={styles.nav}>
        <button className={styles.back_btn}>
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
          <h1 className={styles.title}>Join</h1>
        </button>
      </nav>
      <main className={styles.container}>
        <h2 className={styles.h2}>
          {processType === 0 ? (
            <span>
              밸런스보드에서 사용할
              <br />
              이메일, 패스워드를 입력해주세요.
            </span>
          ) : processType === 1 ? (
            <span>
              밸런스보드에서 사용할
              <br />
              닉네임을 입력해주세요.
            </span>
          ) : processType === 2 ? (
            <span>
              {submitData.nickname}님,
              <br />
              성별을 알려주세요
            </span>
          ) : (
            <span>
              {submitData.nickname}님,
              <br />
              태어난 년도를 알려주세요
            </span>
          )}
        </h2>
        {processType === 0 ? (
          <SignupInputs />
        ) : processType === 1 ? (
          <JoinName />
        ) : processType === 2 ? (
          <JoinGenderSelect />
        ) : (
          <InputForm />
        )}

        <Button
          className={styles.submit_btn}
          bgColor={!visibleBtn ? "body_200" : "background_100"}
          border={!visibleBtn ? "gray" : "primary"}
        >
          <span className={`${styles.submit_btn_txt} ${visibleBtn && styles.primary_txt}`}>다음</span>
          <Image
            className={styles.ico}
            src={!visibleBtn ? "/direction-next-md.svg" : "/direction-next-md-primary.svg"}
            alt="오른쪽 화살표 아이콘"
            width={24}
            height={24}
          />
        </Button>
      </main>
    </div>
  );
}
