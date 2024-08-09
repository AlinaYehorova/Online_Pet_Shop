import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import ButtonNew from '../buttonNew/ButtonNew';
import styles from './ProductCard.module.css';
import API_URL from '../../utils/api';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();


  const handleAddToCart = (event) => {
    event.stopPropagation(); 
    event.preventDefault(); 
    dispatch(addToCart({ ...product, quantity: 1 }));
  };


const discountPercentage = product.discont_price 
            ? Math.round(((product.price - product.discont_price) / product.price) * 100) 
            : null;
  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`} className={styles.productCard_link}>
        <div className={styles.productCard_imgBox}>
          <img src={`${API_URL}${product.image}`} alt={product.title} className={styles.productCard_img} />
          {product.discont_price && (
            <div className={styles.discountLabel}>
              <p>{discountPercentage}%</p>
            </div>
          )}
          <div className={styles.productCard_buttonBox}>
            <ButtonNew activeText="Added" onClick={handleAddToCart}>Add to cart</ButtonNew> 
          </div>
        </div>
        <div className={styles.productCard_info}>
          <h3 className={styles.productCard_title}>{product.title}</h3>
          <div className={styles.productCard_priceBox}>
            {product.discont_price ? (
              <>
                <span className={styles.currentPrice}>${product.discont_price}</span>
                <span className={styles.originalPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;