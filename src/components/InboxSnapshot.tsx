// src/components/InboxSnapshot.tsx
import { FaEnvelopeOpenText, FaCommentDots } from "react-icons/fa";

export default function InboxSnapshot() {
  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white">Messages & Engagement</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-400 flex items-center gap-2">
            <FaEnvelopeOpenText className="text-accent" /> Unread DMs
          </span>
          <span className="text-white font-semibold text-lg">4</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-white font-medium">Latest Messages</p>
          <div className="space-y-1 text-sm text-neutral-300">
            <div className="flex justify-between">
              <span>“Hey I loved that last post!”</span>
              <span className="text-xs text-neutral-500">2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>“Can I request something special?”</span>
              <span className="text-xs text-neutral-500">6h ago</span>
            </div>
          </div>
        </div>

        <button className="gradient-btn w-full text-sm">
          <FaCommentDots className="inline mr-2" />
          Go to Inbox
        </button>
      </div>
    </div>
  );
}
