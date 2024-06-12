import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: string | StaticImageData;
  size: number;
  className?: string;
};

export default function Avatar({ image, size, className }: Props) {
  return (
    <Image
      src={image || "/uploads/profiles-pictures/default.jpg"}
      width={size}
      height={size}
      alt="user-image"
      className={`rounded-full mx-auto aspect-square object-cover ${className}`}
    />
  );
}
