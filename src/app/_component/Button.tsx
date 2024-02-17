import classNames from "classnames/bind";
import React, { ComponentPropsWithRef } from "react";

import styles from "./button.module.css";

interface IButton extends ComponentPropsWithRef<"button"> {
  bgColor?: "primary" | "background_100" | "background_200" | "body_200" | "secondary_300";
  rounded?: "none" | "rounded" | "large";
  border?: "none" | "primary" | "gray" | "orange";
  color?: "none" | "primary";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const cx = classNames.bind(styles);

export default function Button({
  bgColor = "primary",
  rounded = "rounded",
  fullWidth = true,
  border = "none",
  color = "none",
  children,
  className,
  ...props
}: IButton) {
  const style = cx("button", `bg_${bgColor}`, `color_${color}`, `radius_${rounded}`, `border_${border}`, {
    w_100: fullWidth,
  });
  return (
    <button className={`${style} ${className}`} {...props}>
      {children}
    </button>
  );
}
