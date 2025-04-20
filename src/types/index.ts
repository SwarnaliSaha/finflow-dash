
export interface User {
  id: string;
  name: string;
  email: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  period: 'weekly' | 'monthly' | 'yearly';
}

export type TimeFrame = 'weekly' | 'monthly' | 'yearly';
