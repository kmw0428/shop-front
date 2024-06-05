import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Products.css";
import { Link, useParams } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

export default function ProductList() {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = !category || category === "ALL"
                    ? 'http://localhost:8080/products'
                    : `http://localhost:8080/products/category/${category}`;
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [category]);

    const chunkArray = (array: Product[], chunkSize: number): Product[][] => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const productRows = chunkArray(products, 3);

    return (
        <div>
            <div className="header">
              <h2 className='productstitle'>{category || 'ALL'}</h2>
              <div className="custom-hr">
                <hr />
              </div>
            </div>
            {productRows.map((row, rowIndex) => (
                <div className='productlist' key={rowIndex}>
                    {row.map(product => (
                        <div className='productlist-1' key={product.id}>
                            {<img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />}
                            <h2>{product.name}</h2>
                            <span>{product.category}</span>
                            <br />
                            <span>{product.price} 원</span>
                            <br />
                            <Link to={`/product/${product.id}`} className="view-details-button1">
                                제품 보러 가기
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
