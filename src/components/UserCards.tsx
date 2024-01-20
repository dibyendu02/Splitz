import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import { UserCardProps } from "../types";
import { v4 as uuidv4 } from "uuid"; 

const UserCards = ({calculation, setCalculation, UserIndex}:UserCardProps) => {

  const [totalAmount, setTotalAmount] = useState<number>(0)

  const [currUserName, setCurrUserName] = useState<string>("");

  const defaultTransaction = {
    UserIndex: UserIndex,
    id: uuidv4(),
    userName: "",
    transDesc: "",
    transAmount: 0,
  };


  const handleNameInput = (userIndex:number, value: string) => {

    const updatedCalculationTransactions = calculation.transactions.map((calcTransaction) => {
      
      const updatedTransaction = {...calcTransaction} ;
      
      if (updatedTransaction.UserIndex === (userIndex) ) {
        updatedTransaction.userName = value;
      }
  
      return updatedTransaction;
    });


    const newCalculation = {
      ...calculation,
      transactions: updatedCalculationTransactions,
    };
    
    setCalculation(newCalculation);

    //setting the username    
    setCurrUserName(value)

  };

  
  
  useEffect(() => {
    // const newTransactions = [...calculation.transactions, defaultTransaction];
    // const newCalculation = {
    //   ...calculation,
    //   transactions: newTransactions,
    // }
    //setCalculation(newCalculation);

  }, []);

  const userTransactions = calculation.transactions.filter((transaction) => transaction.UserIndex === UserIndex);

  const renderTransactions = userTransactions.map((transaction, index) => (
    <TransactionCard
      key={transaction.id}
      calculation={calculation}
      setCalculation={setCalculation}
      index={index}
      currUserName={currUserName}
      {...transaction}
    />
  ));

  const calcTotalAmount = () => userTransactions.map((calcTransaction) => {
      
    const updatedTransaction = {...calcTransaction} ;

    if(calcTransaction.userName !== ""){
      setCurrUserName(calcTransaction.userName)
    }

    setTotalAmount((prev) => (prev + updatedTransaction.transAmount));
  });

  //total user amount calculation 
  
  useEffect(() => {
    setTotalAmount(0);
    calcTotalAmount()
  }, [calculation]);


  return (
    <div className="border-solid border border-white h-full w-full md:w-96 rounded-md p-5 flex flex-col gap-2 ">
      <div className="w-full flex gap-2 items-center">
        <input
          value={currUserName}
          placeholder={`Name User ${UserIndex}`}
          className="p-1 w-[60%] "
          onChange={(e) => handleNameInput( UserIndex, e.target.value)}
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
        <p className="text-xl">{totalAmount}</p>
      </div>

      {renderTransactions}

      <button
        onClick={() => {
          const newTransactions = [...calculation.transactions, defaultTransaction];
          const newCalculation = {
            ...calculation,
            transactions: newTransactions,
          }
          setCalculation(newCalculation);
        }}
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

export default UserCards;
