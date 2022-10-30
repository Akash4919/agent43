import React, { useState, useEffect } from "react";
import classes from "./DetailsCandidate.module.css";
import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

function CandidateAgentcard(props) {
  const { data } = props;
  const [designation, setDesignation] = useState("No Experience");
  useEffect(() => {
    setDesignation(
      data?.workExperience?.length
        ? data?.workExperience.splice(-1)[0]?.designation
        : "No Experience"
    );
  }, [data]);
  return (
    <Box className={classes.JobCard}>
      <Box className={classes.innerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                mr: "2px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Avatar sx={{ width: "50px", height: "50px" }} />
                <Typography variant="h5" sx={{ padding: "10px " }}>
                  {data.firstName} {data.lastName}
                </Typography>
              </Box>
              <Button>Selected</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Designation :
              <span style={{ fontWeight: 700 }}>{designation}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography>
                Experience:{" "}
                <span style={{ fontWeight: 700 }}>{data.totalExperience}</span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography>
                Address :<span style={{ fontWeight: 700 }}>pune,india</span>{" "}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>{/* <Box>Applied for react developer startlazaa</Box> */}</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default CandidateAgentcard;
