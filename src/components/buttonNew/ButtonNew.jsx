import { useState } from "react";
import styles from "./ButtonNew.module.css";
import { Link } from "react-router-dom";

const ButtonNew = ({ children, onClick, isActive, isLink, to, activeText = "Added" }) => {
  if (isLink) {
    return (
      <Link
        className={
          isActive ? `${styles.Button} ${styles.Active}` : styles.Button
        }
        to={to}
      >
        {children}
      </Link>
    );
  }
  
  const [localActive, setLocalActive] = useState(isActive === true);
  
  const handleClick = (e) => {
    onClick(e);
    setLocalActive(true);
    setTimeout(() => {
      setLocalActive(false);
    }, 3000);
  };

  return (
    <button
      className={localActive ? `${styles.Button} ${styles.Active}` : styles.Button}
      onClick={handleClick}
    >
      {localActive ? activeText : children}
    </button>
  );
};

export default ButtonNew;


