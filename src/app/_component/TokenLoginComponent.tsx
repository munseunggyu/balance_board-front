/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";

import { ILogin } from "@/modal/User";
import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";
interface IProps {
  accessToken: string | null;
  refreshToken: string | null;
}

export default function TokenLoginComponent({ accessToken, refreshToken }: IProps) {
  const storeLogin = useAuthStore((state) => state.storeLogin);
  const storeLogout = useAuthStore((state) => state.storeLogout);

  const tokenLogin = async () => {
    if (!accessToken || !refreshToken) {
      await fetch(constant.baseUrl + "api/logout", {
        method: "GET",
      });
      storeLogout();
      return;
    }
    const res = await fetch(constant.baseUrl + "api/refresh/token", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
      },
      credentials: "include",
    });
    const data: ILogin = await res.json();
    if (data.message) {
      await fetch(constant.baseUrl + "api/logout", {
        method: "GET",
      });
      storeLogout();
      return;
    }
    if (data.accessToken) {
      storeLogin({
        ...data,
        isLogin: 1,
        withoutLogin: 0,
      });
    } else {
      storeLogout();
    }
  };

  /**
   *
   * @param type 1. token 2. refreshToken
   */
  const checktokenValidation = (type: number, token: string) => {
    if (!token) return false;
    const res = jwtDecode(token);
    const exp = res.exp;
    if (!exp) return false;
    let tokenTime;
    if (type === 1) {
      tokenTime = dayjs.unix(exp).subtract(10, "minute");
    } else {
      tokenTime = dayjs.unix(exp);
    }
    const isBefore = tokenTime.isBefore(dayjs());
    return isBefore;
  };
  const tokenCheck = async () => {
    if (!accessToken || !refreshToken) {
      await fetch(constant.baseUrl + "api/logout", {
        method: "GET",
      });
      storeLogout();
      return;
    }
    // const tokenValidation = checktokenValidation(1, accessToken);
    // if (!firstLoad) {
    //   if (!tokenValidation) return;
    // }
    // setFirstLoad(false);

    const refreshTokenValidation = checktokenValidation(2, refreshToken);
    if (refreshTokenValidation) {
      // 로그아웃
      void fetch(constant.baseUrl + "api/logout", {
        method: "GET",
      });
      storeLogout();
    } else {
      void tokenLogin();
    }
  };
  useEffect(() => {
    void tokenCheck();
    const interval = setInterval(
      () => {
        void tokenCheck();
      },
      5 * 60 * 1000,
    ); // 5분에 한 번씩 실행되도록 설정

    return () => clearInterval(interval);
  }, []);
  return <></>;
}
