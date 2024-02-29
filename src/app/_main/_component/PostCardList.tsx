"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import LoginModal from "@/app/_component/LoginModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import PostCard from "@/app/_component/PostCard";
import { useUserDataContext } from "@/context/AuthContext";
import { useModal } from "@/hook/useModal";
import { IPost } from "@/modal/Post";

import { getCategoryPostList, getPostList } from "../_lib/getPosts";
import styles from "./postCartList.module.css";
import WriteFloating from "./WriteFloating";

// import styles from './post'
export default function PostCardList() {
  const { userInfo } = useUserDataContext();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const openLoginModal = () => {
    if (!userInfo.isLogin) {
      handleOpenMoal();
    }
  };

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
      if (allPages[allPages.length - 1].length / 20 < 1) {
        return undefined;
      }
      return allPages.length;
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
                  <PostCard openLoginModal={openLoginModal} post={post} />
                </li>
              ))}
            </Fragment>
          ))}
      </ul>
      <div ref={ref} style={{ height: 10, backgroundColor: "#FAFAFA" }} />
      <WriteFloating />
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <LoginModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
