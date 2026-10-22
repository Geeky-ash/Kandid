import { create } from 'zustand';

export interface CreditTransaction {
  id: string;
  amount: number; // -1 for deduction, +N for purchase or refund
  type: 'deduction' | 'refund' | 'grant' | 'purchase';
  reason: string;
  timestamp: number;
  status: 'completed' | 'refunded' | 'failed';
}

interface CreditState {
  balance: number;
  isProcessing: boolean;
  history: CreditTransaction[];
  deductCredit: (reason: string) => Promise<{ success: boolean; transactionId?: string; error?: string }>;
  refundCredit: (transactionId: string, reason: string) => void;
  addCredits: (amount: number, reason: string) => void;
}

export const useCreditStore = create<CreditState>((set, get) => ({
  balance: 3, // starter free credits for guest / new users
  isProcessing: false,
  history: [
    {
      id: 'tx_welcome_grant',
      amount: 3,
      type: 'grant',
      reason: 'welcome starter credits',
      timestamp: Date.now() - 3600000,
      status: 'completed',
    },
  ],

  deductCredit: async (reason: string) => {
    const currentBalance = get().balance;
    if (currentBalance < 1) {
      return { success: false, error: 'insufficient credits' };
    }

    set({ isProcessing: true });
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const tx: CreditTransaction = {
      id: transactionId,
      amount: -1,
      type: 'deduction',
      reason,
      timestamp: Date.now(),
      status: 'completed',
    };

    set(state => ({
      balance: state.balance - 1,
      isProcessing: false,
      history: [tx, ...state.history],
    }));

    return { success: true, transactionId };
  },

  refundCredit: (transactionId: string, reason: string) => {
    const refundTxId = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const refundTx: CreditTransaction = {
      id: refundTxId,
      amount: 1,
      type: 'refund',
      reason: `refund for ${transactionId}: ${reason}`,
      timestamp: Date.now(),
      status: 'completed',
    };

    set(state => ({
      balance: state.balance + 1,
      history: [
        refundTx,
        ...state.history.map(item =>
          item.id === transactionId ? { ...item, status: 'refunded' as const } : item
        ),
      ],
    }));
  },

  addCredits: (amount: number, reason: string) => {
    const tx: CreditTransaction = {
      id: `grant_${Date.now()}`,
      amount,
      type: amount > 0 ? 'purchase' : 'grant',
      reason,
      timestamp: Date.now(),
      status: 'completed',
    };

    set(state => ({
      balance: state.balance + amount,
      history: [tx, ...state.history],
    }));
  },
}));
