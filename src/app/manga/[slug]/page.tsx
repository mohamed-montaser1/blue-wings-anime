import { MangaInfo, Rate, SimilarManga } from "@components";

type TProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params: { slug } }: TProps) {
  return (
    <>
      <MangaInfo />
      <SimilarManga />
      <Rate />
    </>
  );
}
