import Image from "next/image";
import { useRouter } from "next/navigation";

import warning from "../../../../../public/warning_icon.svg";
import styles from "./detail.module.css";

interface IProps {
  handleCloseModal: () => void;
}

export default function DetailModal({ handleCloseModal }: IProps) {
  const router = useRouter();

  return (
    <div className={styles.DetailModalContainer}>
      <div className={styles.ContentContainer}>
        <div className={styles.DetailImageContainer}>
          <Image src={warning} width={72} height={72} alt="경고 이미지" />
        </div>
        <div className={styles.ContentHeader}>
          <p>앗, 비회원은</p>
          <p>투표가 반영되지 않아요</p>
        </div>
        <p className={styles.Share}>회원가입 후 여러분의 의견을 공유해주세요!</p>
        <div className={styles.BtnContainer}>
          <button
            className={styles.BtnFirst}
            onClick={() => {
              router.push("../login");
            }}
          >
            3초만에 회원가입
          </button>
          <button className={styles.BtnSecond} onClick={handleCloseModal}>
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}
