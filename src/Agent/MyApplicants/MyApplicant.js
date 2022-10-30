import React, { useState, useEffect } from "react";
import classes from "./Homepage.module.css";
import { Box, Button, useMediaQuery } from "@mui/material";
import axios from "axios";
import CandidateAgentcard from "./ProfileDetails/Candidatecard";
import CandidateprofileDetails from "./ProfileDetails/CandidateDescriptionComponent";
import SearchBoxApplicant from "./ProfileDetails/SearchBoxApplicant";
export const userContext = React.createContext();
export const userId = React.createContext();
function DetailsCandidate() {
  const token = localStorage.getItem("jwt");
  const matches = useMediaQuery("(min-width:700px)");
  const [position, setPosition] = useState(false);
  const [jobsList, setJobsList] = useState([{}]);
  const [pageNo, setPageNo] = useState(1);
  const [jobID, setJobID] = useState();
  const [descriptionData, setDescriptionData] = useState({});

  useEffect(() => {
    getJobDescription();
  }, [jobID]);

  const getJobDescription = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getCandidateInfo`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: jobID,
          },
        }
      );
      setDescriptionData(response.data.data);
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
          <SearchBoxApplicant
            pageNo={pageNo}
            setJobsList={setJobsList}
            setJobID={setJobID}
          />
        </Box>
        {!jobsList.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>NO CANDIDATE FOUND</h3>
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
                    <CandidateAgentcard key={index} data={el} />
                  </Box>
                );
              })}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {pageNo > 1 && (
                  <Button onClick={handlePrevious}>Previous</Button>
                )}
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </Box>
            <Box
              className={
                !matches && position
                  ? classes.overlapRightBox
                  : classes.RightBox
              }
            >
              {console.log(jobID)}
              <userContext.Provider value={descriptionData}>
                <userId.Provider value={jobID}>
                  <CandidateprofileDetails handleBack={handleBack} />
                </userId.Provider>
              </userContext.Provider>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
export default DetailsCandidate;
