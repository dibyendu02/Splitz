import { useEffect, useState } from "react";
import { CalculationProps } from "../types";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface counterProps {
  setCalculation: React.Dispatch<React.SetStateAction<CalculationProps>>,
}
const Counter = ({ setCalculation}:counterProps) => { 
  
  const [count, setCount] = useState(2);

  const handleCounterInput = () => {
    setCalculation((prev) => ({...prev, size: count}) );
  };

  useEffect(()=>{
    handleCounterInput();
  },[count])

  return (
    <div className="flex  gap-2">
      <button
        onClick={() => {
          if (count > 2) {
            setCount((prev) => prev - 1);
          }

          
        }}
        className="px-5 py-2 bg-white/50"
      >
        -
      </button>
      <div className="px-5 py-2 bg-white/50 text-xl">{count}</div>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
          
        }}
        className="px-5 py-2 bg-white/50"
      >
        +
      </button>
    </div>
  );
};


const Home = () => {
    const [calculation, setCalculation] = useState<CalculationProps>({name: "", size: 2, transactions: [] });

    const navigate = useNavigate();

    const createCollection = async (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      // Check if name are not empty
      if (calculation.name.trim() === "") {
        // Display an error message or handle the validation error as needed
        console.log("name cannot be empty");
        return;
      }

      try {
        // Assuming you have a "collection" named "yourCollection" in Firestore
        const calculationRef = collection(db, "calculation");
    
        const calculationData = await addDoc(calculationRef, {
          calculation
        });
    
        console.log('Data added successfully!');

        //8yQCN80R9QybD3WSwwct demo id

        navigate("calculation/"+calculationData.id);
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    };
    console.log(calculation);
    
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className=" bg-white/20 w-80 p-5 rounded-md flex flex-col items-center text-center gap-5  ">
        <h1 className="text-xl">How many people are in your group?</h1>

        <Counter setCalculation={setCalculation} />

        <h1 className="text-xl">Give it a name</h1>
        <input placeholder="e.g. Trip" className="p-2 w-full" onChange={(e) => {setCalculation((prev) => ({...prev, name: e.target.value}) )}} />

        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => createCollection(e)} className="w-full py-2 bg-white/20 hover:bg-white/40 rounded-md">
          Create !
        </button>
      </div>


    </div>
  );
};

export default Home;
