export type TableDataProps = {
  content: string;
};

export function TableHeadData({ content }: TableDataProps) {
  return <th className="text-primary py-3 border">{content}</th>;
}
