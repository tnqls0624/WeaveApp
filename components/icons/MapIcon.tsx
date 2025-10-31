import React from 'react';

const MapIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M11.025 1.992a.75.75 0 011.95 0l7.5 4.5a.75.75 0 01-.45 1.385l-7.5-2.25-7.5 2.25a.75.75 0 01-.45-1.385l7.5-4.5z"
      className="text-sky-500"
    ></path>
    <path
      fillRule="evenodd"
      d="M3 9.161v8.59a.75.75 0 00.975.728l7.525-2.258 7.525 2.258A.75.75 0 0021 17.75v-8.59l-7.975 2.393a.75.75 0 01-.55 0L3 9.161zm16.5 6.429l-7.5-2.25v-6.75l7.5 2.25v6.75zM4.5 9.922l7.5 2.25v6.75l-7.5-2.25V9.922z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default MapIcon;
