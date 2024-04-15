import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ILogin } from "@/modal/User";
import { constant } from "@/utils/constant";

export async function GET() {
  const cookieStore = cookies();
  let cookieAccessToken = "";
  let cookieRefreshToken = "";
  cookieStore.getAll().forEach((v) => {
    if (v.name === "token") {
      cookieAccessToken = v.value;
    }
    if (v.name === "refreshToken") {
      cookieRefreshToken = v.value;
    }
  });
  const res = await fetch(constant.apiUrl + "api/user/login/token", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookieAccessToken}`,
      refreshToken: cookieRefreshToken,
    },
    credentials: "include",
  });
  const data: ILogin = await res.json();
  if (data.message) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    return NextResponse.json({ data });
  }
  const token = data.accessToken;
  if (cookieStore.has("token")) {
    cookies().delete("token");
  }
  cookies().set("token", token);

  return NextResponse.json(data);
}
