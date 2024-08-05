import Image from "next/image";
import React from "react";
import { images } from "@public/banners";
import Link from "next/link";

export default function SocialMediaAccounts() {
  return (
    <div className="flex flex-col gap-3" style={{ gridArea: "social" }}>
      {images.map((img, i) => (
        <Link href={"#"} key={i}>
          <Image className="img-banner" src={img} alt="image" key={i} />
        </Link>
      ))}
    </div>
  );
}
