import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  useMediaQuery,
  Typography,
  Autocomplete,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classes from "../siginHome/signHome.module.css";
import { countries } from "./countryData";

function SignUp() {
  const PORT = 4004;
  const navigate = useNavigate();
  const [otherError, setOtherError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const matches = useMediaQuery("(min-width:1000px)");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("name is required")
      .max(40, "Name Must at least 40 character")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),

    lastName: Yup.string()
      .required("name is required")
      .max(40, "Name Must at least 40 character")
      .matches(
        /^[a-zA-Z]+$/,
        "* This field cannot contain white space, special character and Number"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    mobile: Yup.string()
      .required("mobile required")
      .matches(/^[0-9]+$/, "must be only digits")
      .min(10, "number must be 10 characters")
      .max(10, "number must be 10 characters"),
    countryCode: Yup.string().required("mobile.required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    const element = countries.filter((ele) => ele.label === data.countryCode);
    const countryCode = element[0].phone;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const middleName = data.middleName;
    const mobileNumber = `+${countryCode}${data.mobile}`;

    const payload = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: data.password,
      role: "agent",
      emailId: data.email,
      mobileNumber: mobileNumber,
    };

    axios({
      method: "post",
      url: `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/signup`,
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response); //status: "success"
        if (response.data.status == "success") {
          localStorage.setItem("userEmail", data.email);
          setLoading(false);
          navigate("/verifyEmail");
        } else {
          console.log(`response=${response}`);
          setOtherError(
            response.data.message
              ? response.data.message
              : "something went wrong!"
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setOtherError(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "something went wrong!"
        );

        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPass((state) => !state);
  };

  const handleClickShowConPassword = () => {
    setShowConPass((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.outerBox}>
      <div className={classes.leftBox}>
        <div className={classes.taglineBox}>
          <div className={classes.logo}>STARTLAZAA</div>
          <h2>Finding The Path To Abroad</h2>
        </div>
      </div>
      <div className={classes.rightBox}>
        <div className={classes.signInBox} style={{ height: "700px" }}>
          <h3>Sign Up Form</h3>
          {/* <div>
            <TextField
              size="small"
              label="Full Name"
              id="fullName"
              name="name"
              variant="filled"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("fullName")}
              error={errors.fullName ? true : false}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.fullName?.message}
            </Typography>
          </div> */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <TextField
                size="small"
                label="First Name"
                id="firstName"
                name="firstName"
                variant="filled"
                sx={{ margin: "10px", width: `${matches ? "190px" : "150px"}` }}
                {...register("firstName")}
                error={errors.firstName ? true : false}
              />
              <Typography
                sx={{ marginLeft: "20px" }}
                variant="inherit"
                color="textSecondary"
              >
                {errors.firstName?.message}
              </Typography>
            </div>
            <div>
              <TextField
                size="small"
                label="Middle Name"
                id="middleName"
                name="middleName"
                variant="filled"
                sx={{ margin: "10px", width: `${matches ? "190px" : "150px"}` }}
                {...register("middleName")}
                error={errors.middleName ? true : false}
              />
              <Typography
                sx={{ marginLeft: "20px" }}
                variant="inherit"
                color="textSecondary"
              >
                {errors.middleName?.message}
              </Typography>
            </div>
          </div>
          <div>
            <TextField
              size="small"
              label="Last Name"
              id="lastName"
              name="lastName"
              variant="filled"
              sx={{ margin: "10px", width: `${matches ? "400px" : "320px"}` }}
              {...register("lastName")}
              error={errors.lastName ? true : false}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.lastName?.message}
            </Typography>
          </div>
          <div>
            <TextField
              size="small"
              label="Email"
              id="email"
              name="email"
              variant="filled"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.email?.message}
            </Typography>
          </div>
          <div>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("countryCode")}
                  variant="filled"
                  label="Choose a country"
                  sx={{
                    margin: "20px",
                    width: `${matches ? "400px" : "320px"}`,
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <TextField
              size="small"
              label="Mobile number"
              id="mobile"
              name="mobile"
              variant="filled"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("mobile")}
              error={errors.mobile ? true : false}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.mobile?.message}
            </Typography>
          </div>
          <div>
            <TextField
              size="small"
              label="Password"
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              variant="filled"
              margin="5px"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("password")}
              error={errors.password ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.password?.message}
            </Typography>
          </div>
          <div>
            <TextField
              size="small"
              label="Confirm Password"
              id="confPassword"
              name="confPassword"
              type={showConPass ? "text" : "password"}
              variant="filled"
              margin="5px"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("confPassword")}
              error={errors.confPassword ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.confPassword?.message}
            </Typography>
          </div>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className={classes.saveButton}
              onClick={handleSubmit(onSubmit)}
              sx={{ width: "200px" }}
            >
              Sigin Up
            </Button>
          )}
          {otherError && (
            <Typography sx={{ color: "red" }}>{otherError}</Typography>
          )}
        </div>
      </div>
    </div>
  );
}
export default SignUp;
