"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import { constant } from "@/utils/constant";

interface ILogin {
  email: string;
  password: string;
  message?: string;
  jwtToken?: {
    accessToken: string;
  };
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<ILogin> => {
    e.preventDefault();
    const res = await fetch(constant.apiUrl + "api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });
    const data: ILogin = await res.json();
    if (data?.message) {
      setErrMsg(data.message);
    }
    if (data.jwtToken) {
      localStorage.setItem("token", data.jwtToken?.accessToken);
      router.push("/");
    }
    return data;
  };
  return (
    <form onSubmit={onSubmit}>
      <Input onChange={handleChange} name="email" border={"body_500"} type="text" placeholder="이메일" />
      <Input onChange={handleChange} name="password" border={"body_500"} type="text" placeholder="패스워드" />
      <Button>로그인</Button>
      {errMsg}
    </form>
  );
}
