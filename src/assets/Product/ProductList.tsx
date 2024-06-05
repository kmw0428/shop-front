import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Products.css";
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 제품 데이터를 가져오기 위해 API 호출
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // 컴포넌트가 처음 렌더링될 때 제품 데이터를 가져옴
    }, []);

    // 배열을 지정된 크기(chunkSize)로 나누는 함수
    const chunkArray = (array: Product[], chunkSize: number): Product[][] => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize)); // 배열을 chunkSize 크기만큼 잘라서 chunks에 추가
        }
        return chunks;
    };

    // 제품 배열을 3개씩 묶음으로 나눈 결과
    const productRows = chunkArray(products, 3);

    return (
        <div>
            <div className="header">
              <h2 className='productstitle'>ALL</h2>
              <div className="custom-hr">
                <hr />
              </div>
            </div>
            {/* 3개씩 묶인 제품 행들을 렌더링 */}
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
                            {/* 제품 상세 페이지로 이동할 수 있는 링크 버튼 */}
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
