import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/app/globals.css";
import { NextAuthProvider } from "@/app/Providers";
import Navbar from "@/components/Navbar";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: {
    template: "Blue Wings | %s",
    default: "Blue Wings Manga",
  },
  description: "Generated by create next app",
  keywords: ["anime", "manga", "قصص مصورة", "مانجا", "مانها", "مانهوا"],
  authors: [
    {
      name: "Mohamed Montaser",
      url: "https://www.facebook.com/mohamed.montaser.170/",
    },
  ],
};

type TProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-page`}>
        <NextAuthProvider>
          {/* <Suspense fallback={<Loading />}> */}
          <Navbar />
          {children}
          {/* </Suspense> */}
        </NextAuthProvider>
      </body>
    </html>
  );
}
