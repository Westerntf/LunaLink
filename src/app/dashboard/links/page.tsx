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
import { FaLink, FaTrash, FaSave } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import clsx from "clsx";

interface LinkItem {
  id: string;
  uid: string;
  url: string;
  title: string;
  order: number;
  toggle?: boolean;
  monetization?: "unlock" | "tip" | "none";
  style?: {
    textColor: "light" | "dark";
    gradientFrom: string;
    gradientTo: string;
    shape: "pill" | "rounded" | "square";
    animation?: string;
  };
}

export default function LinksPage() {
  const { user, loading } = useCurrentUser();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newUrl, setNewUrl] = useState("");

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
      title: "My Link",
      order: links.length,
      toggle: true,
      monetization: "none",
      style: {
        textColor: "light",
        gradientFrom: "#8b5cf6",
        gradientTo: "#ec4899",
        shape: "rounded",
        animation: "none",
      },
    };

    await setDoc(ref, newLink);
    setNewUrl("");
    setLinks((prev) => [...prev, newLink]);
  };

  const updateLink = async (id: string, update: Partial<LinkItem>) => {
    await updateDoc(doc(db, "links", id), update);
    setLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...update } : item))
    );
  };

  const deleteLink = async (id: string) => {
    await deleteDoc(doc(db, "links", id));
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(links);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setLinks(updated);
    updated.forEach(async (link, index) => {
      await updateDoc(doc(db, "links", link.id), { order: index });
    });
  };

  if (loading || !user) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white space-y-6 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Links</h1>
        <div className="flex gap-2">
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com"
            className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm w-64"
          />
          <button onClick={addLink} className="gradient-btn text-sm flex items-center gap-2">
            <FiPlus /> Add New Link
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-6">
              {links.map((link, index) => (
                <Draggable draggableId={link.id} index={index} key={link.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="glass-card p-4 rounded-xl border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-neutral-400">
                        <FaLink />
                        <input
                          value={link.title}
                          onChange={(e) =>
                            setLinks((prev) =>
                              prev.map((item) =>
                                item.id === link.id ? { ...item, title: e.target.value } : item
                              )
                            )
                          }
                          className="bg-transparent w-full text-white text-sm outline-none"
                        />
                      </div>

                      <input
                        value={link.url}
                        onChange={(e) =>
                          setLinks((prev) =>
                            prev.map((item) =>
                              item.id === link.id ? { ...item, url: e.target.value } : item
                            )
                          )
                        }
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm"
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <select
                          value={link.style?.shape}
                          onChange={(e) =>
                            updateLink(link.id, {
                              style: { ...link.style!, shape: e.target.value as any },
                            })
                          }
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm"
                        >
                          <option value="rounded">Rounded</option>
                          <option value="pill">Pill</option>
                          <option value="square">Square</option>
                        </select>

                        <select
                          value={link.style?.textColor}
                          onChange={(e) =>
                            updateLink(link.id, {
                              style: { ...link.style!, textColor: e.target.value as any },
                            })
                          }
                          className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm"
                        >
                          <option value="light">Light Text</option>
                          <option value="dark">Dark Text</option>
                        </select>

                        <input
                          type="color"
                          value={link.style?.gradientFrom}
                          onChange={(e) =>
                            updateLink(link.id, {
                              style: { ...link.style!, gradientFrom: e.target.value },
                            })
                          }
                          title="Gradient From"
                        />
                        <input
                          type="color"
                          value={link.style?.gradientTo}
                          onChange={(e) =>
                            updateLink(link.id, {
                              style: { ...link.style!, gradientTo: e.target.value },
                            })
                          }
                          title="Gradient To"
                        />
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() =>
                            updateLink(link.id, {
                              title: link.title,
                              url: link.url,
                              style: link.style,
                            })
                          }
                          className="bg-green-600 text-white px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-green-700 transition"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete link"
                        >
                          <FaTrash />
                        </button>
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
