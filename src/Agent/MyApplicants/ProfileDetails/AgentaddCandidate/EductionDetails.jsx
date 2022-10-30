import * as React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Modal,
  TextField,
  Typography,
  Card,
  CardContent,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import classes from "./AddProfile.module.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function EductionDetails() {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");
  const [handleNext] = useOutletContext();
  const validationSchema = Yup.object().shape({
    degreeName: Yup.string().required("*Degreename is required"),
    specialization: Yup.string().required("*Spacialization is required"),
    universityName: Yup.string().required("*Univercity is required"),
    collegeName: Yup.string().required("*CollageName is required"),
    startDate: Yup.string().required("*start Date is required"),
    endDate: Yup.string().required("*End is required"),
    courseType: Yup.string().required("*CourseType is required"),
  });
  const candidateID = localStorage.getItem("candidateId");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const token = localStorage.getItem("jwt");
  const onSubmit = (data) => {
    sendCandidateData(data);
  };

  const sendCandidateData = async (data) => {
    const profiledata = { candidateId: candidateID, dataArrayString: [data] };

    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateEQ/addEducationalQn`,
        profiledata,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setValue(true);
    } catch (err) {
      console.log(err);
      setValue(false);
      alert("Something went Wrong");
    }
  };
  return (
    <div>
      <Box>
        <Box sx={{ backgroundColor: "lightgrey", padding: "40px" }}>
          <Card>
            <CardContent>
              <Box
                sx={matches ? { padding: "0px 10px" } : { padding: "0px 40px" }}
              >
                <Box>
                  <h2 style={{ paddingLeft: "44px" }}>Education Details</h2>
                </Box>
                <Grid container>
                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <label
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      Degree Name
                    </label>
                    <TextField
                      required
                      id="degreeName"
                      name="degreeName"
                      margin="dense"
                      {...register("degreeName")}
                      error={errors.degreeName ? true : false}
                      size="small"
                      sx={
                        matches
                          ? {
                              width: "100%",
                              paddingLeft: "10px",
                              paddingBottom: "20px",
                            }
                          : {
                              width: "80%",
                              paddingLeft: "45px",
                              paddingBottom: "20px",
                            }
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="red"
                      sx={{ paddingLeft: "30px" }}
                    >
                      {errors.degreeName?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <label
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      Specialization
                    </label>
                    <TextField
                      required
                      id="specialization"
                      name="specialization"
                      size="small"
                      margin="dense"
                      {...register("specialization")}
                      error={errors.specialization ? true : false}
                      sx={
                        matches
                          ? {
                              width: "100%",
                              paddingLeft: "10px",
                              paddingBottom: "20px",
                            }
                          : {
                              width: "80%",
                              paddingLeft: "45px",
                              paddingBottom: "20px",
                            }
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="red"
                      sx={{ paddingLeft: "30px" }}
                    >
                      {errors.specialization?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <label
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      University Name
                    </label>
                    <TextField
                      required
                      id="universityName"
                      name="universityName"
                      size="small"
                      margin="dense"
                      {...register("universityName")}
                      error={errors.universityName ? true : false}
                      sx={
                        matches
                          ? {
                              width: "100%",
                              paddingLeft: "10px",
                              paddingBottom: "20px",
                            }
                          : {
                              width: "80%",
                              paddingLeft: "45px",
                              paddingBottom: "20px",
                            }
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="red"
                      sx={{ paddingLeft: "30px" }}
                    >
                      {errors.universityName?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <label
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      College Name
                    </label>
                    <TextField
                      required
                      id="collegeName"
                      name="collegeName"
                      size="small"
                      margin="dense"
                      {...register("collegeName")}
                      error={errors.collegeName ? true : false}
                      sx={
                        matches
                          ? {
                              width: "100%",
                              paddingLeft: "10px",
                              paddingBottom: "20px",
                            }
                          : {
                              width: "80%",
                              paddingLeft: "45px",
                              paddingBottom: "20px",
                            }
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="red"
                      sx={{ paddingLeft: "30px" }}
                    >
                      {errors.collegeName?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <lable
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      Start Date :
                    </lable>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            disableFuture
                            sx={{ width: "19rem", marginTop: "50px" }}
                            inputFormat="dd/MM/yyyy"
                            value={startDate}
                            {...register("startDate")}
                            onChange={(e) => {
                              onChange(e);
                              setStartDate(e);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={
                                  matches
                                    ? {
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingTop: "10px",
                                        paddingBottom: "20px",
                                      }
                                    : {
                                        width: "80%",
                                        paddingLeft: "45px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                      }
                                }
                              />
                            )}
                            {...restField}
                          />
                        </LocalizationProvider>
                      )}
                    />
                    <FormHelperText
                      sx={{ color: "red", ml: "20px", paddingLeft: "20px" }}
                    >
                      {errors.startDate?.message}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} md={6}>
                    <lable
                      style={
                        matches
                          ? { padding: "3px 15px", fontWeight: 600 }
                          : { padding: "3px 45px", fontWeight: 600 }
                      }
                    >
                      End Date :
                    </lable>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            disableFuture
                            sx={{ width: "19rem" }}
                            inputFormat="dd/MM/yyyy"
                            value={endDate}
                            {...register("endDate")}
                            onChange={(e) => {
                              onChange(e);
                              setEndDate(e);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={
                                  matches
                                    ? {
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingTop: "10px",
                                        paddingBottom: "20px",
                                      }
                                    : {
                                        width: "80%",
                                        paddingLeft: "45px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                      }
                                }
                              />
                            )}
                            {...restField}
                          />
                        </LocalizationProvider>
                      )}
                    />
                    <FormHelperText
                      sx={{ color: "red", ml: "20px", paddingLeft: "20px" }}
                    >
                      {errors.endDate?.message}
                    </FormHelperText>
                  </Grid>

                  <Grid item lg={12} md={12}>
                    <FormControl>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{
                          paddingLeft: "45px",
                          color: "#323232",
                          fontWeight: 600,
                        }}
                      >
                        Course Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        id="courseType"
                        name="courseType"
                        sx={{ paddingLeft: "45px" }}
                      >
                        <FormControlLabel
                          value="Full Time"
                          control={<Radio />}
                          label="Full Time"
                          {...register("courseType")}
                        />
                        <FormControlLabel
                          value="Part Time"
                          control={<Radio />}
                          label="Part Time"
                          {...register("courseType")}
                        />
                        <FormControlLabel
                          value="Distance Learning"
                          control={<Radio />}
                          label="Distance Learning"
                          {...register("courseType")}
                        />
                      </RadioGroup>
                    </FormControl>
                    <Typography variant="inherit" color="red">
                      {errors.courseType?.message}
                    </Typography>
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0px",
                  }}
                >
                  <Box sx={{ padding: "0px 10px" }}>
                    <Button
                      variant="outlined"
                      sx={{ border: "1px solid #828282" }}
                    >
                      <Link
                        to="/home/myApplicant/newApplicant/personaldetails"
                        style={{
                          color: "#828282",
                          textDecoration: " auto",
                          padding: "2px 0px",
                        }}
                      >
                        Previous
                      </Link>
                    </Button>
                  </Box>
                  {value ? (
                    <Box>
                      <Button variant="outlined" className={classes.saveButton}>
                        <Link
                          to="/home/myApplicant/newApplicant/candidateworkexp"
                          style={{
                            // color: "#337AB7",
                            textDecoration: " auto",
                            padding: "2px 15px",
                          }}
                          onClick={handleNext}
                          className={classes.saveButton}
                        >
                          Next{" "}
                        </Link>
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ padding: "0px 10px" }}>
                      <Button
                        variant="outlined"
                        onClick={handleSubmit(onSubmit)}
                        className={classes.saveButton}
                        sx={{ padding: "6px 30px" }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </div>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
