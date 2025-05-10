"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { uploadToR2 } from "@/lib/uploadToR2";
import { FiEdit2, FiLink } from "react-icons/fi";
import EngagementSnapshot from "@/components/EngagementSnapshot";
import PerformanceSnapshot from "@/components/PerformanceSnapshot";
import ProjectionsBlock from "@/components/ProjectionsBlock";
import QuickDms from "@/components/QuickDms";

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName || "");
        setUsername(data.username || "");
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
      { displayName, username, bio, photoURL, updatedAt: Date.now() },
      { merge: true }
    );
    setSaving(false);
    setIsEditing(false);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    setUploading(true);
    const { url } = await uploadToR2(file, user.uid);
    setPhotoURL(url);
    await updateDoc(doc(db, "users", user.uid), { photoURL: url });
    setUploading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://lunalink.app/@${username || "yourname"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8 text-white">
      {/* Profile Header */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative">
        <div className="flex items-start gap-6 w-full">
          {/* Avatar */}
          <label className="relative w-20 h-20 rounded-full ring-2 ring-accent shadow-glow overflow-hidden cursor-pointer">
            {photoURL ? (
              <img src={photoURL} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="bg-neutral-800 w-full h-full" />
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarUpload(file);
              }}
            />
          </label>

          {/* Info */}
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-xl font-bold">{displayName || "Your name"}</h1>
            <p className="text-sm text-neutral-400">@{username || "username"}</p>
            <p className="text-sm text-neutral-300">{bio || "Welcome to my page!"}</p>

            <div className="flex items-center gap-4 mt-3">
              <div className="text-sm text-neutral-400">
                <span className="font-semibold text-white">🧑‍🤝‍🧑 452</span> Subscribers
              </div>
              <div className="text-sm text-neutral-400">
                <span className="font-semibold text-white">👀 1.2K</span> Followers
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="gradient-btn text-xs flex items-center gap-2"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Copy Link Button */}
        {!isEditing && (
          <div className="absolute top-6 right-6">
            <button
              onClick={copyLink}
              className="gradient-btn text-xs px-4 py-2 flex items-center gap-2"
            >
              <FiLink /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>

      {/* Dashboard Sections */}
      <PerformanceSnapshot />

      <ProjectionsBlock />

      <div className="grid md:grid-cols-2 gap-6">
        <EngagementSnapshot />
        <QuickDms />
      </div>
    </div>
  );
}
