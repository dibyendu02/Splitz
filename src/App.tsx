import Calculations from './components/Calculations';
import BillPage from './pages/BillPage'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        
          <Route index element={<Home />} />
          <Route path="/calculation/:id" element={<Calculations />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
