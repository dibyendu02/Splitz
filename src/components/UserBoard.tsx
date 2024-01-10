import { useState } from "react";

const UserBoard = () => {
  const numberOfTimes = 3; // Change this to the desired number of times

  // Array.from creates an array with the specified length
  const renderComponents = Array.from({ length: numberOfTimes }, (_, index) => (
    <Board key={index} />
  ));

  return <div className="flex flex-col gap-10">{renderComponents}</div>;
};

const Board = () => {
  const [transCardNo, setTransCardNo] = useState(1);

  // Array.from creates an array with the specified length
  const renderTransComponents = Array.from({ length: transCardNo }, (_, index) => (
    <TransactionCard transCardNo={transCardNo} setTransCardNo={setTransCardNo} key={index} />
  ));

  return (
    <div className="border-solid border border-white w-full md:w-96 rounded-md p-5 flex flex-col gap-2 ">
      <input placeholder="Name 1" className="p-1 w-full " />

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
}

const TransactionCard = ({transCardNo, setTransCardNo } : TransactionCardProps) => {

  return (
    <div className="flex gap-2">
        <input placeholder="How Much?" className="p-1 w-1/2" />
        <input placeholder="What?" className="p-1 w-1/2" />
        <button onClick={() => {transCardNo > 0 && setTransCardNo(prev => prev-1)}}>
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
