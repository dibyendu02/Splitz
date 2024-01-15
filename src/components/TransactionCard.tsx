import { useEffect } from "react";

interface Transaction {
  userName: string;
  transDesc: string;
  transAmount: number;
}
interface TransactionProps {
  transactionNo: number;
  setTransactionNo: React.Dispatch<React.SetStateAction<number>>;
  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
  deleteButtonRef: React.MutableRefObject<{
    [key: number]: HTMLButtonElement | null;
  }>;
  index: number;
}
const Transaction = ({
  transactionNo,
  setTransactionNo,
  transaction,
  setTransaction,
  deleteButtonRef,
  index,
}: TransactionProps) => {
  const handleDeleteButton = (index: number) => {
    console.log("input index no is "+index);
    setTransaction((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements.splice(index, 1);
      return updatedElements;
    });
  
    console.log(`removed ${index}th row`);
  };

  const handleTextInput = (i: number, value: string) => {
    const updateFieldInState = transaction.map((transaction, index) => {
      if (i === index) {
        const newfieldstate = {
          ...transaction,
          transDesc: value,
        };
        return newfieldstate;
      } else {
        return transaction;
      }
    });
    setTransaction(updateFieldInState);
  }

  useEffect(() => {
    console.log("index no is " + [index]);
  }, []);
  return (
    <div className="flex gap-2">
      <input
        placeholder="How Much?"
        // onChange={handleInputChange}
        // onBlur={handleInputBlur}
        className="p-1 w-1/2"
      />
      <input placeholder="What?" className="p-1 w-1/2"
      onChange={(e) => handleTextInput(index, e.target.value)}
      />
      <button
        
        ref={(el) => (deleteButtonRef.current[index] = el)}
        // onClick={() => handleDeleteButton(index)}
        onClick={() => {
          // deleteButtonRef[index].style.backgroundColor = "red";
          handleDeleteButton(index);
          console.log("clicked row "+index);
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

export default Transaction;
