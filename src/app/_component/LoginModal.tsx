import Image from "next/image";

import styles from "./modal.module.css";

interface IProps {
  handleCloseModal: () => void;
}

export default function LoginModal({ handleCloseModal }: IProps) {
  console.log(handleCloseModal);
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.loginModal} onClick={handleStopPropagation}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image src="/go-home.png" alt="Login ModalImage" width={115} height={95} />
        </div>
        <div className={styles.easyloginMessage}>
          <p>간편 로그인으로 더 많은</p>
          <p>활동을 할 수 있어요.</p>
        </div>
        <div className={styles.shareloginMessage}>
          <p>밸런스보드에서 다양한 의견을 공유해보세요</p>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonContainer}>
            <button className={styles.loginButton}>
              <span>이메일 로그인</span>
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.nextLoginButton}>
              <span>다음에 할게요</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
