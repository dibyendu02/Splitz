import Output from "../components/Output"
import UserCards from "../components/UserCards"


const BillPage = () => {
  return (
    <div className=" p-5 md:p-20 min-h-screen flex flex-wrap ">
        <UserCards/>
        <Output/>
    </div>
  )
}

export default BillPage