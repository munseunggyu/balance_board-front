import styles from "../../deleteInfo/_component/deleteInfo.module.css";

export default function DeleteLast() {
  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteHeader}>
        <p>아쉽지만</p>
        <p>다음에 또 만나요!</p>
      </div>
      <div className={styles.deleteSubTitle}>
        <span>밸런스보드를 이용해주셔서 감사합니다.</span>
      </div>
    </div>
  );
}
