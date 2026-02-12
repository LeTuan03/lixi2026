import React from 'react';

interface EnvelopeProps {
  isOpen: boolean;
  onClick?: () => void;
  text?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick, text = "Lì Xì", disabled = false, children }) => {
  return (
    <div 
      className={`relative w-72 h-96 mx-auto cursor-pointer transition-transform duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Closed State */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-tet-red to-tet-darkRed rounded-xl shadow-2xl border-4 border-tet-gold flex flex-col items-center justify-center transition-all duration-500 origin-bottom ${isOpen ? 'rotate-x-180 opacity-0 pointer-events-none' : 'opacity-100 z-20'}`}
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-24 bg-tet-red rounded-b-[100%] absolute top-0 border-b-4 border-tet-gold shadow-md"></div>
        <div className="z-10 bg-tet-gold rounded-full p-4 mb-4 animate-float">
          <span className="text-4xl">🧧</span>
        </div>
        <h2 className="text-tet-gold font-display text-4xl uppercase drop-shadow-md text-center px-4">
          {text}
        </h2>
        <div className="mt-8 text-tet-cream font-sans opacity-80 text-sm animate-pulse">
          Chạm để mở
        </div>
      </div>

      {/* Opened State Background (Inside) */}
      <div className={`absolute inset-0 bg-tet-cream rounded-xl shadow-inner border-2 border-tet-red flex flex-col items-center p-4 transition-all duration-300 ${isOpen ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/binding-light.png')] pointer-events-none"></div>
         
         {/* Content Container */}
         <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            {children}
         </div>
      </div>
    </div>
  );
};