import { TUseUserReturn, TUseUserProps } from "@lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  // User Avatar - By Default Set To default-profile image
  const [avatar, setAvatar] = useState<string>("/default-profile.jpg");
  // Get User Session From Next-Auth
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
  // Update User Avatar State With User Profile Image If Found
  useEffect(() => {
    if (image?.startsWith("/uploads") || image?.startsWith("http")) {
      setAvatar(user?.image);
    }
  }, []);

  /**
   * @param {string} filename the file name for example my-profile.png
   * @description update the user avatar to the parameter filename
   */
  function setUserAvatar(filename: string): void {
    const image = `/uploads/${filename}`;
    update({ ...session, user: { ...user, image } }).then(() => {
      setAvatar(image);
    });
  }
  return { user, status, avatar, setUserAvatar };
}
