import React from 'react';

const SettingsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 9a3 3 0 100 6 3 3 0 000-6z"
      className="text-sky-500"
    ></path>
    <path
      fillRule="evenodd"
      d="M1.323 11.25a.75.75 0 01.423-.625l2.429-.972a.75.75 0 01.877.164l1.24 1.24a.75.75 0 010 1.06l-1.24 1.24a.75.75 0 01-.877.164l-2.43-.972a.75.75 0 01-.422-.625zm18.354 0a.75.75 0 01.423.625l2.429.972a.75.75 0 01-.877.164l-1.24-1.24a.75.75 0 010-1.06l1.24-1.24a.75.75 0 01.877.164l2.43.972a.75.75 0 01.422.625zM11.25 1.323a.75.75 0 01.625.423l.972 2.429a.75.75 0 01-.164.877l-1.24 1.24a.75.75 0 01-1.06 0L8.14 5.053a.75.75 0 01-.164-.877l.972-2.43a.75.75 0 01.625-.422zm0 18.354a.75.75 0 01-.625.423l-.972 2.429a.75.75 0 01.164.877l1.24 1.24a.75.75 0 011.06 0l1.24-1.24a.75.75 0 01.164-.877l-.972-2.43a.75.75 0 01-.625-.422z"
      clipRule="evenodd"
      className="text-slate-400"
    ></path>
  </svg>
);

export default SettingsIcon;
