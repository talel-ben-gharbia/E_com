import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      try{
        const res = await fetch(`http://localhost:8080/api/product/${id}`);
        if(!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data);
      }catch(err){
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    load();
  },[id]);

  if(loading) return <div className="product-detail"><p>Loading...</p></div>;
  if(!product) return <div className="product-detail"><p>Product not found</p></div>;

  return (
    <div className="product-detail">
      <div className="detail-grid">
        <div className="image-col">
          <img src={product.imgUrl || 'https://via.placeholder.com/600x600?text=No+Image'} alt={product.name} />
        </div>
        <div className="info-col">
          <Link to="/shop" className="back-link">← Back</Link>
          <h1>{product.name}</h1>
          <p className="category">{product.underCategory?.name || product.category?.name || 'Uncategorized'}</p>
          <div className="price-row">
            {Number(product.sold) === 1 ? (
              <>
                <span className="price">{(Number(product.price) - (Number(product.price) * 0.3)).toFixed(2)} Dt</span>
                <span className="sold">{Number(product.price).toFixed(2)} Dt</span>
              </>
            ) : (
              <span className="price">{Number(product.price).toFixed(2)} Dt</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div className="meta">
            <div><strong>Quantity:</strong> {product.quantity}</div>
            <div><strong>Sold:</strong> {product.sold}</div>
          </div>

          <div className="actions">
            <button className="buy">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
