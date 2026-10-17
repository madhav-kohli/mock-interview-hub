import React from "react";

interface TimerProps {
  timeLeft: number;
  totalTime?: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime = 60 }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, timeLeft / totalTime));
  const strokeDashoffset = circumference - progress * circumference;

  // Determine urgency color
  let strokeColor = "#10b981"; // emerald-500
  let textColor = "text-emerald-400";
  let bgBadge = "bg-emerald-500/10 text-emerald-300";

  if (timeLeft <= 15) {
    strokeColor = "#ef4444"; // red-500
    textColor = "text-red-400 animate-pulse";
    bgBadge = "bg-red-500/20 text-red-300 animate-pulse";
  } else if (timeLeft <= 30) {
    strokeColor = "#f59e0b"; // amber-500
    textColor = "text-amber-400";
    bgBadge = "bg-amber-500/15 text-amber-300";
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* SVG Circle Timer */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="5"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center Countdown Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-extrabold tracking-tight font-mono ${textColor}`}>
            {formattedTime}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
            Remaining
          </span>
        </div>
      </div>

      <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${bgBadge}`}>
        {timeLeft <= 15 ? "Final Seconds!" : timeLeft <= 30 ? "Half Time" : "Time Window"}
      </div>
    </div>
  );
};

export default Timer;
