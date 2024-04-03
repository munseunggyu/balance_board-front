"use client";

import styles from "../delete.module.css";
import DeleteInfo from "./DeleteInfo";

interface IDeleteInfoPageProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteInfoPage({ isChecked, setIsChecked }: IDeleteInfoPageProps) {
  return (
    <div className={styles.deleteBox}>
      <DeleteInfo isChecked={isChecked} setIsChecked={setIsChecked} />
      <div className={styles.deleteBtnContainer}></div>
    </div>
  );
}
