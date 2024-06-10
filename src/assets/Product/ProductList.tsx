import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const categoryNames: { [key: string]: string } = {
  all: "All Products",
  cleanser: "Cleanser",
  toner: "Toner",
  serumessence: "Serum & Essence",
  lotioncream: "Lotion & Cream",
  suncare: "Suncare",
  shampoo: "Shampoo",
  treat: "Treat",
  tonic: "Tonic & Serum",
};

export default function ProductList() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url =
          !category || category === "ALL"
            ? "http://localhost:8080/products"
            : `http://localhost:8080/products/category/${category}`;
        const response = await axios.get(url);
        setOriginalProducts(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let sortedProducts = [...products];
    switch (sortCriteria) {
      case "default":
        sortedProducts = [...originalProducts]; // 처음 불러온 데이터로 돌아감
        break;
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  }, [sortCriteria, originalProducts]);

  const chunkArray = (array: Product[], chunkSize: number): Product[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const productRows = chunkArray(products, 3);

  const categoryName = categoryNames[category?.toLowerCase() || "all"];

  return (
    <div>
      <div className="header">
        <h2 className="productstitle">{categoryName}</h2>
        <div className="custom-hr">
          <hr />
        </div>
      </div>
      <div className="sort-options">
        <label htmlFor="sort" className="search-results__sort-label">
          정렬 기준:{" "}
        </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="search-results__sort-select"
        >
          <option value="default">기본</option>
          <option value="name">이름순</option>
          <option value="price-high">높은 가격순</option>
          <option value="price-low">낮은 가격순</option>
        </select>
      </div>
      {productRows.map((row, rowIndex) => (
        <div className="productlist" key={rowIndex}>
          {row.map((product) => (
            <div className="productlist-1" key={product.id}>
              {
                <img
                  src={`http://localhost:8080${product.imageUrl}`}
                  alt={product.name}
                />
              }
              <h2>{product.name}</h2>
              <span>{product.category}</span>
              <br />
              <span>{formatPrice(product.price)} 원</span>
              <br />
              <Link
                to={`/product/${product.id}`}
                className="view-details-button1"
              >
                제품 보러 가기
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
