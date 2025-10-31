import React from 'react';

const ListIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12z"
      className="text-slate-400"
    ></path>
    <path
      d="M3 17.25A.75.75 0 013.75 16.5h11.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      className="text-sky-500"
    ></path>
  </svg>
);

export default ListIcon;
