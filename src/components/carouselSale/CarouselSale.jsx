import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import { addToCart } from "../../redux/cartSlice";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import API_URL from "../../utils/api"

export default function CarouselSale() {
  const [products, setProducts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const isMediumScreen = useMediaQuery("(min-width: 900px)");
  const isSmallScreen = useMediaQuery("(min-width: 600px)");

  let imagesPerView = 1;
  if (isLargeScreen) {
    imagesPerView = 4;
  } else if (isMediumScreen) {
    imagesPerView = 3;
  } else if (isSmallScreen) {
    imagesPerView = 2;
  }

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

  const discountedProducts = products.filter(product => product.discont_price);

  const maxSteps = discountedProducts.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const getDisplayProducts = () => {
    const startIndex = activeStep;
    const endIndex = (activeStep + imagesPerView) % maxSteps;
    if (endIndex > startIndex) {
      return discountedProducts.slice(startIndex, endIndex);
    } else {
      return [...discountedProducts.slice(startIndex, maxSteps), ...discountedProducts.slice(0, endIndex)];
    }
  };

  return (
    <Box sx={{ maxWidth: 1440, flexGrow: 1, m: "0 auto", mt: 10, p: "0 16px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: 3, mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "clamp(28px, 6vw, 64px)",
            fontWeight: 700,
            textAlign: "left",
            mr: 3,
          }}
        >
          Sale
        </Typography>
        <Box sx={{ width: "100%", borderBottom: "1px solid #DDDDDD" }}></Box>
        <Link to="/discounted-products">
          <Box
            sx={{
              whiteSpace: "nowrap",
              fontSize: "clamp(10px, 1.5vw, 16px)",
              fontWeight: 500,
              color: "#8B8B8B",
              border: "1px solid #DDDDDD",
              borderRadius: "6px",
              padding: "8px 16px",
              minWidth: "fit-content",
              ":hover": { backgroundColor: "#F1F3F4" },
              ":active": { color: "#282828" },
            }}
          >
            All sales
          </Box>
        </Link>
      </Box>

      <Box sx={{ position: "relative", px: 3 }}>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          {getDisplayProducts().map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={handleNext}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
