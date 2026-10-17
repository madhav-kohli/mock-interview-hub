import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store.ts";
import { setUserData, updateCredits } from "../redux/userSlice.ts";
import { api } from "../services/api.ts";
import { AuthModal } from "./AuthModal.tsx";
import { TeacherRubricModal } from "./TeacherRubricModal.tsx";
import { DeveloperModal } from "./DeveloperModal.tsx";
import {
  Bot,
  Coins,
  Plus,
  LogOut,
  History,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Layers,
  Award,
  UserCheck,
  CreditCard,
  Menu,
  X,
  Code2,
  User
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRubricModal, setShowRubricModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await api.logout();
    dispatch(setUserData(null));
    setShowUserDropdown(false);
    navigate("/");
  };

  const handleQuickAddCredits = async () => {
    const updated = await api.addCredits(100);
    if (updated) {
      dispatch(updateCredits(updated.credits));
    }
  };

  const handleSwitchToTeacher = async () => {
    const teacherUser = await api.quickDemoLogin("teacher");
    dispatch(setUserData(teacherUser));
    setShowUserDropdown(false);
  };

  const isTeacher = userData?.role?.toLowerCase().includes("faculty") || userData?.role?.toLowerCase().includes("evaluator");

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-6 lg:gap-8">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
                  <Bot size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                      Interview<span className="text-emerald-400">IQ</span>
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                      AI Studio
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block -mt-0.5">
                    Smart Voice & Technical Prep
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    location.pathname === "/"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/interview"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    location.pathname === "/interview"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Sparkles size={14} /> Practice Studio
                </Link>
                <Link
                  to="/history"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    location.pathname === "/history"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <History size={14} /> History
                </Link>
                <Link
                  to="/pricing"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    location.pathname === "/pricing"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <CreditCard size={14} /> Pricing
                </Link>
                <button
                  type="button"
                  onClick={() => setShowRubricModal(true)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 transition flex items-center gap-1.5 ml-1 cursor-pointer"
                >
                  <Award size={14} /> Teacher Rubric
                </button>
              </nav>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Developer Profile Pill Button */}
              <button
                type="button"
                onClick={() => setShowDevModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-xs font-bold text-white transition shadow-sm group cursor-pointer"
                title="View Developer Profile: Madhav Kohli"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-400 shrink-0">
                  <img src="/developer-madhav.jpg" alt="Madhav Kohli" className="w-full h-full object-cover object-top" />
                </div>
                <span className="hidden sm:inline text-emerald-300 group-hover:text-emerald-200">Developer</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline"></span>
              </button>

              {/* Credits counter */}
              <div className="relative group">
                <Link
                  to="/pricing"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition text-xs font-semibold text-slate-200"
                >
                  <Coins size={15} className="text-amber-400" />
                  <span>{userData?.credits ?? 100}</span>
                  <span className="text-slate-400 font-normal hidden sm:inline">Credits</span>
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 flex items-center justify-center ml-1">
                    <Plus size={12} />
                  </span>
                </Link>
              </div>

              {/* User Profile / Auth State */}
              {userData ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 transition cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs uppercase shadow-sm overflow-hidden">
                      {userData.avatar ? (
                        <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                      ) : (
                        userData.name.charAt(0)
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-200 hidden md:inline max-w-[120px] truncate">
                      {userData.name}
                    </span>
                    <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl z-50 text-slate-200 text-xs">
                      <div className="p-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm text-white truncate">{userData.name}</p>
                          {isTeacher && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300">
                              Faculty
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] truncate">{userData.email}</p>
                        <div className="mt-2.5 flex items-center justify-between text-[11px] bg-slate-800/80 p-2 rounded-xl">
                          <span className="text-slate-400">Available Credits:</span>
                          <span className="font-bold text-emerald-400 flex items-center gap-1">
                            <Coins size={12} className="text-amber-400" /> {userData.credits}
                          </span>
                        </div>
                      </div>

                      <div className="p-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            navigate("/history");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition text-left cursor-pointer"
                        >
                          <History size={14} className="text-emerald-400" />
                          <span>Interview History & Reports</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowDevModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-emerald-300 transition text-left cursor-pointer"
                        >
                          <User size={14} className="text-emerald-400" />
                          <span>About Developer (Madhav Kohli)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            navigate("/pricing");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition text-left cursor-pointer"
                        >
                          <CreditCard size={14} className="text-teal-400" />
                          <span>Add More Credits</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleQuickAddCredits}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition text-left cursor-pointer"
                        >
                          <Plus size={14} className="text-amber-400" />
                          <span>Quick Top-up +100 Credits (Demo)</span>
                        </button>

                        {!isTeacher && (
                          <button
                            type="button"
                            onClick={handleSwitchToTeacher}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-emerald-300 transition text-left cursor-pointer"
                          >
                            <GraduationCap size={14} className="text-emerald-400" />
                            <span>Switch to Faculty / Teacher Mode</span>
                          </button>
                        )}

                        <div className="my-1 border-t border-slate-800"></div>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition text-left cursor-pointer"
                        >
                          <LogOut size={14} />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const teacherUser = api.quickDemoLogin("teacher");
                      teacherUser.then((u) => dispatch(setUserData(u)));
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
                  >
                    <GraduationCap size={14} /> Teacher Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserCheck size={14} /> Sign In
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/interview"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-emerald-400 hover:bg-slate-800"
            >
              Practice Studio
            </Link>
            <Link
              to="/history"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Analytics & History
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Pricing Plans
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowDevModal(true);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-300 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
            >
              <User size={15} /> Developer Info (Madhav Kohli)
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowRubricModal(true);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-teal-300 hover:bg-slate-800 cursor-pointer"
            >
              Academic Rubric & Specs
            </button>
          </div>
        )}
      </header>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <TeacherRubricModal isOpen={showRubricModal} onClose={() => setShowRubricModal(false)} />
      <DeveloperModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
    </>
  );
};
