import React from "react";
import classes from "./Components.module.css";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

function JobsCard(props) {
  const { data } = props;
  return (
    <Box className={classes.JobCard}>
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
            <Typography variant="h5" sx={{ p: "10px 0px" }}>
              {data?.jobDesignation}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: "large" }}>
              Copmpany Name :
              <span style={{ fontWeight: 600 }}>
                {data?.createdById?.companyInformation?.companyName}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "large" }}>
              Address :
              <span style={{ fontWeight: 600 }}>
                {" "}
                {data?.createdById?.companyInformation?.city},
                {data?.createdById?.companyInformation?.country}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.innerJobCard}>
              {/* <Box>Job Type:{data?.jobType}</Box> */}
              <Box>
                <Typography sx={{ fontSize: "large" }}>
                  Experience:
                  <span style={{ fontWeight: 600 }}>
                    {data?.requiredExperience?.fromExperience}-
                    {data?.requiredExperience?.toExperience} Years
                  </span>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.innerJobCard}>
              <Box>
                <Typography sx={{ fontSize: "large" }}>
                  Salary :
                  <span style={{ fontWeight: 600 }}>
                    {data?.salaryRange?.fromSalary}-
                    {data?.salaryRange?.toSalary} LPA
                  </span>
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <StarBorderRoundedIcon /> <Typography>Save Job</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default JobsCard;
