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

export default function MobilePreview({ profile, links, media }: Props) {
  return (
    <div className="w-[320px] mx-auto bg-black text-white rounded-[2.5rem] border-4 border-gray-700 shadow-lg p-4 space-y-5">
      <div className="flex flex-col items-center text-center">
        {profile?.photoURL && (
          <img
            src={profile.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-600"
          />
        )}
        <h2 className="text-lg font-semibold mt-2">{profile?.displayName}</h2>
        <p className="text-sm text-gray-400">{profile?.bio}</p>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent hover:bg-purple-700 text-center text-sm py-2 rounded-lg"
          >
            {link.title}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        {media.map((item) => (
          <IKImage
            key={item.id}
            path={item.url}
            className={`rounded object-cover w-full h-24 ${
              item.nsfw && item.locked ? "blur-md" : ""
            }`}
            transformation={[{ height: "200", crop: "maintain_ratio" }]}
            alt="media"
          />
        ))}
      </div>
    </div>
  );
}
