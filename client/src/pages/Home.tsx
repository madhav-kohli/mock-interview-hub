import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { setUserData } from "../redux/userSlice.ts";
import { api } from "../services/api.ts";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { AuthModal } from "../components/AuthModal.tsx";
import { TeacherRubricModal } from "../components/TeacherRubricModal.tsx";
import {
  Bot,
  Sparkles,
  Mic,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  TrendingUp,
  Volume2,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Pause,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRubricModal, setShowRubricModal] = useState(false);

  // Interactive Demo Question Player State on the Hero
  const [isPlayingDemoAudio, setIsPlayingDemoAudio] = useState(false);
  const [demoRevealed, setDemoRevealed] = useState(false);

  const sampleDemoQuestion = "How do you handle database indexing and query optimization when scaling a high-traffic web application?";

  const handlePlayDemoAudio = () => {
    if (!("speechSynthesis" in window)) {
      setDemoRevealed(true);
      return;
    }

    if (isPlayingDemoAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingDemoAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sampleDemoQuestion);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;

    utterance.onstart = () => {
      setIsPlayingDemoAudio(true);
      setDemoRevealed(true);
    };
    utterance.onend = () => setIsPlayingDemoAudio(false);
    utterance.onerror = () => setIsPlayingDemoAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStartPractice = () => {
    if (!userData) {
      setShowAuthModal(true);
    } else {
      navigate("/interview");
    }
  };

  const handleTeacherDemo = async () => {
    const user = await api.quickDemoLogin("teacher");
    dispatch(setUserData(user));
    setShowRubricModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
          {/* Ambient background glow circles */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-lg shadow-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Full-Stack AI Project &bull; Voice Speech & Real-Time Scoring</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
              Master Technical & HR Interviews with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Adaptive Voice AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-base sm:text-lg sm:leading-relaxed max-w-3xl mx-auto mt-6">
              Simulate high-stakes engineering interviews with conversational voice avatars, resume-tailored questions, real-time speech transcription, and comprehensive PDF analytics.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handleStartPractice}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base flex items-center gap-3 shadow-2xl shadow-emerald-500/25 transition group cursor-pointer"
              >
                <Sparkles size={18} />
                <span>Launch Practice Studio</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
              </button>

              <button
                type="button"
                onClick={handleTeacherDemo}
                className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 font-bold text-sm sm:text-base flex items-center gap-2.5 transition cursor-pointer"
              >
                <GraduationCap size={18} className="text-emerald-400" />
                <span>Teacher & Evaluator Demo</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/history")}
                className="px-6 py-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 font-semibold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer"
              >
                <span>View Past Analytics</span>
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-10 border-t border-slate-800/80 text-left">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl font-black text-white font-mono">5 Questions</div>
                <div className="text-xs text-slate-400 mt-0.5">Adaptive Difficulty Engine</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl font-black text-emerald-400 font-mono">Web Speech</div>
                <div className="text-xs text-slate-400 mt-0.5">Speech-to-Text & Voice Synthesis</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl font-black text-teal-400 font-mono">3 Dimensions</div>
                <div className="text-xs text-slate-400 mt-0.5">Confidence, Clarity, Correctness</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl font-black text-white font-mono">jsPDF Report</div>
                <div className="text-xs text-slate-400 mt-0.5">Downloadable Scorecard Export</div>
              </div>
            </div>

            {/* Interactive Live Question Preview Card */}
            <div className="max-w-4xl mx-auto mt-14 text-left">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Bot size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Interactive Live Preview
                      </span>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        Alex Carter &bull; Senior Engineering Architect
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayDemoAudio}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    {isPlayingDemoAudio ? (
                      <>
                        <Pause size={14} className="text-emerald-400 animate-pulse" />
                        <span>Speaking Prompt...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} />
                        <span>Hear Interviewer Audio (Voice AI)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-4">
                  <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
                    &ldquo;{sampleDemoQuestion}&rdquo;
                  </p>
                </div>

                {demoRevealed && (
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <Sparkles size={14} /> AI Evaluator Scoring Preview
                      </span>
                      <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-lg font-black text-xs">
                        Score: 9.0/10
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-900/80">
                        <span className="text-[10px] text-slate-400 block">Confidence</span>
                        <span className="font-bold text-emerald-400">9/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900/80">
                        <span className="text-[10px] text-slate-400 block">Communication</span>
                        <span className="font-bold text-teal-400">9/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900/80">
                        <span className="text-[10px] text-slate-400 block">Correctness</span>
                        <span className="font-bold text-emerald-400">9/10</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">
                      <strong>AI Remark:</strong> &ldquo;Strong answer citing B-Tree indexes, composite keys, avoiding table scans, and using Redis query caching for read-heavy loads.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3-STEP WORKFLOW ================= */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                End-To-End Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                How MockInterviewHub Simulates Real Hiring
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                From resume upload to live voice answers and official PDF scorecard generation in 3 seamless steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-xl relative group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
                  1
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 1</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">Role & Resume Setup</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Select your target engineering or HR position, specify experience level, pick your AI persona, and upload your resume for automatic skill extraction.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-xl relative group">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
                  2
                </div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Step 2</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">Conversational Voice Room</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Interact with real-time video avatars and synthesized audio speech. Answer via Web Speech API transcription under realistic countdown pressure.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-xl relative group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition">
                  3
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">Scorecard & PDF Export</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Receive multidimensional scores for Technical Correctness, Communication, and Confidence, plus a downloadable PDF assessment for your records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CORE CAPABILITIES ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Full-Stack Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Engineered for Modern Engineering Standards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Mic size={20} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Speech Recognition</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Continuous real-time speech transcription with interim preview and text fallback editing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                  <FileText size={20} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Resume Parsing</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instant detection of candidate skills and projects to dynamically ground interview questions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">3-Axis Evaluation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Scores accuracy, communication, and confidence objectively with custom rubric feedback.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <TrendingUp size={20} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Performance Archives</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Historical session analytics with filtering, average progress metrics, and persistent storage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TEACHER & RUBRIC BANNER ================= */}
        <section className="py-16 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-slate-900/90 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <GraduationCap size={16} /> Coursework & Faculty Evaluation
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Grading this project? Review the complete rubric
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Check out the full technical documentation, architecture diagrams, Firebase configuration details, and feature checklist.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowRubricModal(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Project Rubric</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <TeacherRubricModal isOpen={showRubricModal} onClose={() => setShowRubricModal(false)} />
    </div>
  );
}
