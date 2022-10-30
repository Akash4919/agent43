import classes from "./heading.module.css";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { Button, Typography } from "@mui/material";
import bacImage from "./../Images/Imagefirst1.png";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
const Heading = function () {
  const matches = useMediaQuery("(min-width:700px)");

  const onSearch = (data) => {
    alert(`${data.jobTitle},${data.location}`);
    // console.log(data);
  };
  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string()
      .required("Kindly Search for Both Field")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),
    location: Yup.string()
      .required("Kindly Search for Both Field")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div className={classes.outerBox}>
      <div className={classes.leftBox}>
        <div className={classes.siteTitle}>
          Finding the path
          <br /> to <span className={classes.TextColor}>Abroad</span>
        </div>
        <div style={{ marginTop: "12px", marginBottom: "40px" }}>
          Find you new job today! New Job Posting EveryDay Just For You, Browse
          the job you want And apply wherevre you want
        </div>
        {/* <div className={classes.keywordHead}>Trending Job Keywords :</div>
        <div className={classes.keyword}>
          <div>React</div>
          <div style={{ marginLeft: "20px" }}>nodeJS</div>
          <div style={{ marginLeft: "20px" }}> React Native</div>
        </div> */}
        <div className={classes.searchBox}>
          <div className={classes.titleBox}>
            <SearchIcon fontSize={matches ? "large" : "medium"} />
            <input
              style={{
                width: "75%",
                border: "none",
                outline: "none",
                height: "35px",
              }}
              type="text"
              error={errors.jobTitle}
              {...register("jobTitle")}
              placeholder="Job Title"
              name="jobTitle"
            />
          </div>
          <div className={classes.titleBox}>
            <PlaceIcon fontSize={matches ? "large" : "medium"} />
            <input
              style={{
                width: "75%",
                border: "none",
                outline: "none",

                height: "35px",
              }}
              {...register("location")}
              error={errors.location}
              name="location"
              type="text"
              placeholder="Job Location"
            />
          </div>
          <div className={classes.buttonBox}>
            <Button
              variant="contained"
              sx={{
                height: "35px",
                width: { sm: "50px", md: "80px" },
                borderRedius: "10px",
                backgroundImage: "linear-gradient(#26C6DA, #337AB7)",
              }}
              onClick={handleSubmit(onSearch)}
              // component={RouterLink}
              // to={`/LandingSearch/${jobTitle} - ${location}`}
            >
              {matches ? "search" : "go"}
            </Button>
          </div>
        </div>
        <Typography
          sx={{ marginLeft: "20px", color: "red" }}
          variant="inherit"
          color="textSecondary"
        >
          {errors.location?.message || errors.jobTitle?.message}
        </Typography>
      </div>
      {matches && (
        <div className={classes.rightBox}>
          <img
            src={bacImage}
            style={{
              width: "90%",
              // height: "auto",
              // ml: "-30px",
              // marginBottom: "10px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
