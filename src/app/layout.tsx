import "./globals.css";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";

import { AuthContextProvider } from "@/context/AuthContext";

import AdbyGoogle from "./_component/AdbyGoogle";
import Loading from "./_component/Loading";
import RQProvider from "./_component/RQProvider";
import TokenLoginComponent from "./_component/TokenLoginComponent";

export const metadata: Metadata = {
  title: "밸런스 보드",
  description: "개인적인 고민부터 사회적인 이슈까지, 세상의 모든 이슈에 투표할 수 있는 투표 특화 커뮤니티 사이트",
  openGraph: {
    title: "밸런스 보드",
    description: "개인적인 고민부터 사회적인 이슈까지, 세상의 모든 이슈에 투표할 수 있는 투표 특화 커뮤니티 사이트",
    images: [
      {
        url: "https://github.com/chabssaltteog/balance_board-front/assets/84954439/ce020331-b423-415e-869f-1ac4e50c0d58",
        width: 1900,
        height: 600,
      },
    ],
    siteName: "밸런스 보드",
    type: "website",
  },
  verification: {
    google: "bB7ciRMYMuHjwrvCu4ZkQbv8j_yB5HCRtNdtzcmISYY",
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
        <AdbyGoogle />
      </body>
    </html>
  );
}
