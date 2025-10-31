import React from 'react';

const ShieldIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8.25 4.5a3.75 3.75 0 117.5 0v3.75a.75.75 0 01-1.5 0V5.25a2.25 2.25 0 00-4.5 0v3A.75.75 0 018.25 9V4.5z"
      className="text-sky-500"
    ></path>
    <path
      fillRule="evenodd"
      d="M3 10.5a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v8.25a3 3 0 01-3 3H6a3 3 0 01-3-3v-8.25zm1.5 0v8.25a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-8.25H4.5z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default ShieldIcon;
