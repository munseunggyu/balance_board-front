"use client";
import Image from "next/image";
import { useEffect } from "react";

import JoinGenderSelect from "./_component/JoinGenderSelect";
import JoinName from "./_component/JoinName";
import MultiInput from "./_component/MultiInput";
// import NextBtn from "./_component/NextBtn";
import SignupInputs from "./_component/SignupInputs";
import { useJoinDataContext } from "./_context/JoinContext";
import styles from "./join.module.css";

export default function Join() {
  // const { submitData, setSubmitData, processType, visibleBtn, setVisibleBtn } = useJoinSubmitData();

  const {
    data: { submitData, processType },
    setProcessType,
  } = useJoinDataContext();

  // if (processType === 0 && visibleBtn) {
  //   setNowVisibleBtn(true);
  // }

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

  useEffect(() => {
    if (processType === 0) return;
    console.log("hi");
    const preventGoBack = () => {
      // change start
      history.pushState(null, "", location.href);
      setProcessType(processType - 1);
      // change end
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, [processType]);
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
          <MultiInput />
        )}

        {/* <NextBtn /> */}
      </main>
    </div>
  );
}
