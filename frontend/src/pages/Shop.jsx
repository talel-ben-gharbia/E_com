import React, { useEffect, useState, useMemo } from 'react'
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import FilterSidebar from '../components/shop/FilterSidebar';

import './Shop.css'

function Shop() {

  const [products, setProducts] = useState([]);

  // read query param for search (use location-based URL parsing so React router navigations reflect)
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get('q') || '';

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = q 
          ? `http://localhost:8080/api/product/search?q=${encodeURIComponent(q)}` 
          : 'http://localhost:8080/api/product';
        
        console.log('Fetching products from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Received products:', data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [q]);

  const filtered = useMemo(() => {
    if (!q) return products;
    const term = q.toLowerCase();
    return products.filter(p => (p.name || '').toLowerCase().includes(term) || (p.description || '').toLowerCase().includes(term));
  }, [products, q]);
  // Add loading and error states
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <p>Please make sure the backend server is running on http://localhost:8080</p>
      </div>
    );
  }

  return (
    <div className='shop'>
      <div className='shop-grid'>
        <FilterSidebar />
        <div className='products'>
          {filtered.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or check back later.</p>
            </div>
          ) : (
            filtered.map(product => (
              <div key={product.id} className='product-card'>
                <Link to={`/product/${product.id}`} className="info-link">
                  <IoIosInformationCircle className='info-icon' size={40} />
                </Link>
                <Link to={`/product/${product.id}`} className="product-link">
                  <img 
                    src={product.imgUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
                    alt={product.name} 
                    className='product-image'
                  />
                </Link>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  {Number(product.sold) === 1 ? (
                    <div className='ifsold'>
                      <span className='price'>{(Number(product.price) - (Number(product.price) * 0.3)).toFixed(2)} Dt</span>
                      <span className='sold'>{Number(product.price).toFixed(2)} Dt</span>
                      <span className='percent'>-30%</span>
                    </div>
                  ) : (
                    <p className='price'>{Number(product.price).toFixed(2)} Dt</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
