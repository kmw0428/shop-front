import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    
    return (
        <>
            <div>
                {products.map(product => (
                    <div>
                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                        <h2>{product.name}</h2>
                        <span>카테고리:{product.category}</span>
                        <span>{product.price}원</span>
                        <span>{product.stock}개</span>
                    </div>
                ))}
            </div>
        </>
    );
}