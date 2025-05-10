"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import EarningsGraph from "@/components/EarningsGraph";

interface Tip {
  id: string;
  from: string;
  amount: number;
  unlock: boolean;
  dmUser?: string;
  timeAgo: string;
}

interface Fan {
  name: string;
  total: number;
  avatar: string;
}

export default function EarningsPage() {
  const { user, loading } = useCurrentUser();
  const [tips, setTips] = useState<Tip[]>([]);
  const [topFans, setTopFans] = useState<Fan[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchTips = async () => {
      const q = query(collection(db, "tips"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const tipItems: Tip[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        tipItems.push({
          id: doc.id,
          from: data.from || "Anon",
          amount: data.amount || 0,
          unlock: data.unlock || false,
          dmUser: data.dmUser,
          timeAgo: "30m",
        });
      });

      setTips(tipItems);
    };

    const fetchFans = () => {
      setTopFans([
        { name: "You", total: 200, avatar: "/avatars/1.png" },
        { name: "John", total: 140, avatar: "/avatars/2.png" },
        { name: "Alex", total: 25, avatar: "/avatars/3.png" },
      ]);
    };

    fetchTips();
    fetchFans();
  }, [user]);

  if (loading || !user) return <p className="text-white">Loading earnings...</p>;

  return (
    <div className="space-y-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Earnings</h2>
        <select className="bg-transparent border border-neutral-700 text-sm rounded px-2 py-1">
          <option>Last 30 days</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Graph */}
      <div className="glass-card p-6">
        <EarningsGraph />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tips */}
        <div className="glass-card p-6">
          <h4 className="font-semibold text-lg mb-4">Tips Received</h4>
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.id} className="flex justify-between items-center text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Image src="/avatars/1.png" alt="user" width={28} height={28} className="rounded-full" />
                  <div>
                    <p className="font-medium">${tip.amount}</p>
                    <p className="text-xs text-neutral-500">{tip.from}</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 text-right space-y-1">
                  <p>{tip.unlock ? "Unlock" : "Tip"}</p>
                  <p>{tip.dmUser || "N/A"}</p>
                  <p>{tip.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fans */}
        <div className="glass-card p-6">
          <h4 className="font-semibold text-lg mb-4">Top Fans</h4>
          <div className="space-y-4">
            {topFans.map((fan) => (
              <div key={fan.name} className="flex justify-between items-center text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Image src={fan.avatar} alt="fan" width={28} height={28} className="rounded-full" />
                  <span>{fan.name}</span>
                </div>
                <span className="text-accent font-medium">${fan.total}</span>
              </div>
            ))}
            <button className="w-full text-sm text-purple-400 hover:underline mt-3">
              + Add Tip Goal
            </button>
          </div>
        </div>

        {/* Milestone Rewards */}
        <div className="glass-card p-6 col-span-full">
          <h4 className="font-semibold text-lg mb-4">Milestone Rewards</h4>
          <div className="flex items-center gap-4">
            <span>🏆</span>
            <span>⭐</span>
            <span>📦 1000</span>
            <button className="ml-auto gradient-btn px-4 py-1 text-sm">
              Set a Tip Goal
            </button>
          </div>
          <div className="text-xs text-neutral-400 mt-4 space-y-1">
            <p>Last payout: <strong>$180</strong> on May 10</p>
            <p>Next: <strong>$180</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
