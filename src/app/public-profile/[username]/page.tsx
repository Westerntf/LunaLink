import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "usernames"));
  return snapshot.docs.map((doc) => ({ username: doc.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const usernameSnap = await getDoc(doc(db, "usernames", params.username));
  const uid = usernameSnap.exists() ? usernameSnap.data().uid : null;

  if (!uid) return { title: "User Not Found" };

  const profileSnap = await getDoc(doc(db, "users", uid));
  const profile = profileSnap.exists() ? profileSnap.data() : null;

  return {
    title: profile?.displayName || params.username,
    description: profile?.bio || "View creator profile on LunaLink",
  };
}

interface Props {
  params: { username: string };
}

export default async function PublicProfilePage({ params }: Props) {
  const usernameSnap = await getDoc(doc(db, "usernames", params.username));
  const uid = usernameSnap.exists() ? usernameSnap.data().uid : null;

  if (!uid) return notFound();

  const profileSnap = await getDoc(doc(db, "users", uid));
  const linksSnap = await getDocs(query(collection(db, "links"), where("uid", "==", uid)));
  const mediaSnap = await getDocs(query(collection(db, "media"), where("uid", "==", uid)));

  const profile = profileSnap.data();
  const links = linksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const media = mediaSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        {/* Profile Section */}
        {profile?.photoURL && (
          <img
            src={profile.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-600 mx-auto"
          />
        )}
        <h1 className="text-2xl font-bold">{profile?.displayName}</h1>
        <p className="text-sm text-gray-400">{profile?.bio}</p>

        {/* Link Buttons */}
        <div className="space-y-3 pt-2">
          {links.map((link: any) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded text-white font-medium"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Media Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
          {media.map((item: any) => (
            <div
              key={item.id}
              className="relative group overflow-hidden border border-neutral-700 rounded-lg bg-[#111]"
            >
              {item.isTeaser ? (
                <>
                  <img
                    src={item.url}
                    alt="Teaser"
                    className="w-full object-cover h-48 blur-sm group-hover:blur-none transition"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-100 group-hover:bg-black/40">
                    <p className="text-sm mb-2 px-2">{item.teaserCaption || "Unlock to view full content"}</p>
                    <button
                      onClick={() => alert(`Unlocking... Price: $${item.unlockPrice}`)}
                      className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm font-semibold"
                    >
                      Unlock for ${item.unlockPrice}
                    </button>
                  </div>
                </>
              ) : (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full object-cover h-48"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
