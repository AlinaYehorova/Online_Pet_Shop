import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadCrumbs.module.css";

const Breadcrumbs = ({ items }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className={styles.breadcrumbSeparator}></div>}
            {item.isActive ? (
              <span 
                className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}
              >
                {item.label && item.label.length <= 15
                  ? item.label
                  : `${JSON.stringify(item.label).slice(1, 15)}...`}
              </span>
            ) : (
              <Link to={item.path} className={styles.breadcrumbItem}>
                {item.label && item.label.length <= 15
                  ? item.label
                  : `${JSON.stringify(item.label).slice(1, 15)}...`}
              </Link>
            )}
          </React.Fragment>
        ))
      ) : (
        <span>No breadcrumbs available</span>
      )}
    </div>
  );
};

export default Breadcrumbs;
