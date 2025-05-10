// src/components/MilestoneShoutoutCard.tsx
import { FaStar, FaTrophy } from "react-icons/fa";

export default function MilestoneShoutoutCard() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-400" />
          Milestone Unlocked
        </h3>
        <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded">
          New
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-neutral-300">
          You just hit <span className="font-semibold text-white">1,000 followers!</span>
        </p>
        <p className="text-xs text-neutral-500">
          Fan shoutout: <span className="text-white">alex99</span> tipped $20 🎉
        </p>
      </div>

      <button className="gradient-btn text-sm w-full">
        Thank Your Fans
      </button>
    </div>
  );
}
