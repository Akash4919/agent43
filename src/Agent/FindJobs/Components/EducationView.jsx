import React from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Components.module.css";
import { getDateFormat } from "../DateFunction";
function EducationView(props) {
  const { data } = props;
  return (
    <>
      {data.map((el, index) => {
        return (
          <Box key={index}>
            <Box className={classes.expBox}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Education {index + 1}
              </Typography>
            </Box>
            <Box className={classes.expBox}>
              <Typography>Degree Name:{el?.degreeName}</Typography>
            </Box>
            <Box className={classes.expBox}>
              <Typography>University Name:{el?.universityName}</Typography>
            </Box>
            <Box className={classes.expBox}>
              <Typography>College Name:{el?.collegeName}</Typography>
            </Box>
            <Box className={classes.expBox}>
              <Typography>Specialization: {el?.specialization}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              className={classes.expBox}
            >
              <Typography>Start Date:{getDateFormat(el?.startDate)}</Typography>
              <Typography>End Date: {getDateFormat(el?.endDate)}</Typography>
            </Box>
            <Box className={classes.expBox}>
              <Typography>Cource Type:{el?.courseType}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default EducationView;
