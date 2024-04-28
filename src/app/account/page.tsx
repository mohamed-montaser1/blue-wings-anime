"use client";

import { Container } from "@/components";
import AccountInfo from "@/components/Account/AccountInfo";
import LastReadedChapters from "@/components/Account/LastReadedChapters";
import FavouriteManga from "@/components/Account/FavouriteManga";
import ReadingLater from "@/components/Account/ReadingLater";

export default function AccountPage() {
  return (
    <Container>
      <AccountInfo />
      <LastReadedChapters />
      <FavouriteManga />
      <ReadingLater />
    </Container>
  );
}
