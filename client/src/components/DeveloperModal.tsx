import React, { useState } from "react";
import {
  X,
  Briefcase,
  Trophy,
  Code2,
  Mail,
  Phone,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Maximize2
} from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "achievements">("skills");
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[92vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          {/* Main Grid: Big Image on Left + Info on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* BIG IMAGE COLUMN (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] group">
                {/* Subtle Glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>

                {/* Big Image Frame */}
                <div
                  onClick={() => setIsZoomed(true)}
                  className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/60 shadow-2xl bg-slate-950 aspect-[3/4] w-full cursor-pointer group"
                  title="Click to view full photo"
                >
                  <img
                    src="/developer-madhav.jpg"
                    alt="Madhav Kohli"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />

                  {/* Zoom Badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs flex items-center gap-1 transition">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 mt-2.5">
                Click image to view full size
              </span>
            </div>

            {/* DETAILS COLUMN (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                  <Sparkles size={13} /> Full Stack & Backend Web Developer
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Madhav Kohli
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Specialized in building scalable backend services, RESTful APIs with JWT authentication, responsive React frontends, and AI integrations.
                </p>
              </div>

              {/* Simple Clean Tabs: Skills, Experience, Achievements */}
              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("skills")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "skills"
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 size={14} /> Skills
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("experience")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "experience"
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Briefcase size={14} /> Experience
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("achievements")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "achievements"
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Trophy size={14} /> Achievements
                </button>
              </div>

              {/* TAB 1: SKILLS */}
              {activeTab === "skills" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                        Languages & Core Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["C++", "JavaScript", "DSA", "OOP", "DBMS", "REST APIs", "JWT"].map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-2">
                        Full Stack Web & Databases
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase Auth"].map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                        Tools & Platforms
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Git", "GitHub", "Postman", "Vite", "Render"].map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EXPERIENCE */}
              {activeTab === "experience" && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">
                        Backend Web Development Intern &bull; Nirikshan AI Pvt. Ltd.
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        Jun 2026 &ndash; Jul 2026
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Engineered backend services using Node.js, Express.js, and MongoDB following MVC patterns; built secure RESTful APIs with JWT authentication, RBAC, and middleware.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">
                        Web Development Intern &bull; Nirikshan AI Pvt. Ltd.
                      </h4>
                      <span className="text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                        Jul 2025 &ndash; Aug 2025
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Built responsive frontend web interfaces with React, HTML, CSS, JavaScript; connected backend Node.js and MongoDB services.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">
                        Frontend Development Trainee &bull; Oops InfoSolutions Pvt. Ltd.
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold bg-slate-700 px-2.5 py-0.5 rounded-full">
                        Jul 2024 &ndash; Aug 2024
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Completed industrial training in responsive frontend engineering and web technologies.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: ACHIEVEMENTS */}
              {activeTab === "achievements" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <Trophy size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block text-xs sm:text-sm">300+ DSA Problems Solved</strong>
                        <span className="text-xs text-slate-300">
                          Active problem solver across LeetCode, GeeksforGeeks, and Codeforces focusing on algorithmic efficiency, trees, graphs, and dynamic programming.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block text-xs sm:text-sm">Smart India Hackathon (SIH) 2025 Qualifier</strong>
                        <span className="text-xs text-slate-300">
                          Internal Round Qualifier for project MindMitra.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block text-xs sm:text-sm">Smart India Hackathon (SIH) 2024 Qualifier</strong>
                        <span className="text-xs text-slate-300">
                          Internal Round Qualifier for project GreenCure.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Bar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3 text-slate-300">
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
        </div>
      </div>

      {/* Full Size Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-emerald-500/80 shadow-2xl">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white cursor-pointer z-10"
            >
              <X size={20} />
            </button>
            <img
              src="/developer-madhav.jpg"
              alt="Madhav Kohli"
              className="w-full h-full object-contain max-h-[85vh] rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
