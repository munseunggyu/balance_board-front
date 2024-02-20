import Image from "next/image";

import styles from "./modal.module.css";

interface QuestionModalProps {
  question: string;
  sign: string;
  continueText: string;
  cancelText: string;
  imageUrl: string;
}

export default function QuestionModal({ question, sign, continueText, cancelText, imageUrl }: QuestionModalProps) {
  return (
    <div className={styles.questionModal}>
      <div className={styles.modalContent}>
        <div className={styles.questionModalContent}>
          <p>{question}</p>
          <Image src={imageUrl} alt="Tear-face" width={24} height={24} />
        </div>
        <div className={styles.signModalContent}>
          <p>{sign}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
          <button className={styles.questionButton}>
            <span>{continueText}</span>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>
            <span>{cancelText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
