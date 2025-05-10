"use client";

import React from "react";

const mockDms = [
  { id: "1", user: "Anna", message: "Thanks for your latest post!", time: "2h ago" },
  { id: "2", user: "Jake", message: "How can I subscribe?", time: "4h ago" },
  { id: "3", user: "Nina", message: "Sent a tip your way!", time: "6h ago" },
];

export default function QuickDms() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Recent DMs</h2>
        <button className="gradient-btn text-xs px-3 py-1">View All</button>
      </div>

      <div className="space-y-4 text-sm text-neutral-300">
        {mockDms.map((dm) => (
          <div key={dm.id} className="border-b border-neutral-800 pb-4">
            <div className="flex justify-between">
              <span className="font-semibold">{dm.user}</span>
              <span className="text-xs text-neutral-500">{dm.time}</span>
            </div>
            <p className="text-neutral-400 mt-1">{dm.message}</p>
            <button className="mt-2 gradient-btn text-xs px-3 py-1">Quick Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
