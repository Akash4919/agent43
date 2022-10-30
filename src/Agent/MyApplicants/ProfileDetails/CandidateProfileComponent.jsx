import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { userContext } from "../MyApplicant";
import { getDateFormat } from "./AgentaddCandidate/Datafunction";
import axios from "axios";
const PersonalDetails = () => {
  const token = localStorage.getItem("jwt");
  const data = useContext(userContext);
  console.log(data);
  const resumeUpload = (e) => {
    const uploadedResume = e.target.files[0];
    const formData = new FormData();
    formData.append("documentName", "resume");
    formData.append("documentType", "resume");
    formData.append("candidateId", data._id);
    formData.append("candidate-document", uploadedResume);
    sendResume(formData);
  };
  const sendResume = async (formData) => {
    try {
      const response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/uploadCandidateDocument `,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Resume Upload Successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Something went Wrong,Please reupload the resume");
    }
  };
  const onDownload = async () => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getCandidateDocument/resume`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: data._id,
          },
        }
      );
      let url = response.data.data.doc.document.documentLink;
      const download = (url) => {
        const link = document.createElement("a");

        link.setAttribute("download", "fileName.pdf");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", url);
        link.click();
      };
      download(url);
    } catch (err) {
      console.log(err);
      alert("Resume View Failed");
    }
  };
  console.log(data);
  return (
    <div>
      <Box
        sx={{
          paddingTop: "20px",
          paddingBottom: "10px",
          display: "flex",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: "60px", height: "60px" }}
        />
        <Box sx={{ paddingTop: "15px", paddingLeft: "20px" }}>
          <Typography sx={{ fontSize: "20px" }}>
            {data?.firstName} {data?.personalInformation?.middleName}
            {data?.lastName}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: "15px 20px" }}>
              <Typography>
                Email ID :
                <span style={{ fontWeight: 600 }}>{data?.email?.emailId}</span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: "15px 20px" }}>
              <Typography>
                Contact NO :
                <span style={{ fontWeight: 600 }}>
                  {data?.mobile?.mobileNumber}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ pt: "10px", pl: "20px" }}>
              <Typography>
                D.O.B :
                <span style={{ fontWeight: 600 }}>
                  {getDateFormat(data?.personalInformation?.dateOfBirth)}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ pt: "10px" }}>
              Marital Status :
              <span style={{ fontWeight: 600 }}>
                {data?.personalInformation?.maritalStatus}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography sx={{ pt: "10px" }}>
                Gender :
                <span style={{ fontWeight: 600 }}>
                  {data?.personalInformation?.gender}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ pt: "10px" }}>
              Disability :
              <span style={{ fontWeight: 600 }}>
                {data?.personalInformation?.disability}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: "10px 20px" }}>
              <Typography>
                Country :
                <span style={{ fontWeight: 600 }}>
                  {data?.personalInformation?.country}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ padding: "10px 0px" }}>
              State :
              <span style={{ fontWeight: 600 }}>
                {data?.personalInformation?.state}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: "10px 0px" }}>
              <Typography>
                City :
                <span style={{ fontWeight: 600 }}>
                  {data?.personalInformation?.city}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ padding: "10px 0px" }}>
              Nationality :
              <span style={{ fontWeight: 600 }}>
                {data?.personalInformation?.nationality}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography sx={{ padding: "10px 20px", pb: "30px" }}>
                Current Address :
                <span style={{ fontWeight: 600 }}>
                  {data?.personalInformation?.currentAddress}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography sx={{ padding: "10px 20px", pb: "30px" }}>
                Permanent Address :
                <span style={{ fontWeight: 600 }}>
                  {data?.personalInformation?.permanentAddress}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={6}>
            <Typography
              variant={"h6"}
              component={"span"}
              sx={{ pt: "30px", pl: "20px" }}
            >
              Preffered Jobs:
            </Typography>
          </Grid>

          <Grid item lg={7} md={6}>
            <Box>
              <Grid container>
                {data?.personalInformation?.preferredJobs?.map((el) => {
                  return (
                    <Grid
                      item
                      md={4}
                      sm={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Chip
                        label={el}
                        sx={{
                          height: "50px",

                          "& .MuiChip-label": {
                            fontSize: "19px",
                          },
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={3} md={6} sx={{ mt: "30px" }}>
            <Typography variant={"h6"} component={"span"} sx={{ pl: "20px" }}>
              Preffered Location:
            </Typography>
          </Grid>

          <Grid item lg={7} md={12} sx={{ mt: "30px" }}>
            <Box>
              <Grid container>
                {data?.personalInformation?.preferredLocations?.map((el) => {
                  return (
                    <Grid
                      item
                      md={3}
                      sm={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Chip
                        label={el}
                        sx={{
                          height: "50px",

                          "& .MuiChip-label": {
                            fontSize: "19px",
                          },
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ borderTop: "1px solid lightgrey", m: "13px 0px" }}></Box>
          </Grid>
          {data?.personalInformation?.children.map((el, index) => {
            return (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", p: "10px 0px" }}>
                  <Typography sx={{ padding: "0px 20px" }}>
                    No of Children :
                    <span style={{ fontWeight: 600 }}>{index + 1}</span>
                  </Typography>
                  <Typography sx={{ padding: "0px 20px" }}>
                    Full Name :
                    <span style={{ fontWeight: 600 }}>{el?.fullName}</span>
                  </Typography>
                  <Typography sx={{ padding: "0px 20px" }}>
                    Gender :
                    <span style={{ fontWeight: 600 }}>{el?.gender}</span>
                  </Typography>
                  <Typography sx={{ padding: "0px 20px" }}>
                    D.O.B :
                    <span style={{ fontWeight: 600 }}>
                      {getDateFormat(el?.dateOfBirth)}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            );
          })}

          <Grid xs={12}>
            <Box sx={{ borderTop: "1px solid lightgrey", m: "13px 0px" }}></Box>
          </Grid>
          <Box sx={{ p: "0px 20px" }}>
            <h3>Work Experince</h3>
          </Box>
          {data?.workExperience?.map((el, index) => {
            return (
              <>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, p: "0px 20px" }}>
                    Experience {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "15px 20px" }}>
                    Designation :
                    <span style={{ fontWeight: 600 }}>{el?.designation}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "15px 20px" }}>
                    Company Name :
                    <span style={{ fontWeight: 600 }}>{el?.companyName}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: "5px 20px" }}>
                    <Typography>
                      Start Date :
                      <span style={{ fontWeight: 600 }}>
                        {getDateFormat(el?.startDate)}
                      </span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "5px 20px" }}>
                    End Date :
                    <span style={{ fontWeight: 600 }}>
                      {getDateFormat(el?.endDate)}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ p: "5px 20px" }}>
                    Work Experince :
                    <span style={{ fontWeight: 600 }}> {el?.workLocation}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ p: "5px 20px" }}>
                    Role & Responsibility :
                    <span style={{ fontWeight: 600 }}>
                      {el?.responsibility}
                    </span>
                  </Typography>
                </Grid>
              </>
            );
          })}

          <Grid xs={12}>
            <Box sx={{ borderTop: "1px solid lightgrey", m: "13px 0px" }}></Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: "0px 20px" }}>
              <h3>Education Qualification</h3>
            </Box>
          </Grid>
          {data?.educationalQualifications?.map((el, index) => {
            return (
              <>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "0px 20px" }}>
                    Degree Name :
                    <span style={{ fontWeight: 600 }}>{el?.degreeName}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "0px 20px", paddingBottom: "10px" }}>
                    Specialization :
                    <span style={{ fontWeight: 600 }}>
                      {el?.specialization}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: "5px 20px" }}>
                    <Typography>
                      Start Date :
                      <span style={{ fontWeight: 600 }}>
                        {getDateFormat(el?.startDate)}
                      </span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ p: "5px 20px" }}>
                    End Date :
                    <span style={{ fontWeight: 600 }}>
                      {getDateFormat(el?.endDate)}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ p: "5px 20px" }}>
                    University Name :
                    <span style={{ fontWeight: 600 }}>
                      {el?.universityName}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: "30px" }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography sx={{ p: "5px 20px" }}>
                        Collage Name :
                        <span style={{ fontWeight: 600 }}>
                          {el?.collegeName}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ p: "5px 20px" }}>
                        Course Type :
                        <span style={{ fontWeight: 600 }}>
                          {el?.courseType}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })}
          <Grid xs={12}>
            <Box sx={{ borderTop: "1px solid lightgrey", m: "13px 0px" }}></Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{ padding: "30px 0", borderBottom: "1px solid lightgrey" }}
            >
              <Typography sx={{ fontSize: "19px" }}>Resume</Typography>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <Box>
                  <Typography sx={{ marginBottom: "10px" }}>
                    {data.firstName} {data.lastName} Resume
                  </Typography>
                  {/* <Typography>"(Last updated on 15 August 2021)"</Typography> */}
                </Box>
                <Box>
                  {data?.documents?.resume && (
                    <Button sx={{ marginRight: "10px" }} onClick={onDownload}>
                      View Resume
                    </Button>
                  )}
                  <>
                    <Button component="label">
                      <input hidden type="file" onChange={resumeUpload} />
                      Update New Resume
                    </Button>
                  </>

                  <Typography>Upload only .doc or pdf</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ p: "0px 20px" }}>
              <h3>Introduction Video</h3>
              <video
                width="100%"
                height="20%"
                src={
                  data?.documents?.introductionVideo
                    ? data?.documents?.introductionVideo?.documentLink
                    : ""
                }
                type={"video/mp4"}
                controls
              ></video>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px 0",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <Button variant="outlined">Upload Introduction Video</Button>
              </Box>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ p: "0px 20px" }}>
              <h3> Trade Video </h3>
              <video
                width="100%"
                height="20%"
                src={
                  data?.documents?.workVideo
                    ? data?.documents?.workVideo?.documentLink
                    : ""
                }
                type={"video/mp4"}
                controls
              ></video>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
                borderBottom: "1px solid lightgray",
              }}
            >
              <Button variant="outlined">Upload Trade Video</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PersonalDetails;
