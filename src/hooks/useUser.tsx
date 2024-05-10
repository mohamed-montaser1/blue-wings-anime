import { TUseUserReturn, TUseUserProps } from "@lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("/default-profile.jpg");
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
  const image = user?.image as string;
  useEffect(() => {
    if (image?.startsWith("/uploads") || image?.startsWith("http")) {
      setAvatar(user?.image);
    }
  }, []);

  function setUserAvatar(filename: string) {
    const image = `/uploads/${filename}`;
    update({ ...session, user: { ...user, image } }).then(() => {
      setAvatar(image);
    });
  }
  return { user, status, avatar, setUserAvatar };
}
