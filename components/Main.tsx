import { Cairo } from "next/font/google";
import { FC } from "react";

const cairo = Cairo({
  subsets: ["arabic"],
  fallback: ["Arial", "sans-serif"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

type Props = {
  children: React.ReactNode;
};

const Main: FC<Props> = function ({ children }) {
  return <main className={cairo.className}>{children}</main>;
};

export default Main;