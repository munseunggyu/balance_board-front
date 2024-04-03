"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import DeleteCheckPage from "./_component/DeleteCheckPage";
import DeleteInfoPage from "./_component/DeleteInfoPage";
import DeleteLastPage from "./_component/DeleteLastPage";
import DeleteNav from "./_component/DeleteNav";
import styles from "./delete.module.css";

export default function DeletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const [step, setStep] = useState<number>(stepParam ? Number(stepParam) : 1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [userPassword, setUserPassword] = useState<string>("");
  const { userInfo } = useUserDataContext();

  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const handleNext = async () => {
    if (step < 2) {
      const nextStep = step + 1;
      setStep(nextStep);
      router.push(`/delete/?step=${nextStep}`);
    } else if (step === 2) {
      try {
        const res = await fetch(constant.apiUrl + "api/user/withdrawal", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.jwtToken.accessToken}`,
          },
          body: JSON.stringify({ password: userPassword }),
        });
        if (res.status === 200) {
          userInfo.isLogin = 2;
          await fetch(constant.apiUrl + "api/logout", {
            method: "GET",
          });
          const nextStep = step + 1;
          setStep(nextStep);
          router.push(`/delete/?step=${nextStep}`);
        } else {
          setIsError(false);
        }
      } catch (error) {
        console.error("회원 탈퇴 오류", error);
      }
    } else {
      router.push("/");
    }
  };

  let pageContent = <DeleteInfoPage isChecked={isChecked} setIsChecked={setIsChecked} />;
  let BtnContent = "다음";

  if (step === 2) {
    pageContent = (
      <DeleteCheckPage
        userPassword={userPassword}
        setUserPassword={setUserPassword}
        isError={isError}
        setIsError={setIsError}
      />
    );
    BtnContent = "탈퇴하기";
  } else if (step === 3) {
    pageContent = <DeleteLastPage />;
  }

  return (
    <div className={styles.deleteBox}>
      <DeleteNav />
      {pageContent}
      <div className={styles.deleteBtnContainer}>
        {step === 1 ? (
          <button
            className={`${styles.deleteCheckBtn} ${isChecked ? styles.checkedBtn : ""}`}
            disabled={!isChecked}
            onClick={handleNext}
          >
            {BtnContent}
          </button>
        ) : step === 2 ? (
          <button className={`${styles.deleteBtn} ${userPassword ? styles.warningBtn : ""}`} onClick={handleNext}>
            탈퇴하기
          </button>
        ) : (
          <button className={styles.deleteGoBtn} onClick={handleNext}>
            홈으로 가기
          </button>
        )}
      </div>
    </div>
  );
}
