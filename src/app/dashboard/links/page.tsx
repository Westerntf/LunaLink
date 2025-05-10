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
  updateDoc,
  where,
} from "firebase/firestore";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { FiPlus } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaLink } from "react-icons/fa";
import clsx from "clsx";

interface LinkItem {
  id: string;
  uid: string;
  url: string;
  title: string;
  icon?: string;
  order: number;
  toggle?: boolean;
  monetization?: "unlock" | "tip" | "none";
}

export default function LinksPage() {
  const { user, loading } = useCurrentUser();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchLinks = async () => {
      const q = query(collection(db, "links"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const items: LinkItem[] = [];

      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as LinkItem);
      });

      setLinks(items.sort((a, b) => a.order - b.order));
    };
    fetchLinks();
  }, [user]);

  const addLink = async () => {
    if (!newUrl.trim() || !user) return;

    const ref = doc(collection(db, "links"));
    const newLink: LinkItem = {
      id: ref.id,
      uid: user.uid,
      url: newUrl,
      title: newTitle || "New Link",
      order: links.length,
      toggle: true,
      monetization: "none",
    };

    await setDoc(ref, newLink);
    setNewUrl("");
    setNewTitle("");
    setLinks((prev) => [...prev, newLink]);
  };

  const updateLink = async (id: string, field: keyof LinkItem, value: any) => {
    await updateDoc(doc(db, "links", id), { [field]: value });
    setLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const toggleLink = async (link: LinkItem) => {
    await updateLink(link.id, "toggle", !link.toggle);
  };

  const toggleHide = async (link: LinkItem) => {
    const newStatus = link.monetization === "none" ? "unlock" : "none";
    await updateLink(link.id, "monetization", newStatus);
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const updated = Array.from(links);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setLinks(updated);

    updated.forEach(async (link, index) => {
      await updateDoc(doc(db, "links", link.id), { order: index });
    });
  };

  const getIcon = (url: string) => {
    if (url.includes("instagram")) return <FaInstagram />;
    if (url.includes("twitter")) return <FaTwitter />;
    return <FaLink />;
  };

  if (loading || !user) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Links</h1>
        <div className="flex gap-2">
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com"
            className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm"
          />
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Custom display name"
            className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm"
          />
          <button onClick={addLink} className="gradient-btn text-sm">
            <FiPlus className="inline-block mr-1" /> Add Link
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {links.map((link, index) => (
                <Draggable draggableId={link.id} index={index} key={link.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-1 w-full">
                          <div className="flex items-center gap-2">
                            {getIcon(link.url)}
                            <input
                              value={link.title}
                              onChange={(e) => updateLink(link.id, "title", e.target.value)}
                              className="bg-neutral-800 px-3 py-1 rounded w-full text-sm"
                            />
                          </div>
                          <p className="text-xs text-neutral-400">{link.url}</p>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                          {/* Toggle visibility */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={link.toggle}
                              onChange={() => toggleLink(link)}
                            />
                            <div className="w-10 h-5 bg-gray-700 peer-checked:bg-accent rounded-full transition-all relative">
                              <div
                                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                  link.toggle ? "translate-x-5" : ""
                                }`}
                              />
                            </div>
                          </label>

                          {/* Hide switch */}
                          <button
                            onClick={() => toggleHide(link)}
                            className={clsx(
                              "text-xs px-3 py-1 rounded-full border transition-all",
                              link.monetization === "none"
                                ? "bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-purple-600 hover:text-white"
                                : "bg-purple-600 text-white shadow-glow"
                            )}
                          >
                            {link.monetization === "none" ? "Hide" : "Hidden"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
