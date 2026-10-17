import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { updateCredits } from "../redux/userSlice.ts";
import { api } from "../services/api.ts";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { AuthModal } from "../components/AuthModal.tsx";
import {
  CreditCard,
  CheckCircle2,
  Coins,
  Sparkles,
  Zap,
  Award,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  GraduationCap
} from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  const [selectedPlan, setSelectedPlan] = useState<string>("basic");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Free Student Starter",
      price: "₹0",
      credits: 100,
      description: "Ideal for trying out your first technical or HR simulation.",
      tag: "Free Trial",
      features: [
        "100 AI Interview Credits (2 Full Sessions)",
        "Standard Speech Synthesis Voice",
        "Instant Scoring & Feedback",
        "Downloadable PDF Scorecard",
        "Standard Question Progression"
      ]
    },
    {
      id: "basic",
      name: "Student Placement Pro",
      price: "₹99",
      credits: 300,
      description: "Most popular for intensive campus placement and tech job search.",
      tag: "Most Popular",
      popular: true,
      features: [
        "300 AI Interview Credits (6 Full Sessions)",
        "Choice of Alex or Sarah AI Personas",
        "Resume Analysis & Tailored Questions",
        "Detailed Question-by-Question Feedback",
        "Performance Analytics & Histograms",
        "Official PDF Report Export"
      ]
    },
    {
      id: "pro",
      name: "Campus Master Pack",
      price: "₹399",
      credits: 1000,
      description: "Unrestricted practice for seniors, FAANG candidates, and instructors.",
      tag: "Best Value",
      features: [
        "1,000 AI Interview Credits (20 Full Sessions)",
        "All Personas & Senior Architect Mode",
        "Unlimited Resume Upload & Parsing",
        "Priority AI Response Generation",
        "Full Interview History Export",
        "Teacher Evaluator Verification"
      ]
    }
  ];

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (!userData) {
      setShowAuthModal(true);
      return;
    }

    setIsProcessing(true);
    setSuccessMsg(null);

    // Simulate instant secure transaction
    setTimeout(async () => {
      const updatedUser = await api.addCredits(plan.credits);
      if (updatedUser) {
        dispatch(updateCredits(updatedUser.credits));
      }
      setIsProcessing(false);
      setSuccessMsg(`🎉 Success! ${plan.credits} Credits added to your account.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Coins size={14} className="text-amber-400" /> Transparent Credit Packages
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Flexible Credit Plans for Candidates & Evaluators
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Each 5-question AI mock interview session costs exactly 50 credits. Top up anytime with instant simulated checkout.
          </p>

          {successMsg && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 max-w-md mx-auto animate-bounce">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  plan.popular
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10"
                    : "bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl"
                }`}
              >
                {/* Top Badge */}
                {plan.tag && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      plan.popular
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {plan.tag}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400">/ package</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                      <Coins size={14} className="text-amber-400" />
                      <span>{plan.credits} Credits</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Included Features:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(plan);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <span>Adding Credits...</span>
                  ) : (
                    <>
                      <span>Top Up {plan.credits} Credits</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/60 border border-slate-800 p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-400" /> Frequently Asked Questions
          </h3>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-bold text-white mb-1">How many credits does an interview require?</h4>
              <p className="text-slate-400">Each full 5-question interview session costs exactly 50 credits, which covers question generation, speech analysis, and PDF score report generation.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-bold text-white mb-1">Can professors and evaluators get free testing credits?</h4>
              <p className="text-slate-400">Yes! Use the 1-Click Teacher Evaluator Mode in the sign-in modal to immediately receive 750 free demo credits.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <h4 className="font-bold text-white mb-1">Do credits expire?</h4>
              <p className="text-slate-400">No, all practice credits remain in your account and persist across browser sessions.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
