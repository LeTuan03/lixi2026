import { Bank } from "../types";

// Common banks in Vietnam
export const POPULAR_BANKS: Bank[] = [
  { id: '970407', name: 'Techcombank', shortName: 'TCB', logo: 'https://img.vietqr.io/image/TCB.png' },
  { id: '970436', name: 'Vietcombank', shortName: 'VCB', logo: 'https://img.vietqr.io/image/VCB.png' },
  { id: '970422', name: 'MB Bank', shortName: 'MB', logo: 'https://img.vietqr.io/image/MB.png' },
  { id: '970415', name: 'VietinBank', shortName: 'ICB', logo: 'https://img.vietqr.io/image/ICB.png' },
  { id: '970418', name: 'BIDV', shortName: 'BIDV', logo: 'https://img.vietqr.io/image/BIDV.png' },
  { id: '970416', name: 'ACB', shortName: 'ACB', logo: 'https://img.vietqr.io/image/ACB.png' },
  { id: '970432', name: 'VPBank', shortName: 'VPB', logo: 'https://img.vietqr.io/image/VPB.png' },
  { id: '970423', name: 'TPBank', shortName: 'TPB', logo: 'https://img.vietqr.io/image/TPB.png' },
  { id: '970403', name: 'Sacombank', shortName: 'STB', logo: 'https://img.vietqr.io/image/STB.png' },
  { id: '970405', name: 'Agribank', shortName: 'VBA', logo: 'https://img.vietqr.io/image/VBA.png' },
  { id: '970441', name: 'VIB', shortName: 'VIB', logo: 'https://img.vietqr.io/image/VIB.png' },
  { id: '970454', name: 'VietCapitalBank', shortName: 'VCCB', logo: 'https://img.vietqr.io/image/VCCB.png' },
];

export const LUCKY_AMOUNTS = [
  6800, 8600, 9999, // Small fun
  68000, 86000, 88000, 99000, // Standard lucky
  68686, 88888, 12345, 56789, // Beautiful numbers
  50000, 100000, 200000, 500000 // Round numbers
];

export const getRandomLuckyAmount = (): number => {
  return LUCKY_AMOUNTS[Math.floor(Math.random() * LUCKY_AMOUNTS.length)];
};

export const generateVietQRUrl = (bankShortName: string, accountNo: string, amount: number = 0, message: string = '', accountName: string = ''): string => {
  // Use VietQR public API for image generation
  // Format: https://img.vietqr.io/image/<BANK>-<ACCOUNT>-<TEMPLATE>.png
  const template = 'compact2';
  const baseUrl = `https://img.vietqr.io/image/${bankShortName}-${accountNo}-${template}.png`;
  
  const params = new URLSearchParams();
  if (amount > 0) params.append('amount', amount.toString());
  if (message) params.append('addInfo', message);
  if (accountName) params.append('accountName', accountName);

  return `${baseUrl}?${params.toString()}`;
};
