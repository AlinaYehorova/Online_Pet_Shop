import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, removeItem, updateQuantity } from '../../redux/cartSlice';
import styles from './Cart.module.css';
import FormCart from '../../components/formCart/FormCart';
import API_URL from '../../utils/api';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => 
    item.discont_price === null ? total + item.price * item.quantity : total + item.discont_price * item.quantity, 0
  );

  const handleChangeQuantity = (method, id) => {
    dispatch(changeQuantity({ method, value: 1, id }));
  };
  
  const handleChangeInput = (id, currentValue) => {
    dispatch(updateQuantity({ id, quantity: currentValue }));
  };

  const orderData = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    products: cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      title: item.title,
      price: item.price,
      discont_price: item.discont_price || item.price,
      totalPrice: (item.discont_price || item.price) * item.quantity,
    })),
  };

  return (
    <div className={styles.CartPage}>
      <div className={styles.CartPage_titleBox}>
        <h2 className={styles.CartPage_titleBox_title}>Shopping cart</h2>
        <span className={styles.CartPage_titleBox_line}></span>
        <Link to="/products">
          <div className={styles.CartPage_titleBox_btn}>
            Back to the store
          </div>
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <div>
          <p className={styles.CartPage_emptyWarning}>
            Looks like you have no items in your basket currently.
          </p>
          <Link className={styles.CartPage_continueBtn} to="/products">
            <div className={styles.CartPage_continueBtn_btn}>
              Continue shopping
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.CartPage_itemsBox}>
          <div className={styles.CartPage_itemsBox_left}>
            {cartItems.map((item) => (
              <div className={styles.CartPage_item} key={item.id}>
                <div className={styles.CartPage_itemImg}>
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.title}
                  />
                </div>
                <div className={styles.CartPage_itemInfo}>
                  <div className={styles.CartPage_itemInfo_left}>
                    <h4>{item.title}</h4>
                    <div className={styles.CartPage_itemInfo_leftPrice}>
                      <div className={styles.CartPage_itemInfo_leftBtnCounter}>
                        <button
                          style={{ zIndex: 1 }}
                          onClick={() => handleChangeQuantity("decrement", item.id)}
                        >
                          -
                        </button>
                        <input
                          style={{ position: "relative", right: "5px" }}
                          type="number"
                          min="1"
                          onChange={(e) => handleChangeInput(item.id, e.target.value)}
                          value={item.quantity}
                        />
                        <button
                          style={{ position: "relative", right: "10px" }}
                          onClick={() => handleChangeQuantity("plus", item.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.CartPage_itemInfo_leftPrice_price}>
                        {item.discont_price ? (
                          <>
                            <p className={styles.discountPrice}>
                              ${item.discont_price * item.quantity}
                            </p>
                            <p className={styles.defaultPrice}>
                              ${item.price * item.quantity}
                            </p>
                          </>
                        ) : (
                          <p className={styles.discountPrice}>
                            ${item.price * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.deleteButtonBox}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => dispatch(removeItem({ id: item.id }))}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.CartPage_itemsBox_right}>
            <h3>Order details</h3>
            <p>{totalQuantity} items</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p>Total</p>
              <span className={styles.totalPrice}>${totalPrice}</span>
            </div>
            <FormCart orderData={orderData} form={form} onInputChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
          </div>
        </div>
      )}
    </div>
  );
}

