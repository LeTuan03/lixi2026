import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, QrCode, Scan, Shuffle, Copy } from 'lucide-react';
import { POPULAR_BANKS, getRandomLuckyAmount, generateVietQRUrl } from '../services/bankService';

interface QRModeProps {
  onBack: () => void;
}

export const QRMode: React.FC<QRModeProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'CREATE' | 'SCAN'>('CREATE');
  
  // Create State
  const [selectedBank, setSelectedBank] = useState(POPULAR_BANKS[0].shortName);
  const [accountNo, setAccountNo] = useState('1809200345');
  const [accountName, setAccountName] = useState('TUAN DEV');
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState('Li xi Tet 2026');
  const [qrUrl, setQrUrl] = useState('');

  // Scan State
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Generate QR whenever inputs change
    if (accountNo) {
      const url = generateVietQRUrl(selectedBank, accountNo, amount, message, accountName);
      setQrUrl(url);
    } else {
      setQrUrl('');
    }
  }, [selectedBank, accountNo, amount, message, accountName]);

  // Handle Scanner
  useEffect(() => {
    let timeoutId: any;

    if (activeTab === 'SCAN' && !scanResult) {
      const initScanner = async () => {
        // Ensure element exists and we are still in SCAN mode
        const readerElement = document.getElementById("reader");
        if (!readerElement) return;

        try {
           // Clear any existing instance first just in case
           if (scannerRef.current) {
             await scannerRef.current.clear().catch(() => {});
             scannerRef.current = null;
           }

           const html5QrcodeScanner = new (window as any).Html5QrcodeScanner(
             "reader",
             { 
               fps: 10, 
               qrbox: { width: 250, height: 250 },
               aspectRatio: 1.0
             },
             /* verbose= */ false
           );
           
           html5QrcodeScanner.render((decodedText: string) => {
             setScanResult(decodedText);
             html5QrcodeScanner.clear().catch(() => {});
             scannerRef.current = null;
           }, (errorMessage: any) => {
             // parse error, ignore usually
           });
           
           scannerRef.current = html5QrcodeScanner;
        } catch (e) {
          console.error("Scanner init failed", e);
        }
      };

      // Slight delay to ensure DOM is ready
      timeoutId = setTimeout(initScanner, 100);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error: any) => console.warn("Failed to clear html5-qrcode", error));
        scannerRef.current = null;
      }
    };
  }, [activeTab, scanResult]);

  const handleRandomAmount = () => {
    let i = 0;
    const interval = setInterval(() => {
      setAmount(getRandomLuckyAmount());
      i++;
      if (i > 10) clearInterval(interval);
    }, 50);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép nội dung!');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-pop">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-tet-darkRed font-bold hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-tet-gold">
        {/* Tabs */}
        <div className="flex border-b-2 border-tet-gold">
          <button
            onClick={() => setActiveTab('CREATE')}
            className={`flex-1 py-3 font-display text-sm md:text-lg transition-colors flex items-center justify-center whitespace-nowrap ${
              activeTab === 'CREATE' ? 'bg-tet-red text-white' : 'bg-orange-50 text-gray-500'
            }`}
          >
            <QrCode className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" /> Tạo QR Lì Xì
          </button>
          <button
            onClick={() => setActiveTab('SCAN')}
            className={`flex-1 py-3 font-display text-sm md:text-lg transition-colors flex items-center justify-center whitespace-nowrap ${
              activeTab === 'SCAN' ? 'bg-tet-red text-white' : 'bg-orange-50 text-gray-500'
            }`}
          >
            <Scan className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" /> Quét Mã
          </button>
        </div>

        <div className="p-4 md:p-6">
          {activeTab === 'CREATE' ? (
            <div className="space-y-4">
               <div className="text-center mb-4">
                  <h3 className="text-tet-darkRed font-bold text-lg">Nhập thông tin để nhận Lộc</h3>
               </div>
               
               {/* Bank Form */}
               <div className="space-y-3">
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase">Ngân hàng</label>
                   <select 
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full p-2 rounded border border-orange-200 focus:border-tet-red outline-none text-sm md:text-base"
                   >
                     {POPULAR_BANKS.map(bank => (
                       <option key={bank.id} value={bank.shortName}>
                         {bank.shortName} - {bank.name}
                       </option>
                     ))}
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase">Số tài khoản</label>
                   <input
                      type="text"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                      placeholder="Nhập số tài khoản..."
                      className="w-full p-2 rounded border border-orange-200 focus:border-tet-red outline-none font-mono text-sm md:text-base"
                   />
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase">Tên chủ TK (Tùy chọn)</label>
                   <input
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                      placeholder="NGUYEN VAN A"
                      className="w-full p-2 rounded border border-orange-200 focus:border-tet-red outline-none uppercase text-sm md:text-base"
                   />
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase">Số tiền Lì Xì</label>
                   <div className="flex gap-2 items-center">
                     <input
                        type="number"
                        value={amount || ''}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Nhập số tiền..."
                        className="flex-1 min-w-0 p-2 rounded border border-orange-200 focus:border-tet-red outline-none text-sm md:text-base"
                     />
                     <button 
                        onClick={handleRandomAmount}
                        className="bg-tet-yellow text-tet-darkRed px-3 py-2 rounded font-bold shadow-sm hover:bg-yellow-400 active:scale-95 transition-transform flex items-center flex-shrink-0 whitespace-nowrap text-sm md:text-base"
                     >
                       <Shuffle className="w-4 h-4 mr-1" /> Random
                     </button>
                   </div>
                   {amount > 0 && (
                     <p className="text-xs text-tet-red font-bold mt-1 text-right">
                       {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
                     </p>
                   )}
                 </div>
               </div>

               {/* QR Display */}
               {accountNo ? (
                 <div className="mt-6 flex flex-col items-center animate-pop">
                   <div className="p-2 bg-white border-4 border-tet-gold rounded-xl shadow-lg relative max-w-full">
                      {/* Decoration */}
                      <div className="absolute -top-3 -left-3 text-2xl">🧧</div>
                      <div className="absolute -bottom-3 -right-3 text-2xl">🌸</div>
                      <img src={qrUrl} alt="VietQR" className="w-full max-w-[200px] h-auto object-contain" />
                   </div>
                   <p className="mt-2 text-sm text-gray-500 italic">Quét mã này để chuyển khoản</p>
                 </div>
               ) : (
                 <div className="mt-6 h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-400 text-sm">Nhập số tài khoản để hiện QR</p>
                 </div>
               )}

            </div>
          ) : (
            <div className="flex flex-col items-center min-h-[300px]">
              {!scanResult ? (
                <div className="w-full">
                  <div className="text-center mb-4">
                    <h3 className="text-tet-darkRed font-bold">Hướng camera vào mã QR</h3>
                    <p className="text-xs text-gray-500">Hỗ trợ quét mọi loại mã QR</p>
                  </div>
                  {/* Container with fixed min height to prevent jumping */}
                  <div id="reader" className="w-full bg-black rounded-lg overflow-hidden min-h-[250px]"></div>
                </div>
              ) : (
                <div className="w-full text-center animate-pop">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Đã quét thành công!</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 break-all">
                    <p className="text-sm font-mono text-gray-600">{scanResult}</p>
                  </div>
                  
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button 
                      onClick={() => copyToClipboard(scanResult)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold flex items-center hover:bg-gray-50"
                    >
                      <Copy className="w-4 h-4 mr-2" /> Copy
                    </button>
                    {scanResult.startsWith('http') && (
                      <a 
                        href={scanResult} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 bg-tet-red text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                      >
                        Mở Link
                      </a>
                    )}
                    <button 
                      onClick={() => {
                        setScanResult(null);
                      }}
                      className="px-4 py-2 bg-tet-yellow text-tet-darkRed rounded-lg text-sm font-semibold hover:bg-yellow-400"
                    >
                      Quét tiếp
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};