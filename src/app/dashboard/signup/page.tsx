"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("❌ Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-neutral-900 border border-neutral-800 p-6 rounded-lg text-white">
        <h1 className="text-xl font-semibold mb-4 text-center">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-neutral-800 border border-neutral-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-800 border border-neutral-700"
        />

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
