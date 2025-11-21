import React from 'react'
import './Product.css'
function Product({name, price, description, imageUrl}) {
  return (
    <div className='product'> 
      <img src={imageUrl} alt={name} className='product-image'/>
      <div>
        <h2 className='product-name'>{name}</h2>
      <p className='product-description'>{description}</p>
      <span className='product-price'>${price}</span>
      </div>
      
    </div>
  )
}

export default Product
