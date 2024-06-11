import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";

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

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      {
        Swal.fire({
          title: "Warning",
          text: "로그인 후 이용해주세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "로그인 하러 가기",
          cancelButtonText: "취소",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // 로그인 페이지로 이동
          }
        });
      }
      return;
    }

    try {
      const orderPayload = {
        user: { id: userId },
        products: [{ id: product.id }],
        totalAmount: product.price,
        orderDate: new Date(),
      };
      console.log(orderPayload);

      await axios.post("http://localhost:8080/orders", orderPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "장바구니에 상품이 저장되었습니다.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "장바구니 이동",
        cancelButtonText: "쇼핑 계속하기",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
          cancelButton: "custom-swal-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // If "장바구니 이동" button is clicked
          window.location.href = "/cartpage";
        }
      });
    } catch (error) {
      console.error("Order creation failed:", error);
      {
        Swal.fire({
          title: "Warning",
          text: "상품 추가 중 오류가 발생하였습니다.",
          icon: "warning",
          showCancelButton: true,
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    }
  };

  const handleAddToFavorites = async (product: Product) => {
    Swal.fire({
      title: "즐겨찾기에 상품이 추가되었습니다.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "즐겨찾기로 이동",
      cancelButtonText: "계속 쇼핑하기",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // If "즐겨찾기로 이동" button is clicked
        window.location.href = "/wishlist";
      }
    });
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
    <div className="productlists">
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
              <div className="part-1">
                <img
                  src={`http://localhost:8080${product.imageUrl}`}
                  alt={product.name}
                />
                <ul className="icon-list">
                  <li>
                    <a
                      href="#"
                      className="icon"
                      onClick={() => handleAddToCart(product)}
                    >
                      <AddShoppingCartIcon className="custom-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="icon"
                      onClick={() => handleAddToFavorites(product)}
                    >
                      <FavoriteIcon className="custom-icon" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="part-2">
                <h2>{product.name}</h2>
                <span>{product.category}</span>
                <br />
                <span>{formatPrice(product.price)} 원</span>
                <br />
              </div>
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
