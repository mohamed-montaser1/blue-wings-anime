"use client";

import { Container } from "@/components";
import {
  AccountInfo,
  LastReadedChapters,
  FavouriteManga,
  ReadingLater,
} from "@components/Account";

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
