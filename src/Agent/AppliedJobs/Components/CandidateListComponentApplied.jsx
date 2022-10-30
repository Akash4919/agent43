import React from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";
import classes from "./Components.module.css";
import ViewCandidateComponent from "./ViewCandidateComponentApplied";
function CandidateListComponent(props) {
  const { data } = props;
  return (
    <>
      <Box className={classes.CandidateOuterBox}>
        <Box>
          <Avatar sx={{ width: "50px", height: "50px" }} />
        </Box>
        <Box className={classes.candidateInnerBox}>
          <Typography sx={{ fontWeight: 600 }}>
            {data?.firstName} {data?.lastName}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            {data?.workExperience[data?.workExperience.length - 1]?.designation}
          </Typography>
        </Box>
        <Box className={classes.candidateInnerBox}>
          <Typography>
            Experience:
            <span style={{ fontWeight: 600 }}>
              {" "}
              {data?.totalExperience}
            </span>{" "}
          </Typography>
          <Typography>
            Job Type:<span style={{ fontWeight: 600 }}>Full Time</span>
          </Typography>
        </Box>
        <Box>
          <ViewCandidateComponent data={data} />
        </Box>
      </Box>
    </>
  );
}

export default CandidateListComponent;
