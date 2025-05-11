"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { notFound } from "next/navigation";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usernameSnap = await getDoc(doc(db, "usernames", params.username));
      if (!usernameSnap.exists()) return notFound();

      const uid = usernameSnap.data().uid;
      const profileSnap = await getDoc(doc(db, "users", uid));
      const linksSnap = await getDocs(query(collection(db, "links"), where("uid", "==", uid)));
      const mediaSnap = await getDocs(query(collection(db, "media"), where("uid", "==", uid)));

      setProfile(profileSnap.data());
      setLinks(linksSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setMedia(mediaSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    fetchData();
  }, [params.username]);

  if (loading) return <p className="text-white">Loading profile...</p>;
  if (!profile) return notFound();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <img src={profile.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
        <h1 className="text-2xl font-bold">{profile.displayName}</h1>
        <p className="text-sm text-gray-400">{profile.bio}</p>

        <div className="space-y-3 pt-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-medium"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
          {media.map((item) => (
            <div key={item.id} className="border border-neutral-700 rounded bg-[#111] overflow-hidden">
              <img src={item.url} alt={item.caption} className="w-full object-cover h-48" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
