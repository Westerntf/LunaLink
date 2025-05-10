// src/components/ProjectedHighlights.tsx
import { FaClock, FaFire, FaLink, FaEye } from "react-icons/fa";

export default function ProjectedHighlights() {
  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white">Projected Insights & Highlights</h3>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Projected Earnings */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400 flex items-center gap-2">
            <FaClock className="text-accent" /> Projected This Month
          </span>
          <span className="text-2xl font-bold text-white">$447</span>
        </div>

        {/* Top Performing Content */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400 flex items-center gap-2">
            <FaFire className="text-accent" /> Top Content
          </span>
          <span className="text-sm text-white truncate">“🔥 Late Night BTS - Exclusive Drop”</span>
        </div>

        {/* Most Clicked Link */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400 flex items-center gap-2">
            <FaLink className="text-accent" /> Most Clicked Link
          </span>
          <span className="text-sm text-white break-all">https://lunalink.app/my-shop</span>
        </div>

        {/* Top Views */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400 flex items-center gap-2">
            <FaEye className="text-accent" /> Most Viewed Media
          </span>
          <span className="text-sm text-white">“Poolside Selfie Reveal” - 1.3K views</span>
        </div>
      </div>
    </div>
  );
}
