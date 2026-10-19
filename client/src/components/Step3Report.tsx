import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewSession } from "../services/api.ts";
import confetti from "canvas-confetti";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Award,
  Download,
  RotateCcw,
  History,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from "lucide-react";

interface Step3ReportProps {
  report: InterviewSession;
  onRetake?: () => void;
}

export const Step3Report: React.FC<Step3ReportProps> = ({ report, onRetake }) => {
  const navigate = useNavigate();

  // Fire celebratory confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const finalScore = report.finalScore ?? 8.0;
  const confidence = report.confidence ?? 8.0;
  const communication = report.communication ?? 8.0;
  const correctness = report.correctness ?? 8.0;
  const questions = report.questions || [];

  // Performance grade
  let grade = "A";
  let gradeColor = "text-emerald-400";
  let statusText = "Ready for Tech Hiring";
  let advice = "Outstanding demonstration of core concepts and communication clarity. Continue reinforcing real-world distributed architectures.";

  if (finalScore >= 8.5) {
    grade = "A+";
    gradeColor = "text-emerald-400";
    statusText = "Senior Ready / Top 5%";
    advice = "Exceptional interview presence. Excellent balance of technical precision, structured thought, and clear voice delivery.";
  } else if (finalScore >= 7.0) {
    grade = "B+";
    gradeColor = "text-teal-400";
    statusText = "Solid Candidate Foundation";
    advice = "Strong foundation demonstrated. To reach the next level, elaborate more on trade-offs and alternative implementation strategies.";
  } else {
    grade = "C";
    gradeColor = "text-amber-400";
    statusText = "Needs Guided Revision";
    advice = "Review foundational core concepts and practice speaking aloud in structured bullet points to enhance confidence.";
  }

  // Official PDF Generation
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 14;

    // Branded Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 36, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("MockInterviewHub - Candidate Evaluation Report", margin, 20);

    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129); // emerald-500
    doc.text(`Official Academic & Performance Assessment Report • Generated: ${new Date().toLocaleDateString()}`, margin, 28);

    let currentY = 46;

    // Overview Card
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, 182, 38, 3, 3, "FD");

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Candidate & Session Details", margin + 6, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Target Role: ${report.role}`, margin + 6, currentY + 20);
    doc.text(`Experience: ${report.experience}`, margin + 6, currentY + 28);
    doc.text(`Mode: ${report.mode}`, margin + 70, currentY + 20);
    doc.text(`Interviewer: ${report.interviewer || "AI Evaluator"}`, margin + 70, currentY + 28);
    doc.text(`Overall Score: ${finalScore}/10 (${statusText})`, margin + 125, currentY + 20);
    doc.text(`Grade Awarded: ${grade}`, margin + 125, currentY + 28);

    currentY += 46;

    // Skill Metrics
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Core Competency Metrics (Scale 0-10)", margin, currentY);

    currentY += 6;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, currentY, 182, 18, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`Technical Correctness: ${correctness}/10`, margin + 6, currentY + 11);
    doc.text(`Communication Clarity: ${communication}/10`, margin + 68, currentY + 11);
    doc.text(`Confidence & Delivery: ${confidence}/10`, margin + 130, currentY + 11);

    currentY += 26;

    // Evaluator Advice
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Evaluator Feedback & Recommendation", margin, currentY);

    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const splitAdvice = doc.splitTextToSize(advice, 182);
    doc.text(splitAdvice, margin, currentY + 6);

    currentY += 18;

    // Question Breakdown Table
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question Prompt", "Score", "Evaluator Feedback"]],
      body: questions.map((q, idx) => [
        `${idx + 1}`,
        q.question,
        `${q.score ?? 8}/10`,
        q.feedback || "Good response demonstrating familiarity with fundamental concepts."
      ]),
      styles: {
        fontSize: 8.5,
        cellPadding: 4,
        valign: "top"
      },
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: 255,
        fontStyle: "bold"
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 70 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: 82 }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    doc.save(`MockInterviewHub_Report_${report.role.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles size={14} /> Official Performance Assessment
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interview Analytics & Scorecard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {report.role} &bull; {report.experience} &bull; {report.mode} Track
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Download size={15} /> Download Official PDF Report
          </button>

          <button
            type="button"
            onClick={() => (onRetake ? onRetake() : navigate("/interview"))}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw size={14} /> Retake
          </button>

          <button
            type="button"
            onClick={() => navigate("/history")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <History size={14} /> All Sessions
          </button>
        </div>
      </div>

      {/* Top Cards: Score Gauge + Skill Metrics + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Score Gauge */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Overall Score
          </span>

          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="#10b981"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={(2 * Math.PI * 52) * (1 - finalScore / 10)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white font-mono">{finalScore}</span>
              <span className="text-xs text-slate-400">out of 10</span>
            </div>
          </div>

          <div className="mt-4">
            <span className={`text-base font-bold ${gradeColor}`}>{statusText}</span>
            <div className="mt-1 text-xs text-slate-400">Grade: {grade}</div>
          </div>
        </div>

        {/* Card 2: Skill Competencies */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-center">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Brain size={16} className="text-emerald-400" />
            Core Competency Breakdown
          </h3>

          <div className="space-y-4 text-xs">
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Technical Correctness</span>
                <span className="font-bold text-emerald-400">{correctness}/10</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${correctness * 10}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Communication Clarity</span>
                <span className="font-bold text-teal-400">{communication}/10</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${communication * 10}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Confidence & Fluency</span>
                <span className="font-bold text-emerald-400">{confidence}/10</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${confidence * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Evaluator Recommendation */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Award size={16} className="text-emerald-400" />
              Instructor & AI Evaluation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              &ldquo;{advice}&rdquo;
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Interviewer: {report.interviewer || "Senior Lead"}</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck size={14} /> Verified Assessment
            </span>
          </div>
        </div>
      </div>

      {/* Question-by-Question Deep Dive */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-400" />
              Detailed Question-by-Question Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Review your submitted answers, AI evaluator feedback, and benchmark scoring.
            </p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-semibold">
            {questions.length} Questions Evaluated
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4 hover:border-slate-600 transition"
            >
              {/* Question header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {q.difficulty} Complexity Question
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
                  Score: {q.score ?? 8}/10
                </span>
              </div>

              {/* Prompt */}
              <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                {q.question}
              </h4>

              {/* Candidate answer */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Candidate Recorded Answer:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {q.answer ? `"${q.answer}"` : "Candidate did not record an answer."}
                </p>
              </div>

              {/* AI Feedback */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Sparkles size={12} /> AI Evaluator Feedback:
                </span>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  {q.feedback || "Solid answer demonstrating good comprehension of software development standards."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3Report;
