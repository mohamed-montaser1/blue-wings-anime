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
    main: "from-main-color to-secondary-color bg-gradient-to-br",
    "form-btn": "bg-card text-main-color",
  };
  let style = variant ? styles[variant] : "";
  return (
    <button
      {...props}
      type={type}
      className={`text-white text-[20px] px-[20px] py-[10px] rounded-[10px] flex items-center gap-[10px] ${style} ${props.className} outline-none`}
    >
      {children}
    </button>
  );
}
