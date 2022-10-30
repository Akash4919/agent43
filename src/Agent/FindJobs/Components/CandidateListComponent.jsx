import React from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";
import classes from "./Components.module.css";
import ViewCandidateComponent from "./ViewCandidateComponent";
import useMediaQuery from "@mui/material/useMediaQuery";
function CandidateListComponent(props) {
  const { data } = props;
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Box className={classes.CandidateOuterBox}>
        <Box sx={matches ? {} : { display: "none" }}>
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
          <Typography sx={{}}>
            Experience :
            <span style={{ fontWeight: 600 }}>{data?.totalExperience}</span>
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
