import React from "react";

import MainLayout from "../_main/page";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainLayout isHome={true}>{children}</MainLayout>;
}
