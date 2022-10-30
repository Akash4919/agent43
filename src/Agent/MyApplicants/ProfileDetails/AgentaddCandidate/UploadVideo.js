import { Box, Paper, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import classes from "./AddProfile.module.css";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
function UploadVideo() {
  const [src, setSrc] = useState("");
  const [tsrc, tsetSrc] = useState("");
  const [ref, setRef] = useState(1);

  const candidateID = localStorage.getItem("candidateId");

  let token = localStorage.getItem("jwt");

  const port = 5004;
  useEffect(() => {
    getVideoPreview();
    getTradePreview();
  }, [ref]);
  let getVideoPreview = async () => {
    try {
      let response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getCandidateDocument/introductionVideo`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: candidateID,
          },
        }
      );
      console.log(response);
      let videourl = response.data.data.doc.document.documentLink;
      setSrc(videourl);
      console.log(videourl);
    } catch (err) {
      console.log(err);
    }
  };
  let getTradePreview = async () => {
    try {
      let response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getCandidateDocument/workVideo`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: candidateID,
          },
        }
      );
      console.log(response);
      let videourl = response.data.data.doc.document.documentLink;
      tsetSrc(videourl);
    } catch (err) {
      console.log(err);
    }
  };
  const uploadIntroVideo = (e) => {
    const uploadVideo = e.target.files[0];
    console.log(uploadVideo);
    const formData = new FormData();
    formData.append("documentName", "introductionVideo");
    formData.append("documentType", "introductionVideo");
    formData.append("candidateId", candidateID);
    formData.append("candidate-document", uploadVideo);

    if (!uploadVideo.size >= 50000) {
      alert("File is to Big to Upload,It should be less than 50mb");
    } else {
      introUpload(formData, uploadVideo);
    }
  };
  const introUpload = async (formData, uploadVideo) => {
    try {
      let response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/uploadCandidateDocument`,

        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(URL.createObjectURL(uploadVideo));
      setRef(ref + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const uploadTradeVideo = (e) => {
    // const [handleNext] = useOutletContext();
    const tradeVideo = e.target.files[0];
    const formData = new FormData();
    formData.append("documentName", "workVideo");
    formData.append("documentType", "workVideo");
    formData.append("candidateId", candidateID);
    formData.append("candidate-document", tradeVideo);

    if (!tradeVideo.size >= 50000) {
      alert("File is to Big to Upload,It should be less than 50mb");
    } else {
      tradeUpload(formData, tradeVideo);
    }
  };
  const tradeUpload = async (formData, tradeVideo) => {
    try {
      let response = await axios.post(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/uploadCandidateDocument`,

        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setRef(ref + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const addCandidate = () => {
    alert("CANDIDATE ADDED SUCCESSFULLY");
  };
  return (
    <Box sx={{ backgroundColor: "lightgrey", padding: "50px" }}>
      <Paper sx={{ p: "20px 70px" }}>
        <Box sx={{ p: "20px 10px", borderBottom: "2px solid lightgrey" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            INTRODUCTION VIDEO
          </Typography>
        </Box>
        <Box sx={{ p: "30px 10px" }}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "20px",
            }}
          >
            <Box>
              <Typography sx={{ mb: "10px", fontWeight: "bold" }} variant="h6">
                Payal Patil Video .MP4
              </Typography>
              <Typography st={{ mb: "10px" }} variant="h6">
                (Last updated on 15 August 2021)
              </Typography>
            </Box>
            <Box>
              <Box>
                <Button
                  sx={{ fontSize: "18px", color: "#828282" }}
                  component="label"
                >
                  Upload New Video
                  <input
                    hidden
                    accept="video/*"
                    type="file"
                    onChange={uploadIntroVideo}
                  />
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                (Upload Only MP4)
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ height: "20%" }}>
          <VideoComponent src={src} />
        </Box>
        <Box sx={{ p: "20px 10px", borderBottom: "2px solid lightgrey" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            SKILL DEMONSTRATION
          </Typography>
        </Box>
        <Box sx={{ p: "30px 10px" }}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "20px",
            }}
          >
            <Box>
              <Typography sx={{ mb: "10px", fontWeight: "bold" }} variant="h6">
                Payal Patil Video .MP4
              </Typography>
              <Typography st={{ mb: "10px" }} variant="h6">
                (Last updated on 15 August 2021)
              </Typography>
            </Box>
            <Box>
              <Box>
                <Button
                  sx={{ fontSize: "18px", color: "#828282" }}
                  component="label"
                >
                  Upload New Video
                  <input
                    hidden
                    accept="video/*"
                    type="file"
                    onChange={uploadTradeVideo}
                  />
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                (Upload Only MP4)
              </Box>
            </Box>
          </Paper>
        </Box>{" "}
        <Box sx={{ height: "10%" }}>
          <VideoComponent src={tsrc} />
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <Box sx={{ padding: "0px 10px" }}>
            <Button variant="outlined" sx={{ border: "1px solid #828282" }}>
              <Link
                to="/home/myApplicant/newApplicant/documentupload"
                style={{
                  color: "#828282",
                  textDecoration: " auto",
                  padding: "2px 0px",
                }}
              >
                {" "}
                Previous
              </Link>{" "}
            </Button>
          </Box>
          <Box sx={{ padding: "0px 10px" }}>
            <Button
              variant="outlined"
              className={classes.saveButton}
              sx={{ padding: "7px 10px" }}
              to={"/home/myApplicant/CandidateProfile"}
              component={RouterLink}
              onClick={addCandidate}
            >
              Add Candidate
            </Button>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}

export default UploadVideo;
