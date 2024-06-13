import "./globals.css";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";

import { AuthContextProvider } from "@/context/AuthContext";

import AdbyGoogle from "./_component/AdbyGoogle";
import KakaoScript from "./_component/KakaoScript";
import Loading from "./_component/Loading";
import RQProvider from "./_component/RQProvider";
import TokenLoginComponent from "./_component/TokenLoginComponent";

export const metadata: Metadata = {
  title: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
  description: "나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요",
  openGraph: {
    title: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
    description: "나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요",
    siteName: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  const cookieStore = cookies();
  cookieStore.getAll().forEach((v) => {
    if (v.name === "token") {
      accessToken = v.value;
    }
    if (v.name === "refreshToken") {
      refreshToken = v.value;
    }
  });
  return (
    <html lang="en">
      <Script src="https://cdn.swygbro.com/public/widget/swyg-widget.js" />
      <body>
        <RQProvider>
          <AuthContextProvider>
            <Suspense fallback={<Loading />}>
              <TokenLoginComponent accessToken={accessToken} refreshToken={refreshToken} />
              <div className="root_container">{children}</div>
            </Suspense>
          </AuthContextProvider>
        </RQProvider>
        <div id="portal" />
        <KakaoScript />
        <AdbyGoogle />
      </body>
    </html>
  );
}
