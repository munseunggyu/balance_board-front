import React from "react";

import MainPostsListContainer from "./_main/_component/MainPostsListContainer";
import MainLayout from "./_main/page";

export default function Home() {
  return (
    <MainLayout isHome={false}>
      <MainPostsListContainer />
    </MainLayout>
  );
}
