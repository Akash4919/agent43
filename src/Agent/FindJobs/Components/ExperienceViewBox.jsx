import React from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Components.module.css";
import { getDateFormat } from "../DateFunction";
function ExperienceViewBox(props) {
  const { data } = props;
  return (
    <>
      <Box>
        {data.map((el, index) => {
          return (
            <>
              <Box className={classes.expBox}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Experience {index + 1}
                </Typography>
              </Box>
              <Box className={classes.expBox}>
                <Typography>Designation: {el.designation}</Typography>
              </Box>
              <Box className={classes.expBox}>
                <Typography>Compnay Name: {el.companyName}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                className={classes.expBox}
              >
                <Typography>
                  Start Date: {getDateFormat(el.startDate)}
                </Typography>
                <Typography>End Date: {getDateFormat(el.endDate)}</Typography>
              </Box>
              <Box className={classes.expBox}>
                <Typography>Location:{el.workLocation}</Typography>
              </Box>
              <Box className={classes.expBox}>
                <Typography>
                  Roles and Responsability: {el.responsibility}
                </Typography>
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
}

export default ExperienceViewBox;
