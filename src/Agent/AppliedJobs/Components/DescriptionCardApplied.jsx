import React, { useContext } from "react";
import {
  Chip,
  CardActions,
  CardContent,
  Stack,
  Button,
  Typography,
  Card,
  yellow,
  Avatar,
  Box,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { userContext } from "../AppliedJob";
import { useNavigate } from "react-router-dom";
import classes from "./Components.module.css";
function DescriptionCardApplied() {
  const data = useContext(userContext);
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <Box variant="outlined">
        <CardContent
          sx={{
            p: "10px 30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{}}>
            <div
              style={{
                display: "flex",
                paddingTop: "5px",
              }}
            >
              <Avatar
                src={data?.createdById?.companyInformation?.companyLogo}
                sx={{ width: "50px", height: "50px" }}
              />
              <Typography component="div" variant="h5" sx={{ p: "10px" }}>
                {data?.jobDesignation}
              </Typography>
            </div>
            {/* <div style={{ display: "inline-block" }}>
            <Typography
              sx={{ mb: 1, fontSize: 25 }}
              variant="h5"
              component="div"
            >
              
            </Typography>
          </div> */}
            <Typography sx={{ mt: 1, mb: 1, fontSize: "18px" }} variant="body2">
              Compnay Name:
              <span style={{ fontWeight: 800 }}>
                {data?.createdById?.companyInformation?.companyName}
              </span>
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: "18px" }} variant="body2">
              Salary :
              <span style={{ fontWeight: 800 }}>
                {data?.salaryRange?.fromSalary} LPA -{" "}
                {data?.salaryRange?.toSalary} LPA
              </span>
            </Typography>
          </div>
          <div style={{ display: "inline-block", float: "right" }}>
            <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.secondary">
              <LocationCityIcon className={classes.iconDesign} />
              Onsite
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.secondary">
              <PlaceIcon className={classes.iconDesign} />
              {data?.createdById?.companyInformation?.city},{" "}
              {data?.createdById?.companyInformation?.state}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.secondary">
              <BusinessCenterIcon className={classes.iconDesign} />
              jobType
            </Typography>
          </div>
        </CardContent>
        <CardActions sx={{ p: "10px 30px" }}>
          <h5>Applied</h5>

          {/* <Button>
          <StarRoundedIcon />
        </Button>

        <Button>
          <StarBorderRoundedIcon />
        </Button> */}
        </CardActions>
        <hr />
        <CardContent>
          <Typography sx={{ mb: 1, fontSize: 20 }} variant="h6" component="div">
            Roles and Responsiblities:
          </Typography>
          <Typography sx={{ mb: 1 }} variant="body1">
            {data?.responsibility}
          </Typography>
          <Typography
            sx={{ mb: 1, mt: 10, fontSize: 20 }}
            variant="h6"
            component="div"
          >
            Key skills:
          </Typography>
          <Stack
            sx={{ mt: 2, display: "inline-block" }}
            direction="row"
            spacing={2}
          >
            {data?.keySkills?.map((el, index) => {
              return <Chip key={index} label={el} variant="outlined" />;
            })}
          </Stack>
        </CardContent>
      </Box>
    </React.Fragment>
  );
}

export default DescriptionCardApplied;
