import React from "react";

import styles from "./modalContainer.module.css";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

export default function ModalContainer({ children, handleCloseModal }: Props) {
  return (
    <div onClick={handleCloseModal} className={styles.container}>
      {children}
    </div>
  );
}
