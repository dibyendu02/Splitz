import { useEffect, useRef, useState } from "react";
import TransactionCard from "./TransactionCard";

interface Transaction {
    userName: string;
    transDesc: string;
    transAmount: number;
  }
const UserCards = () => {

    const deleteButtonRef = useRef([]);

    const [transactionNo, setTransactionNo] = useState(1);

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    console.log(transactions)

    

    useEffect(() => {
        // Initialize transactions when the component mounts
        const initialTransactions = Array.from({ length: transactionNo }, (_, index) => ({
            userName: "",
            transDesc: "",
            transAmount: 0,
        }));
        setTransactions(initialTransactions);
    }, [transactionNo]); // Empty dependency array ensures this effect runs only once when the component mounts

    const renderTransactions = transactions.map((transaction, index) => (
        <TransactionCard
        key={index}
        transactionNo={transactionNo}
        setTransactionNo={setTransactionNo}
        transaction={transactions}
        setTransaction={setTransactions}
        deleteButtonRef={deleteButtonRef}
        index={index}
        {...transaction} />
    ));

  return (
    <div className="border-solid border border-white h-full w-full md:w-96 rounded-md p-5 flex flex-col gap-2 ">
      <div className="w-full flex gap-2 items-center">
        <input
          //onChange={}
          placeholder={`Name User 1`}
          className="p-1 w-[60%] "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      {renderTransactions}

      <button
        onClick={() => setTransactionNo(transactions.length + 1)}
        className="w-full bg-white/20 p-2 flex items-center justify-center rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  )
}

export default UserCards