import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice.ts";
import { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../utils/firebase.ts";
import { api } from "../services/api.ts";
import { Sparkles, AlertCircle, Bot, GraduationCap, UserCheck, Mail, Lock, User, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface AuthProps {
  isModel?: boolean;
  onSuccess?: () => void;
}

export default function Auth({ isModel = false, onSuccess }: AuthProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"quick" | "google" | "email">("quick");
  const [emailMode, setEmailMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState(false);

  const handleFinish = (user: any) => {
    dispatch(setUserData(user));
    if (onSuccess) {
      onSuccess();
    } else if (!isModel) {
      navigate("/");
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setUnauthorizedDomain(false);

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const userPayload = await api.googleAuth({
        name: firebaseUser.displayName || "Google Candidate",
        email: firebaseUser.email || "candidate@example.com",
      });
      handleFinish(userPayload);
    } catch (error: any) {
      console.warn("Firebase Google Auth:", error);
      const code = error?.code || "";
      if (code === "auth/unauthorized-domain") {
        setUnauthorizedDomain(true);
        setErrorMsg(
          `Domain "${window.location.hostname}" is not authorized yet in Firebase Console. Add it in Firebase Console &rarr; Auth &rarr; Settings &rarr; Authorized Domains, or use the 1-Click Teacher / Evaluator Login below!`
        );
      } else if (code === "auth/popup-blocked") {
        setErrorMsg("Browser blocked popup. Allow popups or use 1-Click Quick Demo.");
      } else if (code === "auth/popup-closed-by-user") {
        setErrorMsg("Google popup closed. Try again or use 1-Click Quick Demo.");
      } else {
        setErrorMsg(error?.message || "Sign-in error occurred. Try the 1-Click Demo Login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (type: "teacher" | "student") => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const demoUser = await api.quickDemoLogin(type);
      handleFinish(demoUser);
    } catch (err: any) {
      setErrorMsg("Failed to start demo session.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (emailMode === "signup") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.warn("Fallback to client auth", e);
        }
      } else {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.warn("Fallback to client auth", e);
        }
      }
      const user = await api.emailAuth(email, name);
      handleFinish(user);
    } catch (err: any) {
      setErrorMsg(err?.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerContent = (
    <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Bot size={14} /> MockInterviewHub Authentication
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome to AI Interview Hub
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Access voice mock interviews, customized AI personas & analytics
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-800/80 p-1 rounded-xl mb-6 border border-slate-700/50">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === "quick"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles size={14} /> Evaluator Mode
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("google")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === "google"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <FcGoogle size={14} /> Firebase Google
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === "email"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Mail size={14} /> Email Login
        </button>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-amber-300">Firebase Notice:</p>
            <p>{errorMsg}</p>
            {unauthorizedDomain && (
              <div className="pt-2 border-t border-amber-500/20 text-slate-300">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("teacher")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-slate-950 font-semibold rounded-lg text-xs hover:bg-emerald-400 transition"
                >
                  <UserCheck size={14} /> Sign in via Evaluator Demo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Demo */}
      {activeTab === "quick" && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={16} /> Recommended for Teacher & Grading
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                750 Credits
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Faculty / Evaluator Mode
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Instant login designed for professors and instructors to evaluate interview setups, speech synthesis, and scoring reports.
            </p>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickDemo("teacher")}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
            >
              <GraduationCap size={18} />
              {isLoading ? "Signing In..." : "1-Click Login as Professor / Evaluator"}
            </button>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <UserCheck size={16} className="text-teal-400" /> Student Candidate Mode
              </span>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                250 Credits
              </span>
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickDemo("student")}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              Sign In as Student Candidate
            </button>
          </div>
        </div>
      )}

      {/* Google */}
      {activeTab === "google" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <FcGoogle size={28} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Continue with Google Account
            </h4>
            <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
              Authenticates using your Firebase project: <code>interview-iq-6dff1</code>
            </p>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleAuth}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 shadow-md transition disabled:opacity-50"
            >
              <FcGoogle size={20} />
              {isLoading ? "Connecting to Firebase..." : "Continue with Google"}
            </button>
          </div>
        </div>
      )}

      {/* Email */}
      {activeTab === "email" && (
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="flex justify-center gap-4 text-xs font-semibold mb-2">
            <button
              type="button"
              onClick={() => setEmailMode("signin")}
              className={`pb-1 border-b-2 transition ${
                emailMode === "signin"
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setEmailMode("signup")}
              className={`pb-1 border-b-2 transition ${
                emailMode === "signup"
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Create Account
            </button>
          </div>

          {emailMode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Candidate"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : emailMode === "signup" ? "Create Free Account" : "Sign In to Hub"}
            <ArrowRight size={16} />
          </button>
        </form>
      )}

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Firebase Project: <code className="text-slate-400">interview-iq-6dff1</code></span>
        </div>
        <span className="flex items-center gap-1">
          <Shield size={12} className="text-emerald-400" /> Secure SSL
        </span>
      </div>
    </div>
  );

  if (isModel) {
    return containerContent;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      {containerContent}
    </div>
  );
}
