import React, { useState, useEffect, useRef } from "react";
import { InterviewSession, QuestionData, api } from "../services/api.ts";
import Timer from "./Timer.tsx";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Send,
  ArrowRight,
  Bot,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Award
} from "lucide-react";

interface Step2InterviewProps {
  interviewData: InterviewSession;
  onFinish: (completedSession: InterviewSession) => void;
}

export const Step2Interview: React.FC<Step2InterviewProps> = ({ interviewData, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    feedback: string;
    score: number;
    confidence: number;
    communication: number;
    correctness: number;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const questions = interviewData.questions || [];
  const currentQuestion: QuestionData | undefined = questions[currentIndex];

  // Select video source based on role or mode
  const isFemaleInterviewer = interviewData.mode === "HR" || (interviewData.interviewer && interviewData.interviewer.includes("Sarah"));
  const videoSource = isFemaleInterviewer ? "/src/assets/videos/female-ai.mp4" : "/src/assets/videos/male-ai.mp4";

  // Speech Synthesis helper
  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = isFemaleInterviewer ? 1.05 : 0.95;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      };

      utterance.onend = () => {
        setIsAIPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
        resolve();
      };

      utterance.onerror = () => {
        setIsAIPlaying(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setAnswer((prev) => {
          const trimmedPrev = prev.trim();
          return trimmedPrev ? `${trimmedPrev} ${currentTranscript.trim()}` : currentTranscript.trim();
        });
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition notice:", err);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When question changes, speak question & reset timer
  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit || 60);
    setAnswer("");
    setFeedbackData(null);
    setSubtitle(currentQuestion.question);

    const announceQuestion = async () => {
      let prefix = "";
      if (currentIndex === 0) {
        prefix = `Hello! Welcome to your ${interviewData.role} mock interview. Let's start with your first question: `;
      } else if (currentIndex === questions.length - 1) {
        prefix = "Alright, this is our final and most challenging question: ";
      } else {
        prefix = "Next question: ";
      }
      await speakText(prefix + currentQuestion.question);
    };

    announceQuestion();
  }, [currentIndex]);

  // Countdown timer
  useEffect(() => {
    if (feedbackData) return; // paused when reviewing feedback

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [feedbackData, currentIndex]);

  // Mic controls
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type your answer below.");
      return;
    }

    if (isMicOn) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsMicOn(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsMicOn(true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Submit candidate answer
  const handleSubmitAnswer = async () => {
    if (isSubmitting || !currentQuestion) return;

    if (isMicOn && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsMicOn(false);
    }

    setIsSubmitting(true);

    try {
      const timeSpent = (currentQuestion.timeLimit || 60) - timeLeft;
      const res = await api.submitAnswer({
        interviewId: interviewData._id,
        questionIndex: currentIndex,
        answer: answer.trim() || "Candidate provided no verbal response.",
        timeTaken: Math.max(1, timeSpent)
      });

      setFeedbackData(res);
      await speakText(`Thank you. ${res.feedback}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next question or finish
  const handleProceedNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const completed = await api.finishInterview(interviewData._id);
        onFinish(completed);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getDifficultyBadge = (diff: "easy" | "medium" | "hard") => {
    switch (diff) {
      case "easy":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Easy Level</span>;
      case "medium":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Medium Complexity</span>;
      case "hard":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Hard / Architect</span>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Session Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Live AI Interview Studio
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {interviewData.role} &bull; <span className="text-slate-400 font-normal">{interviewData.mode}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block">Interviewer Persona:</span>
            <span className="font-semibold text-slate-200">{interviewData.interviewer || "Senior AI Evaluator"}</span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: AI Video Avatar & Timer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Avatar Video Container */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-video lg:aspect-4/3 flex items-center justify-center group">
            <video
              ref={videoRef}
              src={videoSource}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Speaking Status Pill */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
              {isAIPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-300 font-semibold">AI Interviewer Speaking</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="text-slate-300">Listening to Candidate</span>
                </>
              )}
            </div>

            {/* Equalizer animation bar when AI is speaking */}
            {isAIPlaying && (
              <div className="absolute bottom-4 right-4 z-10 flex items-end gap-1 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className="w-1 bg-emerald-400 rounded-full h-4 animate-wave-1"></span>
                <span className="w-1 bg-emerald-400 rounded-full h-6 animate-wave-2"></span>
                <span className="w-1 bg-emerald-400 rounded-full h-3 animate-wave-3"></span>
                <span className="w-1 bg-emerald-400 rounded-full h-5 animate-wave-4"></span>
                <span className="w-1 bg-emerald-400 rounded-full h-2 animate-wave-5"></span>
              </div>
            )}
          </div>

          {/* Subtitle Dialogue Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs leading-relaxed text-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 size={14} className="text-emerald-400" />
                Interviewer Audio Prompt
              </span>
              <button
                type="button"
                onClick={() => currentQuestion && speakText(currentQuestion.question)}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <RotateCcw size={12} /> Replay Audio
              </button>
            </div>
            <p className="font-medium text-white text-sm">
              &ldquo;{subtitle || currentQuestion?.question}&rdquo;
            </p>
          </div>

          {/* Timer & Question Progress Widget */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-around">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Time Remaining</span>
                <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
              </div>

              <div className="h-16 w-px bg-slate-800"></div>

              <div className="text-center">
                <span className="text-xs text-slate-400 block mb-1">Progress</span>
                <div className="text-2xl font-extrabold text-white">
                  {currentIndex + 1} <span className="text-slate-500 text-lg font-normal">/ {questions.length}</span>
                </div>
                <div className="mt-2">
                  {currentQuestion && getDifficultyBadge(currentQuestion.difficulty)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question & Candidate Response Input (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Question Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 border border-slate-700/80 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                Target: {currentQuestion?.timeLimit} seconds
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
              {currentQuestion?.question}
            </h3>
          </div>

          {/* Candidate Response Workspace */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>Candidate Response</span>
                {isMicOn && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 lowercase font-normal bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    recording voice...
                  </span>
                )}
              </label>

              <span className="text-[11px] text-slate-500">
                {answer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {/* Answer Text Area (Editable with real-time speech-to-text) */}
            <textarea
              rows={7}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Speak using the microphone button below or type your technical answer here..."
              className="w-full p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm leading-relaxed focus:outline-none focus:border-emerald-500 transition resize-none"
            />

            {/* Control Bar: Mic toggle & Submit */}
            {!feedbackData ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                    isMicOn
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                >
                  {isMicOn ? (
                    <>
                      <MicOff size={18} />
                      <span>Stop Microphone</span>
                    </>
                  ) : (
                    <>
                      <Mic size={18} className="text-emerald-400" />
                      <span>Turn On Microphone (Speak)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting || !answer.trim()}
                  onClick={handleSubmitAnswer}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition disabled:opacity-50"
                >
                  <Send size={16} />
                  {isSubmitting ? "Evaluating Answer with AI..." : "Submit Candidate Answer"}
                </button>
              </div>
            ) : (
              /* Instant Feedback Card */
              <div className="p-5 rounded-2xl bg-slate-800/90 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Sparkles size={16} />
                    </div>
                    <span className="font-bold text-white text-sm">Real-Time AI Feedback</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-xl font-extrabold text-xs">
                    <Award size={14} /> Score: {feedbackData.score}/10
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                  {feedbackData.feedback}
                </p>

                {/* Score Axis Preview */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60">
                    <span className="text-[10px] text-slate-400 block">Confidence</span>
                    <span className="font-bold text-emerald-400">{feedbackData.confidence}/10</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60">
                    <span className="text-[10px] text-slate-400 block">Communication</span>
                    <span className="font-bold text-teal-400">{feedbackData.communication}/10</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60">
                    <span className="text-[10px] text-slate-400 block">Correctness</span>
                    <span className="font-bold text-emerald-400">{feedbackData.correctness}/10</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedNext}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
                >
                  <span>
                    {currentIndex + 1 < questions.length ? "Next Question" : "Complete & Generate Final Report"}
                  </span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;
