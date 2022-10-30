import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import classes from "../../../FindJobPages/findJob/Styling.module.css";
import { useMediaQuery, Button } from "@mui/material";
import DescriptionCard from "./DescriptionCard";
import { useParams } from "react-router-dom";
import SearchBox from "../../../Search/SearchBox";
import axios from "axios";
function SearchBoxCandidatesList() {
  const { titlelocation } = useParams();
  let TitleLocation = titlelocation.split("-");
  console.log(TitleLocation[0], TitleLocation[1]);
  let jobTitle = TitleLocation[0];
  let jobLocation = TitleLocation[1];
  let paramsObj = {};
  if (jobTitle.trim()) {
    paramsObj = {
      jobDesignation: jobTitle,
    };
  }

  if (jobLocation.trim()) {
    paramsObj = { ...paramsObj, jobLocation: jobLocation };
  }
  console.log(paramsObj);
  const matches = useMediaQuery("(min-width:700px)");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobLocation, setNewJobLocation] = useState("");
  const [jobsArray, setJobsArray] = useState([]);
  const [activeJob, setActiveJob] = useState(jobsArray[0]);
  const [pageNo, setPageNo] = useState(1);
  const [position, setPosition] = useState(false);
  const handlePosition = (jobID) => {
    setPosition(true);
  };
  const handleBack = (data) => {
    setPosition(false);
  };
  const handleNormalFind = (data) => {
    console.log("************************************");
    console.log(data);
    setJobsArray(data);
  };
  useEffect(() => {
    setNewJobTitle(TitleLocation[0]);

    setNewJobLocation(TitleLocation[1]);
    getsearchJob();
  }, []);
  const handleActiveJob = (jobCode) => {
    setPosition(true);
    let activeJobArray = jobsArray.filter((ele) => ele._id === jobCode);
    setActiveJob(activeJobArray[0]);
  };

  // useEffect(() => {
  //   setActiveJob(jobsArray[0]);
  // }, [jobsArray]);

  const handlePreviousClick = () => {
    setPageNo(pageNo - 1);
  };

  const handleNextClick = () => {
    setPageNo(pageNo + 1);
  };
  // useEffect(() => {
  //   getsearchJob();
  // }, [newJobTitle, newJobLocation]);
  const getsearchJob = async () => {
    try {
      const res = await axios.get(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateJobRoute/searchJobs",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: paramsObj,
        }
      );
      console.log(res);
      setJobsArray(res?.data?.searchJobs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setActiveJob(jobsArray[0]);
  }, [jobsArray]);

  return (
    <>
      <SearchBox handleNormalFind={handleNormalFind} />
      <div className={classes.MainBox}>
        <div
          className={
            !matches && position ? classes.overlapLeftBox : classes.LeftBox
          }
        >
          {jobsArray.map((ele, index) => (
            <div
              key={index}
              onClick={() => {
                handleActiveJob(ele._id);
              }}
            >
              <JobCard key={ele.jobCode} jobData={ele} />
            </div>
          ))}
          <Button
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 1, float: "right" }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </div>

        <div
          className={
            !matches && position ? classes.overlapRightBox : classes.RightBox
          }
        >
          <DescriptionCard
            data={{
              jobData: activeJob,
              cardType: "find",
            }}
            handleBack={handleBack}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBoxCandidatesList;
