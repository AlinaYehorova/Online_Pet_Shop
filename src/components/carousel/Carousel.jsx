import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import API_URL from "../../utils/api"

function Carousel() {
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));

  let imagesPerView;

  if (isLg || isXl) {
    imagesPerView = 4;
  } else if (isMd) {
    imagesPerView = 3;
  } else if (isSm) {
    imagesPerView = 2;
  } else {
    imagesPerView = 1;
  }

  useEffect(() => {
    axios.get(`${API_URL}/categories/all`)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const getDisplayImages = () => {
    const startIndex = activeStep;
    const endIndex = (activeStep + imagesPerView) % maxSteps;
    if (endIndex > startIndex) {
      return images.slice(startIndex, endIndex);
    } else {
      return [...images.slice(startIndex, maxSteps), ...images.slice(0, endIndex)];
    }
  };

  return (
    <Box sx={{ maxWidth: 1440, flexGrow: 1, m: "0 auto", my: 10, p: "0 16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 3,
          mb: 5,
        }}
      >
         <Typography
          variant="h3"
          sx={{
            fontSize: "clamp(28px, 6vw, 64px)",
            fontWeight: 700,
            textAlign: "left",
            mr: 3,
          }}
        >
          Categories
        </Typography>
        <Box sx={{ width: "100%", borderBottom: "1px solid #DDDDDD" }}></Box>
        <Link to="/categories"><Box
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
          All categories
        </Box></Link>
      </Box>
      <Box sx={{ position: "relative", px:1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          {getDisplayImages().map((step, index) => (
            <Box
              key={step.id}
              sx={{
                flex: 1,
                mx: 2,
                textAlign: "center",
              }}
            >
              <Link to={`/categories/${step.id}`}>
                <Box
                  component="img"
                  sx={{
                    height: "350px",
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  src={`${API_URL}${step.image}`}
                  alt={step.title}
                />
                <Button
                  href="#outlined-buttons"
                  sx={{
                    mt: 2,
                    color: "#282828",
                    fontSize: "clamp(12px, 1.8vw, 20px)",
                    fontWeight: 500,
                    textTransform: "none",
                    ":hover": { textDecoration: "underline" },
                    ":active": { color: "#DDDDDD" },
                  }}
                >
                  {step.title}
                </Button>
              </Link>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
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
            top: "40%",
            right: 0,
            transform: "translateY(-50%)"
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

export default Carousel;
