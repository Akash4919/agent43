import React, { useState } from "react";
import { Box, Tab, useMediaQuery, Paper } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import classes from "./Components.module.css";
import { Link as RouterLink, Routes, Route, Outlet } from "react-router-dom";
import CandidateList from "./CandidateList";
import AddedCandidates from "./AddedCandidates";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionCard from "./DescriptionCard";
function DetailsComponent(props) {
  const { handleBack, handleTempSavedJobs, tempSavedJob } = props;
  const matches = useMediaQuery("(min-width:700px)");
  const [value, setvalue] = useState("1");
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  return (
    <Box className={classes.DesBox}>
      {!matches && <ArrowBackIcon onClick={() => handleBack(false)} />}
      <Box className={classes.desHeaader}>
        <TabContext value={value}>
          <Paper>
            <TabList onChange={handleChange} sx={{ minHeight: "60px" }}>
              <Tab
                label="Job Description"
                value="1"
                component={RouterLink}
                to="/home/findJob/descriptionComponent"
              />
              <Tab
                label="Candidate List"
                value="2"
                component={RouterLink}
                to="/home/findJob/candidateList"
              />
              <Tab
                label="Added Candidates"
                value="3"
                component={RouterLink}
                to="/home/findJob/addedCandidates"
              />
            </TabList>
          </Paper>
        </TabContext>
      </Box>
      <Paper>
        <Outlet context={[handleTempSavedJobs, tempSavedJob]} />
      </Paper>
    </Box>
  );
}

export default DetailsComponent;
