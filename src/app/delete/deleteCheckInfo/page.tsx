"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import DeleteNav from "../_component/DeleteNav";
import styles from "../deleteInfo/delete.module.css";
import DeleteCheckInfo from "./_component/DeleteCheckInfo";

export default function DeleteCheckPage() {
  const router = useRouter();
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);
  const [userPassword, setUserPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(true);
  const { userInfo } = useUserDataContext();

  const handleGoToLast = () => {
    router.push("/delete/deleteLast");
  };

  const handleWithdrawal = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(constant.apiUrl + "api/user/withdrawal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: userPassword }),
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        userInfo.isLogin = 2;
        handleGoToLast();
      } else {
        setIsError(false);
      }
    } catch (error) {
      console.error("회원 탈퇴 오류", error);
    }
  };

  return (
    <div className={styles.deleteBox}>
      <DeleteNav />
      <DeleteCheckInfo
        isPasswordCorrect={isPasswordCorrect}
        setIsPasswordCorrect={setIsPasswordCorrect}
        password={userPassword}
        setPassword={setUserPassword}
        isError={isError}
        setIsError={setIsError}
      />
      <div className={styles.deleteBtnContainer}>
        <button className={styles.deleteBtn} onClick={handleWithdrawal}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
