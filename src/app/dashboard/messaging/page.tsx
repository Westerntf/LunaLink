"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMessageSquare } from "react-icons/fi";

export default function InboxPage() {
  const [paidDMEnabled, setPaidDMEnabled] = useState(true);
  const [price, setPrice] = useState(10);
  const [autoReply, setAutoReply] = useState("Thanks for your message! I'll reply soon.");

  const quickStats = {
    dmEarnings: "$135",
    avgTip: "$17",
    mostMessaged: "John",
  };

  const messages = [
    { fan: "Anna", msg: "Thanks for the drop!", tip: "$5", time: "1h ago", avatar: "/avatars/1.png" },
    { fan: "David", msg: "That teaser was 🔥", tip: "$7", time: "5h ago", avatar: "/avatars/2.png" },
    { fan: "Sophie", msg: "Can’t wait for more", tip: "$10", time: "3d ago", avatar: "/avatars/3.png" },
  ];

  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-bold">Inbox</h2>

      {/* 💬 Messages Feed */}
      <div className="glass-card p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="flex justify-between items-center text-sm border-b border-neutral-800 pb-3 last:border-none">
            <div className="flex items-center gap-3">
              <Image src={msg.avatar} alt={msg.fan} width={32} height={32} className="rounded-full" />
              <div className="flex flex-col">
                <span className="font-medium text-white">{msg.fan}</span>
                <span className="text-neutral-400">{msg.msg}</span>
              </div>
            </div>
            <div className="text-right text-xs text-neutral-400 space-y-1">
              <p>{msg.tip}</p>
              <p>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ⚙️ Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Messaging */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Smart Messaging</h3>
          <div className="flex items-center justify-between">
            <span>Enable Paid DMs</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paidDMEnabled}
                onChange={() => setPaidDMEnabled(!paidDMEnabled)}
              />
              <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-accent relative transition-all">
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    paidDMEnabled ? "translate-x-5" : ""
                  }`}
                />
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-300">DM Price</label>
            <select
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm text-white"
            >
              {[5, 10, 20].map((p) => (
                <option key={p} value={p}>${p}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Auto-reply Message</label>
            <textarea
              value={autoReply}
              onChange={(e) => setAutoReply(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm text-white min-h-[80px]"
            />
          </div>

          <button className="text-sm text-purple-400 hover:underline">+ Attach media</button>
          <button className="w-full gradient-btn mt-3">Send reply after tip</button>
        </div>

        {/* Templates */}
        <div className="glass-card p-6 space-y-3">
          <h3 className="text-lg font-semibold">Message Templates</h3>
          {[
            "Feel free to message me!",
            "Thanks for the support 💜",
            "You're amazing!",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-sm flex items-center justify-between hover:bg-neutral-700 cursor-pointer transition"
            >
              {text} <FiMessageSquare className="text-purple-400" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-neutral-400">DM earnings this week</span>
              <span>{quickStats.dmEarnings}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-neutral-400">Avg. tip amount</span>
              <span>{quickStats.avgTip}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-neutral-400">Most messaged fan</span>
              <span>{quickStats.mostMessaged}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
