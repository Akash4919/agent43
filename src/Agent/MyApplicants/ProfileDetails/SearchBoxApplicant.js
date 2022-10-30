import {
  Paper,
  Box,
  Button,
  InputBase,
  Divider,
  useMediaQuery,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function SearchBox(props) {
  const token = localStorage.getItem("jwt");
  const [filter, setFilter] = useState("initial");
  const { setJobsList, setJobID, pageNo } = props;

  useEffect(() => {
    getFilteredcandidateList();
  }, [filter, pageNo]);
  const handleFilterList = (event) => {
    // getFilteredcandidateList();
    setFilter(event.target.value);
  };
  /////////////////////////////////
  const getFilteredcandidateList = async () => {
    try {
      const res = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/candidates/getAgentCandidates`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page: pageNo,
            pageSize: 8,
            filter: filter,
          },
        }
      );
      setJobsList(res?.data?.data?.docs);
      setJobID(res?.data?.data?.docs[0]?._id);
    } catch (err) {
      console.log(err);
    }
  };
  const matches = useMediaQuery("(min-width:900px)");
  const handleSearch = (data) => {
    console.log(data);
    const paramObj = {};
    if (data.candidateFirstName.length > 0)
      paramObj["firstName"] = data.candidateFirstName;
    if (data.candidateLastName.length > 0)
      paramObj["lastName"] = data.candidateLastName;
    if (data.location.length > 0) paramObj["location"] = data.location;
    getSearchData(paramObj);
  };
  const getSearchData = async (data) => {
    console.log();
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/candidates/filterCandidates`,
        {
          params: data,

          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setJobsList(response?.data?.data?.docs);
      setJobID(response?.data?.data?.docs[0]?._id);
    } catch (err) {
      console.log(err);
    }
  };
  const { control, register, handleSubmit } = useForm({});
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",

        m: "30px 0",
      }}
    >
      <form onSubmit={handleSubmit(handleSearch)}>
        <Box
          sx={
            matches
              ? { display: "flex" }
              : { display: "flex", flexDirection: "column" }
          }
        >
          <Box sx={matches ? { p: "0px 20px" } : { p: "10px 0px" }}>
            <FormControl
              sx={
                matches
                  ? { minWidth: 180, paddingRight: "40px" }
                  : { minWidth: "100%" }
              }
              size="small"
            >
              <InputLabel id="demo-select-small">All Candidate</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                // value={list}
                label="All Candidate"
                onChange={handleFilterList}
              >
                <MenuItem value={""}>All Candidate</MenuItem>
                <MenuItem value={"false"}>Pending Candidate</MenuItem>
                <MenuItem value={"true"}>Completed Candidate</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {matches ? (
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: " 500px",
                justifyContent: "space-evenly",
              }}
            >
              <SearchSharpIcon sx={{ marginLeft: "20px" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Firstname"
                name="candidateFirstName"
                {...register("candidateFirstName")}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <SearchSharpIcon sx={{ marginLeft: "20px" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Lastname"
                name="candidateLastName"
                {...register("candidateLastName")}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <LocationOnOutlinedIcon sx={{ marginLeft: "20px" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Location"
                name="location"
                {...register("location")}
              />
            </Paper>
          ) : (
            <>
              <Paper sx={!matches ? { width: "90vw", mb: "10px" } : {}}>
                <SearchSharpIcon sx={{ marginLeft: "20px" }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Candidate Firstname"
                  name="candidateFirstname"
                  {...register("candidateFirstname")}
                />
              </Paper>
              <Paper sx={!matches ? { width: "90vw", mb: "10px" } : {}}>
                <SearchSharpIcon sx={{ marginLeft: "20px" }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Candidate Lastname"
                  name="candidateLastName"
                  {...register("candidateLastName")}
                />
              </Paper>
              <Paper sx={!matches ? { width: "90vw", mb: "10px" } : {}}>
                <LocationOnOutlinedIcon sx={{ marginLeft: "20px" }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="State,Country"
                  name="location"
                  {...register("location")}
                />
              </Paper>
            </>
          )}
          <Button
            variant="outlined"
            type="submit"
            sx={matches ? { ml: "10px" } : { width: "100%" }}
          >
            Submit
          </Button>

          <Button component={Link} to={"/home/myApplicant/newApplicant/SignUP"}>
            <AddCircleOutlineIcon
              sx={
                matches
                  ? {
                      color: "#26C6DA",
                      width: "40px",
                      height: "40px",
                      p: "0px 20px",
                    }
                  : {
                      color: "#26C6DA",
                      width: "40px",
                      height: "40px",
                      p: "5px 20px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }
              }
            />
          </Button>
        </Box>
      </form>
    </Box>
  );
}
export default SearchBox;
