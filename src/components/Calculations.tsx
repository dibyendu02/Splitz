import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { CalculationProps, UserBalance } from "../types";
import UserCards from "./UserCards";

const Calculations = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const calculationRef = doc(db, "calculation", `${id}`);

  const [calculation, setCalculation] = useState<CalculationProps>({
    name: "",
    size: 2,
    transactions: [],
  });

  console.log(calculation.transactions);

  const updateCalculations = async () => {
    await updateDoc(calculationRef, {
      calculation,
    });
  };

  const numberOfTimes = calculation.size;

  // Array.from creates an array with the specified length
  const renderComponents = Array.from({ length: numberOfTimes }, (_, index) => (
    <UserCards
      key={index}
      calculation={calculation}
      setCalculation={setCalculation}
      UserIndex={index + 1}
    />
  ));

  useEffect(() => {
    const getCalculationDetail = async () => {
      const docSnap = await getDoc(calculationRef);

      console.log(docSnap.data());
      setCalculation(docSnap.data()?.calculation);
    };
    getCalculationDetail();
  }, []);

  // const calculateSettlement = () => {
    
  // }

  // Step 1: Calculate total transaction amount for each user
  const userBalances: UserBalance[] = calculation.transactions.reduce(
    (balances, transaction) => {
      const existingBalance = balances.find(
        (balance) => balance.userIndex === transaction.UserIndex
      );

      if (existingBalance) {
        existingBalance.totalAmount += transaction.transAmount;
      } else {
        balances.push({
          userIndex: transaction.UserIndex,
          userName: transaction.userName,
          totalAmount: transaction.transAmount,
          averageAmount: 0, // Placeholder, will be calculated later
          balance: 0, // Placeholder, will be calculated later
        });
      }

      return balances;
    },
    [] as UserBalance[]
  );

  console.log(userBalances);

  // Step 2: Calculate average transaction amount for each user
  userBalances.forEach((balance) => {
    balance.averageAmount = balance.totalAmount / calculation.size;
  });

  const TransactionMessages: string[] = [];

  // Step 3: Determine who owes whom
  userBalances.forEach((payer) => {
    userBalances.forEach((payee) => {
      if (payer !== payee) {
        const amountToPay = payer.averageAmount - payee.averageAmount;

        if (amountToPay > 0) {
          // TransactionMessages.push(
          //   `${payer.userName} owes ${payee.userName}: ${amountToPay.toFixed(
          //     2
          //   )}`
          // );
          console.log(
            `${payer.userName} owes ${payee.userName}: ${amountToPay.toFixed(
              2
            )}`
          );
        } else if (amountToPay < 0) {
          // TransactionMessages.push(
          //   `${payee.userName} owes ${payer.userName}: ${Math.abs(
          //     amountToPay
          //   ).toFixed(2)}`
          // );
          console.log(
            `${payee.userName} owes ${payer.userName}: ${Math.abs(
              amountToPay
            ).toFixed(2)}`
          );
        }
      }
    });
  });

  // Step 4: Debt settlement algorithm
  const debts: { from: UserBalance; to: UserBalance; amount: number }[] = [];
  userBalances.forEach((payer) => {
    userBalances.forEach((payee) => {
      if (payer !== payee) {
        const amountToPay = payer.averageAmount - payee.averageAmount;

        if (amountToPay > 0) {
          debts.push({ from: payee, to: payer, amount: amountToPay });
        } else if (amountToPay < 0) {
          debts.push({ from: payer, to: payee, amount: amountToPay });
        }
      }
    });
  });

  // Sort debts in descending order
  debts.sort((a, b) => b.amount - a.amount);

  // Debt settlement algorithm
  let i = 0;
  let j = debts.length - 1;

  while (i < j) {
    const amount = Math.min(debts[i].amount, -debts[j].amount);

    TransactionMessages.push(
      `${debts[i].from.userName} pays ${amount.toFixed(2)} to ${
        debts[j].to.userName
      }`
    );

    debts[i].amount -= amount;
    debts[j].amount += amount;

    if (debts[i].amount === 0) i++;
    if (debts[j].amount === 0) j--;
  }

  //console.log(TransactionMessages);

  const handleCopyToClipboard = async () => {
    try {
      if (urlRef.current) {
        await navigator.clipboard.writeText(urlRef.current.value);
        console.log("URL copied to clipboard");
      }
    } catch (error) {
      console.error("Failed to copy URL to clipboard", error);
    }
  };

  return (
    <div className=" flex flex-col gap-10 items-center p-5">
      <h1>{calculation.name}</h1>

      <div className="flex flex-wrap justify-center gap-10 md:gap-40">
        <div className="flex flex-col gap-10">{renderComponents}</div>
        <div className="flex flex-col items-center gap-5">
          <button
            className="bg-white/20 h-10 w-20 rounded-md transform active:scale-y-90 transition-transform"
            onClick={updateCalculations}
          >
            Save
          </button>

          <div className="flex flex-col gap-2">
            {TransactionMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>

          <div>
            <input
              type="text"
              ref={urlRef}
              defaultValue={window.location.href}
              style={{ position: "absolute", left: "-9999px" }}
            />
            <button className="bg-white/20 h-10 p-2 rounded-md transform active:scale-y-90 transition-transform" onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Calculations;
