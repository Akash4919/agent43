import React from "react";
// import "../App.css";
import { CardActions, Avatar } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { Card, Box } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import classes from "./JobCard.module.css";
import { Link as RouterLink } from "react-router-dom";
const DescriptionCard = (props) => {
  const PORT = 4004;
  const token = localStorage.getItem("jwt");
  const matches = useMediaQuery("(min-width:700px)");
  const activeJob = props?.data?.jobData;
  let applided = props?.data?.tempJob?.includes(activeJob?._id) || false;
  let saved = props?.data?.tempSavedJob?.includes(activeJob?._id) || false;


  const stepMemo = ()=>{
    let memoObj = {path :"/home/findJob",key:"findJob",data:activeJob }
    let m2 = JSON.stringify(memoObj)
    localStorage.setItem("memoData", m2)
    let m3 = JSON.parse(m2)
    console.log(m3)
  }

  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Box sx={{ padding: "0px 15px" }}>
              <div>
                <div
                  style={
                    matches
                      ? { display: "flex" }
                      : { display: "flex", flexDirection: " column" }
                  }
                >
                  <div style={!matches ? { width: "100%" } : { width: "90%" }}>
                    {!matches && (
                      <ArrowBackIcon
                        sx={{ display: "inline-block", float: "left" }}
                        onClick={() => props.handleBack(false)}
                      />
                    )}
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://logosandtypes.com/wp-content/uploads/2020/11/google.svg"
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <Typography
                        sx={{ fontSize: 25, p: "0px 10px" }}
                        variant="h4"
                        component="div"
                      >
                        {activeJob?.jobDesignation}
                      </Typography>
                    </Box>
                    <Box sx={{ p: "10px 20px" }}>
                      Company Name :
                      <span style={{ fontWeight: 600 }}>
                        {activeJob?.companyName}
                      </span>
                    </Box>
                    <Box sx={{ p: "10px 20px" }}>
                      Salary :
                      <span style={{ fontWeight: 600 }}>
                        {`${activeJob?.salaryRange?.fromSalary}-${activeJob?.salaryRange?.toSalary}`}
                      </span>
                    </Box>
                    <Typography
                      sx={{ mb: 1.5, fontSize: 10 }}
                      color="text.secondary"
                    >
                      {/* {`${activeJob?.salaryRange?.fromSalary}-${activeJob?.salaryRange?.toSalary}`} */}
                    </Typography>
                    <CardActions>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to={"/signIn"}
                        size="small"
                        className={classes.saveButton}
                        onClick={stepMemo}
                      >
                        Login to Apply
                      </Button>
                    </CardActions>
                  </div>

                  <div
                    style={
                      !matches
                        ? {
                            width: "100%",
                            display: "flex",
                            paddingTop: "10px ",
                          }
                        : { width: "20%", paddingTop: "40px" }
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        p: "5px 30px",
                      }}
                    >
                      <Typography
                        sx={{ mb: 1.5, fontSize: 13 }}
                        color="text.secondary"
                      >
                        <LocationCityIcon
                          sx={{
                            mr: 0.5,
                            fontSize: 20,
                            verticalAlign: "sub",
                            color: "#26c6da",
                          }}
                        />{" "}
                        Onsite
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        p: "5px 30px",
                      }}
                    >
                      <Typography
                        sx={{ mb: 1.5, fontSize: 13 }}
                        color="text.secondary"
                      >
                        <PlaceIcon
                          sx={{
                            mr: 0.5,
                            fontSize: 20,
                            verticalAlign: "sub",
                            color: "#26c6da",
                          }}
                        />{" "}
                        {activeJob?.jobLocation?.city}
                      </Typography>
                    </Box>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        p: "5px 30px",
                      }}
                    >
                      <Typography
                        sx={{ mb: 1.5, fontSize: 13 }}
                        color="text.secondary"
                      >
                        <BusinessCenterIcon
                          sx={{
                            mr: 0.5,
                            fontSize: 20,
                            verticalAlign: "sub",
                            color: "#26c6da",
                          }}
                        />{" "}
                        {activeJob?.jobType}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <hr />
          <CardContent>
            <Box sx={{ padding: "0px 15px" }}>
              {" "}
              <Typography
                sx={{ mb: 1, fontSize: 20 }}
                variant="h6"
                component="div"
              >
                Roles and Responsiblities:
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activeJob?.responsibility}
              </Typography>
              <Typography
                sx={{ mb: 1, mt: 10, fontSize: 20 }}
                variant="h6"
                component="div"
              >
                Key skills:
              </Typography>
              <Stack
                sx={{ mt: 1, display: "inline-block" }}
                direction="row"
                spacing={2}
              >
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
                <Chip
                  label="Chip Outlined"
                  variant="outlined"
                  sx={{ m: "10px 0px" }}
                />
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default DescriptionCard;
