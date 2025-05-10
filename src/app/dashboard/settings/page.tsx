"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaSun, FaMoon, FaPalette } from "react-icons/fa";

// Toggle Button
const ToggleButton = ({ value, onClick }: { value: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded-full font-medium shadow-glow transition ${
      value
        ? "bg-purple-600 text-white"
        : "bg-neutral-800 text-neutral-400 border border-neutral-600"
    }`}
  >
    {value ? "Enabled" : "Disabled"}
  </button>
);

export default function SettingsPage() {
  const { user, loading } = useCurrentUser();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [tipMin, setTipMin] = useState(5);
  const [unlockPrice, setUnlockPrice] = useState(5);
  const [summaryEmails, setSummaryEmails] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [safePreview, setSafePreview] = useState(true);
  const [hidePublic, setHidePublic] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [primaryColor, setPrimaryColor] = useState(true);
  const [alerts, setAlerts] = useState({
    tip: true,
    unlock: true,
    message: true,
  });

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setTwoFactor(data.twoFactor || false);
        setTipMin(data.tipMin || 5);
        setUnlockPrice(data.unlockPrice || 5);
        setSummaryEmails(data.summaryEmails || false);
        setNsfw(data.nsfw || false);
        setSafePreview(data.safePreview || true);
        setHidePublic(data.hidePublic || false);
        setTheme(data.theme || "dark");
        setPrimaryColor(data.primaryColor ?? true);
        setAlerts(data.alerts || { tip: true, unlock: true, message: true });
      }
    };
    fetchSettings();
  }, [user]);

  const updateSetting = async (key: string, value: any) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, { [key]: value });
  };

  if (loading || !user) return <p className="text-white">Loading settings...</p>;

  return (
    <div className="text-white space-y-10">
      <h2 className="text-3xl font-bold">Account Settings</h2>

      {/* Identity */}
      <div className="space-y-6 glass-card p-6">
        <div>
          <label className="block text-sm mb-1">Display name</label>
          <input
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              updateSetting("displayName", e.target.value);
            }}
            className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              updateSetting("username", e.target.value);
            }}
            className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Email: {email}</span>
          <button className="text-sm text-purple-400 hover:underline">Reset password</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Two-Factor Authentication</span>
          <ToggleButton
            value={twoFactor}
            onClick={() => {
              setTwoFactor(!twoFactor);
              updateSetting("twoFactor", !twoFactor);
            }}
          />
        </div>
      </div>

      {/* Monetization */}
      <div className="space-y-4 glass-card p-6">
        <h3 className="text-lg font-semibold">Monetization Settings</h3>
        <div className="flex justify-between items-center">
          <span>Tip minimum</span>
          <div className="flex items-center">
            <span className="mr-1 text-neutral-400">$</span>
            <input
              type="number"
              value={tipMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTipMin(val);
                updateSetting("tipMin", val);
              }}
              className="w-20 px-2 py-1 text-sm bg-neutral-800 rounded border border-neutral-700"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Default unlock price</span>
          <div className="flex items-center">
            <span className="mr-1 text-neutral-400">$</span>
            <input
              type="number"
              value={unlockPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setUnlockPrice(val);
                updateSetting("unlockPrice", val);
              }}
              className="w-20 px-2 py-1 text-sm bg-neutral-800 rounded border border-neutral-700"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Email summary reports</span>
          <ToggleButton
            value={summaryEmails}
            onClick={() => {
              setSummaryEmails(!summaryEmails);
              updateSetting("summaryEmails", !summaryEmails);
            }}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="space-y-4 glass-card p-6">
        <h3 className="text-lg font-semibold">Privacy & Safety</h3>
        <div className="flex justify-between items-center">
          <span>Enable NSFW profile</span>
          <ToggleButton
            value={nsfw}
            onClick={() => {
              setNsfw(!nsfw);
              updateSetting("nsfw", !nsfw);
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Safe preview mode</span>
          <ToggleButton
            value={safePreview}
            onClick={() => {
              setSafePreview(!safePreview);
              updateSetting("safePreview", !safePreview);
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Hide from public listings</span>
          <ToggleButton
            value={hidePublic}
            onClick={() => {
              setHidePublic(!hidePublic);
              updateSetting("hidePublic", !hidePublic);
            }}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4 glass-card p-6">
        <h3 className="text-lg font-semibold">Theme</h3>
        <div className="flex items-center gap-4">
          {["light", "dark", "custom"].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setTheme(opt);
                updateSetting("theme", opt);
              }}
              className={`p-2 rounded-md flex items-center gap-2 text-sm transition ${
                theme === opt ? "bg-purple-600 text-white" : "bg-neutral-800 text-neutral-400"
              }`}
            >
              {opt === "light" && <FaSun />}
              {opt === "dark" && <FaMoon />}
              {opt === "custom" && <FaPalette />}
              <span className="capitalize">{opt}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span>Primary color enabled</span>
          <ToggleButton
            value={primaryColor}
            onClick={() => {
              setPrimaryColor(!primaryColor);
              updateSetting("primaryColor", !primaryColor);
            }}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4 glass-card p-6">
        <h3 className="text-lg font-semibold">Notifications</h3>
        {Object.entries(alerts).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span>Alert on {key}</span>
            <ToggleButton
              value={value}
              onClick={() => {
                const updated = { ...alerts, [key]: !value };
                setAlerts(updated);
                updateSetting("alerts", updated);
              }}
            />
          </div>
        ))}
      </div>

      {/* Danger */}
      <div className="space-y-4 text-red-500 text-sm">
        <button className="hover:underline">Deactivate account</button>
        <button className="hover:underline">Clear all content</button>
      </div>
    </div>
  );
}
