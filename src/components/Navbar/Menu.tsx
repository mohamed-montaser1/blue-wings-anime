import Image from "next/image";
import MenuItem from "./MenuItem";
import { Home, ArtPen, Heart, WorkList } from "@icons";
import { usePathname } from "next/navigation";

export default function Menu() {
  let path = usePathname();
  let page = path === "/" ? "home" : path.substr(1);

  return (
    <div className="menu hidden xxl:!block">
      <ul className="flex xxl:gap-10 gap-6 items-center">
        <MenuItem link="/" active={page === "home"}>
          <Image src={Home} alt="home-icon" />
          <span>الصفحة الرئيسية</span>
        </MenuItem>
        <MenuItem link="/work-list" active={page === "work-list"}>
          <Image src={WorkList} alt="worklist-icon" />
          <span>قائمة الأعمال</span>
        </MenuItem>
        <MenuItem link="/favs" active={page === "favs"}>
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
