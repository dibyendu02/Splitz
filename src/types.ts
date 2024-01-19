export interface Transaction {
    UserIndex: number,
    id: string,
    userName: string,
    transDesc: string,
    transAmount: number,
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

  export interface TransactionCardProps {
    transactionNo: number;
    setTransactionNo: React.Dispatch<React.SetStateAction<number>>;
    transactionRef: React.MutableRefObject<{
      [key: number]: HTMLButtonElement | null;
    }>;
    calculation: CalculationProps,
    setCalculation: React.Dispatch<React.SetStateAction<CalculationProps>>,
    index: number;
    UserIndex: number,
    setCurrTransId: React.Dispatch<React.SetStateAction<string>>,
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
