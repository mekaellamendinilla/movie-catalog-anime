import AdminSidebar from "../../components/layout/AdminSidebar";
import AdminHeader from "../../components/layout/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#27452f]">
      {/* Ang Sidebar natin na ginawa sa itaas */}
      <AdminSidebar />
      
      {/* Dito magre-render ang mismong content ng mga Admin Pages */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Top Header Container na laging nasa itaas kasama ang LIVE TIME */}
        <AdminHeader />
        
        {/* 3. Render Area para sa Sub-pages (Dashboard, Movies, atbp.) */}
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}