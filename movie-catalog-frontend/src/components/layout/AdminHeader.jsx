import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

export default function AdminHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ang epektong ito ay mag-a-update sa oras bawat segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Linisin ang timer kapag unmounted ang page
  }, []);

  // Format para sa Oras (Halimbawa: 3:45:12 PM)
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Format para sa Petsa (Halimbawa: Wednesday, July 08, 2026)
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  return (
    <header className="w-full bg-[#27452f] border-b border-[#e7debb]/10 px-6 md:px-10 h-20 flex items-center justify-between text-[#e7debb] sticky top-0 z-30">
      
      {/* Kaliwa: Dashboard Greeting */}
      <div className="hidden sm:block">
        <h2 className="font-serif font-bold text-lg md:text-xl tracking-wide">
          Admin System Control Panel
        </h2>
        <p className="text-[10px] font-montserrat text-[#e7debb]/50 uppercase tracking-wider">
          Overview & Operations
        </p>
      </div>

      {/* Mobile-only spacer if Greeting is hidden */}
      <div className="sm:hidden w-1"></div>

      {/* Kanan: Live Date at Time Modules */}
      <div className="flex items-center gap-4 md:gap-6 font-montserrat">
        
        {/* Petsa (Date) Block */}
        <div className="hidden md:flex items-center gap-2.5 bg-[#e7debb] border border-[#e7debb]/5 px-4 py-2 rounded-xl text-xs font-bold text-[#27452f] shadow-inner">
          <Calendar size={15} className="text-[#27452f]" />
          <span>{formatDate(currentTime)}</span>
        </div>

        {/* Oras (Time) Block - Kumukislap/Realtime */}
        <div className="flex items-center gap-2.5 bg-[#e7debb] border border-[#e7debb]/10 px-4 py-2 rounded-xl text-sm font-bold tracking-wider text-[#27452f] min-w-[125px] justify-center shadow-md">
          <Clock size={16} className="text-[#27452f] animate-pulse" />
          <span className="tabular-nums">{formatTime(currentTime)}</span>
        </div>

      </div>

    </header>
  );
}