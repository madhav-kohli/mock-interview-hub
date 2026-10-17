import React from "react";
import { X, CheckCircle2, Award, Cpu, ShieldCheck, Database, Mic, FileText, Code2, Sparkles } from "lucide-react";

interface TeacherRubricModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherRubricModal: React.FC<TeacherRubricModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <Award size={24} />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Academic & Project Evaluation</span>
            <h2 className="text-2xl font-bold text-white">Full-Stack Project Rubric & Architecture</h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          This project, <strong className="text-white">InterviewIQ - AI Mock Interview Hub</strong>, is an end-to-end full-stack platform designed to simulate realistic technical and HR interview scenarios using AI, speech recognition, and adaptive scoring algorithms.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Cpu size={16} /> Frontend Architecture
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>React 19 with Vite 8 for instant HMR and build</li>
              <li>Tailwind CSS v4 modern utility design system</li>
              <li>Motion for fluid animations & transitions</li>
              <li>Web Speech API (<code className="text-emerald-300">webkitSpeechRecognition</code>) for live speech-to-text</li>
              <li>Web SpeechSynthesis for audio interviewer voice</li>
              <li>Redux Toolkit for centralized state & localStorage persistence</li>
              <li>jsPDF & autoTable for client-side PDF generation</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
              <Database size={16} /> Backend & Authentication
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Firebase Auth with Google OAuth integration</li>
              <li>1-Click Evaluator/Teacher quick demo bypass for test grading</li>
              <li>Express-compatible API router & controller schema</li>
              <li>Resume parser extracting candidate skills & project tags</li>
              <li>Role-based dynamic question generation engine</li>
              <li>Three-axis evaluation: Confidence, Communication, Correctness</li>
              <li>Credit billing & session management model</li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-emerald-300 flex items-center gap-2 mb-3">
            <Sparkles size={16} /> Key Features for Grading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Realistic AI Interviewer:</strong> Live video avatar with talking waveform visualizer.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Speech-to-Text & Voice Synthesis:</strong> Hands-free conversational interview experience.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Adaptive Question Difficulty:</strong> Progressive 5-question journey (Easy &rarr; Medium &rarr; Hard).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Official PDF Export:</strong> Formatted scorecard with metrics, breakdown table, and advice.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
          >
            Got it, Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
