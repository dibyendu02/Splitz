import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CalculationProps } from "../types";
import UserCards from "./UserCards";

const Calculations = () => {
  const { id } = useParams();
  const calculationRef = doc(db, "calculation", `${id}`);

  const [calculation, setCalculation] = useState<CalculationProps>({name: "", size: 2, transactions: [] });

  console.log(calculation.transactions)

  const updateCalculations = async () => {
    await updateDoc(calculationRef, {
      calculation
    });
  }


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

      console.log(docSnap.data())
      setCalculation(docSnap.data()?.calculation);
    };
    getCalculationDetail();
    
  }, []);


  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-40 p-5 md:p-20">
      <div className="flex flex-col gap-10">
        {renderComponents}
      </div>
      

      <button className="bg-white/20 h-10 w-20 rounded-md" onClick={updateCalculations}>Save</button>
      
    </div>
  )
}

export default Calculations