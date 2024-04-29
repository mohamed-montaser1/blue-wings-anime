import MangaInfo from "@components/Manga/MangaInfo";
import Rate from "@components/Manga/Rate";
import SimilarManga from "@components/Manga/SimilarManga";

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
