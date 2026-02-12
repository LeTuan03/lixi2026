import React, { useState } from 'react';
import { generateLixiWish } from '../services/geminiService';
import { ToneType } from '../types';
import { Copy, RefreshCw, ArrowLeft, Gift } from 'lucide-react';

interface GiveModeProps {
  onBack: () => void;
}

export const GiveMode: React.FC<GiveModeProps> = ({ onBack }) => {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [tone, setTone] = useState<ToneType>(ToneType.FUNNY);
  const [generatedWish, setGeneratedWish] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!recipient.trim()) return;
    setLoading(true);
    const wish = await generateLixiWish(recipient, tone, sender || 'Người bí ẩn');
    setGeneratedWish(wish);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (generatedWish) {
      navigator.clipboard.writeText(generatedWish);
      alert('Đã sao chép lời chúc! Giờ hãy gửi cho người ấy nhé.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-pop">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-tet-darkRed font-bold hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-tet-gold">
        <h2 className="text-2xl font-display text-tet-red text-center mb-6">
          Soạn Lời Chúc Lì Xì
        </h2>

        {!generatedWish ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Người nhận là ai?</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ví dụ: Sếp, Crush, Vợ yêu, Thằng bạn thân..."
                className="w-full px-4 py-2 rounded-lg border-2 border-orange-200 focus:border-tet-red focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tên bạn (Tùy chọn)</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Để trống nếu muốn ẩn danh"
                className="w-full px-4 py-2 rounded-lg border-2 border-orange-200 focus:border-tet-red focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phong cách</label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(ToneType).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all text-left ${
                      tone === t 
                        ? 'bg-tet-red text-white shadow-md transform scale-105' 
                        : 'bg-orange-50 text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !recipient}
              className={`w-full py-3 rounded-xl font-display text-xl shadow-lg flex items-center justify-center mt-4 ${
                loading || !recipient
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-tet-red to-orange-500 text-white hover:scale-105 transition-transform'
              }`}
            >
              {loading ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Gift className="w-5 h-5 mr-2" /> Tạo Lời Chúc
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center animate-pop">
            <div className="bg-tet-cream p-6 rounded-xl border-2 border-dashed border-tet-red mb-6 relative">
              <span className="absolute -top-3 -right-3 text-3xl">🌸</span>
              <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
                "{generatedWish}"
              </p>
              <span className="absolute -bottom-3 -left-3 text-3xl">🌼</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={copyToClipboard}
                className="w-full py-3 bg-tet-yellow text-tet-darkRed font-bold rounded-xl shadow-md hover:bg-yellow-400 flex items-center justify-center transition-colors"
              >
                <Copy className="w-5 h-5 mr-2" /> Sao chép
              </button>
              
              <button
                onClick={() => setGeneratedWish(null)}
                className="w-full py-3 bg-white border-2 border-tet-red text-tet-red font-bold rounded-xl hover:bg-red-50 flex items-center justify-center transition-colors"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> Tạo lại cái khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
