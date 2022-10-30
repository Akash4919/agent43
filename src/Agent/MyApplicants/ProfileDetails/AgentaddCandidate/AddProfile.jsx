import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import PersonalDetails from "./PersonalDetails";
import EductionDetails from "./EductionDetails";
import DocumentUpload from "./DocumentUpload";
import UploadVideo from "./UploadVideo";
import SignUp from "./CandidateLoginSignup/SignUp";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CandidateworkExp from "./CandidateworkExp";
import { Outlet } from "react-router-dom";
export const UserContext = createContext();

const steps = [
  "Personal Details",
  "Eduction Details",
  "Work Experince",
  "Upload Document",
  "Video Upload",
];

const AddProfile = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [candidateId, setCandidateId] = useState("");
  const matches = useMediaQuery("(max-width:600px)");

  const isStepOptional = (step) => {
    return step === 2 || step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 25,
    height: 25,
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage: " linear-gradient(#26CADA,#337AB7) ",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage: " linear-gradient(#26CADA,#337AB7) ",
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      ></ColorlibStepIconRoot>
    );
  }
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: " linear-gradient(#26CADA,#337AB7) ",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: " linear-gradient(#26CADA,#337AB7) ",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));
  return (
    <>
      <div>
        <Box
          sx={
            matches
              ? { display: "none" }
              : { padding: " 0px 10px", width: "100%" }
          }
        >
          <Stepper
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            style={{
              padding: "10px 20px",
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={ColorlibStepIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </React.Fragment>
          )}
        </Box>
      </div>
      <UserContext.Provider value={candidateId}>
        <Outlet context={[handleNext]} />
        {/* <Route
          path="/home/myApplicant/newApplicant/uploadvideo"
          element={<UploadVideo data={handleNext} />}
        /> */}
      </UserContext.Provider>
    </>
  );
};

export default AddProfile;
