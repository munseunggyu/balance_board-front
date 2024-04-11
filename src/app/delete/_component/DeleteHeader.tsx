import styles from "./deleteHeader.module.css";

type IDeleteProps = {
  headerMainText: string;
  headerSubText: string;
  subText: string;
};

export default function DeleteHeader({ headerMainText, headerSubText, subText }: IDeleteProps) {
  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteHeader}>
        <p>{headerMainText}</p>
        <p>{headerSubText}</p>
      </div>
      <div className={styles.deleteSubTitle}>
        <span>{subText}</span>
      </div>
    </div>
  );
}
