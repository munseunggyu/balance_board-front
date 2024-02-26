"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import PostCard from "@/app/_component/PostCard";
import { IPost } from "@/modal/Post";

import { getCategoryPostList, getPostList } from "../_lib/getPosts";
import styles from "./postCartList.module.css";
import WriteFloating from "./WriteFloating";

// import styles from './post'
export default function PostCardList() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { data, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery<IPost[], Error>({
    queryKey: ["posts", "all", tab],
    queryFn: async ({ pageParam }) => {
      const hey = pageParam as number;
      if (!tab || tab === "전체") {
        return await getPostList({ pageParam: hey });
      } else {
        return await getCategoryPostList({ pageParam: hey, category: tab });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 10,
  });
  const test = () => {
    void fetchNextPage();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        console.log("aslkfn");
        void fetchNextPage();
      }
      // void !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {}, [tab]);
  if (isPending) {
    <div>loading 중...</div>;
    return;
  }

  return (
    <div>
      <ul className={styles.card_container}>
        <button onClick={test}>tes</button>
        {mounted &&
          data?.pages &&
          data?.pages.map((v, i) => (
            <Fragment key={i}>
              {v.map((post) => (
                <li className={styles.card_list} key={post.postId}>
                  <PostCard post={post} />
                </li>
              ))}
            </Fragment>
          ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
      <WriteFloating />
    </div>
  );
}
