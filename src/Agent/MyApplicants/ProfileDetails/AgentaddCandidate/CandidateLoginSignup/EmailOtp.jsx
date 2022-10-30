import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "../AddProfile.module.css";
const EmailOtp = (props) => {
  const [loding, setLoding] = useState("");
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("otp is required"),
    // .min(6, "OTP must be at least 6 characters")
    // .max(6, "OTP must be aat least 6 characters"),
  });
  const { data } = props;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const token = localStorage.getItem("jwt");

  const onSubmit = async (emailotp) => {
    console.log(emailotp);
    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/forgotPwdVerifyOtp`,
        {
          role: "candidate",
          email: data,
          otp: emailotp.otp,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("candidateId", response.data.data.doc._id);
      if (response.data.status == "success") {
        navigate("/home/myApplicant/newApplicant/personaldetails");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <Box sx={{ padding: "0px 30px", paddingTop: "20%" }}>
        <Card>
          <CardContent>
            <Box sx={matches ? { padding: "0px" } : { padding: "0px 20px" }}>
              <Box sx={{ padding: "10px 20px" }}>
                <Typography>Email OTP</Typography>
                <TextField
                  required
                  id="otp"
                  size="small"
                  name="otp"
                  {...register("otp")}
                  error={errors.otp ? true : false}
                  sx={{ width: "100%" }}
                />
                <Typography variant="inherit" color="red">
                  {errors.otp?.message}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  onClick={handleSubmit(onSubmit)}
                  className={classes.saveButton}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default EmailOtp;
