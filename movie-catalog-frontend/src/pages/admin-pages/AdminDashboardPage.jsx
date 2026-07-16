import { useEffect, useState } from "react";
import { Clapperboard, Users, Folder, Heart, Bookmark } from "lucide-react";

import { getDashboardStats } from "../../services/adminService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalFavorites: 0,
    totalWatchlist: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats({
          totalMovies: data.totalMovies || 0,
          totalUsers: data.totalUsers || 0,
          totalCategories: data.totalCategories || 0,
          totalFavorites: data.totalFavorites || 0,
          totalWatchlist: data.totalWatchlists || data.totalWatchlist || 0,
        });
      } catch (err) {
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-180px)] text-[#e7debb]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif tracking-wide">Dashboard</h1>
        <p className="text-xs font-montserrat text-[#e7debb]/60 mt-0.5">Welcome admin</p>
      </div>

      {error ? <p className="mb-4 rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-100">{error}</p> : null}

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-112.5">
        <div className="bg-[#36573e] border border-[#e7debb]/10 rounded-3xl p-8 flex items-center gap-6 shadow-md select-none">
          <div className="w-24 h-24 rounded-2xl bg-[#e7debb] flex items-center justify-center text-[#213a28] shrink-0">
            <Clapperboard size={48} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-lg font-montserrat text-[#e7debb]/70 font-medium">Total Movies</p>
            <p className="text-6xl font-bold font-montserrat tracking-tight mt-1">{loading ? "..." : stats.totalMovies}</p>
          </div>
        </div>

        <div className="bg-[#36573e] border border-[#e7debb]/10 rounded-3xl p-8 flex items-center gap-6 shadow-md select-none">
          <div className="w-24 h-24 rounded-2xl bg-[#e7debb] flex items-center justify-center text-[#213a28] shrink-0">
            <Users size={48} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-lg font-montserrat text-[#e7debb]/70 font-medium">Total Users</p>
            <p className="text-6xl font-bold font-montserrat tracking-tight mt-1">{loading ? "..." : stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-[#36573e] border border-[#e7debb]/10 rounded-3xl p-8 flex items-center gap-6 shadow-md select-none">
          <div className="w-24 h-24 rounded-2xl bg-[#e7debb] flex items-center justify-center text-[#213a28] shrink-0">
            <Folder size={48} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-lg font-montserrat text-[#e7debb]/70 font-medium">Total Categories</p>
            <p className="text-6xl font-bold font-montserrat tracking-tight mt-1">{loading ? "..." : stats.totalCategories}</p>
          </div>
        </div>

        <div className="bg-[#36573e] border border-[#e7debb]/10 rounded-3xl p-8 flex flex-col justify-center shadow-md select-none">
          <div className="grid grid-cols-2 gap-4 divide-x divide-[#e7debb]/10">
            <div className="flex items-center gap-4 pl-2">
              <div className="w-14 h-14 rounded-xl bg-[#e7debb]/10 border border-[#e7debb]/20 flex items-center justify-center text-[#e7debb] shrink-0">
                <Heart size={26} className="fill-current" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-montserrat text-[#e7debb]/50 font-semibold">Favorites</p>
                <p className="text-3xl font-bold font-montserrat mt-0.5">{loading ? "..." : stats.totalFavorites}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 md:px-8">
              <div className="w-14 h-14 rounded-xl bg-[#e7debb]/10 border border-[#e7debb]/20 flex items-center justify-center text-[#e7debb] shrink-0">
                <Bookmark size={26} className="fill-current" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-montserrat text-[#e7debb]/50 font-semibold">Watchlist</p>
                <p className="text-3xl font-bold font-montserrat mt-0.5">{loading ? "..." : stats.totalWatchlist}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}