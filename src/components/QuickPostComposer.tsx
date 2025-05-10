// src/components/QuickPostComposer.tsx
import { useState } from "react";
import { FaPaperPlane, FaImage } from "react-icons/fa";

export default function QuickPostComposer() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="glass-card p-6 space-y-5">
      <h3 className="text-lg font-semibold text-white">Quick Post</h3>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something to your fans..."
        rows={3}
        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-white resize-none"
      />

      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer text-neutral-400 hover:text-white transition">
          <FaImage />
          <span>Select Image</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        <button
          disabled={!content.trim()}
          className="gradient-btn text-sm flex items-center gap-2 px-4 py-2 disabled:opacity-50"
        >
          <FaPaperPlane />
          Post Now
        </button>
      </div>
    </div>
  );
}
