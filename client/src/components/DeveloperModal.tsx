import React, { useState, useEffect } from "react";
import {
  X,
  GraduationCap,
  Briefcase,
  Trophy,
  Code2,
  Mail,
  Phone,
  Github,
  Linkedin,
  Sparkles,
  Volume2,
  Pause,
  Award,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Cpu
} from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "education" | "experience" | "skills">("about");

  const bioText =
    "Hello! I'm Madhav Kohli, a Full Stack and Backend Web Developer pursuing my Bachelor of Technology in Computer Science at Seth Jai Parkash Mukand Lal Institute of Engineering and Technology. I have interned at Nirikshan AI and Oops InfoSolutions, qualified for the Smart India Hackathon twice, and solved over 300 Data Structures and Algorithms problems. Welcome to InterviewIQ, my AI-powered mock interview hub built with React, Node.js, Express, MongoDB, and Firebase!";

  const toggleAudioBio = () => {
    if (!("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(bioText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-slate-800">
          {/* Developer Photo with Animated Ring */}
          <div className="relative group shrink-0">
            <div
              className={`absolute -inset-1 rounded-3xl blur-md transition duration-500 ${
                isPlayingAudio
                  ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 opacity-90 animate-pulse"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 opacity-50 group-hover:opacity-80"
              }`}
            ></div>
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-xl bg-slate-800">
              <img
                src="/developer-madhav.jpg"
                alt="Madhav Kohli"
                className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
              />
            </div>

            {isPlayingAudio && (
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                Speaking
              </span>
            )}
          </div>

          {/* Info & Audio Trigger */}
          <div className="text-center sm:text-left flex-1 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles size={13} /> Project Creator & Full Stack Engineer
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Madhav Kohli
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              B.Tech in Computer Science &bull; Backend & Full-Stack Web Developer specialized in React, Node.js, Express, MongoDB, and AI API Integrations.
            </p>

            {/* Audio Playback Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={toggleAudioBio}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause size={14} className="animate-pulse" />
                    <span>Pause Voice Intro</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} />
                    <span>Play Voice Introduction</span>
                  </>
                )}
              </button>

              {/* Animated Sound Equalizer Waves */}
              {isPlayingAudio && (
                <div className="flex items-end gap-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="w-1 bg-emerald-400 rounded-full h-3 animate-wave-1"></span>
                  <span className="w-1 bg-emerald-400 rounded-full h-5 animate-wave-2"></span>
                  <span className="w-1 bg-emerald-400 rounded-full h-2 animate-wave-3"></span>
                  <span className="w-1 bg-emerald-400 rounded-full h-6 animate-wave-4"></span>
                  <span className="w-1 bg-emerald-400 rounded-full h-4 animate-wave-5"></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl mb-6 border border-slate-700/50">
          <button
            type="button"
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "about"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Trophy size={14} /> Achievements
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "education"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <GraduationCap size={14} /> Education
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "experience"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Briefcase size={14} /> Experience
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "skills"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 size={14} /> Technical Skills
          </button>
        </div>

        {/* TAB 1: Achievements */}
        {activeTab === "about" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy size={16} className="text-amber-400" />
                Key Achievements & Recognition
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">300+ DSA Problems Solved</strong>
                    <span>Consistent problem solver across LeetCode, GeeksforGeeks, and Codeforces mastering data structures, algorithms, and complexity.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Smart India Hackathon (SIH) 2025 Qualifier</strong>
                    <span>Internal Round Qualifier representing MindMitra with innovative software solutions.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Smart India Hackathon (SIH) 2024 Qualifier</strong>
                    <span>Internal Round Qualifier representing GreenCure sustainable technology initiative.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Education */}
        {activeTab === "education" && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    2023 &ndash; 2027
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Seth Jai Parkash Mukand Lal Institute of Engineering and Technology (JMIT)
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> Radaur, Haryana
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs">
                  CGPA: 7.6 / 10
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Bachelor of Technology (B.Tech) in Computer Science &bull; Cumulative CGPA across 6 semesters.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-[10px] text-slate-400">Class XII (CBSE) &bull; 2023</span>
                <h5 className="font-bold text-white mt-0.5">GMSSSS Radaur, Haryana</h5>
                <span className="text-emerald-400 font-semibold text-xs mt-1 block">Score: 80.4%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-[10px] text-slate-400">Class X (CBSE) &bull; 2021</span>
                <h5 className="font-bold text-white mt-0.5">SNSPS Ladwa, Kurukshetra</h5>
                <span className="text-emerald-400 font-semibold text-xs mt-1 block">Score: 94.0%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Experience */}
        {activeTab === "experience" && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">
                  Backend Web Development Intern &bull; Nirikshan AI Pvt. Ltd.
                </h4>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Jun 2026 &ndash; Jul 2026
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Architected modular backend services for ReserveBridge (DineDesk) using Node.js, Express.js, and MongoDB following MVC design patterns. Designed secure RESTful APIs with JWT authentication, RBAC, and middleware.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">
                  Web Development Intern &bull; Nirikshan AI Pvt. Ltd.
                </h4>
                <span className="text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded-full">
                  Jul 2025 &ndash; Aug 2025
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Developed responsive web applications using React, HTML, CSS, and modern JavaScript; connected backend Node.js and MongoDB database layers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">
                  Frontend Development Trainee &bull; Oops InfoSolutions Pvt. Ltd.
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold bg-slate-700 px-2 py-0.5 rounded-full">
                  Jul 2024 &ndash; Aug 2024
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Completed comprehensive industrial training in modern frontend frameworks and responsive UI design.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: Skills */}
        {activeTab === "skills" && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                  Languages & Core Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["C++", "JavaScript (ES6+)", "DSA", "Object Oriented Programming (OOP)", "DBMS", "RESTful APIs", "JWT Security"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1.5">
                  Web Frameworks & Databases
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["React.js", "Node.js", "Express.js", "MongoDB (Atlas)", "Tailwind CSS v4", "Firebase Auth"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                  Developer Tools & DevOps
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Git", "GitHub CI/CD", "Postman", "Vite", "Render Deployment", "Docker Concepts"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <a
              href="mailto:madhavkohli127@gmail.com"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <Mail size={14} className="text-emerald-400" />
              <span>madhavkohli127@gmail.com</span>
            </a>
            <a
              href="tel:+917027390494"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <Phone size={14} className="text-teal-400" />
              <span>+91 7027390494</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/madhav-kohli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1"
            >
              <Github size={15} />
              <span className="text-[11px]">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/madhav-kohli-b40478284/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1"
            >
              <Linkedin size={15} className="text-blue-400" />
              <span className="text-[11px]">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
