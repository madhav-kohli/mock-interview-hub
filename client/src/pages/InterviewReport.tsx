import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { Step3Report } from "../components/Step3Report.tsx";
import { api, InterviewSession } from "../services/api.ts";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function InterviewReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<InterviewSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      try {
        const data = await api.getReport(id);
        setReport(data);
      } catch (err) {
        console.error("Failed to fetch report", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
            <p className="text-sm">Loading Interview Evaluation Report...</p>
          </div>
        ) : report ? (
          <Step3Report report={report} />
        ) : (
          <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-300">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Report Not Found</h3>
            <p className="text-xs text-slate-400 mb-6">
              The requested interview session ID does not exist or has expired.
            </p>
            <button
              onClick={() => navigate("/history")}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              Back to History
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
