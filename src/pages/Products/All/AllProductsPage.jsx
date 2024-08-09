import { useSearchParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./AllProductsPage.module.css";
import { addToCart } from "../../../redux/cartSlice";
import BreadCrumbs from "../../../components/breadCrumbs/BreadCrumbs";
import Filter from "../../../components/filter/filter";
import sortProducts from "../../../services/filtredProducts";
import ProductCard from "../../../components/productCard/ProductCard";
import API_URL from "../../../utils/api"

export default function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = sortProducts(products, searchParams);
  return (
    <div className={styles.AllProductsPage}>
      <BreadCrumbs
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "All products", isActive: true },
        ]}
      />

      <h2>All Products Page</h2>
      <Filter/>
      <div className={styles.AllProductsPageBox}>
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
