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
import classes from "./signHome.module.css";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import axios from "axios";
const PORT = 4004;
function SignHome() {
  const [loading, setLoading] = useState(false);
  const [otherError, setOtherError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const matches = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
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
    ////////////////////////////////////////////////////

    //   { API DOCUMEWNT
    //     "emailId":"satreakas4919@gmail.com",
    //     "password" :"akash@1998",
    //     "role":"candidate"
    // }

    // { Local form doccument
    //   "email": "chetan.bhagat7299@gmail.com",
    //   "password": "chetaanbhagat"
    // }

    const payload = {
      emailId: data.email,
      password: data.password,
      role: "agent",
    };

    axios({
      method: "post",
      url: `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/login`,
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response); //status: "success"
        if (response.data.status == "success") {
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem(
            "signedUserUser",
            JSON.stringify(response.data.user)
          );
          setLoading(false);
          navigate("/home/findJob/descriptionComponent");
          dispatch(authActions.login());
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
    /////////////////////////////////////////////
  };

  const handleClickShowPassword = () => {
    setShowPass((state) => !state);
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
          <h1>Sign In</h1>
          <div>
            <TextField
              size="small"
              label="Email Id"
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
          <div className={classes.forgotPassword}>
            <Link to="/forgotPass" style={{ textDecoration: "none" }}>
              <span>Forgot Password ?</span>
            </Link>
          </div>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: "200px", border: "2px solid" }}
              className={classes.saveButton}
              component={Link}
              to="/signIn"
            >
              Login
            </Button>
          )}
          {otherError && (
            <Typography sx={{ color: "red" }}>{otherError}</Typography>
          )}
          <Button
            variant="outlined"
            // color="#d5d5d5"
            sx={{
              width: "200px",
              marginTop: "30px",
            }}
            component={Link}
            to="/signUp"
          >
            Create New Account
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SignHome;
