
import './App.css'
import AddProduct from './components/addProduct/AddProduct';
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    
      <div>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addProduct' element={<AddProduct />} />
        </Routes>
      </div>
    
  )
}

export default App
