import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ILogin } from "@/modal/User";
import { constant } from "@/utils/constant";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const res = await fetch(constant.apiUrl + "api/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data: ILogin = await res.json();
  if (data?.message || !data.jwtToken) {
    return NextResponse.json({ data });
  }
  const token = data.jwtToken.accessToken;
  const refreshToken = data.jwtToken.refreshToken;
  const tokenDecode = jwtDecode(token);
  const refreshTokenDecode = jwtDecode(refreshToken);
  if (!tokenDecode.exp) return NextResponse.json({ data });
  if (!refreshTokenDecode.exp) return NextResponse.json({ data });

  const refreshTokenTime = dayjs.unix(refreshTokenDecode.exp).toDate();

  cookies().set("token", token);
  cookies().set("refreshToken", refreshToken, { expires: refreshTokenTime });

  return NextResponse.json({
    ...data,
    accessToken: data.jwtToken.accessToken,
  });
}
