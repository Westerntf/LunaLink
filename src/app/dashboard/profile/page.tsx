"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { uploadToR2 } from "@/lib/uploadToR2";

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName || "");
        setBio(data.bio || "");
        setPhotoURL(data.photoURL || "");
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const ref = doc(db, "users", user.uid);
    await setDoc(
      ref,
      {
        displayName,
        bio,
        photoURL,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    setSaving(false);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    const { url } = await uploadToR2(file, user.uid);
    setPhotoURL(url);
    await updateDoc(doc(db, "users", user.uid), { photoURL: url });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://lunalink.app/@${displayName || "yourname"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Info */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <label className="relative w-16 h-16 rounded-full border-2 border-accent shadow-glow overflow-hidden cursor-pointer">
            {photoURL ? (
              <img
                src={photoURL}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-800" />
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarUpload(file);
              }}
            />
          </label>

          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="bg-transparent text-xl font-bold text-white placeholder:text-neutral-500 focus:outline-none"
            />
            <p className="text-sm text-neutral-400 mt-1">
              {bio ? (
                <span>{bio}</span>
              ) : (
                <span className="italic text-neutral-500">Write a short bio...</span>
              )}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-right">
          <div className="text-sm text-neutral-400">
            https://lunalink.app/@{displayName || "yourname"}
          </div>
          <button onClick={copyLink} className="text-xs text-purple-400 hover:underline">
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="gradient-btn text-xs mt-2"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Earnings Engine</h2>
          <div className="text-3xl font-bold text-accent">$0.00</div>
          <div className="text-sm text-neutral-400">Top Fan: None</div>
          <button className="gradient-btn w-full">View Earnings</button>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Smart Tips</h2>
          <p className="text-sm text-neutral-300">
            Enable tipping in your settings to receive fan rewards.
          </p>
          <button className="gradient-btn w-full">Enable Tips</button>
        </div>
      </div>
    </div>
  );
}
