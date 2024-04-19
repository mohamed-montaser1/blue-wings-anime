import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";

interface Props {
  state: boolean;
}

export default function MobileMenu({ state }: Props) {
  let path = usePathname();
  let page = path === "/" ? "home" : path.substr(1);
  return (
    <div
      className={`fixed bg-card w-40 h-60 top-[130px] rounded-lg justify-center pt-6 px-3 flex mobile-menu transition-all duration-500 ease-in-out z-50 ${
        state ? "right-[40px]" : "-right-[100%]"
      }`}
    >
      <ul className="flex flex-col gap-[15px] items-center">
        <MenuItem link="/" active={page === "home"}>
          <span className="text-[16px] text-center">الصفحة الرئيسية</span>
        </MenuItem>
        <MenuItem link="/work-list" active={page === "work-list"}>
          <span className="text-[16px] text-center">قائمة الأعمال</span>
        </MenuItem>
        <MenuItem link="/favorite" active={page === "favorite"}>
          <span className="text-[16px] text-center">أعمالك المفضلة</span>
        </MenuItem>
        <MenuItem link="/artists" active={page === "artists"}>
          <span className="text-[16px] text-center">قسم الرسامين</span>
        </MenuItem>
      </ul>
    </div>
  );
}
