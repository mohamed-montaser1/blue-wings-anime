export type TableBodyDataProps = {
  children: React.ReactNode;
};

export function TableBodyData({ children }: TableBodyDataProps) {
  return (
    <td className="text-slate-300 text-center border relative">{children}</td>
  );
}