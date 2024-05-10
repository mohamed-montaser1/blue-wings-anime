import { TDropdownMenuProps, TDropdownOptionProps } from "@lib/types";
import Image from "next/image";

function DropdownMenu({ children }: TDropdownMenuProps) {
  return (
    <div
      id="DropdownMenu"
      className="flex flex-col gap-2 cursor-pointer shadow-xl rounded-lg bg-card md:bg-sub-card md:p-2 md:rounded-xl absolute top-full left-0 mt-6 min-w-56 w-full min-h-14 z-50"
    >
      {children}
    </div>
  );
}

function DropdownOption({ icon, text, ...props }: TDropdownOptionProps) {
  return (
    <div
      id="DropdownOption"
      className="flex items-center w-full gap-4 hover:bg-card transition-colors duration-300 ease-in-out p-4 rounded-xl select-none"
      {...props}
    >
      <Image src={icon} alt="icon" />
      <span className="text-white text-lg">{text}</span>
    </div>
  );
}

export { DropdownMenu, DropdownOption };
