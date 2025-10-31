import React from 'react';

const BellIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.25c-2.485 0-4.5 2.015-4.5 4.5v3.75a2.25 2.25 0 00.563 1.5l2.063 2.063a.75.75 0 01-.53 1.28H9a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-.846a.75.75 0 01-.53-1.28l2.063-2.063a2.25 2.25 0 00.563-1.5V6.75c0-2.485-2.015-4.5-4.5-4.5z"
      className="text-slate-400"
    ></path>
    <path
      d="M10.5 20.25a2.25 2.25 0 104.5 0v-.75a.75.75 0 00-1.5 0v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 00-1.5 0v.75z"
      className="text-sky-500"
    ></path>
  </svg>
);

export default BellIcon;
