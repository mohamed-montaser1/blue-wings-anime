import { useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "main" | "form-btn";
  type?: "submit" | "reset" | "button";
}

interface Styles {
  [key: string]: string;
}

export default function Button({ children, variant, type, ...props }: Props) {
  let styles: Styles = {
    main: "from-primary to-secondary bg-gradient-to-br",
    "form-btn": "bg-card text-primary",
  };
  let style = variant ? styles[variant] : "";
  const [animated, setAnimated] = useState(false);
  return (
    <button
      {...props}
      type={type}
      className={`text-white text-xl px-4 max-w-fit min-h-14 justify-center rounded-xl flex items-center gap-2.5 ${style} ${
        props.className
      } ${animated ? "animated" : ""} outline-none`}
      onMouseEnter={() => {
        setAnimated(true);
        setTimeout(() => {
          setAnimated(false);
        }, 800);
      }}
    >
      {children}
    </button>
  );
}
