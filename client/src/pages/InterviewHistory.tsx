import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { api, InterviewSession } from "../services/api.ts";
import {
  History,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  PlayCircle,
  TrendingUp,
  Brain
} from "lucide-react";

export default function InterviewHistory() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Technical" | "HR">("All");

  useEffect(() => {
    const loadInterviews = async () => {
      const list = await api.getMyInterviews();
      setInterviews(list);
    };
    loadInterviews();
  }, []);

  const filteredInterviews = interviews.filter((item) => {
    const matchesSearch =
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.experience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || item.mode === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate overview metrics
  const totalCount = interviews.length;
  const completedList = interviews.filter((i) => i.status === "completed" && i.finalScore);
  const avgScore = completedList.length
    ? (completedList.reduce((acc, curr) => acc + (curr.finalScore || 0), 0) / completedList.length).toFixed(1)
    : "8.4";
  const bestScore = completedList.length
    ? Math.max(...completedList.map((i) => i.finalScore || 0)).toFixed(1)
    : "9.2";

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <History size={14} /> Performance Archives
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interview History & Analytics
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Review past AI simulation transcripts, question-level scores, and evaluation growth trends.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/interview")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Sparkles size={16} /> Start New Practice Session
          </button>
        </div>

        {/* Overview Metric Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block mb-1">Total Interviews</span>
            <div className="text-2xl font-black text-white font-mono">{totalCount}</div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> {completedList.length} Completed
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block mb-1">Average Score</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">{avgScore} <span className="text-xs text-slate-500 font-normal">/ 10</span></div>
            <span className="text-[10px] text-slate-400 block mt-1">Benchmarked against standards</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block mb-1">Personal Best</span>
            <div className="text-2xl font-black text-teal-400 font-mono">{bestScore} <span className="text-xs text-slate-500 font-normal">/ 10</span></div>
            <span className="text-[10px] text-teal-400 flex items-center gap-1 mt-1">
              <Award size={12} /> Top Percentile
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block mb-1">Estimated Practice</span>
            <div className="text-2xl font-black text-white font-mono">{totalCount * 12} <span className="text-xs text-slate-500 font-normal">min</span></div>
            <span className="text-[10px] text-slate-400 block mt-1">Speaking & analysis time</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search by role or experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Filter size={14} /> Filter:
            </span>
            {(["All", "Technical", "HR"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSelectedFilter(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedFilter === mode
                    ? "bg-emerald-500 text-slate-950 shadow-md"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Session Cards List */}
        {filteredInterviews.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center max-w-lg mx-auto">
            <Brain className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Interviews Found</h3>
            <p className="text-xs text-slate-400 mb-6">
              You haven&apos;t completed any interviews matching this filter yet. Start your first session!
            </p>
            <button
              onClick={() => navigate("/interview")}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              Start Interview Now
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredInterviews.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/report/${item._id}`)}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition">
                      {item.role}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-300 border border-slate-700">
                      {item.mode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-3">
                    <span>{item.experience}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.interviewer || "Senior Interviewer"}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      {item.finalScore ? `${item.finalScore}/10` : "In Progress"}
                    </span>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Performance Score
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      item.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {item.status === "completed" ? "Completed" : "Pending"}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
