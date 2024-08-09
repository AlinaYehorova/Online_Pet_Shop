import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ProductDetailsPage.module.css";
import ButtonNew from "../../components/buttonNew/ButtonNew";
import { addToCart } from "./../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Breadcrumbs from "../../components/breadCrumbs/BreadCrumbs";
import NotFoundPage from "../NotFound/NotFoundPage";
import API_URL from "../../utils/api"

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1); 
  const [categoryName, setCategoryName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/products/${productId}`)
      .then((response) => {
        if (typeof response.data[0] === "object") {
          setProduct(response.data[0]);
          axios
            .get(
              `${API_URL}/categories/${response.data[0].categoryId}`
            )
            .then((res) => {
              setCategoryName(res.data.category.title);
            });
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("An error occurred fetching data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const { title, price, discont_price, image, description } = product;
  const realPrice = discont_price || price;
  const oldPrice = discont_price ? price : null;
  const discountPercentage = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const truncatedDescription =
    description.length > 683 ? `${description.slice(0, 683)}...` : description;

  return (
    <div className={styles.ProductDetailsPage}>
      <Breadcrumbs
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "Categories" },
          {
            path: `/categories/${product.categoryId}`,
            label: categoryName,
            isActive: categoryName === false,
          },
          { path: ``, label: product.title, isActive: true, type: "title" },
        ]}
      />
      <div className={styles.ProductDetailsPageBox}>
        <div className={styles.ProductDetailsPageBox_item}>
          <div className={styles.ProductDetailsPageBox_itemImg_right}>
            <img src={`${API_URL}${image}`} alt={title} />
          </div>

          <div className={styles.ProductDetailsPageBox_itemInfo}>
            <div className={styles.ProductDetailsPageBox_itemInfo_title}>
              <h4>{title}</h4>
            </div>
            <div className={styles.ProductDetailsPageBox_itemInfo_price}>
              <p className={styles.realPrice}>$ {realPrice}</p>
              {oldPrice && <p className={styles.discountPrice}>$ {oldPrice}</p>}
              {discountPercentage && (
                <div className={styles.discountPercent}>
                  <p>{discountPercentage}%</p>
                </div>
              )}
            </div>
            <div className={styles.ProductDetailsPageBox_itemInfo_buttonsBox}>
              <div
                className={styles.ProductDetailsPageBox_itemInfo_buttonsCounter}
              >
                <button style={{ zIndex: 1 }} onClick={handleDecrement}>
                  -
                </button>
                <input
                  style={{ position: "relative", right: "5px" }}
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value)))
                  }
                />
                <button
                  style={{ position: "relative", right: "10px" }}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <div
                className={
                  styles.ProductDetailsPageBox_itemInfo_buttonsAddButton
                }
              >
                <ButtonNew
                  activeText="Added"
                  onClick={(e) => {
                    dispatch(addToCart({ ...product, quantity }));
                    e.preventDefault();
                  }}
                >
                  Add to cart
                </ButtonNew>
              </div>
            </div>
            <div className={styles.ProductDetailsPageBox_itemInfo_description}>
              <h6>Description</h6>
              {description.length < 683 ? (
                description
              ) : (
                <>
                  <p>{isExpanded ? description : truncatedDescription}</p>

                  <button onClick={toggleReadMore}>
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
