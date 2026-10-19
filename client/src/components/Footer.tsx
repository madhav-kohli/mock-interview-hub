import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Github, Award, Sparkles, CheckCircle2, ShieldCheck, Heart, ExternalLink, User, ArrowRight } from "lucide-react";
import { TeacherRubricModal } from "./TeacherRubricModal.tsx";
import { DeveloperModal } from "./DeveloperModal.tsx";

export const Footer: React.FC = () => {
  const [showRubric, setShowRubric] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  return (
    <>
      <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1 & 2: Platform Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
                  <Bot size={20} />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  MockInterview<span className="text-emerald-400">Hub</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                An advanced full-stack AI platform built to deliver realistic, voice-interactive mock technical and behavioral interviews with real-time feedback, speech recognition, and downloadable performance reports.
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 max-w-md flex items-center gap-3">
                <Award size={20} className="text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Project Submission Ready</strong>
                  <span>Engineered with production-grade architecture, Firebase authentication, and responsive design.</span>
                </div>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">
                Platform Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-emerald-400 transition">
                    Home & Overview
                  </Link>
                </li>
                <li>
                  <Link to="/interview" className="hover:text-emerald-400 transition">
                    AI Practice Studio
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:text-emerald-400 transition">
                    Performance Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-emerald-400 transition">
                    Credits & Pricing Plans
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowRubric(true)}
                    className="text-teal-400 hover:text-teal-300 transition text-left flex items-center gap-1 font-medium cursor-pointer"
                  >
                    Teacher Rubric & Specs &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Technology Stack */}
            <div>
              <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React 19",
                  "Vite 8",
                  "Firebase Auth",
                  "Express API",
                  "Redux Toolkit",
                  "Web Speech API",
                  "SpeechSynthesis",
                  "Tailwind CSS v4",
                  "jsPDF Reports",
                  "Motion",
                  "MongoDB Atlas"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <a
                  href="https://github.com/madhav-kohli/mock-interview-hub.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-xs font-semibold"
                >
                  <Github size={14} />
                  <span>GitHub: madhav-kohli / mock-interview-hub</span>
                  <ExternalLink size={12} className="text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* ================= CLEAN SIMPLE BUTTON AT THE VERY BOTTOM ================= */}
          <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} MockInterviewHub &bull; Full-Stack Capstone Project.
            </p>

            {/* The single clean "Know the Developer" Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDevModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <User size={15} />
                <span>Know the Developer</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRubric(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer border border-slate-700"
              >
                Teacher Rubric
              </button>
            </div>
          </div>
        </div>
      </footer>

      <TeacherRubricModal isOpen={showRubric} onClose={() => setShowRubric(false)} />
      <DeveloperModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />
    </>
  );
};
