import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Clapperboard, 
  Folder, 
  Users, 
  Menu, 
  X, 
  User 
} from "lucide-react";
import { getCurrentUserProfile } from "../../services/userService";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🔄 Dito natin ise-save ang live admin credentials
  const [adminData, setAdminData] = useState({
    username: "Admin User",
    profile_image: ""
  });

  // 📡 function para hatakin ang pinakabagong info mula sa backend
  const fetchAdminInfo = async () => {
    try {
      const data = await getCurrentUserProfile();
      if (data) {
        setAdminData({
          username: data.username || "Admin User",
          profile_image: data.profile_image 
            ? `http://localhost:5000/uploads/profiles/${data.profile_image}` 
            : ""
        });
      }
    } catch (err) {
      console.error("Failed to sync sidebar profile info:", err);
    }
  };

  // Kusa itong tatakbo sa pag-load ng page
  useEffect(() => {
    fetchAdminInfo();

    // ⚡ Trick: Makikinig tayo sa custom events o window focus para mag-update agad 
    // kapag pinindot ang "Save Changes" sa kabilang component nang walang reload
    window.addEventListener("profileUpdated", fetchAdminInfo);
    window.addEventListener("focus", fetchAdminInfo);
    
    return () => {
      window.removeEventListener("profileUpdated", fetchAdminInfo);
      window.removeEventListener("focus", fetchAdminInfo);
    };
  }, []);

  // Reusable Component para sa bawat Menu Link
  const SidebarLink = ({ to, icon: Icon, children }) => (
    <NavLink
      to={to}
      onClick={() => setIsOpen(false)} 
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl font-bold font-montserrat text-sm transition-all duration-200 ${
          isActive
            ? "bg-[#36573e] text-[#e7debb]"
            : "text-[#e7debb]/70 hover:bg-[#36573e] hover:text-[#e7debb]"
        }`
      }
    >
      <Icon size={20} />
      <span>{children}</span>
    </NavLink>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#27452f] border-r border-[#e7debb]/10 px-6 py-8 text-[#e7debb]">
      {/* Brand Logo Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-serif tracking-tight leading-none mb-1">
          RLZone
        </h1>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#e7debb]/60 font-montserrat font-medium">
          Anime / Ghibli Collection
        </p>
      </div>

      {/* Sidebar Menus at Categories */}
      <div className="flex-1 space-y-7 overflow-y-auto pr-1">
        {/* Main Dashboard */}
        <div className="space-y-1">
          <SidebarLink to="/admin/dashboard" icon={LayoutDashboard}>
            Dashboard
          </SidebarLink>
        </div>

        {/* Movie Management Section */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#e7debb]/40 font-montserrat px-4">
            Movie Management
          </h4>
          <div className="space-y-1">
            <SidebarLink to="/admin/movies" icon={Clapperboard}>
              Movies
            </SidebarLink>
            <SidebarLink to="/admin/category" icon={Folder}>
              Category
            </SidebarLink>
          </div>
        </div>

        {/* User Management Section */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#e7debb]/40 font-montserrat px-4">
            User Management
          </h4>
          <div className="space-y-1">
            <SidebarLink to="/admin/users" icon={Users}>
              Users & Roles
            </SidebarLink>
          </div>
        </div>
      </div>

      {/* USER ADMIN PROFILE SECTION (LIVE DATA SYNCED) */}
      <div className="border-t border-[#e7debb]/10 pt-6 mt-auto">
        <NavLink 
          to="/admin/profile"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => 
            `flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
              isActive ? "bg-[#36573e]" : "hover:bg-[#36573e]/50"
            }`
          }
        >
          {/* 📸 Dinamiko na ang Avatar Icon Circle ngayon! */}
          <div className="w-11 h-11 rounded-full border-2 border-[#e7debb]/30 flex items-center justify-center bg-[#1a3020] text-[#e7debb] shrink-0 group-hover:border-[#e7debb]/60 transition-colors overflow-hidden">
            {adminData.profile_image ? (
              <img 
                src={adminData.profile_image} 
                alt="Admin avatar" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User size={22} strokeWidth={1.5} />
            )}
          </div>
          
          {/* 🏷️ Dinamiko na ang Username! */}
          <div className="font-montserrat min-w-0 flex-1">
            <h5 className="font-serif font-bold text-base tracking-wide text-[#e7debb] leading-tight truncate">
              {adminData.username}
            </h5>
            <p className="text-[10px] text-[#e7debb]/50 uppercase tracking-wider font-semibold mt-0.5">
              System Control
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Hamburger Trigger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-[#213a28] border border-[#e7debb]/20 rounded-xl text-[#e7debb] shadow-lg hover:bg-[#2c4934] transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 2. Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. Mobile Slide-out Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* 4. Desktop Sidebar View */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}