import DashboardSidebar from "@/components/custom/dashboard_sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="max-h-screen bg-gray-50 w-full">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main content */}
        <main className="flex-1 p-6 bg-white h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
