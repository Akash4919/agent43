import React, { useState, useContext } from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { userId } from "../MyApplicant";
const steps = [
  "Application Sent",
  "Application Viewed",
  "Application Shortlisted",
  "Application Selected",
  "Hired",
];

const ApplicationStatus = (props) => {
  const { jobId } = props;
  const candidateID = useContext(userId);
  console.log(jobId, candidateID);
  const token = localStorage.getItem("jwt");
  const [activeStep, setActiveStep] = useState(0);
  const [jobStatus, setJobStatus] = useState();
  useEffect(() => {
    getApplicationStatus();
  }, [jobId]);
  const getApplicationStatus = async () => {
    try {
      const res = await axios.get(
        "https://startlazaanikhil.herokuapp.com/eman-api/v1/agent/candidates/getCandidateJobStatus",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            jobId: jobId,
            candidateId: candidateID,
          },
        }
      );
      console.log(res);
      setJobStatus(res.data.jobStatus);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (jobStatus == "applied") setActiveStep(0);
    if (jobStatus == "view") setActiveStep(1);
    if (jobStatus == "shortlisted") setActiveStep(2);
    if (jobStatus == "selected") setActiveStep(3);
    if (jobStatus == "hired") setActiveStep(4);
  }, [jobStatus]);

  return (
    <>
      <Typography sx={{ fontSize: 25, mb: 3, maxWidth: 700 }} variant="h2">
        Application Status
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
export default ApplicationStatus;
