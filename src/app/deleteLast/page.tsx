"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUserDataContext } from "@/context/AuthContext";

import balance_together from "../../../public/balance-together.svg";
import DeleteLast from "./_component/DeleteLast";
import DeleteLastNav from "./_component/DeleteLastNav";
import styles from "./deleteLast.module.css";

export default function DeleteLastPage() {
  const router = useRouter();
  const { userInfo } = useUserDataContext();

  const handleGoMain = () => {
    router.push("/");
  };

  return userInfo.isLogin === 1 ? (
    <div className={styles.deleteBox}>
      <DeleteLastNav />
      <DeleteLast />
      <Image src={balance_together} alt="밸런스보드 로그 이미지" width={320} height={160} className={styles.logoImg} />
      <div className={styles.deleteBtnContainer}>
        <button className={styles.deleteBtn} onClick={handleGoMain}>
          홈으로 가기
        </button>
      </div>
    </div>
  ) : null;
}
