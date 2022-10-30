import React, { useState, useEffect, useRef, useCallback } from "react";
import classes from "./Saved.module.css";
import Searchbox from "../CommonComponents/SearchBox";
import { Box, Button, useMediaQuery } from "@mui/material";
import JobsCard from "./Components/JobsCard";
import DetailsComponent from "./Components/DetailsComponentSavedJob";
import axios from "axios";
export const userContext = React.createContext();

function AppliedJob() {
  const [page, setPage] = useState(1);

  const PORT = 4004;
  const token = localStorage.getItem("jwt");
  const matches = useMediaQuery("(min-width:700px)");
  const [position, setPosition] = useState(false);
  const [jobsList, setJobsList] = useState([{}]);
  const [pageNo, setPageNo] = useState(1);
  const [jobID, setJobID] = useState();
  const [descriptionData, setDescriptionData] = useState({});

  useEffect(() => {
    getAllJobs();
  }, [pageNo]);
  useEffect(() => {
    getJobDescription();
  }, [jobID]);
  const getAllJobs = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getSavedJobs`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            pageSize: "8",
            page: pageNo,
          },
        }
      );
      setJobsList(response?.data?.savedJobs);
      setJobID(response?.data?.savedJobs[0]);
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
    } catch (err) {
      console.log(err);
    }
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
          <Searchbox />
        </Box>
        {!jobsList.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>NO JOB SAVED</h3>
          </div>
        ) : (
          <Box className={classes.MainBox}>
            <Box
              className={
                !matches && position ? classes.overlapLeftBox : classes.LeftBox
              }
            >
              {jobsList.map((el, index) => {
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
                {pageNo > 1 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outlined"
                    className={classes.applyIcon}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="outlined"
                  className={classes.applyIcon}
                >
                  Next
                </Button>
              </Box>
            </Box>

            <Box
              className={
                !matches && position
                  ? classes.overlapRightBox
                  : classes.RightBox
              }
            >
              <userContext.Provider value={descriptionData}>
                <DetailsComponent handleBack={handleBack} />
              </userContext.Provider>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default AppliedJob;
