import React from 'react';

const UserIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.25c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5S14.485 2.25 12 2.25z"
      className="text-sky-500"
    ></path>
    <path
      fillRule="evenodd"
      d="M20.03 16.42a.75.75 0 00-1.06-1.06 13.468 13.468 0 00-14 0 .75.75 0 00-1.06 1.06 14.968 14.968 0 0016.12 0zM12 14.25c-2.41 0-4.755.76-6.665 2.132a.75.75 0 00-.335 1.095 1.5 1.5 0 001.5 1.023h11a1.5 1.5 0 001.5-1.023.75.75 0 00-.335-1.095C16.755 15.01 14.41 14.25 12 14.25z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default UserIcon;
