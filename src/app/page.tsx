import React from "react";

import MainLayout from "./_main/page";

export default function Home({ children }: { children: React.ReactNode }) {
  return <MainLayout isHome={false}>{children}</MainLayout>;
}
