import { useState } from "react";
import axios from "axios";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    sold: "",
    category: { id: "" }
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      setProduct({ ...product, category: { id: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    formData.append("image", image);

    await axios.post("http://localhost:8080/api/product/with-image", formData);

    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
      <input name="sold" type="number" placeholder="Sold" onChange={handleChange} />
      <input name="categoryId" type="number" placeholder="Category ID" onChange={handleChange} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Create</button>
    </form>
  );
}

export default AddProduct;
