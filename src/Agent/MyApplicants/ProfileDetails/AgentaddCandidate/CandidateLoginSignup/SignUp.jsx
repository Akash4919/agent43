import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Paper,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import EmailOtp from "./EmailOtp";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "../AddProfile.module.css";
const SignUp = (props) => {
  const [sendData, setSendData] = useState(false);
  const [emailId, setEmailId] = useState();
  const [loding, SetLoding] = useState();
  const matches = useMediaQuery("(max-width:600px)");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("FirstName  is required")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),
    lastName: Yup.string()
      .required("LastName  is required")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),
    emailId: Yup.string().required("Email is required"),
    mobileNumber: Yup.string()
      .required("Mobile Number isrequired")
      .min(10, "number must be 10 characters")
      .max(10, "number must be 10 characters")
      .matches(/^[0-9]+$/, "*Only Number is Accepted"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const token = localStorage.getItem("jwt");

  const onSubmit = (data) => {
    console.log(data);
    SetLoding(true);
    axios({
      method: "post",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/candidates/createCandidate",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setEmailId(data.emailId);
        console.log(data.emailId);
        console.log(response); //status: "success"
        SetLoding(false);
        setSendData(true);
      })
      .catch((error) => {
        SetLoding(false);
        alert("Plies Check fields ");
        console.log(error);
      });
  };

  return (
    <div>
      <Box
        sx={
          matches
            ? { padding: "10px", backgroundColor: "lightgrey" }
            : { padding: " 70px", backgroundColor: "lightgrey" }
        }
      >
        <Grid container>
          <Grid item sx={12} sm={sendData ? 6 : 12}>
            <Box
              sx={
                sendData || matches
                  ? {
                      padding: "0px 30px",
                    }
                  : { padding: "0% 25%" }
              }
            >
              <Card>
                <CardContent>
                  <Box
                    sx={matches ? { padding: "0px" } : { padding: "0px 20px" }}
                  >
                    <Box sx={{ padding: "10px 20px" }}>
                      <h2>Add Candidate</h2>
                      <Typography>First Name</Typography>

                      <TextField
                        required
                        name="firstName"
                        id="firstName"
                        size="small"
                        {...register("firstName")}
                        error={errors.firstName ? true : false}
                        sx={{ width: "100%" }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.firstName?.message}
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "10px 20px" }}>
                      <Typography>Last Name</Typography>
                      <TextField
                        required
                        size="small"
                        name="lastName"
                        id="lastName"
                        {...register("lastName")}
                        error={errors.lastName ? true : false}
                        sx={{ width: "100%" }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.lastName?.message}
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "10px 20px" }}>
                      <Typography>Email id</Typography>
                      <TextField
                        required
                        size="small"
                        name="emailId"
                        id="emailId"
                        {...register("emailId")}
                        error={errors.emailId ? true : false}
                        sx={{ width: "100%" }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.emailId?.message}
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "10px 20px" }}>
                      <Typography>Mobile Number</Typography>
                      <TextField
                        required
                        id="mobileNumber"
                        // type="number"
                        size="small"
                        name="mobileNumber"
                        {...register("mobileNumber")}
                        error={errors.mobileNumber ? true : false}
                        sx={{ width: "100%" }}
                      />
                      <Typography variant="inherit" color="red">
                        {errors.mobileNumber?.message}
                      </Typography>
                      {/* <ReactPhoneInput
                        defaultCountry="in"
                        containerStyle={{
                          marginTop: "5px",
                          width: "100%",
                        }}
                        // id="mobileNumber"
                        // name="mobileNumber"
                        // {...register("mobileNumber")}
                        // error={errors.mobileNumber ? true : false}
                        // sx={{ width: "100%" }}
                        searchClass="search-class"
                        searchStyle={{
                          margin: "0",
                          width: "100%",
                          height: "30px",
                        }}
                        enableSearchField
                        disableSearchIcon
                      />
                      <Typography variant="inherit" color="red">
                        {errors.mobileNumber?.message}
                      </Typography> */}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {loding ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={handleSubmit(onSubmit)}
                          type="submit"
                          className={classes.saveButton}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          {sendData && (
            <Grid item xs={12} sx={12} sm={6}>
              <EmailOtp data={emailId} />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default SignUp;
