import React, { useState } from 'react';
import { Envelope } from './Envelope';
import { generateRandomFortune } from '../services/geminiService';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ReceiveModeProps {
  onBack: () => void;
}

export const ReceiveMode: React.FC<ReceiveModeProps> = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fortune, setFortune] = useState('');
  const [loading, setLoading] = useState(false);
  const [money, setMoney] = useState<string>('');

  const randomMoney = () => {
    const amounts = [
      "68,000 VNĐ", "99,999 VNĐ", "500,000 VNĐ", 
      "1 Tỷ VNĐ (Ảo)", "10 Tờ Vé Số", "Một tấm lòng vàng",
      "88,888 VNĐ", "100 Triệu nụ cười"
    ];
    return amounts[Math.floor(Math.random() * amounts.length)];
  };

  const handleOpen = async () => {
    if (loading || isOpen) return;
    setLoading(true);
    
    // Simulate network delay for suspense + fetch AI fortune
    const [fortuneText] = await Promise.all([
      generateRandomFortune(),
      new Promise(resolve => setTimeout(resolve, 800)) // Min delay for animation prep
    ]);

    setFortune(fortuneText);
    setMoney(randomMoney());
    setIsOpen(true);
    setLoading(false);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking envelope behind button
    setIsOpen(false);
    setFortune('');
    setMoney('');
  };

  return (
    <div className="w-full flex flex-col items-center animate-pop">
      <div className="w-full max-w-md px-4">
         <button 
          onClick={onBack}
          className="mb-4 flex items-center text-tet-darkRed font-bold hover:underline self-start"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
        </button>
      </div>

      <div className="relative mt-4 mb-8">
        <Envelope 
          isOpen={isOpen} 
          onClick={handleOpen} 
          text={loading ? "Đang lấy..." : "Mở Lì Xì"}
          disabled={loading}
        >
          {isOpen && (
             <div className="w-full h-full flex flex-col items-center justify-between py-2 animate-pop">
               <div className="flex flex-col items-center mt-4">
                 <div className="text-3xl font-display text-tet-red drop-shadow-sm mb-1 text-center leading-tight">
                   {money}
                 </div>
                 <div className="text-gray-500 text-xs uppercase tracking-wider">Lộc lá đầu năm</div>
               </div>
               
               <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-tet-gold text-sm font-medium text-gray-800 italic text-center w-full my-2 overflow-y-auto max-h-32 custom-scrollbar">
                 "{fortune}"
               </div>

               <button 
                  onClick={reset}
                  className="px-6 py-2 bg-tet-yellow rounded-full text-tet-darkRed font-bold text-sm shadow-md hover:scale-105 transition-transform flex items-center mb-2"
               >
                  <RefreshCw className="w-4 h-4 mr-2" /> Thử lại
               </button>
             </div>
          )}
        </Envelope>
        
        {/* Confetti or decorations when open */}
        {isOpen && (
          <div className="pointer-events-none">
            <div className="absolute -top-6 -left-6 text-4xl animate-bounce z-40">🧧</div>
            <div className="absolute -top-4 -right-8 text-4xl animate-bounce z-40" style={{animationDelay: '0.2s'}}>🌸</div>
            <div className="absolute bottom-4 -left-10 text-4xl animate-bounce z-40" style={{animationDelay: '0.4s'}}>💰</div>
            <div className="absolute bottom-10 -right-10 text-4xl animate-bounce z-40" style={{animationDelay: '0.1s'}}>🍀</div>
          </div>
        )}
      </div>

      {!isOpen && (
        <p className="text-center text-tet-darkRed font-medium max-w-xs mx-auto animate-pulse">
          {loading 
            ? "Thần tài đang gõ cửa..." 
            : "Chạm vào bao lì xì để xem vận may năm nay của bạn thế nào nhé!"}
        </p>
      )}
    </div>
  );
};