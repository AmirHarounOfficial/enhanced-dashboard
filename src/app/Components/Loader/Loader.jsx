import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full min-h-[50vh]">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#EEF2F6]" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary)] animate-spin" />
        {/* Inner pulse dot */}
        <div className="absolute inset-[14px] rounded-full bg-[var(--color-primary)] opacity-20 animate-ping" />
      </div>
    </div>
  );
}
