'use client';

import React from 'react';
import clsx from 'clsx';

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={clsx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-accent" : "bg-gray-600"
      )}
    >
      <span
        className={clsx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

export default Switch;
