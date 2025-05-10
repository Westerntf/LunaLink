// src/components/PerformanceSnapshot.tsx
import { FaDollarSign, FaUsers, FaEnvelope, FaChartLine } from "react-icons/fa";

export default function PerformanceSnapshot() {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Performance Snapshot</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-neutral-300">
        <div className="flex flex-col items-start">
          <span className="text-white font-medium flex items-center gap-1">
            <FaDollarSign className="text-accent" /> $151
          </span>
          <span className="text-xs text-neutral-400">Earnings</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-medium flex items-center gap-1">
            <FaUsers className="text-accent" /> 8 <span className="text-green-400">↑18%</span>
          </span>
          <span className="text-xs text-neutral-400">New Subs</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-medium flex items-center gap-1">
            <FaEnvelope className="text-accent" /> 154
          </span>
          <span className="text-xs text-neutral-400">Messages</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-medium flex items-center gap-1">
            <FaChartLine className="text-accent" /> $11
          </span>
          <span className="text-xs text-neutral-400">Avg. Tip Size</span>
        </div>
      </div>
    </div>
  );
}
