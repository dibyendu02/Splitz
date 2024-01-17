export interface Transaction {
    userName: string;
    transDesc: string;
    transAmount: number;
  }
export interface TransactionProps {
    transactionNo: number;
    setTransactionNo: React.Dispatch<React.SetStateAction<number>>;
    transaction: Transaction[];
    setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
    deleteButtonRef: React.MutableRefObject<{
      [key: number]: HTMLButtonElement | null;
    }>;
    index: number;
  }

  export interface CalculationProps {
    name: string,
    size: number,
    transactions: Transaction[];
  }

  export interface UserCardProps {
    calculation: CalculationProps,
    setCalculation: React.Dispatch<React.SetStateAction<CalculationProps>>,
    UserIndex: number
  }
