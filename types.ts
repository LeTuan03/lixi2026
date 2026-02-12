export enum AppMode {
  HOME = 'HOME',
  GIVE = 'GIVE',
  RECEIVE = 'RECEIVE',
  QR_LUCKY = 'QR_LUCKY'
}

export enum ToneType {
  FUNNY = 'Hài hước, bựa',
  RESPECTFUL = 'Trang trọng, kính nể',
  ROMANTIC = 'Lãng mạn, thả thính',
  RHYME = 'Thơ lục bát, vần điệu'
}

export interface GeneratedWish {
  wish: string;
  luckyNumber?: number;
}

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}