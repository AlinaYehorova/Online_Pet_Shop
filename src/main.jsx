import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat',
      color: "#282828"
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
);
