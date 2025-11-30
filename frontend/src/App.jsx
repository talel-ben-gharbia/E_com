
import './App.css'
import AddProduct from './components/addProduct/AddProduct';
import AddUnderCategory from './components/underCategory/AddUnderCategory';
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Shop from './pages/shop';
import ProductDetail from './pages/ProductDetail';
import AuthPage from './pages/Auth';
import { useState } from 'react';
import Cart from './components/cart/Cart';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    
      <div>
        <Navbar setCartOpen={setCartOpen} />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/register' element={<AuthPage />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/addUnderCategory' element={<AddUnderCategory />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
        {cartOpen && <Cart setCartOpen={setCartOpen}/>} 
      </div>
    
  )
}

export default App
