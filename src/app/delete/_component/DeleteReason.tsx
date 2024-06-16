"use client";
import { useAuthStore } from "@/stores/user";

import DeleteHeader from "./DeleteHeader";
import styles from "./deleteInfo.module.css";
import DeleteNav from "./DeleteNav";

export default function DeleteReason() {
  const userInfo = useAuthStore((state) => state.userInfo);

  return userInfo.isLogin === 1 ? (
    <>
      <DeleteNav />
      <div className={styles.deleteContainer}>
        <DeleteHeader
          headerMainText="밸런스보드를"
          headerSubText="탈퇴하려는 이유를 알려주세요."
          subText="여러분의 소중한 의견은 서비스 발전에 큰 도움이 돼요."
        />
      </div>
    </>
  ) : null;
}
