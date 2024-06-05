import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: string | StaticImageData;
  width: number;
  height: number;
  className?: string;
};

export default function Avatar({ image, width, height, className }: Props) {
  return (
    <Image
      src={image || "/uploads/profiles-pictures/default.jpg"}
      width={width}
      height={height}
      alt="user-image"
      className={`rounded-full mx-auto w-full aspect-square object-cover ${className}`}
    />
  );
}
