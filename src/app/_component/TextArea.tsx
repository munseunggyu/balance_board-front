import React, { ChangeEventHandler } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import styles from "./textarea.module.css";

interface IProps {
  placeholder: string;
  maxRows?: number;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TextArea({ placeholder, maxRows = 2, value, onChange }: IProps) {
  return (
    <ReactTextareaAutosize onChange={onChange} value={value} className={`${styles.textarea}`} maxRows={maxRows}>
      {placeholder}
    </ReactTextareaAutosize>
  );
}
