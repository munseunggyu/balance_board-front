"use client";
import React, { ChangeEvent } from "react";

import Input from "@/app/_component/Input";

import { ISetSumbitProps } from "../page";

export default function SignupInputs({ setSubmitData, setVisibleBtn }: ISetSumbitProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleBtn((prev) => !prev);
    const { name, value } = e.target;
    setSubmitData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  return (
    <div>
      <Input onChange={handleChange} name="email" border={"body_500"} type="text" placeholder="이메일" />
      <Input onChange={handleChange} name="password" border={"body_500"} type="text" placeholder="패스워드" />
    </div>
  );
}
