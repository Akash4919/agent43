import React, { useState, useEffect, useRef, useCallback } from "react";
import classes from "./FindJob.module.css";
import Searchbox from "../CommonComponents/SearchBox";
import { Box, Button, useMediaQuery } from "@mui/material";
import JobsCard from "./Components/JobsCard";
import DetailsComponent from "./Components/DetailsComponent";
import axios from "axios";

export const userContext = React.createContext();

function FindJobs() {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("jwt");
  const matches = useMediaQuery("(min-width:700px)");
  const [backendSavedJobs, setBackendSavesJobs] = useState([]);
  const [tempSavedJob, setTempSavedJob] = useState([]);
  const [position, setPosition] = useState(false);
  const [jobsList, setJobsList] = useState([{}]);
  const [pageNo, setPageNo] = useState(1);
  const [jobID, setJobID] = useState();
  const [descriptionData, setDescriptionData] = useState({});
  const loader = useRef(null);
  useEffect(() => {
    getAllJobs();
  }, [pageNo]);
  useEffect(() => {
    getJobDescription();
  }, [jobID]);
  useEffect(() => {
    getSavedJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getSuggesstedJobs?pageSize=8&page=${pageNo}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setJobsList(response.data.jobs);
      setJobID(response.data.jobs[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getJobDescription = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getJob`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            jobId: jobID,
          },
        }
      );
      setDescriptionData(response.data.doc);
    } catch (err) {}
  };
  const handlePosition = (jobID) => {
    setPosition(true);
  };
  const handleBack = (data) => {
    setPosition(false);
  };
  const handlePrevious = () => {
    setPageNo(pageNo - 1);
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  ///////////////////////////////////////////////
  const getSavedJobs = async () => {
    try {
      const res = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getSavedJobs`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBackendSavesJobs(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTempSavedJob((prevState) => {
      return [...prevState, ...backendSavedJobs];
    });
  }, [backendSavedJobs]);

  const handleTempSavedJobs = (jobId) => {
    localStorage.removeItem("memoData");
    setTempSavedJob((prevState) => [...prevState, jobId]);
  };
  ///////////////////////////////////////////////

  return (
    <>
      <Box>
        <Box
          className={
            (!matches && position
              ? classes.overlapSearchBox
              : classes.Searchbox,
            "start")
          }
        >
          <Searchbox setJobsList={setJobsList} />
        </Box>
        <Box className={classes.MainBox}>
          <Box
            className={
              !matches && position ? classes.overlapLeftBox : classes.LeftBox
            }
          >
            {jobsList?.map((el, index) => {
              return (
                <Box
                  onClick={() => {
                    handlePosition(index);
                    setJobID(el?._id);
                  }}
                >
                  <JobsCard key={index} data={el} />
                </Box>
              );
            })}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {pageNo > 1 && <Button onClick={handlePrevious}>Previous</Button>}
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </Box>

          <Box
            className={
              !matches && position ? classes.overlapRightBox : classes.RightBox
            }
          >
            <userContext.Provider value={descriptionData}>
              <DetailsComponent
                handleBack={handleBack}
                handleTempSavedJobs={handleTempSavedJobs}
                tempSavedJob={tempSavedJob}
              />
            </userContext.Provider>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FindJobs;
