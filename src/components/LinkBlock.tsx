import React from "react";
import { IconType } from "react-icons";
import { FiTrash2, FiMove } from "react-icons/fi";

interface LinkBlockProps {
  icon: IconType;
  title: string;
  subtitle?: string;
  showToggle?: boolean;
  toggleState?: boolean;
  onToggle?: () => void;
  download?: boolean;
  reorderable?: boolean;
}

const LinkBlock: React.FC<LinkBlockProps> = ({
  icon: Icon,
  title,
  subtitle,
  showToggle = false,
  toggleState = true,
  onToggle,
  download = false,
  reorderable = false,
}) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon className="text-xl text-accent" />
          <div>
            <p className="font-medium text-sm text-white">{title}</p>
            {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showToggle && onToggle && (
            <button
              onClick={onToggle}
              className={`px-3 py-1 text-xs font-medium rounded-full shadow-glow transition ${
                toggleState
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-800 text-neutral-400 border border-neutral-600"
              }`}
            >
              {toggleState ? "Visible" : "Hidden"}
            </button>
          )}
          {download && (
            <button className="text-xs text-neutral-400 hover:text-white">Download</button>
          )}
          {reorderable && <FiMove className="cursor-grab text-neutral-500" />}
          <FiTrash2 className="cursor-pointer text-red-500 hover:text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default LinkBlock;