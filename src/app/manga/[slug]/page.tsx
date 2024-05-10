import { MangaInfo, Rate, SimilarManga } from "@components/Manga";

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
