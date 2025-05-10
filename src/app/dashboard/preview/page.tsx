"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import clsx from "clsx";
import { FaInstagram, FaTwitter, FaLink } from "react-icons/fa";

interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export default function PreviewPage() {
  const { user } = useCurrentUser();
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [safeMode, setSafeMode] = useState(false);
  const [phoneView, setPhoneView] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setProfile(snap.data());
    };

    const fetchLinks = async () => {
      const snap = await getDocs(query(collection(db, "links"), where("uid", "==", user.uid)));
      setLinks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Link)));
    };

    fetchProfile();
    fetchLinks();
  }, [user]);

  const getIcon = (url: string) => {
    if (url.includes("instagram")) return <FaInstagram />;
    if (url.includes("twitter")) return <FaTwitter />;
    return <FaLink />;
  };

  if (!profile) return <p className="text-white">Loading...</p>;

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div
      className={clsx(
        "glass-card p-6 transition-all",
        phoneView ? "max-w-sm mx-auto" : "max-w-3xl mx-auto w-full"
      )}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 py-10 space-y-6 text-white">
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setPhoneView(!phoneView)}
          className="gradient-btn text-sm"
        >
          Toggle {phoneView ? "Desktop" : "Phone"} View
        </button>
      </div>

      {/* Main Preview Container */}
      <Container>
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profile.photoURL || "/default-avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-neutral-800 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.displayName || "Creator Name"}</h2>
            <p className="text-sm text-neutral-400">@{profile.username || "yourname"}</p>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && <p className="text-sm text-neutral-300 mb-4">{profile.bio}</p>}

        {/* Links */}
        <div className="space-y-3 mb-6">
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-medium rounded-md shadow-glow hover:opacity-90 transition-all"
            >
              {getIcon(link.url)}
              <span>{link.title}</span>
            </a>
          ))}
        </div>

        {/* Tip Support */}
        <div className="border-t border-neutral-700 pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-300">Support Me</h3>
          <div className="grid grid-cols-4 gap-2">
            {["$5", "$10", "$20", "Custom"].map(amount => (
              <button
                key={amount}
                className="bg-accent py-2 rounded text-xs font-medium text-white shadow-glow"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Safe Mode Toggle */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-neutral-700 text-sm text-neutral-400">
          <span>Safe Mode (blur NSFW)</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={safeMode}
              onChange={() => setSafeMode(!safeMode)}
            />
            <div className="w-10 h-5 bg-gray-700 peer-checked:bg-accent rounded-full relative transition-all">
              <div className={clsx(
                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                safeMode ? "translate-x-5" : ""
              )} />
            </div>
          </label>
        </div>
      </Container>
    </div>
  );
}
