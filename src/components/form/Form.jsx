import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, CircularProgress, Snackbar, Alert, TextField } from "@mui/material";
import styles from "./Form.module.css";
import API_URL from "../../utils/api"

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/sale/send`, data, {
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
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.Form_form}>
      <form onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: "516px" }}>
        <TextField
          sx={{
            mt: 4,
            width: "100%",
            borderColor: "#FFFFFF",
            color: "#FFFFFF",
            "& input": {
              caretColor: "#FFFFFF",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FFFFFF",
              },
              "&:hover fieldset": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFFFFF",
              },
            },
            "& .MuiFormLabel-root": {
              color: "#FFFFFF",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFFFFF",
              opacity: 0.6,
            },
          }}
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
        />
        <TextField
          sx={{
            mt: 2,
            width: "100%",
            borderColor: "#FFFFFF",
            color: "#FFFFFF",
            "& input": {
              caretColor: "#FFFFFF",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FFFFFF",
              },
              "&:hover fieldset": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFFFFF",
              },
            },
            "& .MuiFormLabel-root": {
              color: "#FFFFFF",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFFFFF",
              opacity: 0.6,
            },
          }}
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
        />
        <TextField
          sx={{
            mt: 2,
            width: "100%",
            borderColor: "#FFFFFF",
            color: "#FFFFFF",
            "& input": {
              caretColor: "#FFFFFF",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FFFFFF",
              },
              "&:hover fieldset": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFFFFF",
              },
            },
            "& .MuiFormLabel-root": {
              color: "#FFFFFF",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFFFFF",
              opacity: 0.6,
            },
          }}
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
        />
        <Button
          className={styles.btnForm}
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
            backgroundColor: isSubmitted ? "#F1F3F4" : "#FFFFFF", 
            color: isSubmitted ? "#0D50FF" : "#282828",
            "&:hover": {
              backgroundColor: isSubmitted ? "#282828" : "#282828",
              color: isSubmitted ? "#FFFFFF" : "#FFFFFF",
            },
            "&:active": {
              backgroundColor: isSubmitted ? "#F1F3F4" : "#F1F3F4",
              color: isSubmitted ? "#0D50FF" : "#0D50FF",
            },
          }}
        >
          {isSubmitted ? "Reques Submitted" : isLoading ? "Submitting..." : "Get a discount"}
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

export default Form;
