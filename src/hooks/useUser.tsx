import { TUseUserReturn, TUseUserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";
import { readFile } from "fs";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  } = useSession({
    required,
    onUnauthenticated() {
      // redirect to login page
      router.push("/login");
    },
  });

  const user: TUseUserReturn["user"] = session?.user;
  let avatar;
  const image = user?.image as string;
  if (image?.startsWith("/uploads") || image?.startsWith("http")) {
    avatar = user?.image;
  } else {
    avatar = "/uploads/default-profile.jpeg";
  }

  function setUserAvatar(filename: string) {
    const image = `/uploads/${filename}`;
    update({ ...user, image });
    animatePageOut("/account", router);
  }
  return { user, status, avatar, setUserAvatar };
}
