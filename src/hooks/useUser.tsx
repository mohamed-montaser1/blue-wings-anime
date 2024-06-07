import { UserRole } from "@/models/User";
import { TUseUserReturn, TUseUserProps, TUser } from "@lib/types";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// main goal is to get user data from the server
export default function useUser({ required }: TUseUserProps): TUseUserReturn {
  const router = useRouter();
  // User Avatar - By Default Set To default-profile image
  const [avatar, setAvatar] = useState<string | StaticImageData>("");

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

  const user: TUser = session?.user;
  const image = user?.image as string;
  // Update User Avatar State With User Profile Image If Found
  // useEffect(() => {
  //   if (!user) return;
  //   if (image?.startsWith("/uploads") || image?.startsWith("http")) {
  //     setAvatar(user?.image);
  //   } else {
  //     setAvatar("/uploads/profile-pictures/default.jpg");
  //   }
  //   console.log({ user });
  // }, [status]);

  function updateSession(properties: Partial<TUser>, cb: (session: Session | null) => void) {
    console.log({ properties });
    update({ ...session, user: { ...user, ...properties } }).then((newSession) => {
      if (!cb) return;
      cb(newSession);
    });
  }

  return { user, status, session, avatar: image, updateSession };
}
