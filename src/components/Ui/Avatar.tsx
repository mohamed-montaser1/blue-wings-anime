import { nanoid } from "nanoid";
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
      src={image || "/default-profile.jpg"}
      width={size}
      height={size}
      alt={`user-image-${nanoid()}`}
      className={`rounded-full mx-auto aspect-square object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
