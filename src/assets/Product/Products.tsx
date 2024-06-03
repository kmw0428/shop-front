import React from 'react';
import './Products.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Products: React.FC = () => {
  const products = [
    {
      id: 'product-1',
      title: 'Céleste 시그니처 샴푸 1,000ml',
      oldPrice: '23,000원',
      price: '12,900원',
      discount: '44% off',
      isNew: false
    },
    {
      id: 'product-2',
      title: 'Céleste 샴푸 1,000ml 라벤더머스크 향',
      oldPrice: '22,000원',
      price: '12,900원',
      discount: '',
      isNew: true
    },
    {
      id: 'product-3',
      title: 'Céleste 샴푸 1,000ml 로즈우드 향',
      oldPrice: '23,000원',
      price: '12,900원',
      discount: '',
      isNew: true
    },
    {
      id: 'product-4',
      title: 'Céleste 두피 케어 샴푸 (지성 및 지루성) 500ml',
      oldPrice: '24,900원',
      price: '14,900원',
      discount: '38% off',
      isNew: false
    },
    {
      id: 'product-5',
      title: 'Céleste 두피 케어 샴푸 (건성) 500ml',
      oldPrice: '24,900원',
      price: '14,900원',
      discount: '38% off',
      isNew: false
    },
    {
      id: 'product-6',
      title: 'Céleste 두피 케어 샴푸 (민감성) 500ml',
      oldPrice: '24,900원',
      price: '14,900원',
      discount: '38% off',
      isNew: false
    },
    {
      id: 'product-7',
      title: 'Céleste 탈모 케어 샴푸 500ml',
      oldPrice: '44,000원',
      price: '16,900원',
      discount: '62% off',
      isNew: false
    },
    {
      id: 'product-8',
      title: 'Céleste 샴푸 1,000ml 티트리로즈마리 향',
      oldPrice: '',
      price: '12,900원',
      discount: '',
      isNew: false
    },
    {
      id: 'product-9',
      title: 'Céleste 샴푸 1,000ml 탠저린시트러스 향',
      oldPrice: '',
      price: '12,900원',
      discount: '',
      isNew: false
    },

    // 필요한 경우 더 많은 제품을 추가할 수 있습니다.
  ];

  return (
    <section className="products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h2>Shampoo</h2>
              <div className="custom-hr">
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
              <div id={product.id} className="single-product">
                <div className="part-1">
                  {product.discount && <span className="discount">{product.discount}</span>}
                  {product.isNew && <span className="new">new</span>}
                  <ul className="icon-list">
                    <li><a href="#" className="icon"><AddShoppingCartIcon className="custom-icon" /></a></li>
                    <li><a href="#" className="icon"><FavoriteIcon className="custom-icon" /></a></li>
                  </ul>
                </div>
                <div className="part-2">
                  <h3 className="product-title">{product.title}</h3>
                  {product.oldPrice && <h4 className="product-old-price">{product.oldPrice}</h4>}
                  <h4 className="product-price">{product.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;