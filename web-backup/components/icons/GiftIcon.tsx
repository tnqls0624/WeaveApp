import React from 'react';

const GiftIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5.25 5.25a3 3 0 013-3h.75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V3.75h-1.5a1.5 1.5 0 00-1.5 1.5v1.5H6a.75.75 0 01-.75-.75V5.25zm13.5 0A.75.75 0 0119.5 6h-1.5v1.5a1.5 1.5 0 001.5 1.5h1.5v-1.5a.75.75 0 01.75-.75V9A.75.75 0 0121 9.75v3.75a.75.75 0 01-1.5 0V9.75h-1.5a1.5 1.5 0 00-1.5 1.5v1.5H15a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.75a3 3 0 013-3z"
      className="text-sky-500"
    ></path>
    <path
      fillRule="evenodd"
      d="M4.5 12.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 3.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM4.5 21a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25A.75.75 0 014.5 21z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default GiftIcon;
