
import React from 'react';

interface ChoiceButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 my-2 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg md:text-xl ${className}`}
    >
      {children}
    </button>
  );
};

export default ChoiceButton;