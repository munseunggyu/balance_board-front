import classNames from "classnames/bind";
import React from "react";

import styles from "./tag.module.css";

const cx = classNames.bind(styles);

interface IProps {
  color?: "basic" | "primary";
  className?: string;
  tagName: string;
}

export default function Tag({ color = "basic", className, tagName }: IProps) {
  const style = cx(color);
  return <div className={`${styles.tag} ${style} ${className}`}>{tagName}</div>;
}
