"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";

import directon_right from "../../../public/direction-right-md.svg";
import SettingNav from "./_component/SettingNav";
import styles from "./setting.module.css";

export default function Page() {
  const router = useRouter();

  const userInfo = useAuthStore((state) => state.userInfo);
  const storeLogout = useAuthStore((state) => state.storeLogout);

  const handleLogoutBtn = async () => {
    await fetch(constant.baseUrl + "api/logout", {
      method: "GET",
    });

    storeLogout();
    router.push("/");
  };

  const handleGoToDeleteBtn = () => {
    router.push("/delete");
  };

  return (
    <div className={styles.settingBox}>
      {userInfo.isLogin === 1 ? (
        <>
          <SettingNav title={"Setting"} />
          <div className={styles.settingContainer}>
            <div className={styles.changeBirthContainer}>
              <div className={styles.changeBirth}>
                <span>출생 연도 변경</span>
              </div>
              <Image src={directon_right} alt="출생 연도 변경 이미지" width={24} height={24} />
            </div>
            <div className={styles.userActionsContainer}>
              <button className={styles.logoutBtn} onClick={handleLogoutBtn}>
                로그아웃
              </button>
              <button className={styles.deleteBtn} onClick={handleGoToDeleteBtn}>
                회원탈퇴
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
