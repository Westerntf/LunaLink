// src/components/RecentDMsPreview.tsx
import { FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const mockMessages = [
  { name: "Anna", message: "Loved your latest post!", time: "2h ago", avatar: "/avatars/1.png" },
  { name: "Jake", message: "Can I request a custom?", time: "5h ago", avatar: "/avatars/2.png" },
  { name: "LunaFan", message: "Keep it up!", time: "1d ago", avatar: "/avatars/3.png" },
];

export default function RecentDMsPreview() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
          <FaEnvelope className="text-purple-400" />
          Recent DMs
        </h3>
        <a href="/dashboard/inbox" className="text-xs text-purple-400 hover:underline">
          View all
        </a>
      </div>

      <div className="space-y-3 text-sm">
        {mockMessages.map((msg, idx) => (
          <div key={idx} className="flex justify-between items-center text-neutral-300">
            <div className="flex items-center gap-3">
              <Image
                src={msg.avatar}
                alt={msg.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{msg.name}</p>
                <p className="text-xs text-neutral-500">{msg.message}</p>
              </div>
            </div>
            <span className="text-xs text-neutral-500">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
