import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  useMediaQuery,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classes from "../siginHome/signHome.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//./signHome.module.css
function VerifyOTP() {
  const [loading, setLoading] = useState(false);
  const [otherError, setOtherError] = useState("");
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1000px)");
  const userEmail = localStorage.getItem("userEmail");
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("otp is required")
      .min(5, "otp must be at least 5 characters"),
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
    console.log(JSON.stringify(data, null, 2));
    setLoading(false);
    ///////////////////////////////////////////////////////////

    //   {
    //     "role":"candidate", "otp":"76936", "email":"satreakas4919@gmail.com"
    // }

    const payload = {
      role: "agent",
      otp: data.otp,
      email: userEmail,
    };

    axios({
      method: "post",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/forgotPwdVerifyOtp",
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response); //status: "success"
        if (response.data.status == "success") {
          setLoading(false);
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem(
            "signedUserUser",
            JSON.stringify(response.data.user)
          );
          navigate("/createPassword");
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

  return (
    <div className={classes.outerBox}>
      <div className={classes.leftBox}>
        <div className={classes.taglineBox}>
          <div className={classes.logo}>STARTLAZAA</div>
          <h2>Finding The Path To Abroad</h2>
        </div>
      </div>
      <div className={classes.rightBox}>
        <div className={classes.signInBox}>
          <h1>Verify OTP</h1>
          <Typography sx={{ marginLeft: "20px", fontSize: "medium" }}>
            Enter OTP sent on {userEmail}
          </Typography>
          <div>
            <TextField
              size="small"
              label="Enter OTP"
              id="otp"
              name="otp"
              variant="filled"
              sx={{ margin: "20px", width: `${matches ? "400px" : "320px"}` }}
              {...register("otp")}
              error={errors.otp ? true : false}
            />
            <Typography
              sx={{ marginLeft: "20px" }}
              variant="inherit"
              color="textSecondary"
            >
              {errors.otp?.message}
            </Typography>
          </div>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: "200px" }}
            >
              Verify OTP
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
export default VerifyOTP;
