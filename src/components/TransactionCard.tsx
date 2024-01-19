import { TransactionCardProps } from "../types";



const TransactionCard = ({
  transactionNo,
  setTransactionNo,
  transactionRef,
  calculation,
  setCalculation,
  index,
  UserIndex,
  setCurrTransId,
}: TransactionCardProps) => {



  const handleDeleteButton = (id: string) => {
    console.log("input id is " + id);

    
    setCalculation((prevElements) => {
      const updatedTransactions = prevElements.transactions.filter((transaction) => transaction.id !== id);
      const newCalculation = {
        ...calculation,
        transactions: [...updatedTransactions],
      };
      return newCalculation;
    });

    console.log(`removed transaction with id ${id}`);
  };

  const handleTextInput = (id: string, value: string) => {
    const updateFieldInState = calculation.transactions.map((transaction) => {
      if (transaction.id === id) {
        const newFieldState = {
          ...transaction,
          transDesc: value,
        };
        return newFieldState;
      } else {
        return transaction;
      }
    });

    const newCalculation = {
      ...calculation,
      transactions: [...updateFieldInState],
    };

    setCalculation(newCalculation);

  };

  const handleNumInput = (id: string, value: string) => {
    const parsedValue = parseFloat(value);
    const isValidNumber = !isNaN(parsedValue);

    const updateFieldInState = calculation.transactions.map((transaction) => {
      if (transaction.id === id) {
        const newFieldState = {
          ...transaction,
          transAmount: isValidNumber ? parsedValue : 0,
        };
        return newFieldState;
      } else {
        return transaction;
      }
    });

    const newCalculation = {
      ...calculation,
      transactions: [...updateFieldInState],
    };

    setCalculation(newCalculation);
    
  };

  const userTransactions = calculation.transactions.filter((transaction) => transaction.UserIndex === UserIndex);



  return (
    <div className="flex gap-2">
      <input
        placeholder="How Much?"
        onChange={(e) => handleNumInput(userTransactions[index].id, e.target.value)}
        className="p-1 w-1/2"
        value={userTransactions[index].transAmount}
      />
      <input
        placeholder="What?"
        className="p-1 w-1/2"
        onChange={(e) => handleTextInput(userTransactions[index].id, e.target.value)}
        value={userTransactions[index].transDesc || ""}
      />
      <button        
        onClick={() => {
          handleDeleteButton(userTransactions[index].id);
          console.log("clicked row " + userTransactions[index].id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TransactionCard;
