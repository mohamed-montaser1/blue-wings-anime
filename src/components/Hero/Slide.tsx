import Image from "next/image";

interface Props {
  image: string;
  info: {
    title: string;
    description: string;
    chapter: string;
  };
}

export default function Slide({ image, info }: Props) {
  return (
    <div className="flex justify-between items-center gap-24 mt-3 max-[991px]:gap-4 min-[779px]:pl-16 pt-10 min-[900px]:max-h-[410px] h-fit mb-16 relative max-[767px]:h-full">
      <Image
        width={416}
        height={400}
        src={image}
        alt="slide-img"
        className="w-[311px] max-h-[538px] object-cover max-[657px]:h-[778px] max-[767px]:w-full max-[767px]:absolute max-[767px]:-z-[1] top-0 object-center max-[767px]:blur-md"
      />
      <div className="content max-[767px]:px-5">
        <span className="text-[14px] text-white max-[767px]:text-center block">
          الفصل: {info.chapter}
        </span>
        <h1 className="text-white text-[30px] mt-2 mb-1 max-[991px]:text-[24px] max-[767px]:text-center">
          {info.title}
        </h1>
        <p className="text-white text-[14px] max-[602px]:text-[10px] max-[767px]:text-center">
          {info.description}
        </p>
      </div>
    </div>
  );
}
