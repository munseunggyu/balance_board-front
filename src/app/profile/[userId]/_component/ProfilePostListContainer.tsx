"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { getProfilePostData } from "../_lib/getProfilePostData";
import { IProfilePost } from "../page";
import ProfilePostCard from "./ProfilePostCard";
import styles from "./profilePostListContainer.module.css";
export default function ProfilePostListContainer({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const profileTab = Number(searchParams.get("profileTab")) || 1;
  const [mounted, setMounted] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<IProfilePost[], Error>({
    queryKey: ["profile", "post", userId, Number(profileTab)],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const hey = await getProfilePostData(userId, Number(profileTab), page);
      return hey.profilePosts;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("allPages", allPages);
      if (allPages[allPages.length - 1].length / 10 < 1) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 10,
  });
  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <ul className={styles.post_ul}>
        {mounted &&
          data?.pages &&
          data.pages.map((v, i) => (
            <Fragment key={i}>
              {v.map((post) => (
                <li key={`${post.postId} - ${i}`} className={styles.post_list}>
                  <ProfilePostCard profilePostData={post} userId={userId} />
                </li>
              ))}
            </Fragment>
          ))}
      </ul>
      <div ref={ref} style={{ height: 10, backgroundColor: "#FAFAFA" }} />
    </div>
  );
}
