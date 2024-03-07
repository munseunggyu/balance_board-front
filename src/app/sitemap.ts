import { MetadataRoute } from "next";

import { IAuth } from "@/context/AuthContext";
import { IPost } from "@/modal/Post";

import { getPostList } from "./_main/_lib/getPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const user: IAuth = {
    email: "",
    jwtToken: {
      accessToken: "",
      refreshToken: "",
    },
    nickname: "",
    userId: 1,
    isLogin: 0,
    imageType: 1,
  };
  const postList: IPost[] = await getPostList({ pageParam: 1, userInfo: user, size: 100 });

  const postEntries: MetadataRoute.Sitemap = postList.map((v) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/postDetail/${v.postId}`,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
