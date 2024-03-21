"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import backPageImg from "../../../../public/direction-left-md.svg";
import styles from "../../deleteInfo/_component/deleteNav.module.css";

export default function DeleteLastNav() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.backPage}>
          <button onClick={handleBack}>
            <Image src={backPageImg} alt="홈으로 가기" width={24} height={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
