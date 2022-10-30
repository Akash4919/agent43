import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Alert } from "@mui/material";
import axios from "axios";
import classes from "./AgentProfile.module.css";

// passportCopy
// passportPhoto
// aadharCard
// panCard
// govtIdCard

const AgentDocument = () => {
  const [docSend, setDocSEnd] = useState(1);
  const [backendFile, setBackendFile] = useState({});
  const [localFile, setLocaLFile] = useState({
    passportCopy: false,
    passportPhoto: false,
    aadharCard: false,
    panCard: false,
    govtIdCard: false,
  });

  const token = localStorage.getItem("jwt");
  useEffect(() => {
    axios({
      method: "get",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/documents/getAllAgentDocuments",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setBackendFile(response.data.data.doc.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [docSend]);

  const handleChange = (event, docType) => {
    const fileBlob = event.target.files[0];
    console.log(fileBlob);
    const formData = new FormData();
    formData.append("documentType", docType);
    formData.append("agent-document", fileBlob);

    fileData(formData);
  };
  const fileData = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/documents/uploadDocument",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDocSEnd((prevState) => prevState + 1);
    } catch (err) {
      alert("Document Upload Failed(*Try to upload .pdf file Only)");
      console.log(err);
    }
  };

  useEffect(() => {
    setLocaLFile((prevState) => {
      return {
        passportPhoto: backendFile.passportPhoto?.documentLink ? true : false,
        passportCopy: backendFile.passportCopy?.documentLink ? true : false,
        aadharCard: backendFile.aadharCard?.documentLink ? true : false,
        panCard: backendFile.panCard?.documentLink ? true : false,
        govtIdCard: backendFile.govtIdCard?.documentLink ? true : false,
      };
    });
  }, [backendFile]);
  //
  const handleDelete = async (docType) => {
    let payload = { documentType: docType };

    axios({
      method: "delete",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/documents/deleteAgentDocument",
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setDocSEnd((prevState) => prevState + 1);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const compulsoryViewDocument = async (documentName) => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/documents/getAgentDocuments/${documentName}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      let url = response?.data?.data.doc.document.documentLink;
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
      alert(" View file Failed");
    }
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ p: "10px 0px" }}>
            Document
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "10px 0px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: 700 }}>1. Aadhar Card</Typography>
            </Box>
            <Box>
              {localFile.aadharCard ? (
                <Box>
                  <Button
                    sx={{ m: "0px 10px" }}
                    onClick={() => handleDelete("aadharCard")}
                    variant="outlined"
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.viewButton}
                    onClick={() => compulsoryViewDocument("aadharCard")}
                  >
                    View
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  className={classes.uploadButton}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleChange(e, "aadharCard")}
                  />
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "10px 0px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: 700 }}>2. Pan Card</Typography>
            </Box>
            <Box>
              {localFile.panCard ? (
                <Box>
                  <Button
                    sx={{ m: "0px 10px" }}
                    onClick={() => handleDelete("panCard")}
                    variant="outlined"
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.viewButton}
                    onClick={() => compulsoryViewDocument("panCard")}
                  >
                    View
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  className={classes.uploadButton}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleChange(e, "panCard")}
                  />
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "10px 0px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontWeight: 700 }}>3. Govt Passport</Typography>
            </Box>
            <Box>
              {localFile.passportCopy ? (
                <Box>
                  <Button
                    sx={{ m: "0px 10px" }}
                    onClick={() => handleDelete("passportCopy")}
                    variant="outlined"
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.viewButton}
                    onClick={() => compulsoryViewDocument("passportCopy")}
                  >
                    View
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  className={classes.uploadButton}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleChange(e, "passportCopy")}
                  />
                </Button>
              )}
            </Box>
          </Box>
          <Typography variant="h5" sx={{ p: "10px 0px" }}>
            Other Country Document
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "10px 0px",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>
                4. Govt Provide Citizen ID Card
              </Typography>
            </Box>
            <Box>
              {localFile.govtIdCard ? (
                <Box>
                  <Button
                    sx={{ m: "0px 10px" }}
                    onClick={() => handleDelete("govtIdCard")}
                    variant="outlined"
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.viewButton}
                    onClick={() => compulsoryViewDocument("govtIdCard")}
                  >
                    View
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  className={classes.uploadButton}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleChange(e, "govtIdCard")}
                  />
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "10px 0px",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>5. Passport</Typography>
            </Box>

            <Box>
              {localFile.passportPhoto ? (
                <Box>
                  <Button
                    sx={{ m: "0px 10px" }}
                    onClick={() => handleDelete("passportPhoto")}
                    variant="outlined"
                    className={classes.deleteButton}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.viewButton}
                    onClick={() => compulsoryViewDocument("passportPhoto")}
                  >
                    View
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  className={classes.uploadButton}
                >
                  Upload
                  <input
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleChange(e, "passportPhoto")}
                  />
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentDocument;
