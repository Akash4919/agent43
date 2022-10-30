import { Card, CardContent, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import React, { useState } from "react";
import { Routes, Route, Link as RouterLink, Outlet } from "react-router-dom";
import PersonalDetails from "./CandidateProfileComponent";
import ViewDocuments from "./DocumentComponent";
import JobsProfiles from "./JobStatusCard";
const CandidateprofileDetails = () => {
  const [value, setvalue] = useState("1");
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Box sx={{ padding: "0px 15px" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    label="Profile"
                    value="1"
                    component={RouterLink}
                    to="/home/myApplicant/CandidateProfile"
                  />
                  <Tab
                    label="Documents"
                    value="2"
                    component={RouterLink}
                    to="/home/myApplicant/candidateDocuments"
                  />
                  <Tab
                    label="Jobs"
                    value="3"
                    component={RouterLink}
                    to="/home/myApplicant/jobsList"
                  />
                </TabList>
              </Box>
            </TabContext>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateprofileDetails;
