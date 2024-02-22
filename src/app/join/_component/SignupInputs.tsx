"use client";
import React, { ChangeEvent } from "react";

import Input from "@/app/_component/Input";

import { useJoinDataContext } from "../_context/JoinContext";

export default function SignupInputs() {
  const { setDataField, setVisibleBtn } = useJoinDataContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleBtn(false);
    const { name, value } = e.target;
    setDataField(name, value);
  };
  return (
    <div>
      <Input onChange={handleChange} name="email" border={"body_500"} type="text" placeholder="이메일" />
      <Input onChange={handleChange} name="password" border={"body_500"} type="text" placeholder="패스워드" />
    </div>
  );
}
