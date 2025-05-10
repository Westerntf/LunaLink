"use client";

import React from "react";
import { IKImage } from "imagekitio-react";

interface MediaItem {
  id: string;
  url: string;
  caption: string;
  locked: boolean;
  nsfw: boolean;
}

export default function PublicGallery({ media }: { media: MediaItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6">
      {media.map((item) => (
        <div key={item.id} className="border border-neutral-700 rounded">
          <IKImage
            path={item.url}
            transformation={[{ height: "250", crop: "maintain_ratio" }]}
            className={`w-full object-cover ${item.nsfw && item.locked ? "blur-md" : ""}`}
            alt={item.caption}
          />
          <p className="text-xs p-2">{item.caption}</p>
        </div>
      ))}
    </div>
  );
}
