"use client";
import { Avatar, Container } from "@components";
import AccountInfo, { roles } from "@components/Account/AccountInfo";
import useFetch from "@hooks/useFetch";
import { TRole } from "@lib/types";
import { TUser } from "@models/User";
import { useEffect, useState } from "react";
import { Bio } from "@/components/Account";
import { PostedPosts } from "@/components/Account/Posts";

type TProps = {
  params: {
    name: string;
  };
};

export default function Page({ params: { name } }: TProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    useFetch<{}, { user: TUser; error?: string }>(
      `/api/user/${name}`,
      "GET",
      {}
    ).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      setUser(res.data.user);
      console.log({ posts: res.data.user.posts, user: res.data.user });
    });
  }, []);

  if (error) {
    return (
      <h1 className="text-slate-200 text-4xl text-center mt-10">{error}</h1>
    );
  }

  return (
    <Container>
      <AccountInfo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <Bio />
        <PostedPosts posts={user?.posts || []} />
      </div>
    </Container>
  );
}
