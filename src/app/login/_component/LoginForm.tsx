"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import { constant } from "@/utils/constant";

import styles from "./loginForm.module.css";

export interface ILogin {
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
  const disabledBtn = !form.email || !form.password;
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      return false;
    }
    if (data.jwtToken) {
      localStorage.setItem("token", data.jwtToken?.accessToken);
      router.push("/");
    }
    return data;
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.input_container}>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="email"
          border={"body_500"}
          type="text"
          placeholder="이메일"
          value={form.email}
        />
        {form.email && (
          <button
            onClick={() =>
              setForm((prev) => {
                return { ...prev, email: "" };
              })
            }
          >
            <Image className={styles.ico} src="/x-circle-md.svg" alt="닫기 아이콘" width={24} height={24} />
          </button>
        )}
      </div>
      <div className={styles.input_container}>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="password"
          border={"body_500"}
          type="password"
          placeholder="비밀번호"
          value={form.password}
        />
        {form.password && (
          <button
            type="button"
            onClick={() =>
              setForm((prev) => {
                return { ...prev, password: "" };
              })
            }
          >
            <Image className={styles.ico} src="/x-circle-md.svg" alt="닫기 아이콘" width={24} height={24} />
          </button>
        )}
        {errMsg && <p className={styles.err_msg}>아이디(이메일) 또는 비밀번호를 확인해주세요!</p>}
      </div>
      <Button
        disabled={disabledBtn}
        rounded={"large"}
        className={`${styles.login_btn} ${!disabledBtn ? styles.active : ""}`}
      >
        로그인
      </Button>
      <Link className={styles.link} href={"/join"}>
        이메일로 회원가입
      </Link>
    </form>
  );
}
