import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12.96,2.65,14.37,5.5,17.5,6.2a.5.5,0,0,1,.28.85L15.4,9.3l.56,3.15a.5.5,0,0,1-.72.52l-2.82-1.48L9.6,13.49a.5.5,0,0,1-.72-.52l.56-3.15L7,7.05a.5.5,0,0,1,.28-.85l3.13-.7,1.41-2.85A.5.5,0,0,1,12.96,2.65Z"
      className="text-slate-400"
    ></path>
    <path
      d="M18.5,15.5a.5.5,0,0,1,.5.5,2,2,0,0,0,2,2,.5.5,0,0,1,0,1,3,3,0,0,1-3-3A.5.5,0,0,1,18.5,15.5Z"
      className="text-sky-500"
    ></path>
    <path
      d="M4,9A.5.5,0,0,1,4.5,9.5,2,2,0,0,0,6.5,11.5a.5.5,0,0,1,0,1,3,3,0,0,1-3-3A.5.5,0,0,1,4,9Z"
      className="text-sky-500"
    ></path>
  </svg>
);

export default SparklesIcon;
