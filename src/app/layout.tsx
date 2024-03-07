import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

import { AuthContextProvider } from "@/context/AuthContext";

import RQProvider from "./_component/RQProvider";
import TokenLoginComponent from "./_component/TokenLoginComponent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "밸런스 보드",
  description: "개인적인 고민부터 사회적인 이슈까지, 세상의 모든 이슈에 투표할 수 있는 투표 특화 커뮤니티 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.swygbro.com/public/widget/swyg-widget.js" />
      <body>
        <RQProvider>
          <AuthContextProvider>
            <Suspense
              fallback={
                <div className={styles.spinnerWrapper}>
                  <BarLoader color="#36d7b7" />
                </div>
              }
            >
              <TokenLoginComponent />
              <div className="root_container">{children}</div>
            </Suspense>
          </AuthContextProvider>
        </RQProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
