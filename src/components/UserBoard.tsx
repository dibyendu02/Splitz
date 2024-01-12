import { useEffect, useState } from "react";

interface Transaction {
  userName: string;
  transDesc: string;
  transAmount: number;
}

const UserBoard = () => {
  const numberOfTimes = 1; // Change this to the desired number of times

  const [transaction, setTransaction] = useState<Transaction[]>([
    { userName: "", transDesc: "", transAmount: 0 },
  ]);
  console.log(transaction);

  // Array.from creates an array with the specified length
  const renderComponents = Array.from({ length: numberOfTimes }, (_, index) => (
    <Board
      key={index}
      transaction={transaction}
      setTransaction={setTransaction}
      UserIndex={index + 1}
    />
  ));

  return <div className="flex flex-col gap-10">{renderComponents}</div>;
};

interface BoardProps {
  UserIndex: number;
  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const Board = ({ UserIndex, transaction, setTransaction }: BoardProps) => {
  const [transCardNo, setTransCardNo] = useState(1);
  const [totalTransAmount, setTotalTransAmount] = useState<number>(0);

  //for each user
  // const [subtransaction, setSubTransaction] = useState<Transaction[]>([
  //   { userName: "", transDesc: "", transAmount: 0 },
  // ]);

  console.log(transaction);
  console.log("total trans amount " + totalTransAmount)

  // Array.from creates an array with the specified length
  const renderTransComponents = Array.from(
    { length: transCardNo },
    (_, index) => (
      <TransactionCard
        transCardNo={transCardNo}
        setTransCardNo={setTransCardNo}
        key={index}
        setTotalTransAmount={setTotalTransAmount}
        transaction={transaction[UserIndex]}
        setTransaction={setTransaction}
        UserIndex= {UserIndex}
      />
    )
  );



  return (
    <div className="border-solid border border-white w-full md:w-96 rounded-md p-5 flex flex-col gap-2 ">
      <div className="w-full flex gap-2 items-center">
        <input
          onChange={(e) =>
            setSubTransaction((prev) => [
              ...prev,
              { userName: e.target.value, transAmount: 0, transDesc: "" },
            ])
          }
          placeholder={`Name ${UserIndex}`}
          className="p-1 w-[60%] "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      {renderTransComponents}

      <button
        onClick={() => setTransCardNo((prev) => prev + 1)}
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
  );
};

interface TransactionCardProps {
  transCardNo: number;
  setTransCardNo: React.Dispatch<React.SetStateAction<number>>;
  setTotalTransAmount: React.Dispatch<React.SetStateAction<number>>;
  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
  UserIndex: number;
}

const TransactionCard = ({
  transCardNo,
  setTransCardNo,
  setTotalTransAmount,
  transaction,
  setTransaction,
  UserIndex
}: TransactionCardProps) => {

  const [subTransaction, setSubTransaction] = useState<Transaction[]>([
    { userName: "", transDesc: "", transAmount: 0 },
  ]);

  const handleInputChange = (e) => {
    const updatedValue = parseFloat(e.target.value);

    // Check if the row with the current UserIndex already exists
    const indexToUpdate = subTransaction.findIndex((item) => item.userName === `user ${UserIndex}`);

    if (indexToUpdate !== -1) {
      // If the row exists, update it
      setSubTransaction((prev) => [
        ...prev.slice(0, indexToUpdate),
        { userName: `user ${UserIndex}`, transAmount: updatedValue, transDesc: '' },
        ...prev.slice(indexToUpdate + 1),
      ]);
    } else {
      // If the row doesn't exist, add it
      setSubTransaction((prev) => [
        ...prev,
        { userName: `user ${UserIndex}`, transAmount: updatedValue, transDesc: '' },
      ]);
    }
  };

  const handleInputBlur = (e) => {
    const updatedValue = parseFloat(e.target.value);

    // Check if the row with the current UserIndex already exists
    const indexToUpdate = transaction.findIndex((item) => item.userName === `user ${UserIndex}`);

    if (indexToUpdate !== -1) {
      // If the row exists, update it
      setTransaction((prev) => [
        ...prev.slice(0, indexToUpdate),
        { userName: `user ${UserIndex}`, transAmount: updatedValue, transDesc: '' },
        ...prev.slice(indexToUpdate + 1),
      ]);
    } else {
      // If the row doesn't exist, add it
      setTransaction((prev) => [
        ...prev,
        { userName: `user ${UserIndex}`, transAmount: updatedValue, transDesc: '' },
      ]);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        placeholder="How Much?"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="p-1 w-1/2"
      />
      <input placeholder="What?" className="p-1 w-1/2" />
      <button
        onClick={() => {
          transCardNo > 0 && setTransCardNo((prev) => prev - 1);
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

export default UserBoard;
