import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { setUserData } from "../redux/userSlice.ts";
import { api, InterviewSession } from "../services/api.ts";
import { AuthModal } from "./AuthModal.tsx";
import {
  Briefcase,
  UserCheck,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Bot,
  Zap,
  Clock,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  FileCheck,
  User,
  GraduationCap
} from "lucide-react";

interface Step1SetUpProps {
  onStart: (session: InterviewSession) => void;
}

const PRESET_ROLES = [
  "Full Stack Developer",
  "Frontend React Engineer",
  "Backend Node.js Engineer",
  "Python & AI Specialist",
  "DevOps & Cloud Engineer",
  "Product Manager",
  "HR & Behavioral Candidate"
];

const PERSONAS = [
  {
    id: "alex",
    name: "Alex Carter",
    title: "Senior Engineering Director",
    gender: "male",
    description: "Deep technical questions, system design trade-offs, and code architecture.",
    tag: "Technical Expert"
  },
  {
    id: "sarah",
    name: "Sarah Lin",
    title: "Head of Talent & HR",
    gender: "female",
    description: "Evaluates behavioral STAR framework, leadership, and communication.",
    tag: "HR & Culture"
  }
];

export const Step1SetUp: React.FC<Step1SetUpProps> = ({ onStart }) => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [role, setRole] = useState("Full Stack Developer");
  const [experience, setExperience] = useState("2-3 years");
  const [mode, setMode] = useState<"Technical" | "HR" | "System Design">("Technical");
  const [persona, setPersona] = useState(PERSONAS[0]);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [resumeParsed, setResumeParsed] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Analyze uploaded resume
  const handleAnalyzeResume = async (fileToUse?: File | string) => {
    setAnalyzingResume(true);
    setErrorMsg(null);
    try {
      const res = await api.analyzeResume(fileToUse || resumeFile || "Sample Profile");
      setSkills(res.skills);
      setProjects(res.projects);
      setResumeParsed(true);
    } catch (e) {
      setErrorMsg("Could not analyze resume. Try sample resume button.");
    } finally {
      setAnalyzingResume(false);
    }
  };

  // 1-Click Load Sample Resume for Teacher/Demo
  const handleLoadSampleResume = async () => {
    setAnalyzingResume(true);
    try {
      const sample = await api.analyzeResume("Alex_Sharma_Software_Resume.pdf");
      setSkills(sample.skills);
      setProjects(sample.projects);
      setResumeParsed(true);
    } finally {
      setAnalyzingResume(false);
    }
  };

  const handleStartInterview = async () => {
    if (!userData) {
      setShowAuthModal(true);
      return;
    }

    if (userData.credits < 50) {
      setErrorMsg("You need at least 50 credits to start an AI interview session. Please top-up from Pricing.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const session = await api.createInterview({
        role,
        experience,
        mode,
        skills,
        projects,
        interviewer: `${persona.name} (${persona.title})`
      });

      // Update local redux user credits
      if (userData.credits) {
        dispatch(
          setUserData({
            ...userData,
            credits: Math.max(0, userData.credits - 50)
          })
        );
      }

      onStart(session);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to initialize interview.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles size={14} /> Step 1: Configure Your Practice Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Customize Your AI Interview
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Select target job role, experience level, interviewer persona, and upload your resume for real-time tailored questioning.
        </p>
      </div>

      {errorMsg && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Role & Mode Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Job Role */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Briefcase size={18} className="text-emerald-400" />
              Target Position & Role
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your target job title or choose from one of the popular tracks below.
            </p>

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition mb-3"
            />

            {/* Quick role tags */}
            <div className="flex flex-wrap gap-2">
              {PRESET_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                    role === r
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Experience & Interview Mode */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                Years of Experience
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Sets question depth and scenario complexity.
              </p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="0-1 years (Entry Level / Graduate)">0-1 years (Entry Level / Graduate)</option>
                <option value="2-3 years (Mid-Level Developer)">2-3 years (Mid-Level Developer)</option>
                <option value="4-6 years (Senior Engineer)">4-6 years (Senior Engineer)</option>
                <option value="7+ years (Lead / Staff Architect)">7+ years (Lead / Staff Architect)</option>
              </select>
            </div>

            {/* Mode */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Zap size={16} className="text-teal-400" />
                Interview Track Mode
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Choose evaluation focus.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("Technical");
                    setPersona(PERSONAS[0]);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                    mode === "Technical"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700"
                  }`}
                >
                  <span>Technical</span>
                  <span className="text-[10px] font-normal opacity-80">Algorithms & Tech</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode("HR");
                    setPersona(PERSONAS[1]);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                    mode === "HR"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700"
                  }`}
                >
                  <span>HR & Behavioral</span>
                  <span className="text-[10px] font-normal opacity-80">STAR & Leadership</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: AI Interviewer Persona */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Bot size={18} className="text-emerald-400" />
              Choose Your AI Interviewer Persona
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Each persona features distinct voice cadence, follow-up style, and evaluation rigor.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {PERSONAS.map((p) => {
                const isSelected = persona.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setPersona(p)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/40"
                        : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                          {p.gender === "male" ? "👨‍💻" : "👩‍💼"}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{p.name}</h4>
                          <span className="text-[11px] text-slate-400">{p.title}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-medium">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Resume Upload & Session Summary */}
        <div className="space-y-6">
          {/* Resume Upload Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <FileText size={18} className="text-emerald-400" />
              Candidate Resume
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Upload your resume so the AI can ask project-specific questions directly from your background.
            </p>

            {!resumeParsed ? (
              <div className="space-y-3">
                <div
                  onClick={() => document.getElementById("resumeInput")?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-6 text-center cursor-pointer bg-slate-800/30 hover:bg-emerald-500/5 transition group"
                >
                  <UploadCloud size={32} className="mx-auto text-slate-500 group-hover:text-emerald-400 transition mb-2" />
                  <input
                    id="resumeInput"
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setResumeFile(e.target.files[0]);
                        handleAnalyzeResume(e.target.files[0]);
                      }
                    }}
                  />
                  <p className="text-xs font-semibold text-slate-200">
                    {resumeFile ? resumeFile.name : "Click to Upload PDF or DOCX"}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Maximum size: 10MB
                  </p>
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-slate-500">or for testing:</span>
                  <button
                    type="button"
                    disabled={analyzingResume}
                    onClick={handleLoadSampleResume}
                    className="mt-1 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-semibold transition"
                  >
                    {analyzingResume ? "Extracting Profile..." : "📄 Use Sample Tech Resume (1-Click)"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileCheck size={16} /> Resume Parsed Successfully
                  </span>
                  <button
                    type="button"
                    onClick={() => setResumeParsed(false)}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Detected Skills ({skills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 6).map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-emerald-300 font-medium border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Target Projects ({projects.length}):
                  </span>
                  <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
                    {projects.slice(0, 2).map((p, idx) => (
                      <li key={idx} className="truncate">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Session Summary & Launch Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-400" />
              Session Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Position:</span>
                <span className="font-semibold text-white truncate max-w-[150px]">{role}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Experience:</span>
                <span className="font-semibold text-white">{experience}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Track:</span>
                <span className="font-semibold text-emerald-400">{mode} Interview</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Interviewer:</span>
                <span className="font-semibold text-white">{persona.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Questions:</span>
                <span className="font-semibold text-white">5 Adaptive Questions</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-300">
                <span className="text-slate-400">Credit Cost:</span>
                <span className="font-bold text-amber-400">50 Credits</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading || !role.trim()}
              onClick={handleStartInterview}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition group disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating Adaptive Questions...</span>
                </>
              ) : (
                <>
                  <span>Launch Live Interview Room</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500">
              Microphone & Audio will be activated in the next step.
            </p>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Step1SetUp;
