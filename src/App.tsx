import Calculations from './components/Calculations';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/calculation/:id" element={<Calculations />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
