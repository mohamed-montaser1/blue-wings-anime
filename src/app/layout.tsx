import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/app/globals.css";
import { NextAuthProvider } from "@/app/Providers";
import Navbar from "@/components/Navbar";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Blue Wings Manga",
  description: "Generated by create next app",
  keywords: ["anime", "manga", "قصص مصورة", "مانجا", "مانها", "مانهوا"],
  authors: [
    {
      name: "Mohamed Montaser",
      url: "https://www.facebook.com/mohamed.montaser.170/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-page`}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
