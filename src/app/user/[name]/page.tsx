"use client";
import { Bio } from "@/components/Account";
import { Posts } from "@/components/Account/Posts";
import { TPost } from "@/models/Post";
import { TUser } from "@/models/User";
import { Container } from "@components";
import AccountInfo, { TAccountInfoUser } from "@components/Account/AccountInfo";
import axios from "axios";
import { useEffect, useState } from "react";

type TProps = {
  params: {
    name: string;
  };
};

export default function Page({ params: { name } }: TProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (!user) return;
    setPosts((user.posts as TPost[]).sort((a, b) => b.createdAt - a.createdAt));
  }, [user]);

  useEffect(() => {
    axios.get(`/api/user/${name}`).then((res) => {
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

  if (!user) return <h1>جاري تحميل معلومات المستخدم...</h1>;

  return (
    <Container>
      <AccountInfo user={user as TAccountInfoUser} />
      <div className="flex flex-col gap-4 relative">
        <Bio user={user as TUser} />
        <div className="flex items-center justify-center">
          <Posts posts={posts || []} />
        </div>
      </div>
    </Container>
  );
}
