import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CandidateworkExpModel from "./CandidateworkExpModel";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import classes from "./AddProfile.module.css";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useOutletContext } from "react-router-dom";
import { getDateFormat } from "./Datafunction";

const CandidateworkExp = () => {
  const [expArray, setExpArray] = useState([]);
  const [loding, setLoading] = useState(false);
  const [up, setUp] = useState("");
  const [value, setValue] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");
  const [handleNext] = useOutletContext();

  const candidateID = localStorage.getItem("candidateId");
  const token = localStorage.getItem("jwt");

  const addExp = (data) => {
    const formData = data;
    console.log(formData);
    const eleId = expArray.length + 1;
    const dataObj = {
      ...formData,
      id: eleId,
    };
    console.log(dataObj);
    setExpArray((prevState) => [...prevState, dataObj]);
    setUp(Math.random());
  };

  const editExp = (data) => {
    console.log(data);
    const index = expArray.findIndex((element) => {
      if (element.id === data.id) {
        return true;
      }
      return false;
    });

    const newArray = expArray;
    newArray.splice(index, 1);

    setExpArray([...newArray, data]);
    setUp(Math.random());
  };

  const deleteExp = (data) => {
    const index = expArray.findIndex((element) => {
      if (element.id === data) {
        return true;
      }
      return false;
    });

    setExpArray((prevState) => {
      const newArray = prevState;
      newArray.splice(index, 1);
      return newArray;
    });

    setUp(Math.random());
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log(expArray);
    const profiledata = {
      candidateId: candidateID,
      dataArrayString: expArray,
    };
    postexp(profiledata);
  };
  const postexp = async (profiledata) => {
    try {
      const res = await axios.post(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateWX/addWorkExp",
        profiledata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setValue(true);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateWX/getAllWorkExp?candidateId=632d3e3e5a548a029fffeabe",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       candidateId: candidateID,
  //     },
  //   })
  //     .then((response) => {
  //       setExpArray(response.data.data.doc);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: "lightgrey", padding: "40px" }}>
          <Card>
            <CardContent>
              <Box
                sx={matches ? { padding: "0px 10px" } : { padding: "0px 40px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "10px 20px",
                  }}
                >
                  <h2>Work Experience</h2>
                  <CandidateworkExpModel
                    buttonName="Add Experience"
                    handleAdd={addExp}
                  />
                </Box>

                {expArray.map((data) => (
                  <div>
                    <Box key={data.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: " space-between",
                        }}
                      >
                        <Box sx={{ padding: "20px 20px" }}>
                          <Typography>
                            Designation :
                            <span style={{ fontWeight: 600 }}>
                              {data.designation}
                            </span>
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            <Button>
                              <CandidateworkExpModel
                                buttonName={<EditIcon />}
                                docData={data}
                                handleEdit={editExp}
                              />
                            </Button>
                          </Box>
                          <Box>
                            <DeleteOutlinedIcon
                              onClick={() => deleteExp(data.id)}
                              sx={{
                                color: "#f11900",
                                paddingTop: "20px",
                                paddingRight: "10px",
                              }}
                            />
                          </Box>
                        </Box>
                      </div>
                      <Box sx={{ padding: "10px 20px" }}>
                        <Typography>
                          Company Name :
                          <span style={{ fontWeight: 600 }}>
                            {data.companyName}
                          </span>
                        </Typography>
                      </Box>
                      <Box sx={{ padding: "10px 20px", display: "flex" }}>
                        <Typography>
                          Start Date :
                          <span style={{ fontWeight: 600 }}>
                            {getDateFormat(data.startDate)}
                          </span>
                        </Typography>
                        <Typography sx={{ paddingLeft: "30px" }}>
                          End Date :
                          <span style={{ fontWeight: 600 }}>
                            {getDateFormat(data.endDate)}
                          </span>
                        </Typography>
                      </Box>
                      <Box sx={{ padding: "10px 20px" }}>
                        <Typography>
                          Work Location:
                          <span style={{ fontWeight: 600 }}>
                            {data.workLocation}
                          </span>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          padding: "10px 20px",
                          borderBottom: "1px solid lightgray",
                        }}
                      >
                        <Typography>
                          Role & Responsibility :
                          <span style={{ fontWeight: 600 }}>
                            {data.responsibility}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                ))}
                {/* <Box
                  sx={{
                    padding: "15px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loding ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="outlined"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      save
                    </Button>
                  )}
                </Box> */}
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
                        to="/home/myApplicant/newApplicant/eductiondetails"
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
                  <Button variant="outlined" className={classes.saveButton}>
                    <Link
                      to="/home/myApplicant/newApplicant/documentupload"
                      style={{
                        textDecoration: " auto",
                        padding: "1px 15px",
                      }}
                      className={classes.saveButton}
                      // onClick={props.Skip}
                    >
                      Skip
                    </Link>
                  </Button>
                  {value ? (
                    <Box sx={{ padding: "0px 30px" }}>
                      <Button
                        variant="contained"
                        className={classes.nextButton}
                      >
                        <Link
                          to="/home/myApplicant/newApplicant/documentupload"
                          style={{
                            color: "white",
                            textDecoration: " auto",
                            padding: "1px 15px",
                          }}
                          onClick={handleNext}
                        >
                          Next
                        </Link>
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ padding: "0px 10px" }}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.nextButton}
                        sx={{ padding: "7px 30px" }}
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
      </Grid>
    </Grid>
  );
};

export default CandidateworkExp;
