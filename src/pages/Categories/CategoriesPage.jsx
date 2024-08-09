import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./CategoriesPage.module.css";
import Breadcrumbs from "../../components/breadCrumbs/BreadCrumbs";
import API_URL from "../../utils/api"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/categories/all`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories);
  return (
    <div className={styles.CategoriesPage}>
      <Breadcrumbs
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "Categories", isActive: true },
        ]}
      />

      <h2>Categories Page</h2>

      <div className={styles.CategoriesPageBox}>
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`}>
            <div className={styles.CategoriesPage_itemBox}>
              <img
                src={`${API_URL}${category.image}`}
                alt={category.title}
                className={styles.CategoriesPage_item}
              />
              <p>{category.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
