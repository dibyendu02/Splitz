import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CalculationProps } from "../types";
import UserCards from "./UserCards";

const Calculations = () => {
  const { id } = useParams();
  const calculationRef = doc(db, "calculation", `${id}`);

  const [calculation, setCalculation] = useState<CalculationProps>({name: "", size: 2, transactions: [] });

  console.log(calculation.transactions)


  useEffect(() => {
    const getPostDetail = async () => {
      const docSnap = await getDoc(calculationRef);
      setCalculation(docSnap.data()?.calculation);
    };
    getPostDetail();
    
  }, []);

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


  return (
    <div className="flex flex-col gap-10">{renderComponents}</div>
  )
}

export default Calculations