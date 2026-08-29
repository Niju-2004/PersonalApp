export interface ISaving {
  savingsId?: number;
  userId: number;
  bankName: string;
  reason: string;
  amount: number;
  savingsDate: string;
  targetAmount?: number | null;
  notes?: string | null;
  createdAt?: string;
}

export interface ISavingsBucket {
  bankName: string;
  reason: string;
  totalBalance: number;
  targetAmount?: number | null;
  transactionCount: number;
  lastDepositDate: string;
  transactions: ISaving[];
}

export interface IMonthlySavingsGroup {
  monthYearKey: string; // e.g. "August 2026", "May 2025"
  monthTotal: number;
  items: ISaving[];
}

