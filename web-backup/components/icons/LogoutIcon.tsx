import React from 'react';

const LogoutIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16.5 4.4a.75.75 0 011.05 1.05L6.31 16.7a.75.75 0 01-1.05-1.05L16.5 4.4z"
      className="text-red-400"
    ></path>
    <path
      fillRule="evenodd"
      d="M7.125 3a4.125 4.125 0 00-4.111 4.523.75.75 0 001.482.203A2.625 2.625 0 017.125 4.5h8.75a2.625 2.625 0 012.612 3.226.75.75 0 001.483-.202A4.125 4.125 0 0015.875 3h-8.75zm1.536 16.023a.75.75 0 00-1.042-1.042L3.396 22.203a.75.75 0 001.042 1.042l4.223-4.222zM8.125 19.5a2.625 2.625 0 01-2.612-3.226.75.75 0 00-1.483.202A4.125 4.125 0 008.125 21h8.75a4.125 4.125 0 004.111-4.523.75.75 0 00-1.482-.203A2.625 2.625 0 0116.875 19.5h-8.75z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default LogoutIcon;
