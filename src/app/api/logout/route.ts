import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  const cookieStore = cookies();

  if (cookieStore.has("token")) {
    cookies().delete("token");
  }
  if (cookieStore.has("refreshToken")) {
    cookies().delete("refreshToken");
  }

  return NextResponse.json({
    message: "logout",
  });
}
