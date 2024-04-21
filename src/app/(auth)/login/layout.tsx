import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/app/globals.css";
import { NextAuthProvider } from "@/app/Providers";

const cairo = Cairo({ subsets: ["arabic"] });

const metadata: Metadata = {
  title: "Login Page",
  keywords: ["anime", "manga", "قصص مصورة", "مانجا", "مانها", "مانهوا"],
  authors: [
    {
      name: "Mohamed Montaser",
      url: "https://www.facebook.com/mohamed.montaser.170/",
    },
  ],
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
