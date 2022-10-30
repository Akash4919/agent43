import React from "react";
import { Card, CardMedia } from "@mui/material";
import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import classes from "./JobCard.module.css";
import CardContent from "@mui/material/CardContent";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

const JobCard = (props) => {
  const jobData = props.jobData;
  return (
    <Box className={classes.JobCard}>
      <Box className={classes.innerBox}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                mr: "2px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Avatar
                  sx={{ display: "inline-block" }}
                  alt="Remy Sharp"
                  src="https://logosandtypes.com/wp-content/uploads/2020/11/google.svg"
                />

                <Typography
                  sx={{
                    fontWeight: 600,
                    padding: "0px 20px",
                    fontSize: "x-large",
                  }}
                >
                  {jobData?.jobDesignation}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              Company Name :{" "}
              <span style={{ fontWeight: 600 }}>{jobData.companyName}</span>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: "5px 0px" }}>
              <Box>
                Address:{" "}
                <span style={{ fontWeight: 600 }}>
                  {jobData.jobLocation?.city}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: "5px 0px" }}>
              <Box>
                Experience :{" "}
                <span style={{ fontWeight: 600 }}>
                  {jobData?.requiredExperience?.fromExperience}-
                  {jobData?.requiredExperience?.toExperience}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: "5px 0px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "20px",
                }}
              >
                Salary:{" "}
                <span style={{ fontWeight: 600 }}>
                  {" "}
                  {`${jobData.salaryRange?.fromSalary}-${jobData.salaryRange?.toSalary}`}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: "5px 0px" }}>
              <Box>
                Job Type :{" "}
                <span style={{ fontWeight: 600 }}> {jobData.jobType}</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", p: "5px 0px" }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: 300 }}> Save Job</Typography>
                <StarBorderRoundedIcon />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default JobCard;
