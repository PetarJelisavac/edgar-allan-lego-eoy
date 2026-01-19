import React from 'react';

interface InstructionPlaceholderProps {
  style?: React.CSSProperties;
}

function InstructionPlaceholder({ style }: InstructionPlaceholderProps) {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 119 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M0.5 47.5688V32.5688L60 0.568811L118.5 32.5688V46.0688L60 79.0688L0.5 47.5688Z"
        stroke="black"
        strokeDasharray="6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default InstructionPlaceholder;
