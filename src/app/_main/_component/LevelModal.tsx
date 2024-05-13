import Image from "next/image";

import Default from "../../../../public/default.svg";
import styles from "./levelmodal.module.css";

interface ILevelModalProps {
  header: string;
  levelHeader: string;
  children: React.ReactNode;
  buttonContent: string;
}

export default function LevelModal({ header, levelHeader, children, buttonContent }: ILevelModalProps) {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>{header}</div>
      <Image src={Default} width={80} height={80} alt="레벨업 이미지" />
      <div className={styles.LevelHeader}>{levelHeader}</div>
      <div className={styles.levelContent}>{children}</div>
      <button className={styles.button}>{buttonContent}</button>
      <p className={styles.close}>닫기</p>
    </div>
  );
}
