import {
  Container,
  useMediaQuery,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import classes from "./style.module.css";
// import Electrician from "./electrician.png";
import Electrician from "../Images/Imagesecond.png";
import ThirdPhoto from "../Images/Image.png";
import { Link as RouterLink } from "react-router-dom";
function MiddleThree() {
  const matches = useMediaQuery("(min-width:700px)");

  return (
    <>
      <Grid container sx={{ padding: "75px", backgroundColor: "white" }}>
        {matches && (
          <Grid
            item
            lg={5}
            sx={{
              mt: "-30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                ml: "30px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src={Electrician}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </Box>
          </Grid>
        )}

        <Grid item lg={7} sm={12}>
          <Box
            sx={{
              display: "flex",
              textAlign: "left",
              flexDirection: "column",
              padding: "0px 20px",
            }}
          >
            <Box sx={{ margin: "30px 0" }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "royalblue",
                }}
              >
                Create Profile
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3">Built Your Personal</Typography>
              <Typography variant="h3" gutterBottom>
                {" "}
                Account Profile
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Create an account for the job information you want, get daily
                notifications and you can easily {"\n"}apply directly to the
                company you want and create an account now for free
              </Typography>
            </Box>
            <Box>
              <Button
                className={classes.saveButton}
                variant="outlined"
                component={RouterLink}
                to={"/signUp"}
                sx={{
                  width: "180px",
                  height: "50px",
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "royalblue", margin: "30px 0" }}
              >
                How it Works
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3">Easy Step to Find and</Typography>
              <Typography variant="h3" gutterBottom>
                Apply Your Dream Job
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                We will help you to find your dream job easily, Let us {"\n"}
                help you manage everything you need
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                borderRadius: "15px",
                backgroundColor: "white",
                border: "1px solid black",
                marginTop: "20px",
              }}
            >
              <Box sx={{ marginBottom: "30px" }}>
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography
                    className={classes.infoText}
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Easy to Upload Your Cv and Portofolio
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    You can Upload Your resume,CV and Portofolio directly to Job
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.infoText}
                    sx={{ fontWeight: "bold" }}
                  >
                    You Will Be Notified With All Updates
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    Get Notification about new job vacancies,scheduled interview
                    and job application
                  </Typography>
                </Box>
              </Box>
              <Box sx={{}}>
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.infoText}
                    sx={{ fontWeight: "bold" }}
                  >
                    Apply for your dream job from the best company
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    We will provide recommendations for your choice companies
                    from all over the world
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {matches && (
          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                ml: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={ThirdPhoto}
                style={{
                  width: "100%",
                  height: "auto",
                  // pl: "20px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default MiddleThree;
