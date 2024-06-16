import React from "react";

import PostCarousel from "./PostCarousel";

export default function PostHotContainer() {
  return (
    <div>
      <h2 className="main_header_title_5">이번주 HOT 글 🔥</h2>
      <p className="mt-[8px] body_2 text-body-800">지금 가장 이슈되고 있는 투표글 모음</p>
      <PostCarousel />
    </div>
  );
}
