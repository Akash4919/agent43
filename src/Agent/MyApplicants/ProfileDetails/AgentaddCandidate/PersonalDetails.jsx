import {
  CardContent,
  Card,
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Country, State, City } from "country-state-city";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { useMediaQuery, Autocomplete, Chip } from "@mui/material";
import PersonalDetailsChildren from "./PersonalDetailsChildren";
import classes from "./AddProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
const PersonalDetails = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [childArray, setChildArray] = useState([]);
  const [resumeState, setResumeState] = useState(false);
  const [up, setUp] = useState("");
  const [value, setValue] = useState(false);
  const candidateID = localStorage.getItem("candidateId");
  const [handleNext] = useOutletContext();
  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);
  const initialChildDataLoad = (data) => {
    setChildArray(data);
  };
  const handleAdd = (dataObj) => {
    setChildArray((prevState) => {
      const id = prevState.length + 1;
      const newObj = {
        ...dataObj,
        id: id,
      };
      return [...prevState, newObj];
    });
  };
  const handleDelete = (dataObj) => {
    const index = childArray.findIndex((element) => {
      if (element.id === dataObj.id) {
        return true;
      }
      return false;
    });

    setChildArray((prevState) => {
      const newArray = prevState.splice(index, 1);
      return prevState;
    });

    setUp(Math.random());
  };

  const handleState = (e) => {
    var getStateisoCode = e.target.value.isoCode;
    setState(State.getStatesOfCountry(getStateisoCode));
    localStorage.setItem("getStateisoCode", getStateisoCode);
  };
  const handleCity = (e) => {
    let getStateisoCode = localStorage.getItem("getStateisoCode");
    let isoCityCode = e.target.value.isoCode;
    setCity(City.getCitiesOfState(getStateisoCode, isoCityCode));
  };
  const matches = useMediaQuery("(max-width:600px)");
  const validationSchema = Yup.object().shape({
    maritalStatus: Yup.string().required("Field is required"),
    gender: Yup.string().required("Field is required"),
    country: Yup.object().required("Field is required"),
    state: Yup.object().required("Field is required"),
    city: Yup.object().required("Field is required"),
    dateOfBirth: Yup.string().required("Date is Required"),
    permanentAddress: Yup.string().required("Field is Required"),
    currentAddress: Yup.string().required("Field is Required"),
    disability: Yup.string().required("Field is Required"),
    nationality: Yup.string().required("Field is Required"),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const token = localStorage.getItem("jwt");
  const onSubmit = (data) => {
    console.log(data);
    let dataObject = {
      dateOfBirth: data.dateOfBirth,
      maritalStatus: data.maritalStatus,
      gender: data.gender,
      disability: data.disability,
      children: [...childArray],
      country: data.country.name,
      state: data.state.name,
      city: data.city.name,
      preferredJobs: data.prefferedJobs,
      preferredLocations: data.prefferedLocation,
      nationality: data.nationality,
      currentAddress: data.currentAddress,
      permanentAddress: data.permanentAddress,
    };
    sendCandidateData(dataObject);
  };

  const sendCandidateData = async (dataObject) => {
    const profiledata = { ...dataObject, candidateId: candidateID };
    console.log(profiledata);
    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidatePI/addPersonalInfo`,

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
  ///////

  const resumeUpload = (e) => {
    const uploadedResume = e.target.files[0];
    const formData = new FormData();
    formData.append("documentName", "resume");
    formData.append("documentType", "resume");
    formData.append("candidateId", candidateID);
    formData.append("candidate-document", uploadedResume);
    sendResume(formData);
  };
  const sendResume = async (formData) => {
    const profiledata = formData;
    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/uploadCandidateDocument`,
        profiledata,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResumeState(true);
      alert("Resume Uploaded :-)");
    } catch (err) {
      alert("Resume Not Uploaded (*Try to upload pdf Only)");
      console.log(err);
    }
  };
  const onDownload = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getCandidateDocument/resume?candidateId=${candidateID}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let url = response.data.data.doc.document.documentLink;
      const download = (url) => {
        const link = document.createElement("a");

        link.setAttribute("download", "fileName.pdf");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", url);
        link.click();
      };
      download(url);
    } catch (err) {
      console.log(err);
    }
  };
  const topKeySkills = [
    { skill: "Plumber" },
    { skill: "Electrician" },
    { skill: "Painter" },
    { skill: "Helper" },
    { skill: "Cook" },
    { skill: "Carpenter" },
    { skill: "Welder" },
  ];
  const topKeyLocation = [
    { location: "Doha" },
    { location: "Zurich" },
    { location: "Chicago" },
    { location: "California" },
    { location: "Brampton" },
    { location: "Morocco" },
  ];
  return (
    <div>
      <Box
        sx={
          matches
            ? { padding: "10px" }
            : { backgroundColor: "lightgrey", padding: "20px  60px" }
        }
      >
        <Card>
          <CardContent>
            <Box sx={matches ? { padding: " 10px" } : { padding: "0px 80px" }}>
              <Box sx={{ padding: "0px 20px" }}>
                <h2>Personal Details</h2>
              </Box>
              <Grid container>
                <Grid item md={3} sm={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    {" "}
                    <Typography>Date Of Birth</Typography>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            disableFuture
                            inputFormat="dd/MM/yyyy"
                            onChange={(event) => {
                              onChange(event);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                sx={{ width: "-webkit-fill-available" }}
                              />
                            )}
                            {...restField}
                          />
                        </LocalizationProvider>
                      )}
                    />
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.dateOfBirth?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Marital Status</Typography>
                    <Select
                      size="small"
                      id="maritalStatus"
                      name="maritalStatus"
                      {...register("maritalStatus")}
                      sx={{ width: "100%" }}
                      error={errors.maritalStatus ? true : false}
                    >
                      <MenuItem value="married">Married</MenuItem>
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="divorsed">Divorced</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.maritalStatus?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Gender</Typography>
                    <Select
                      size="small"
                      id="gender"
                      name="gender"
                      {...register("gender")}
                      sx={{ width: "100%" }}
                      error={errors.gender ? true : false}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.gender?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Disability</Typography>
                    <Select
                      size="small"
                      name="disability"
                      {...register("disability")}
                      sx={{ width: "100%" }}
                      error={errors.disability ? true : false}
                    >
                      <MenuItem value="no">No</MenuItem>
                      <MenuItem value="yes">Yes</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.disability?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    {" "}
                    <Typography>Current Address</Typography>
                    <TextField
                      size="large"
                      id="currentAddress"
                      name="currentAddress"
                      helperText={errors.currentAddress?.message}
                      variant="outlined"
                      sx={{
                        width: "-webkit-fill-available",
                      }}
                      {...register("currentAddress")}
                      error={errors.currentAddress ? true : false}
                    />
                  </Box>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Permanent Address</Typography>
                    <TextField
                      size="large"
                      id="permanentAddress"
                      name="permanentAddress"
                      helperText={errors.permanentAddress?.message}
                      variant="outlined"
                      sx={{
                        width: "-webkit-fill-available",
                      }}
                      {...register("permanentAddress")}
                      error={errors.permanentAddress ? true : false}
                    />
                  </Box>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    {" "}
                    <Typography>Country</Typography>
                    <Select
                      size="small"
                      id="country"
                      name="country"
                      {...register("country")}
                      sx={{ width: "100%" }}
                      error={errors.country ? true : false}
                      onChange={(e) => {
                        handleState(e);
                      }}
                    >
                      {country.map((el, index) => {
                        return (
                          <MenuItem value={el} key={index}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.city ? "Field is required" : ""}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12} md={3}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>State</Typography>
                    <Select
                      size="small"
                      id="state"
                      name="state"
                      {...register("state")}
                      sx={{ width: "100%" }}
                      error={errors.state ? true : false}
                      onChange={(e) => {
                        handleCity(e);
                      }}
                    >
                      {state.map((el, index) => {
                        return (
                          <MenuItem value={el} key={index}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.city ? "Field is required" : ""}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12} md={3}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>City</Typography>
                    <Select
                      size="small"
                      id="city"
                      name="city"
                      {...register("city")}
                      sx={{ width: "100%" }}
                      error={errors.city ? true : false}
                    >
                      {city.map((el, index) => {
                        return (
                          <MenuItem value={el} key={index}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.city?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12} md={3}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Nationality</Typography>
                    <Select
                      size="small"
                      id="nationality"
                      name="nationality"
                      {...register("nationality")}
                      sx={{ width: "100%" }}
                      error={errors.nationality ? true : false}
                    >
                      {country.map((el, index) => {
                        return (
                          <MenuItem value={el.name} key={index}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText sx={{ color: "red", ml: "20px" }}>
                      {errors.nationality?.message}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Prefferd Job:</Typography>
                    <Controller
                      name="prefferedJobs"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
                        <Autocomplete
                          multiple
                          {...restField}
                          freeSolo
                          options={topKeySkills.map((option) => option.skill)}
                          // placeholder="Add Key Skills"
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          sx={{ width: "100%", paddingBottom: "10px" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="prefferedJobs"
                              variant="outlined"
                              placeholder="Preffered Jobs"
                            />
                          )}
                          onChange={(e, value) => onChange(value)}
                          // onInputChange={(_, data) => {
                          //   if (data) field.onChange(data);
                          // }}
                        />
                      )}
                    />
                    {/* <TextField
                      size="large"
                      id="currentAddress"
                      name="currentAddress"
                      helperText={errors.currentAddress?.message}
                      variant="outlined"
                      sx={{
                        width: "-webkit-fill-available",
                      }}
                      {...register("currentAddress")}
                      error={errors.currentAddress ? true : false}
                    /> */}
                  </Box>
                </Grid>
                <Grid item sm={12} md={6} xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Typography>Preffered Location:</Typography>
                    <Controller
                      name="prefferedLocation"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
                        <Autocomplete
                          multiple
                          {...restField}
                          freeSolo
                          options={topKeyLocation.map(
                            (option) => option.location
                          )}
                          // placeholder="Add Key Skills"
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          sx={{ width: "100%", paddingBottom: "10px" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="prefferedLocation"
                              variant="outlined"
                              placeholder="Preffered Location"
                            />
                          )}
                          onChange={(e, value) => onChange(value)}
                          // onInputChange={(_, data) => {
                          //   if (data) field.onChange(data);
                          // }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ padding: "10px 20px" }}>
                    <Box
                      sx={{
                        borderTop: "1px solid lightgrey",
                        borderBottom: "1px solid lightgrey",
                        padding: "10px 0px",
                        marginTop: "10px",
                      }}
                    >
                      <PersonalDetailsChildren
                        initialChildDataLoad={initialChildDataLoad}
                        handleAdd={handleAdd}
                        childrenArray={childArray}
                        handleDelete={handleDelete}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  padding: "10px 20px",
                }}
              >
                <Box
                // sx={{
                //   display: "flex",
                //   flexWrap: "flex",
                //   justifyContent: "space-between",
                //   padding: "20px",
                //   border: "1px solid lightgrey",
                // }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={10}>
                      <Typography
                        sx={{
                          fontSize: "19px",
                          paddingTop: "10px",
                        }}
                      >
                        Resume
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                      <Box>
                        <Typography sx={{ marginBottom: "10px" }}>
                          Payal Patil Resume.docs
                        </Typography>
                        <Typography>
                          "(Last updated on 15 August 2021)"
                        </Typography>
                      </Box>
                    </Grid> */}
                    <Grid item xs={12} sm={2}>
                      <Box>
                        {!resumeState ? (
                          <Button component="label">
                            <input
                              hidden
                              type="file"
                              accept=".pdf"
                              onChange={resumeUpload}
                            />
                            Update New Resume
                          </Button>
                        ) : (
                          <Button
                            sx={{ marginRight: "10px" }}
                            onClick={onDownload}
                          >
                            View Resume
                          </Button>
                        )}

                        <Typography>"(Upload only .doc or pdf)"</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 15px",
              }}
            >
              {value ? (
                <Box>
                  <Button variant="outlined" className={classes.saveButton}>
                    <Link
                      to="/home/myApplicant/newApplicant/eductiondetails"
                      style={{
                        textDecoration: " auto",
                        padding: "2px 15px",
                      }}
                      onClick={handleNext}
                      className={classes.saveButton}
                    >
                      Next
                    </Link>
                  </Button>
                </Box>
              ) : (
                <Box sx={{ padding: "0px 10px" }}>
                  <Button
                    variant="outlined"
                    onClick={handleSubmit(onSubmit)}
                    className={classes.saveButton}
                    sx={{ padding: "5px 30px" }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default PersonalDetails;
