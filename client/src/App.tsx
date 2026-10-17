import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Auth from "./pages/Auth.tsx";
import InterviewPage from "./pages/InterviewPage.tsx";
import InterviewHistory from "./pages/InterviewHistory.tsx";
import Pricing from "./pages/Pricing.tsx";
import InterviewReport from "./pages/InterviewReport.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/history" element={<InterviewHistory />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/report/:id" element={<InterviewReport />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
