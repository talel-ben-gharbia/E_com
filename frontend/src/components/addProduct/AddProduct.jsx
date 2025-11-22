import { useState, useEffect } from "react";
import axios from "axios";
import './AddProduct.css';

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    sold: "",
    category: { id: "" },
    underCategory: { id: "" }
  });

  const [categories, setCategories] = useState([]);
  const [underCategories, setUnderCategories] = useState([]);

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      setProduct({ ...product, category: { id: value } });
    } else if (name === "underCategoryId") {
      setProduct({ ...product, underCategory: { id: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  useEffect(() => {
    // fetch categories and under-categories for dropdowns
    const load = async () => {
      try {
        const [cRes, uRes] = await Promise.all([
          axios.get('http://localhost:8080/api/category'),
          axios.get('http://localhost:8080/api/under-category')
        ]);
        setCategories(cRes.data || []);
        setUnderCategories(uRes.data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const payload = {
      ...product,
      price: Number(product.price || 0),
      quantity: Number(product.quantity || 0),
      sold: Number(product.sold || 0),
      category: product.category && product.category.id ? { id: Number(product.category.id) } : null,
      underCategory: product.underCategory && product.underCategory.id ? { id: Number(product.underCategory.id) } : null
    };

    formData.append("product", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/product/with-image", formData);
      alert("Product added!");
    } catch (err) {
      console.error(err);
      alert('Failed to add product: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="add-product">
      <h2 className="full">Create Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={product.name} placeholder="Name" onChange={handleChange} />
        </div>

        <div>
          <label>Price</label>
          <input name="price" value={product.price} type="number" placeholder="Price" onChange={handleChange} />
        </div>

        <div>
          <label>Quantity</label>
          <input name="quantity" value={product.quantity} type="number" placeholder="Quantity" onChange={handleChange} />
        </div>

        <div>
          <label>Sold</label>
          <input name="sold" value={product.sold} type="number" placeholder="Sold" onChange={handleChange} />
        </div>

        <div className="full">
          <label>Description</label>
          <textarea name="description" value={product.description} placeholder="Description" onChange={handleChange} />
        </div>

        <div>
          <label>Category</label>
          <select name="categoryId" value={product.category.id} onChange={handleChange}>
            <option value="">-- choose category --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Under Category</label>
          <select name="underCategoryId" value={product.underCategory.id} onChange={handleChange}>
            <option value="">-- choose under-category --</option>
            {underCategories
              .filter(u => !product.category.id || String(u.category?.id) === String(product.category.id))
              .map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label>Image</label>
          <input className="file-input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="full actions">
          <button type="submit">Create</button>
          <button type="button" className="secondary" onClick={() => { setProduct({ name:'', description:'', price:'', quantity:'', sold:'', category:{id:''}, underCategory:{id:''} }); setImage(null); }}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
