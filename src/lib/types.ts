import { Session } from "next-auth";
import { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";

export type TRole = "user" | "editor" | "artist" | "admin";

export type TProfile = {
  username: string;
  email: string;
  avatar: string;
};

export type TAuthenticatedUser = {
  name: string;
  email: string;
  image: string;
};

export type TRegisterError = {
  response: {
    data: {
      error: boolean;
      message: string;
    };
  };
};

export type TDropdownOptionProps = React.DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  icon: any;
  text: string;
};

export type TDropdownMenuProps = {
  children: React.ReactNode;
};

export type TUseUserReturn = {
  user: Session["user"] & TUser;
  avatar: string | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

export type TUser = {
  email: string;
  id: string;
  image: string | StaticImageData;
  name: string;
  role: TRole;
};

export type TUseUserProps = {
  required: boolean;
};

export type TGlobalMongoose = typeof globalThis & {
  mongoose: any;
};
