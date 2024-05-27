"use client";

import { Container } from "@/components";
import {
  AccountInfo,
  LastReadedChapters,
  FavoriteManga,
  ReadingLater,
} from "@components/Account";

export default function AccountPage() {
  return (
    <Container>
      <AccountInfo />
      <LastReadedChapters />
      <FavoriteManga />
      <ReadingLater />
    </Container>
  );
}
