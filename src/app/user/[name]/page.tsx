"use client";
import { Container } from "@components";
import AccountInfo, { TAccountInfoUser } from "@components/Account/AccountInfo";
import useFetch from "@hooks/useFetch";
import { TUser } from "@models/User";
import { useEffect, useState } from "react";
import { Bio } from "@/components/Account";
import { CreatePost, Posts } from "@/components/Account/Posts";
import useUser from "@/hooks/useUser";
import { TPost } from "@/models/Post";

type TProps = {
  params: {
    name: string;
  };
};

export default function Page({ params: { name } }: TProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<TPost[]>([]);
  const { user: session_user } = useUser({ required: false });

  useEffect(() => {
    if (!user) return;
    setPosts((user.posts as TPost[]).sort((a, b) => b.createdAt - a.createdAt));
  }, [user]);

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
    });
  }, []);

  if (error) {
    return (
      <h1 className="text-slate-200 text-4xl text-center mt-10">{error}</h1>
    );
  }

  return (
    <Container>
      <AccountInfo user={user as TAccountInfoUser} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <Bio user={user as TUser} />
        <div>
          {session_user?.email === user?.email && (
            <CreatePost setPosts={setPosts} user={user as TUser} />
          )}
          <Posts posts={posts || []} />
        </div>
      </div>
    </Container>
  );
}
