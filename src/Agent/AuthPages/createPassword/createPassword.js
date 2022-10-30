import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  useMediaQuery,
  Typography,
  CircularProgress,
  Box,
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
function CreatePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [otherError, setOtherError] = useState("");
  const matches = useMediaQuery("(min-width:1000px)");
  const token = localStorage.getItem("jwt");
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
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

  const onSubmit = (data) => {
    const PORT = 4004;
    setLoading(true);
    console.log(JSON.stringify(data, null, 2));
    const payload = { password: data.password };
    ///////////////////////////////////////////////////////////////
    axios({
      method: "patch",
      url: `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/resetPassword`,
      data: payload, // you are sending body instead
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response); //status: "success"
        if (response.data.status == "success") {
          localStorage.setItem("jwt", response.data.token);
          setLoading(false);
          navigate("/calender");
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
        <div className={classes.signInBox}>
          <h1>Create New Password</h1>

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
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: "200px" }}
              component={Link}
              to="/signIn"
            >
              Reset Password
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
export default CreatePassword;
