import { UserRole } from "@/models/User";
import { Session } from "next-auth";
import { StaticImageData } from "next/image";
import { InternalLinkProps } from "next/link";
import { NextResponse } from "next/server";
import { AnchorHTMLAttributes } from "react";
import { type TPost as TPost } from "@models/Post";
import DateController from "@/utils/date";

export type TRole = "user" | "editor" | "artist" | "admin";

export type TProfile = {
  username: string;
  email: string;
  avatar: string;
};

export type TRegisterError = {
  response: {
    data: {
      error: boolean;
      message: string;
    };
  };
};

export type TDropdownOptionProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof InternalLinkProps
> & {
  icon: React.ReactNode;
  text: string;
  base?: boolean;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  imageProps?: {
    [key: string]: any;
  };
};

export type TDropdownMenuProps = {
  children: React.ReactNode;
  userName: string;
};

export type TUseUserReturn = {
  session: Session | null;
  user: Session["user"] & TUser;
  avatar: string | StaticImageData;
  status: "authenticated" | "loading" | "unauthenticated";
  updateSession(
    properties: Partial<TUser>,
    cb?: (session: Session | null) => void
  ): void;
};

export type TUser = {
  email: string;
  id: string;
  image: string | StaticImageData;
  cover: string | StaticImageData;
  name: string;
  role: TRole;
  createdAt: number;
};

export type TUseUserProps = {
  required: boolean;
};

export type TGlobalMongoose = typeof globalThis & {
  mongoose: any;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

export type UpdateSession = (data?: any) => Promise<Session | null>;

export type TCreateNewPostBody = {
  email: string;
  post: {
    text: string;
    images: string[];
  };
};

export type TCreateNewPostResponse = NextResponse<{
  success: boolean;
  error: string | null;
  data: TPost[] | null;
}>;

export type TDynamicAPIParams<Keys extends string[]> = {
  params: {
    [K in Keys[number]]: string;
  };
};
