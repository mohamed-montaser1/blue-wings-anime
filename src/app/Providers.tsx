"use client";
import { CreatePostContext } from "@/context/CreatePostContext";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CreatePostContext>{children}</CreatePostContext>
    </SessionProvider>
  );
};
