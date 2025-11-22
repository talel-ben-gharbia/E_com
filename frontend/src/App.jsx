
import './App.css'
import AddProduct from './components/addProduct/AddProduct';
import AddUnderCategory from './components/underCategory/AddUnderCategory';
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Shop from './pages/shop';

function App() {

  return (
    
      <div>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/addUnderCategory' element={<AddUnderCategory />} />
        </Routes>
      </div>
    
  )
}

export default App
