import Sidebar from "@/components/Dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page relative min-h-screen flex">
      <Sidebar />
      {children}
    </div>
  );
}
