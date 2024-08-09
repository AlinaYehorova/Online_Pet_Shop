import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openModal } from '../../redux/modalSlice'; 
import { clearCart } from '../../redux/cartSlice'; 
import axios from "axios";
import API_URL from "../../utils/api";
import { TextField, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import styles from "./FormCart.module.css";

function FormCart({ orderData, form = {}, onInputChange }) {
    const { register, handleSubmit, formState } = useForm();
    const [showAlert, setShowAlert] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const dispatch = useDispatch();
  
    const { errors } = formState;
  
    const onSubmit = async (data) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${API_URL}/order/send`, {
          ...data,
          products: orderData.products,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setShowAlert(true);
        setIsSubmitted(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        handlePlaceOrder();
      } catch (error) {
        console.error('Error submitting form', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    function handlePlaceOrder() {
      dispatch(
        openModal({title: "Congratulations!"})
      )
      setTimeout(() => {dispatch(clearCart())}, 1000) 
    }
  
    const nameValue = form?.name || "";
    const phoneValue = form?.phone || "";
    const emailValue = form?.email || "";

    return (
      <div className={styles.Form_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={nameValue}
            onChange={onInputChange}
            name="name"
            FormHelperTextProps={{
              style: { fontSize: "20px" }, // Размер текста ошибки
            }}
          />
          <TextField
            {...register("phone", {
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Phone must be at least 10 characters",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone && errors.phone.message}
            label="Phone"
            variant="outlined"
            fullWidth
            margin="dense"
            value={phoneValue}
            onChange={onInputChange}
            name="phone"
            FormHelperTextProps={{
              style: { fontSize: "20px" }, // Размер текста ошибки
            }}
          />
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={emailValue}
            onChange={onInputChange}
            name="email"
            FormHelperTextProps={{
              style: { fontSize: "20px" }, // Размер текста ошибки
            }}
          />
  
          <Button
            className={styles.btnCartForm}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20} />}
            sx={{
              textTransform: 'none',
              fontSize: "20px",
              mt: 2,
              mb: 0,
              width: "100%",
              height: "58px",
              backgroundColor:  isSubmitted ? "#FFFFFF" : "#0D50FF",
              color: isSubmitted ? "#282828" : "#FFFFFF",
              border: isSubmitted ? "1px solid #282828" : "none",
              "&:hover": {
                backgroundColor: "#282828",
                color: "#FFFFFF",
              },
              "&:active": {
                backgroundColor: "#FFFFFF",
                color: "#282828",
                borderRadius: "1px solid #282828"
              },
            }}
          >
           
            {isSubmitted ? "The Order is Placed" : isLoading ? "Submitting..." : "Order"}
          </Button>
        </form>
        {showAlert && (
          <Snackbar open={showAlert}>
            <Alert severity="success">Form submitted successfully!</Alert>
          </Snackbar>
        )}
      </div>
    );
  }
  
  export default FormCart;
