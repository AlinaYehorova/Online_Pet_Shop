import React from "react";
import { Box, Grid, Typography, Paper, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import instagram from "../../assets/instagram.svg";
import whatsapp from "../../assets/whatsapp.svg";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "80px 40px",
        [theme.breakpoints.down('sm')]: {
          padding: "80px 15px",
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: "clamp(30px, 6vw, 64px)",
          fontWeight: 700,
          textAlign: "left",
          mb: 5,
        }}
      >
        Contact
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#F1F3F4",
              borderRadius: "12px",
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#8B8B8B" }}>
              Phone
            </Typography>
            <Typography
              sx={{ fontSize: "clamp(18px, 3.5vw, 40px)", fontWeight: 600 }}
            >
              +49 30 915-88492
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#F1F3F4",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                m: 0,
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#8B8B8B" }}>
                Socials
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ pl: 0 ,'&:hover': {backgroundColor: "transparent"}}}>
                  <a href="https://www.instagram.com/"><img src={instagram} alt="logo" style={{ height: "38px" }} /></a>
                </IconButton>
                <IconButton sx={{'&:hover': {backgroundColor: "transparent"}}}>
                 <a href="https://www.whatsapp.com/"><img src={whatsapp} alt="logo" style={{ height: "38px" }} /></a>
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "#F1F3F4",
              borderRadius: "12px",
              height: "190px",
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#8B8B8B" }}>
              Address
            </Typography>
            <Typography
              sx={{
                fontSize: "clamp(18px, 3.5vw, 40px)",
                fontWeight: 600,
                width: "85%",
              }}
            >
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "#F1F3F4",
              borderRadius: "12px",
              height: "190px",
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#8B8B8B" }}>
              Working Hours
            </Typography>
            <Typography sx={{ fontSize: "clamp(18px, 3.5vw, 40px)", fontWeight: 600 }}>
              24 hours a day
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7980541597695!2d13.411708115915275!3d52.51418307981239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c9e098c6d1%3A0x421b1f5741d50a0!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1641229612815!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
