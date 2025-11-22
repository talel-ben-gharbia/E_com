import React, { useState } from 'react';
import axios from 'axios';
import './AddUnderCategory.css';

export default function AddUnderCategory() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      category: categoryId ? { id: Number(categoryId) } : null
    };

    try {
      const res = await axios.post('http://localhost:8080/api/under-category', payload);
      alert('UnderCategory created (id: ' + (res.data?.id ?? 'unknown') + ')');
      setName('');
      setCategoryId('');
    } catch (err) {
      console.error(err);
      alert('Failed to create under-category: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-undercategory">
      <h2>Add UnderCategory</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. T-Shirts"
            required
          />
        </label>

        <label>
          Parent Category ID
          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Category ID (optional)"
            type="number"
            min="1"
          />
        </label>

        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </form>
    </div>
  );
}
