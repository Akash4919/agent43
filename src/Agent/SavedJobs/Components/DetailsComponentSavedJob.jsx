import React, { useState } from "react";
import { Box, Tab, useMediaQuery } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import classes from "./Components.module.css";
import { Link as RouterLink, Routes, Route, Outlet } from "react-router-dom";
// import CandidateList from "./CandidateList";
// import AddedCandidates from "./AddedCandidates";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionCard from "./DescriptionCardSavedJob";
function DetailsComponent(props) {
  const { handleBack, descriptionData } = props;
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
          <Box>
            <TabList onChange={handleChange}>
              <Tab
                label="Job Description"
                value="1"
                component={RouterLink}
                to="/home/savedJob/descriptionComponent"
              />
              <Tab
                label="Candidate List"
                value="2"
                component={RouterLink}
                to="/home/savedJob/candidateList"
              />
              <Tab
                label="Added Candidates"
                value="3"
                component={RouterLink}
                to="/home/savedJob/addedCandidates"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DetailsComponent;
