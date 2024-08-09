import { useSearchParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./DiscountedProductsPage.module.css";
import ProductCard from "../../../components/productCard/ProductCard";
import { addToCart } from "../../../redux/cartSlice";
import BreadCrumbs from "../../../components/breadCrumbs/BreadCrumbs";
import sortProducts from "../../../services/filtredProducts";
import Filter from "../../../components/filter/filter";
import API_URL from "../../../utils/api"

export default function DiscountedProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);


  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, type === "checkbox" ? checked : value);
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        const discountedProducts = response.data.filter(product => product.discont_price !== null);
        setProducts(discountedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = sortProducts(products, searchParams);

  return (
    <div className={styles.DiscountedProductsPage}>
      <BreadCrumbs
        items={[
          { path: '/', label: 'Main page' },
          { path: '/categories', label: 'Discounted items', isActive: true }
        ]}
      />

      <h2>Discounted items</h2>
      <Filter includedDiscount="off" handleChange={handleChange} />

      <div className={styles.DiscountedProductsPageBox}>
      {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p>No products found</p>
            
          )}
      </div>
    </div>
  );
}
