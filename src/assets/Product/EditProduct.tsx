import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  ingredient: string;
  recommender: string;
  htu: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product data");
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        await axios.put(`http://localhost:8080/products/${product.id}`, product);
        alert("Product updated successfully");
        navigate(`/product/${product.id}`);
      } catch (error) {
        console.error("Error updating product:", error);
        setError("Error updating product");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product?.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ingredient:</label>
          <input
            type="text"
            name="ingredient"
            value={product?.ingredient || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Recommender:</label>
          <input
            type="text"
            name="recommender"
            value={product?.recommender || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>How to Use:</label>
          <input
            type="text"
            name="htu"
            value={product?.htu || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProduct;
