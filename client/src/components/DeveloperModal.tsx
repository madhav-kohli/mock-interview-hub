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
  Camera,
  Maximize2
} from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "education" | "experience" | "skills">("about");
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem("madhav_custom_photo") || "/developer-madhav.jpg";
  });
  const [isZoomed, setIsZoomed] = useState(false);

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

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setPhotoUrl(resultStr);
          localStorage.setItem("madhav_custom_photo", resultStr);
        }
      };
      reader.readAsDataURL(file);
    }
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
    <>
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[95vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => {
              if ("speechSynthesis" in window) window.speechSynthesis.cancel();
              setIsPlayingAudio(false);
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          {/* Top Banner */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Lead Developer & Creator Profile
            </span>
          </div>

          {/* Main Content Layout: Big Image Column + Detailed Info Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* BIG IMAGE COLUMN (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] group">
                {/* Glow ring */}
                <div
                  className={`absolute -inset-2 rounded-3xl blur-xl transition duration-700 ${
                    isPlayingAudio
                      ? "bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 opacity-90 animate-pulse"
                      : "bg-gradient-to-tr from-emerald-500/40 to-teal-500/30 opacity-70 group-hover:opacity-100"
                  }`}
                ></div>

                {/* Big Image Container */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/60 shadow-2xl bg-slate-950 aspect-[3/4] w-full flex items-center justify-center">
                  <img
                    src={photoUrl}
                    alt="Madhav Kohli"
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-500 cursor-pointer"
                    onClick={() => setIsZoomed(true)}
                    title="Click to zoom image"
                  />

                  {/* Zoom click badge */}
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs flex items-center gap-1 transition cursor-pointer"
                    title="Zoom Full Photo"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Change photo button */}
                  <label
                    htmlFor="photoUploadInput"
                    className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-white/10"
                  >
                    <Camera size={14} className="text-emerald-400" />
                    <span>Upload / Change Original Photo</span>
                  </label>
                  <input
                    id="photoUploadInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCustomPhotoUpload}
                  />
                </div>
              </div>

              {/* Spoken Bio Audio Trigger under Image */}
              <div className="w-full max-w-[340px] mt-4 space-y-2">
                <button
                  type="button"
                  onClick={toggleAudioBio}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition cursor-pointer"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause size={16} className="animate-pulse" />
                      <span>Pause Voice Bio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={16} />
                      <span>Play Voice Introduction</span>
                    </>
                  )}
                </button>

                {isPlayingAudio && (
                  <div className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[11px] text-emerald-400 font-semibold mr-2">Speaking</span>
                    <span className="w-1 bg-emerald-400 rounded-full h-3 animate-wave-1"></span>
                    <span className="w-1 bg-emerald-400 rounded-full h-5 animate-wave-2"></span>
                    <span className="w-1 bg-emerald-400 rounded-full h-2 animate-wave-3"></span>
                    <span className="w-1 bg-emerald-400 rounded-full h-6 animate-wave-4"></span>
                    <span className="w-1 bg-emerald-400 rounded-full h-4 animate-wave-5"></span>
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS COLUMN (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Madhav Kohli
                </h2>
                <p className="text-emerald-400 font-semibold text-sm mt-0.5">
                  B.Tech in Computer Science &bull; Full Stack & Backend Web Developer
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  Passionate software engineer with hands-on experience building scalable web architectures, REST APIs with JWT authentication, and interactive AI solutions.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("about")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === "about"
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
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
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
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
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
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
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 size={14} /> Skills
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === "about" && (
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
                      <Award size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block text-xs sm:text-sm">Smart India Hackathon (SIH) 2025 Qualifier</strong>
                        <span className="text-xs text-slate-300">
                          Internal Round Qualifier for project MindMitra.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <Award size={18} className="text-emerald-400 shrink-0 mt-0.5" />
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

              {activeTab === "education" && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          2023 &ndash; 2027
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          Seth Jai Parkash Mukand Lal Institute of Engineering and Technology (JMIT)
                        </h4>
                        <p className="text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} /> Radaur, Haryana
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs">
                        CGPA: 7.6 / 10
                      </span>
                    </div>
                    <p className="text-slate-300">
                      B.Tech in Computer Science &bull; Cumulative CGPA across 6 semesters.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
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
                      Engineered backend services using Node.js, Express.js, and MongoDB following MVC patterns; built secure RESTful APIs with JWT authentication, RBAC, and middleware.
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
                      Built responsive frontend web interfaces with React, HTML, CSS, JavaScript; connected backend Node.js and MongoDB services.
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
                      Completed industrial training in responsive frontend engineering and web technologies.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                        Languages & Core Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["C++", "JavaScript", "DSA", "OOP", "DBMS", "REST APIs", "JWT"].map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1.5">
                        Full Stack Web & Databases
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase Auth"].map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                        Tools & Platforms
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Git", "GitHub", "Postman", "Vite", "Render"].map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
                            {s}
                          </span>
                        ))}
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

      {/* Lightbox / Zoomed Image Modal */}
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
              src={photoUrl}
              alt="Madhav Kohli"
              className="w-full h-full object-contain max-h-[85vh] rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
