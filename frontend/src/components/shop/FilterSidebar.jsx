import React, { useState } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ onApply }) {
  const [priceMin, setPriceMin] = useState(50);
  const [priceMax, setPriceMax] = useState(200);
  const [selectedColors, setSelectedColors] = useState([]);

  const colors = ['#ff0000','#00b300','#ffd400','#ff7a00','#007bff','#9b59b6','#ffffff','#000000'];

  const toggleColor = (c) => {
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <section className="filter-block">
        <h4>Categories</h4>
        <ul className="category-list">
          <li>T-shirts</li>
          <li>Shorts</li>
          <li>Shirts</li>
          <li>Hoodie</li>
          <li>Jeans</li>
        </ul>
      </section>

      <section className="filter-block">
        <h4>Price</h4>
        <div className="price-range">
          <div className="inputs">
            <input type="number" value={priceMin} onChange={e => setPriceMin(Number(e.target.value))} />
            <span> - </span>
            <input type="number" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} />
          </div>
        </div>
      </section>

      <section className="filter-block">
        <h4>Colors</h4>
        <div className="colors">
          {colors.map(c => (
            <button
              type="button"
              key={c}
              className={"color-dot " + (selectedColors.includes(c) ? 'active' : '')}
              style={{ background: c }}
              onClick={() => toggleColor(c)}
            />
          ))}
        </div>
      </section>

      <section className="filter-block">
        <h4>Size</h4>
        <div className="sizes">
          {['XS','S','M','L','XL'].map(s => (
            <button type="button" key={s} className="size-chip">{s}</button>
          ))}
        </div>
      </section>

      <div className="apply-row">
        <button className="apply-btn" onClick={() => onApply && onApply({ priceMin, priceMax, selectedColors })}>Apply Filter</button>
      </div>
    </aside>
  );
}
