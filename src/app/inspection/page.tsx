import Image from "next/image";

import inspection_Image from "../../../public/inspectionImage.svg";
import SettingNav from "../setting/_component/SettingNav";
import styles from "./inspection.module.css";

export default function Inspection() {
  return (
    <div className={styles.inspectionBox}>
      <SettingNav />
      <div className={styles.inspectionContainer}>
        <div className={styles.inspectionHeader}>
          <p>지금은 점검 시간이에요.</p>
        </div>
        <div className={styles.inspectionSubTitle}>
          <p>더욱 나은 서비스 제공을 위해 시스템 점검을 진행하고 있어요.</p>
          <p>점검이 끝나면 다시 방문해주세요.</p>
        </div>
        <div className={styles.inspectionTimeContainer}>
          <p>점검시간</p>
          <p>: 2024년 3월 21일 06:00~08:00</p>
        </div>
        <Image src={inspection_Image} alt="점검 이미지" width={200} height={170} className={styles.logoImg} />
        <div className={styles.inspectionBtnContainer}>
          <button className={styles.inspectionBtn}>확인했어요</button>
        </div>
      </div>
    </div>
  );
}
