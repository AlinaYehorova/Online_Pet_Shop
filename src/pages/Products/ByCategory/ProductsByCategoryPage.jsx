import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/productCard/ProductCard";
import styles from "./ProductsByCategoryPage.module.css";
import { addToCart } from "../../../redux/cartSlice";
import BreadCrumbs from "../../../components/breadCrumbs/BreadCrumbs";
import NotFoundPage from "../../NotFound/NotFoundPage";
import sortProducts from "../../../services/filtredProducts";
import Filter from "../../../components/filter/filter";
import API_URL from "../../../utils/api"

export default function ProductsByCategoryPage() {
  const [searchParams] = useSearchParams();
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/categories/${categoryId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.status !== "ERR") {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title);
        } else {
          setProducts("error");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("An error occurred fetching data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (products === "error") {
    return <NotFoundPage />;
  }
  const filteredProducts = sortProducts(products, searchParams);
  return (
    <div className={styles.ProductsByCategoryPage}>
      <BreadCrumbs
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "Categories" },
          {
            path: `/categories/${categoryId}`,
            label: categoryName,
            isActive: true,
          },
        ]}
      />

      <h2>{categoryName}</h2>
        <Filter/>
      {error && (
        <p
          style={{
            color: "red",
            backgroundColor: "pink",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {error}
        </p>
      )}
      <div className={styles.ProductsByCategoryPageBox}>
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
