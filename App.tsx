import React, { useState } from 'react';
import { AppMode } from './types';
import { GiveMode } from './components/GiveMode';
import { ReceiveMode } from './components/ReceiveMode';
import { QRMode } from './components/QRMode';
import { Effects } from './components/Effects';
import { Gift, MailOpen, QrCode } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);

  const renderContent = () => {
    switch (mode) {
      case AppMode.GIVE:
        return <GiveMode onBack={() => setMode(AppMode.HOME)} />;
      case AppMode.RECEIVE:
        return <ReceiveMode onBack={() => setMode(AppMode.HOME)} />;
      case AppMode.QR_LUCKY:
        return <QRMode onBack={() => setMode(AppMode.HOME)} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-8 animate-pop relative z-10">
            <div className="text-center space-y-2 mb-4">
              <h1 className="text-5xl md:text-6xl font-display text-tet-red drop-shadow-md">
                Tết Đến Rồi!
              </h1>
              <p className="text-tet-darkRed text-lg font-semibold bg-white/50 backdrop-blur-sm py-1 px-4 rounded-full inline-block">
                Trao yêu thương - Nhận lộc biếc
              </p>
            </div>

            <div className="w-full max-w-xs space-y-4">
              <button
                onClick={() => setMode(AppMode.GIVE)}
                className="w-full group relative bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Gift size={64} />
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Gift className="text-white w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-display text-2xl">Trao Lì Xì</div>
                    <div className="text-red-100 text-sm">Tạo lời chúc cực chất</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode(AppMode.RECEIVE)}
                className="w-full group relative bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                   <MailOpen size={64} />
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                     <MailOpen className="text-red-800 w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-red-900 font-display text-2xl">Nhận Lì Xì</div>
                    <div className="text-red-800 text-sm">Bói vui & Lộc ảo</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode(AppMode.QR_LUCKY)}
                className="w-full group relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                   <QrCode size={64} />
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                     <QrCode className="text-white w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-display text-2xl">Lì Xì QR</div>
                    <div className="text-blue-100 text-sm">Tạo mã & Random tiền</div>
                  </div>
                </div>
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-8 opacity-60">
               <span className="text-4xl animate-bounce" style={{animationDelay: '0s'}}>🌸</span>
               <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🐍</span>
               <span className="text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🏮</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Effects />
      
      {/* Decorative Corners */}
      {/* <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-10">
         <img src="https://images.unsplash.com/photo-1548685913-fe654e2f9fbc?w=200&h=200&fit=crop&auto=format" className="w-full h-full object-contain opacity-40 -rotate-45" alt="flowers" />
      </div>
      <div className="fixed bottom-0 right-0 w-40 h-40 pointer-events-none z-10">
         <img src="https://images.unsplash.com/photo-1548685913-fe654e2f9fbc?w=200&h=200&fit=crop&auto=format" className="w-full h-full object-contain opacity-40 rotate-180" alt="flowers" />
      </div> */}

      <header className="py-4 text-center z-20">
        <span className="text-xs font-bold tracking-widest text-tet-darkRed uppercase opacity-70 bg-white/30 px-2 py-1 rounded">
          Happy Lunar New Year
        </span>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 z-20 relative">
        {renderContent()}
      </main>

      <footer className="py-6 text-center text-tet-darkRed/60 text-sm font-semibold z-20">
        <p className="bg-white/30 inline-block px-3 py-1 rounded">Chúc Mừng Năm Mới 2026 • <a href="https://tuandev-freelancer-developer.netlify.app/" target="_blank" rel="noopener noreferrer">tuandev</a></p>
      </footer>
    </div>
  );
};

export default App;
