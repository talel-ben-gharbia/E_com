import React, { useEffect, useState } from 'react'
import { IoIosInformationCircle } from "react-icons/io";

import './Shop.css'
function Shop() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        // backend exposes GET /api/product (not /api/products)
        const response = await fetch('http://localhost:8080/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className='shop'>
      <h1>Shop Page</h1>
      <div className='products'>
        
        {products.map(product => (
          <div key={product.id} className='product-card'>
            <IoIosInformationCircle className='info-icon' size={40}/>
            <img src={product.imgUrl || 'https://via.placeholder.com/300x300?text=No+Image'} alt={product.name} className='product-image'/>
            <div>
            <h3>{product.name}</h3>
            {
              Number(product.sold) === 1
                ? (
                  <div className='ifsold'>
                    <span className='price'>{(Number(product.price) - (Number(product.price) * 0.3)).toFixed(2)} Dt</span>
                    <span className='sold'>{Number(product.price).toFixed(2)} Dt</span>
                    <span className='percent'>-30%</span>
                  </div>
                )
                : (
                  <p className='price'>{Number(product.price).toFixed(2)} Dt</p>
                )
            }

            </div>
            
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
