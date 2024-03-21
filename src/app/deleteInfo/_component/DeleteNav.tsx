"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import backPageImg from "../../../../public/direction-left-md.svg";
import styles from "./deleteNav.module.css";

export default function DeleteNav() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.backPage}>
          <button onClick={handleBack}>
            <Image src={backPageImg} alt="뒤로 가기 버튼" width={24} height={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
