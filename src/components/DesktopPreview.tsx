"use client";

import React from "react";
import { IKImage } from "imagekitio-react";

interface Props {
  profile: {
    displayName: string;
    bio: string;
    photoURL: string;
  };
  links: Array<{ id: string; title: string; url: string }>;
  media: Array<{ id: string; url: string; caption: string; nsfw: boolean; locked: boolean }>;
}

export default function DesktopPreview({ profile, links, media }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto bg-neutral-900 text-white border border-neutral-700 rounded-lg p-6 space-y-6">
      <div className="text-center">
        {profile?.photoURL && (
          <img
            src={profile.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto border border-gray-600"
          />
        )}
        <h2 className="text-2xl font-bold mt-2">{profile?.displayName}</h2>
        <p className="text-gray-400 text-sm">{profile?.bio}</p>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent hover:bg-purple-700 text-center text-white py-3 rounded-lg"
          >
            {link.title}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {media.map((item) => (
          <IKImage
            key={item.id}
            path={item.url}
            className={`rounded-lg w-full h-40 object-cover ${item.nsfw && item.locked ? "blur-md" : ""}`}
            transformation={[{ height: "300", crop: "maintain_ratio" }]}
            alt="media"
          />
        ))}
      </div>
    </div>
  );
}
