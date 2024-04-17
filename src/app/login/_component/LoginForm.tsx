"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

import Input from "@/app/_component/Input";
import { ILogin } from "@/modal/User";
import { useAuthStore } from "@/stores/user";

import styles from "./loginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const storeLogin = useAuthStore((state) => state.storeLogin);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  // const disabledBtn = !form.email || !form.password;
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (form.email && form.password) {
      setDisabledBtn(false);
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
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
      if (data?.status === 400) {
        setErrMsg("아이디(이메일) 또는 비밀번호를 확인해주세요!");
        return;
      }
      if (data?.message) {
        setErrMsg(data.message);
        return false;
      }
      if (data.jwtToken) {
        storeLogin({
          ...data,
          isLogin: 1,
        });
        router.push("/");
      }
      return data;
    } catch (err) {
      console.error(err);
      setErrMsg("아이디(이메일) 또는 비밀번호를 확인해주세요!");
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.input_container}>
        <Input
          className={styles.input}
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="이메일"
          value={form.email}
        />
        {form.email && (
          <button
            type="button"
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
      <button
        type="submit"
        disabled={disabledBtn}
        className={`${styles.login_btn} ${!disabledBtn ? styles.active : ""}`}
      >
        로그인
      </button>
      <Link className={styles.link} href={"/join"}>
        이메일로 회원가입
      </Link>
    </form>
  );
}
