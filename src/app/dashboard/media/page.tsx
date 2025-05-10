"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { IKImage } from "imagekitio-react";
import { uploadToR2 } from "@/lib/uploadToR2";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import clsx from "clsx";

interface MediaItem {
  id: string;
  url: string;
  caption: string;
  locked: boolean;
  nsfw: boolean;
  isTeaser?: boolean;
  teaserCaption?: string;
  unlockPrice?: number;
  unlockMediaUrl?: string;
}

export default function MediaManager() {
  const { user, loading } = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [locked, setLocked] = useState(false);
  const [blur, setBlur] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isTeaser, setIsTeaser] = useState(false);
  const [teaserCaption, setTeaserCaption] = useState("");
  const [unlockPrice, setUnlockPrice] = useState(5);
  const [unlockFile, setUnlockFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchMedia = async () => {
      const q = query(collection(db, "media"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const items: MediaItem[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
      });
      setMedia(items.sort((a, b) => b.caption.localeCompare(a.caption)));
    };
    fetchMedia();
  }, [user]);

  const handleUpload = async () => {
    if (!file || !user) return;
    setUploading(true);
    try {
      const { url, fileId } = await uploadToR2(file, user.uid);
      let unlockMediaUrl = "";
      if (isTeaser && unlockFile) {
        const result = await uploadToR2(unlockFile, user.uid);
        unlockMediaUrl = result.url;
      }

      const ref = doc(collection(db, "media"));
      await setDoc(ref, {
        uid: user.uid,
        url,
        caption,
        locked: blur,
        nsfw: false,
        createdAt: Date.now(),
        fileId,
        isTeaser,
        teaserCaption,
        unlockPrice,
        unlockMediaUrl,
      });

      setMedia((prev) => [
        {
          id: ref.id,
          url,
          caption,
          locked: blur,
          nsfw: false,
          isTeaser,
          teaserCaption,
          unlockPrice,
          unlockMediaUrl,
        },
        ...prev,
      ]);

      // Reset
      setCaption("");
      setFile(null);
      setUnlockFile(null);
      setBlur(false);
      setTeaserCaption("");
      setUnlockPrice(5);
      setIsTeaser(false);
    } catch (err: any) {
      alert(err.message || "❌ Upload failed.");
    }
    setUploading(false);
  };

  const deleteMedia = async (id: string) => {
    await deleteDoc(doc(db, "media", id));
    setMedia(media.filter((item) => item.id !== id));
  };

  if (loading || !user) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto text-white px-4 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Media Manager</h2>
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="gradient-btn"
        >
          {uploading ? "Uploading..." : "Upload Media"}
        </button>
      </div>

      <div className="glass-card p-6 space-y-5">
        <label className="file-upload-btn w-fit">
          <span>Select File</span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        <input
          type="text"
          placeholder="Add a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm"
        />

        <div className="flex flex-wrap gap-4 text-sm">
          <button
            className={clsx("toggle-btn", blur && "active")}
            onClick={() => setBlur(!blur)}
          >
            {blur ? "🔒 Locked" : "🔓 Public"}
          </button>

          <button
            className={clsx("toggle-btn", isTeaser && "active")}
            onClick={() => setIsTeaser(!isTeaser)}
          >
            🎬 Include in Teaser
          </button>
        </div>

        {blur && (
          <div className="pt-4 border-t border-neutral-700 space-y-3">
            <input
              type="number"
              placeholder="Unlock price ($)"
              value={unlockPrice}
              onChange={(e) => setUnlockPrice(Number(e.target.value))}
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm"
            />
          </div>
        )}

        {isTeaser && (
          <div className="pt-4 border-t border-neutral-700 space-y-3">
            <input
              type="text"
              placeholder="Teaser caption"
              value={teaserCaption}
              onChange={(e) => setTeaserCaption(e.target.value)}
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm"
            />
            <label className="file-upload-btn w-fit">
              <span>Select Unlock File</span>
              <input
                type="file"
                onChange={(e) => setUnlockFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 border-2 border-dashed border-neutral-700 rounded-lg py-16">
            <p className="text-lg mb-4">No media uploaded yet</p>
            <p className="text-sm">Click "Upload Media" above to get started</p>
          </div>
        ) : (
          media.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden border border-neutral-800 bg-[#111] shadow"
            >
              <IKImage
                path={item.url}
                transformation={[{ height: "300", crop: "maintain_ratio" }]}
                className={`w-full object-cover ${item.locked ? "blur-md" : ""}`}
                alt={item.caption}
              />
              <div className="p-3 text-sm space-y-1">
                <p className="font-semibold">{item.caption}</p>
                {item.unlockPrice && (
                  <p className="text-xs text-accent">${item.unlockPrice} to unlock</p>
                )}
              </div>
              <button
                onClick={() => deleteMedia(item.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full w-6 h-6"
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
