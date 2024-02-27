"use client";
import React, { useEffect } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import { ILogin } from "../login/_component/LoginForm";

export default function TokenLoginComponent() {
  const { setUserData } = useUserDataContext();
  let token: string | null = null;
  if (typeof window !== "undefined") {
    // Client-side-only code
    token = localStorage.getItem("token");
  }

  const tokenLogin = async () => {
    if (!token) return;
    const res = await fetch(constant.apiUrl + "api/user/login/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
      },
    });
    const data: ILogin = await res.json();
    if (data.jwtToken) {
      setUserData({
        ...data,
        isLogin: true,
      });
    }
  };
  useEffect(() => {
    void tokenLogin();
  }, []);
  return <></>;
}
