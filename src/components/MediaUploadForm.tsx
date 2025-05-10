import React from "react";

interface MediaUploadFormProps {
  caption: string;
  setCaption: (value: string) => void;
}

export default function MediaUploadForm({ caption, setCaption }: MediaUploadFormProps) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="relative cursor-pointer w-fit">
          <input type="file" className="hidden" />
          <div className="bg-neutral-900 px-4 py-2 rounded border border-neutral-700 hover:bg-neutral-800 transition">
            Choose File
          </div>
        </label>
        <span className="text-neutral-400">No file chosen</span>
      </div>

      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption"
        className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 placeholder:text-neutral-500 text-sm"
      />

      <div className="flex flex-wrap gap-4 items-center">
        {["Locked", "NSFW", "Teaser"].map((label) => (
          <label key={label} className="inline-flex items-center space-x-2">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-700 peer-checked:bg-accent rounded-full relative transition-all">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
            </div>
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
