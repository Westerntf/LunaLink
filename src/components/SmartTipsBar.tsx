'use client';

import React, { useState } from 'react';
import SmartTipAvatar from './SmartTipAvatar';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 ${
        checked ? 'bg-green-500' : ''
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
          checked ? 'translate-x-4' : ''
        }`}
      ></div>
    </button>
  );
};

const MOCK_TIPPERS = [
  { id: 1, src: '/avatars/1.jpg', isTop: false },
  { id: 2, src: '/avatars/2.jpg', isTop: false },
  { id: 3, src: '/avatars/3.jpg', isTop: false },
  { id: 4, src: '/avatars/4.jpg', isTop: true },
];

const SmartTipsBar = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Smart Tips</h3>
        <Switch checked={enabled} onChange={() => setEnabled(!enabled)} />
      </div>

      {enabled && (
        <div className="flex items-center gap-3">
          {MOCK_TIPPERS.map((tipper) => (
            <SmartTipAvatar key={tipper.id} src={tipper.src} isTop={tipper.isTop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartTipsBar;
