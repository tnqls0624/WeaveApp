import React from 'react';

const TagIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M9.75 3.105a.75.75 0 01.975-.52l11.25 4.5a.75.75 0 010 1.348l-11.25 4.5a.75.75 0 01-.975-.52V3.105z"
      className="text-sky-500"
    ></path>
    <path
      d="M3 3.105a.75.75 0 01.975-.52l11.25 4.5a.75.75 0 010 1.348l-11.25 4.5A.75.75 0 013 12.43V3.105z"
      className="text-slate-400"
    ></path>
    <path
      d="M3 12.932a.75.75 0 01.975-.52l11.25 4.5a.75.75 0 010 1.348l-11.25 4.5a.75.75 0 01-.975-.52V12.932z"
      className="text-slate-400"
    ></path>
  </svg>
);

export default TagIcon;
