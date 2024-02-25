"use client";
import { useEffect } from "react";

import JoinGenderSelect from "./_component/JoinGenderSelect";
import JoinName from "./_component/JoinName";
import JoinNav from "./_component/JoinNav";
import MultiInput from "./_component/MultiInput";
// import NextBtn from "./_component/NextBtn";
import SignupInputs from "./_component/SignupInputs";
import { useJoinDataContext } from "./_context/JoinContext";
import styles from "./join.module.css";

export default function Join() {
  const {
    data: { submitData, processType },
    setProcessType,
  } = useJoinDataContext();

  useEffect(() => {
    if (processType === 0) return;
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
      setProcessType(processType - 1);
    };
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, [processType]);
  return (
    <div>
      <JoinNav />
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
