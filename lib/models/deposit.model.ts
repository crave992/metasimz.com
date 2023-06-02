export interface Deposit {
  id:string;
  accountName: string;
  accountNumber: string;
  bankName: 'BDO' | 'Metrobank' | 'BPI' | 'PNB';
  amount: number;
  dateCreated?: Date;
}