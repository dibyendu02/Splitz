import Calculations from "../components/Calculations"
import Output from "../components/Output"


const BillPage = () => {
  return (
    <div className=" p-5 md:p-20 min-h-screen flex flex-wrap gap-10  ">
      <Calculations/>
      <Output/>
    </div>
  )
}

export default BillPage