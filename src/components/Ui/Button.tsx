import { useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: keyof TStyles;
  type?: "submit" | "reset" | "button";
}

type TStyles = Readonly<typeof styles>;

let styles = {
  main: "from-primary to-secondary bg-gradient-to-br",
  danger: "bg-red-500",
  "form-btn": "bg-card text-primary",
  "light-form-btn": "bg-sub-card text-primary",
} as const;

export default function Button({ children, variant, type, ...props }: Props) {
  let style = variant ? styles[variant] : "";
  const [animated, setAnimated] = useState(false);
  return (
    <button
      {...props}
      type={type}
      className={`text-white text-xl px-4 max-w-fit min-h-14 justify-center rounded-xl flex items-center gap-2.5 ${style} ${
        props.className
      } ${animated ? "animated" : ""} outline-none relative`}
      onMouseEnter={() => {
        if (animated) return;
        setAnimated(true);
        setTimeout(() => {
          setAnimated(false);
        }, 500);
      }}
    >
      {children}
    </button>
  );
}
