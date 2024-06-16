"use client";
import "react-multi-carousel/lib/styles.css";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Carousel from "react-multi-carousel";

import PostCard from "@/app/_component/PostCard";
import { getHotPosts } from "@/app/home/_lib/getPosts";
import { IPost } from "@/modal/Post";
import { useAuthStore } from "@/stores/user";

export default function PostCarousel() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { data: posts } = useQuery<IPost[]>({
    queryKey: ["post", "hot", userInfo.isLogin],
    queryFn: () => {
      return getHotPosts(userInfo);
    },
  });
  const responsive = {
    desk: {
      breakpoint: { max: 4000, min: 576 },
      items: 1,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  return (
    <div className="mt-[25px]">
      {posts && (
        <Carousel
          centerMode={false}
          arrows={false}
          className="containerClass='w-full flex gap-2"
          responsive={responsive}
          draggable
          partialVisible={true}
        >
          {posts &&
            posts?.map((post, idx) => (
              <div key={post.postId + "hot" + idx} className="pr-[24px]">
                <PostCard post={post} />
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
}
