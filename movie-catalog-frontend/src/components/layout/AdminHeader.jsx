import { Calendar } from "lucide-react";

export default function AdminHeader() {
  const currentDate = new Date();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const formatMobileDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <header className="w-full bg-[#27452f] border-b border-[#e7debb]/10 px-4 md:px-10 h-20 flex items-center justify-between text-[#e7debb] sticky top-0 z-30">

      <div className="pl-12 md:pl-0"> 

        <h2 className="font-serif font-bold text-sm md:text-xl tracking-wide leading-tight">
          Admin Control
          <span className="hidden sm:inline"> Panel</span>
        </h2>
        <p className="text-[9px] md:text-[10px] font-montserrat text-[#e7debb]/50 uppercase tracking-wider">
          Overview & Operations
        </p>
      </div>

      <div className="flex items-center font-montserrat">
        <div className="flex items-center gap-2 bg-[#e7debb] border border-[#e7debb]/5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[11px] md:text-xs font-bold text-[#27452f] shadow-inner">
          <Calendar size={14} className="text-[#27452f] shrink-0" />

          <span className="hidden sm:inline">{formatDate(currentDate)}</span>
          <span className="inline sm:hidden">{formatMobileDate(currentDate)}</span>
        </div>
      </div>
    </header>
  );
}