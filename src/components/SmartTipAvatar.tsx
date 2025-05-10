'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type SmartTipAvatarProps = {
  src: string;
  alt?: string;
  isTop?: boolean;
};

const SmartTipAvatar: React.FC<SmartTipAvatarProps> = ({ src, alt = 'User', isTop = false }) => {
  return (
    <div className="relative group">
      <div
        className={clsx(
          'h-10 w-10 rounded-full overflow-hidden border-2 transition-shadow duration-300',
          isTop ? 'border-yellow-400 shadow-glow' : 'border-neutral-700'
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      {isTop && (
        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-[10px] px-1 rounded-sm font-bold">
          👑
        </div>
      )}
    </div>
  );
};

export default SmartTipAvatar;
