"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCurrentUser, User } from "@/hooks/useCurrentUser";

interface ExtendedUser {
  uid: string;
  username: string;
  // Add other properties of the user if needed
}

interface Referral {
  id: string;
  username: string;
  earnings: number;
  avatar: string;
  joinDate: string; // Added joinDate property
}

export default function ReferralsPage() {
  const { user, loading } = useCurrentUser() as { user: User & { username: string } | null; loading: boolean };
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const referralLink = `https://lunalink.com/invite/${user?.username}`;

  useEffect(() => {
    if (!user) return;

    const fetchReferrals = async () => {
      const q = query(collection(db, "referrals"), where("referrerUid", "==", user.uid));
      const snapshot = await getDocs(q);
      const results: Referral[] = [];
      let total = 0;

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const joined = new Date(data.joinDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
        results.push({
          id: docSnap.id,
          username: data.username,
          joinDate: joined,
          earnings: data.earnings || 0,
          avatar: data.avatar || "/default-avatar.png",
        });
        total += data.earnings || 0;
      }

      setReferrals(results);
      setTotalEarnings(total);
    };

    fetchReferrals();
  }, [user]);

  if (loading || !user) return <p className="text-white">Loading...</p>;

  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-bold">Referrals</h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
          <p className="text-sm text-gray-400">Total Referred Creators</p>
          <p className="text-2xl font-semibold">{referrals.length}</p>
        </div>
        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
          <p className="text-sm text-gray-400">Total Referral Earnings</p>
          <p className="text-2xl font-semibold">${totalEarnings}</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-4">
        <div className="flex justify-between items-center">
          <code className="text-purple-400 truncate">{referralLink}</code>
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="text-sm text-purple-400 hover:underline"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-4">
          <button className="bg-purple-700 hover:bg-purple-800 text-sm px-3 py-1 rounded">Twitter</button>
          <button className="bg-purple-700 hover:bg-purple-800 text-sm px-3 py-1 rounded">Telegram</button>
          <button className="bg-purple-700 hover:bg-purple-800 text-sm px-3 py-1 rounded">QR Code</button>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
        <h3 className="text-lg font-semibold mb-3">Referral Performance</h3>
        <div className="grid grid-cols-3 text-sm text-neutral-400 mb-2">
          <span>Username</span>
          <span>Join date</span>
          <span>Total earning</span>
        </div>
        <div className="space-y-2">
          {referrals.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-3 items-center py-2 border-t border-neutral-800"
            >
              <div className="flex items-center gap-2">
                <img src={r.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                <span>{r.username}</span>
              </div>
              <span className="text-sm">{r.joinDate}</span>
              <span className="text-sm text-purple-400">
                ${r.earnings.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Caption + Share */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3">
          <h4 className="text-sm font-semibold text-neutral-300">Promo caption</h4>
          <div className="flex items-center justify-between bg-neutral-800 px-3 py-2 rounded">
            <span className="text-sm text-neutral-300 truncate">
              Join me on LunaLink! Earn with referrals.
            </span>
            <button className="text-sm text-purple-400 hover:underline">Copy</button>
          </div>
        </div>

        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3">
          <h4 className="text-sm font-semibold text-neutral-300">Share & Promote</h4>
          <button className="w-full bg-purple-700 hover:bg-purple-800 py-2 rounded text-sm font-semibold">Feature me on your page</button>
          <button className="w-full bg-neutral-800 hover:bg-neutral-700 py-2 rounded text-sm font-semibold">Download referral badge</button>
        </div>
      </div>

      {/* Bonus Info */}
      <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
        <h4 className="text-sm font-semibold text-neutral-300 mb-2">Referral Bonuses</h4>
        <ul className="text-sm space-y-1 text-neutral-400 list-disc list-inside">
          <li>Refer 5 creators = 1 free month</li>
          <li>Top Referrer of the Week badge</li>
        </ul>
      </div>
    </div>
  );
}
