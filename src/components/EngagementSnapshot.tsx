// components/EngagementSnapshot.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSend } from "react-icons/fi";

interface TopTipper {
  id: string;
  name: string;
  avatar: string;
  amount: number;
}

const mockTippers: TopTipper[] = [
  { id: "1", name: "Alex", avatar: "/avatars/1.png", amount: 85 },
  { id: "2", name: "Jamie", avatar: "/avatars/2.png", amount: 72 },
  { id: "3", name: "Taylor", avatar: "/avatars/3.png", amount: 60 },
  { id: "4", name: "Jordan", avatar: "/avatars/4.png", amount: 48 },
];

export default function EngagementSnapshot() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sendMessage = () => {
    if (!selectedIds.length) return;
    alert(`Message sent to: ${selectedIds.join(", ")}`);
    setMessage("");
    setSelectedIds([]);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Top Tippers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockTippers.map((tipper) => {
          const selected = selectedIds.includes(tipper.id);
          return (
            <div
              key={tipper.id}
              onClick={() => toggleSelect(tipper.id)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                selected ? "bg-purple-800/30 ring-2 ring-purple-500" : "bg-neutral-800"
              }`}
            >
              <Image
                src={tipper.avatar}
                alt={tipper.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{tipper.name}</p>
                <p className="text-sm text-neutral-400">${tipper.amount} tipped</p>
              </div>
              {selected && (
                <FiSend className="text-purple-400 text-xl transition-all" />
              )}
            </div>
          );
        })}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a thank you message..."
        className="w-full mt-4 p-3 bg-neutral-900 border border-neutral-700 text-sm rounded-md text-white resize-none min-h-[80px]"
      />

      <button
        disabled={!selectedIds.length || !message.trim()}
        onClick={sendMessage}
        className={`w-full mt-3 py-2 rounded-md font-medium transition-all shadow-glow ${
          !selectedIds.length || !message.trim()
            ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
            : "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:opacity-90"
        }`}
      >
        {selectedIds.length === 0
          ? "Send"
          : selectedIds.length === 1
          ? "Send to 1"
          : `Send to All (${selectedIds.length})`}
      </button>
    </div>
  );
}
