import Image from "next/image";
import MenuItem from "./MenuItem";
import { Home, ArtPen, Heart, WorkList } from "@/../public/icons";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Menu() {
  let path = usePathname();
  let page = path === "/" ? "home" : path.substr(1);
  // useEffect(() => {
  //   signOut()
  // }, [])
  return (
    <div className="menu max-[1199px]:hidden">
      <ul className="flex gap-[38px] items-center">
        <MenuItem link="/" active={page === "home"}>
          <Image src={Home} alt="home-icon" />
          <span>الصفحة الرئيسية</span>
        </MenuItem>
        <MenuItem link="/work-list" active={page === "work-list"}>
          <Image src={WorkList} alt="worklist-icon" />
          <span>قائمة الأعمال</span>
        </MenuItem>
        <MenuItem link="/favorite" active={page === "favorite"}>
          <Image src={Heart} alt="heart-icon" />
          <span>أعمالك المفضلة</span>
        </MenuItem>
        <MenuItem link="/artists" active={page === "artists"}>
          <Image src={ArtPen} alt="artpen-icon" />
          <span>قسم الرسامين</span>
        </MenuItem>
      </ul>
    </div>
  );
}
