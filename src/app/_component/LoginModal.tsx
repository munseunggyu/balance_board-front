import Image from "next/image";

import styles from "./modal.module.css";

export default function LoginModal() {
  return (
    <div className={styles.loginModal}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image src="/Image7.png" alt="Login ModalImage" width={72} height={72} />
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
              <span>구글 계정으로 3초만에 로그인</span>
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
