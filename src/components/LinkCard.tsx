"use client";

import React from "react";
import { FaLink, FaTrash, FaSave, FaIcons } from "react-icons/fa";
import { BsPalette2 } from "react-icons/bs";
import clsx from "clsx";

interface LinkCardProps {
  title: string;
  url: string;
  onChangeTitle: (value: string) => void;
  onChangeUrl: (value: string) => void;
  onSave: () => void;
  onDelete: () => void;
  selectedIcon?: React.ReactNode;
  onIconSelect?: () => void;
}

export default function LinkCard({
  title,
  url,
  onChangeTitle,
  onChangeUrl,
  onSave,
  onDelete,
  selectedIcon = <FaLink />,
  onIconSelect
}: LinkCardProps) {
  return (
    <div className="bg-[#111] border border-neutral-800 rounded-lg shadow-lg p-4 space-y-4 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onIconSelect}
          className="text-xl text-accent bg-[#222] border border-neutral-700 rounded-full p-2 hover:bg-accent/20"
        >
          {selectedIcon}
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Display Name"
          className="flex-1 text-sm bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="text-green-400 bg-neutral-800 hover:bg-green-600/20 p-2 rounded-full"
          >
            <FaSave />
          </button>
          <button
            onClick={onDelete}
            className="text-red-400 bg-neutral-800 hover:bg-red-600/20 p-2 rounded-full"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={url}
        onChange={(e) => onChangeUrl(e.target.value)}
        placeholder="https://example.com"
        className="w-full text-sm bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent"
      />

      <div className="flex justify-between text-xs text-neutral-400 pt-1">
        <div className="flex items-center gap-2">
          <BsPalette2 className="text-accent" />
          Style settings will go here
        </div>
        <span className="italic">Auto-saved</span>
      </div>
    </div>
  );
}
