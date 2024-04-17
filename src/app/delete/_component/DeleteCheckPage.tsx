"use client";

import { useState } from "react";

import DeleteCheckInfo from "./DeleteCheckInfo";
import styles from "./deleteInfo.module.css";

interface IDeleteCheckPageProps {
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCheckPage({ userPassword, setUserPassword, isError, setIsError }: IDeleteCheckPageProps) {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true);

  return (
    <div className={styles.deleteBox}>
      <DeleteCheckInfo
        isPasswordCorrect={isPasswordCorrect}
        setIsPasswordCorrect={setIsPasswordCorrect}
        password={userPassword}
        setPassword={setUserPassword}
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
}
