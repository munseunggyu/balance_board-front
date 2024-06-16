import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Maintab } from "@/app/_component/Tabs";
import PostCardList from "@/app/home/_component/PostCardList";

import directon_gray_right from "../../../../public/direction-right-gray-sm.svg";

export default function MainCategoryList() {
  return (
    <div>
      <div className="px-[20px]">
        <h2 className="main_header_title_5">카테고리별로 보기 🔥</h2>
        <p className="mt-[8px] body_2 text-body-800">보고싶은 글만 쏙쏙 골라보기</p>
      </div>
      <Maintab />
      <Link
        href={{
          pathname: "/home",
        }}
        className="flex items-center mt-[16px] pr-[20px]"
      >
        <span className="ml-auto text-body-600 caption_txt_1">더보기</span>{" "}
        <Image src={directon_gray_right} width={18} height={18} alt="홈 화면 이동 버튼" />
      </Link>
      <PostCardList noVoteBtn={true} />
    </div>
  );
}
