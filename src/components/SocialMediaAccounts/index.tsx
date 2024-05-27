import Image from "next/image";
import React from "react";
import { images } from "@public/banners";

export default function SocialMediaAccounts() {
  return (
    <div className="flex flex-col gap-3" style={{ gridArea: "social" }}>
      {images.map((img) => (
        <Image className="img-banner" src={img} alt="image" />
      ))}
    </div>
  );
}
