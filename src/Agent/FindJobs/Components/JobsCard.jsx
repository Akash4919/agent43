import React from "react";
import classes from "./Components.module.css";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

function JobsCard(props) {
  const { data } = props;
  const saveJob = () => {
    console.log("jobSaved");
  };
  return (
    <Box className={classes.JobCard}>
      <Box className={classes.BorderBox}>
        <Box className={classes.innerBox}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Box sx={{ mr: "2px" }}>
                <Avatar
                  src={data?.createdById?.companyInformation?.companyLogo}
                  sx={{ width: "50px", height: "50px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5" sx={{ pt: "10px" }}>
                {data?.jobDesignation}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              Company Name:
              <span style={{ fontWeight: 600 }}>
                {" "}
                {data?.createdById?.companyInformation?.companyName}
              </span>
            </Grid>
            <Grid item xs={12}>
              Address :{" "}
              <span style={{ fontWeight: 600 }}>
                {data?.createdById?.companyInformation?.city},
                {data?.createdById?.companyInformation?.country}
              </span>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.innerJobCard}>
                {/* <Box>Job Type:{data?.jobType}</Box> */}
                <Box>
                  Experience :{" "}
                  <span style={{ fontWeight: 600 }}>
                    {data?.requiredExperience?.fromExperience}-
                    {data?.requiredExperience?.toExperience} Years
                  </span>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.innerJobCard}>
                <Box>
                  Salary:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {data?.salaryRange?.fromSalary}-
                    {data?.salaryRange?.toSalary} LPA
                  </span>
                </Box>
                <Box onClick={saveJob} sx={{ display: "flex" }}>
                  <StarBorderRoundedIcon /> <Typography>Save Job</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default JobsCard;
