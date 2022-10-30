import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Badge,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import AgentProfilemodal from "./AgentProfilemodal";
import AgentDocument from "./AgentDocument";
import axios from "axios";
const AgentProfile = () => {
  const [data, setData] = useState({});
  const [up, setUp] = useState(1);
  const matches = useMediaQuery("(min-width:600px)");
  const [candidateId, setCandidateId] = useState("");
  const token = localStorage.getItem("jwt");
  //
  const [BackgroundImage, setBackgroundImage] = useState(
    "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
  );
  const [dep, setDep] = useState(0);
  //
  useEffect(() => {
    getprofiledata();
  }, [up]);
  const imageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const formData = new FormData();
    formData.append("profile-picture", uploadedImage);
    sendUploadedImage(formData);
    console.log(formData);
  };
  const getprofiledata = async () => {
    try {
      const res = await axios.get(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/profile/getProfileInfo",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setData(res?.data?.data?.doc);
    } catch (err) {
      console.log(err);
    }
  };

  const sendUploadedImage = async (data) => {
    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/uploadProfilePicture`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setDep(dep + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const getProfilePhoto = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/userAuth/getProfilePicture`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setBackgroundImage(response.data.data.doc.profilePictureLink);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfilePhoto();
  }, [dep]);

  return (
    <div
      style={
        !matches
          ? { padding: " 20px 10px", backgroundColor: "lightgray" }
          : { padding: " 20px 50px", backgroundColor: "lightgray" }
      }
    >
      <Card>
        <CardContent>
          <div style={!matches ? { padding: "10px" } : { padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid lightgrey",
                pb: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Avatar
                    alt="Travis Howard"
                    src={`${BackgroundImage}`}
                    sx={{
                      alignItems: "center",
                      height: "6rem",
                      width: "6em",
                    }}
                  />
                  <Button
                    component="label"
                    variant="text"
                    sx={{ fontSize: "12px" }}
                  >
                    Upload Profile
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={imageUpload}
                    />
                  </Button>
                </Box>
                <Box sx={{ padding: "10px 10px" }}>
                  <Typography variant="h6">
                    {data?.firstName} {data?.lastName}
                  </Typography>
                  <Typography>Agent</Typography>
                </Box>
              </Box>
              <AgentProfilemodal
                data={data?.companyInformation}
                setUp={setUp}
                up={up}
              />
            </Box>

            <Box sx={{ p: "20px 0px" }}>
              <Typography variant="h6">Agent Details </Typography>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "5px 0px" }}>
                  Name :
                  <span style={{ fontWeight: 700 }}>
                    {data?.firstName} {data?.lastName}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "5px 0px" }}>
                  Mobile Number :
                  <span style={{ fontWeight: 700 }}>
                    {data?.mobile?.mobileNumber}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography sx={{ p: "15px 0px" }}>
                  Email Id :
                  <span style={{ fontWeight: 700 }}>
                    {data?.email?.emailId}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                p: "20px 0px",
                borderTop: "1px solid lightgrey",
              }}
            >
              <Typography variant="h6">Company Details </Typography>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "0px 0px" }}>
                  Company Name :{" "}
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyName}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "0px 0px" }}>
                  Company Phone :{" "}
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyMobile}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "15px 0px" }}>
                  Company Email Id :{" "}
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyEmail}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "15px 0px" }}>
                  Company Location :
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyAddress}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "15px 0px" }}>
                  Company Website :
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyLinks?.domainName}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "15px 0px" }}>
                  Company Strength :
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyStrength}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography sx={{ p: "15px 0px" }}>
                  Company Type :
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyType}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ p: "15px 0px", borderBottom: "1px solid lightgrey" }}
                >
                  About Company :
                  <span style={{ fontWeight: 700 }}>
                    {data?.companyInformation?.companyAbout}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <AgentDocument />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentProfile;
