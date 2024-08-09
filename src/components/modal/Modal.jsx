import styles from "./Modal.module.css";
import xImg from "../../assets/xImg.svg"

const Modal = ({ isOpen, onClose, children }) => {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  if (isOpen) {
    return (
      <div className={styles.Modal} onClick={onClose}>
        <div className={styles.ModalContent} onClick={stopPropagation}>
          {children}
          <button className={styles.closeBtn} onClick={onClose}><img className={styles.closeBtn_img} src={xImg} alt="close" /></button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;