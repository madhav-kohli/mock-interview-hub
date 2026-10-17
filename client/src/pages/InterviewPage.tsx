import React, { useState } from "react";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { Step1SetUp } from "../components/Step1SetUp.tsx";
import { Step2Interview } from "../components/Step2Interview.tsx";
import { Step3Report } from "../components/Step3Report.tsx";
import { InterviewSession } from "../services/api.ts";

export default function InterviewPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sessionData, setSessionData] = useState<InterviewSession | null>(null);

  const handleStartSession = (session: InterviewSession) => {
    setSessionData(session);
    setStep(2);
  };

  const handleFinishSession = (completedSession: InterviewSession) => {
    setSessionData(completedSession);
    setStep(3);
  };

  const handleRetake = () => {
    setSessionData(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {step === 1 && <Step1SetUp onStart={handleStartSession} />}
        {step === 2 && sessionData && (
          <Step2Interview interviewData={sessionData} onFinish={handleFinishSession} />
        )}
        {step === 3 && sessionData && (
          <Step3Report report={sessionData} onRetake={handleRetake} />
        )}
      </main>

      <Footer />
    </div>
  );
}
