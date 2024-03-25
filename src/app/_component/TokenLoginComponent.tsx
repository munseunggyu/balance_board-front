"use client";
import React, { useEffect } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

interface IToken {
  email: string;
  accessToken: string;
  userId: number;
  imageType: number;
  nickname: string;
}

export default function TokenLoginComponent() {
  const { setUserData } = useUserDataContext();
  let token: string | null = null;
  let refreshToken: string | null = null;
  if (typeof window !== "undefined") {
    // Client-side-only code
    token = localStorage.getItem("token");
    refreshToken = localStorage.getItem("refreshToken");
  }

  const tokenLogin = async () => {
    console.log(token, refreshToken);
    if (!token || !refreshToken) {
      setUserData({
        email: "",
        jwtToken: {
          accessToken: "",
          refreshToken: "",
        },
        nickname: "",
        userId: 0,
        isLogin: 2,
        imageType: 0,
      });
      return;
    }
    const res = await fetch(constant.apiUrl + "api/user/login/token", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
      credentials: "include",
    });
    const data: IToken = await res.json();
    const userData = {
      ...data,
      jwtToken: {
        accessToken: data.accessToken,
        refreshToken,
      },
    };
    if (data.accessToken) {
      setUserData({
        ...userData,
        isLogin: 1,
      });
    } else {
      setUserData({
        ...userData,
        isLogin: 2,
      });
    }
  };
  useEffect(() => {
    void tokenLogin();
  }, []);
  return <></>;
}
