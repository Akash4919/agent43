import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Avatar,
  Chip,
  Grid,
} from "@mui/material";
import classes from "./Components.module.css";
import ExperienceViewBox from "./ExperienceViewBoxSavedJob";
import EducationView from "./EducationViewSavedJob";
import axios from "axios";
import { userContext } from "../SavedJob";

function ViewCandidateComponent(props) {
  const [candidateData, setCandidateData] = useState({});
  const [jobID, setJobID] = useState("");
  const [checkPage, setCheckPage] = useState(false);
  const descriptionData = useContext(userContext); //Getting the whole job data to get the job id and pass it to post API
  const token = localStorage.getItem("jwt");
  const { data } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lastWork = window.location.href.split("/");
  useEffect(() => {
    const value = lastWork[lastWork.length - 1];
    if (value === "addedCandidates") {
      setCheckPage(true);
    }
  }, []);
  useEffect(() => {
    setJobID(descriptionData?._id);
  }, [descriptionData]);
  const getCandidateInfo = async () => {
    try {
      const res = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getCandidateInfo`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: data?._id,
          },
        }
      );
      setCandidateData(res?.data?.data);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };
  const ApplyCandidate = async () => {
    try {
      const res = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateJobRoute/applyJob`,
        {
          candidateId: data?._id,
          jobId: jobID,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Applied Successfully");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  return (
    <>
      <Button onClick={getCandidateInfo}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalStyle} sx={style}>
          <Box className={classes.innerBox}>
            <Box className={classes.upperProfileBox}>
              <Box sx={{ display: "flex", mb: "20px" }}>
                <Box className={classes.AvatarBox}>
                  <Avatar sx={{ height: "100%", width: "100%" }} />
                </Box>
                <Box
                  className={classes?.candidateInnerBox}
                  sx={{ marginLeft: "20px" }}
                >
                  <Typography variant="h6">
                    {candidateData?.firstName} {candidateData?.lastName}
                  </Typography>
                  <Typography>
                    {/* {
                      candidateData?.workExperience[
                        candidateData?.workExperience.length - 1
                      ]?.designation
                    } */}
                  </Typography>
                </Box>
              </Box>
              <Typography>Email ID:{candidateData?.email?.emailId}</Typography>
              <Typography>
                Contact No:{candidateData?.mobile?.mobileNumber}
              </Typography>
              <Typography>
                Address:{candidateData?.personalInformation?.currentAddress},
                {candidateData?.personalInformation?.city},
                {candidateData?.personalInformation?.country}
              </Typography>
              <Box className={classes?.keyskillBox}>
                <Typography>Key skills:</Typography>
                <Box sx={{ ml: "20px" }}>
                  <Grid container spacing={2}>
                    {candidateData?.personalInformation?.preferredJobs?.map(
                      (el) => {
                        return (
                          <Grid item lg={3}>
                            <Chip label={el} variant="outlined" />
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box sx={{ borderBottom: "1px solid grey" }}>
              <ExperienceViewBox data={candidateData?.workExperience} />
            </Box>
            <Box>
              <EducationView data={candidateData?.educationalQualifications} />
            </Box>

            {!checkPage && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={ApplyCandidate} variant="outlined">
                  Apply
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ViewCandidateComponent;
