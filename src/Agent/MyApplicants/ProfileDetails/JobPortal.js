import React, { useState, useEffect } from "react";
import { Box, Chip, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import "./DetailsCandidate.module.css";
import ApplicationStatus from "./ApplicationStatus";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 3,
  overflow: "scroll",
};
const JobPortal = (props) => {
  const { id } = props;
  const token = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [desData, setDesData] = useState({});
  const matches = useMediaQuery("(max-width:600px)");
  const [ID, setId] = useState();
  console.log(id);
  useEffect(() => {
    setId(id);
  }, [id]);
  const getJobDescription = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getJob`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            jobId: id,
          },
        }
      );
      setDesData(response?.data?.doc);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={getJobDescription} variant="text">
          View
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="scroll">
            <ApplicationStatus jobId={id} />

            <Box
              sx={
                !matches
                  ? { display: "flex" }
                  : { display: "flex", flexDirection: " column" }
              }
            >
              <div
                style={{ width: "80%", borderBottom: "1px solid lightgrey" }}
              >
                <Typography sx={{ fontWeight: 800, p: "10px 0px" }}>
                  Job Designation : {desData?.jobDesignation}
                </Typography>
                <Typography sx={{ p: "5px 0px" }}>
                  Company Name : Google
                </Typography>
                <Typography sx={{ p: "5px 0px" }}>
                  Salary : {desData?.salaryRange?.fromSalary}-
                  {desData?.salaryRange?.toSalary}
                </Typography>
              </div>

              <div
                style={
                  !matches
                    ? { width: "20%", borderBottom: "1px solid lightgrey" }
                    : { display: "flex" }
                }
              >
                <Box sx={{ display: "flex", p: "10px 10px" }}>
                  <ApartmentIcon />
                  <Typography> onsite</Typography>
                </Box>
                <Box sx={{ display: "flex", p: "5px 10px" }}>
                  <PlaceIcon />
                  <Typography> pune.</Typography>
                </Box>{" "}
                <Box sx={{ display: "flex", p: "5px 10px" }}>
                  <BusinessCenterIcon />
                  <Typography> Full time</Typography>
                </Box>
              </div>
            </Box>

            <Box sx={{ p: "10px 0px", borderBottom: "1px solid lightgrey" }}>
              <Typography sx={{ fontWeight: 800 }}>
                Role & responsibility :
                <span style={{ fontWeight: 500 }}>
                  {desData?.responsibility}
                </span>
              </Typography>
            </Box>
            {/* <Box sx={{ p: "10px 0px", borderBottom: "1px solid lightgrey" }}>
              <Typography sx={{ fontWeight: 800 }}>
                Requried Skillsets :
                <span style={{ fontWeight: 500 }}>
                  React makes it painless to create interactive UIs. Design
                  simple views for each state in your application, and React
                  will efficiently update and render just the right components
                  when your data changes.
                </span>
              </Typography>
            </Box> */}

            <Box sx={{ display: "flex" }}>
              <h3>Key Skills :</h3>
              <Stack direction="row" spacing={1} sx={{ padding: "15px 10px" }}>
                <Chip label="Chip Filled" />
                {desData?.keySkills?.map((el, index) => {
                  return <Chip label={el} key={index} />;
                })}
              </Stack>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default JobPortal;
