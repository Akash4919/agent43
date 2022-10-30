import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import classes from "./AddProfile.module.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const DocumentUpload = () => {
  const [handleNext] = useOutletContext();
  // const [value, setValue] = useState(false);
  const [file, setFile] = useState();
  const [workExpArray, setWorkExpArray] = useState([]);
  const [backendFile, setBackendFile] = useState({});
  const [docSend, setDocSEnd] = useState(1);
  const [localFile, setLocalFile] = useState({
    passportPhoto: false,
    passportCopy: false,
    policeCertificate: false,
    educationCertificate: {},
    workExp: {},
  });
  const candidateID = localStorage.getItem("candidateId");
  console.log(localFile);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getAllCandidateDocuments",

      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        candidateId: candidateID,
      },
    })
      .then((response) => {
        setBackendFile(response.data.data.doc.documents);
      })
      .catch((error) => {
        console.log(error);
      });

    /////IMP setWorkExpArray
  }, [docSend]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateWX/getAllWorkExp",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        candidateId: candidateID,
      },
    })
      .then((response) => {
        let backendExpArray = response.data.data.doc.workExperience;
        let dummyArray = [];
        backendExpArray.map((ele, index) => {
          dummyArray.push({ expName: `exp${index + 1}` });
        });

        setWorkExpArray(dummyArray);
        setDocSEnd((prevState) => prevState + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getWorkExpObj = (workExpArray, backEndObject) => {
    //workRxpArray = [ { expName: "exp1" },
    //                 { expName: "exp2" },]

    let getExpBoolean = (workExperienceCertificates, expArrayEle) => {
      let localExp = workExperienceCertificates.filter(
        (ele) => ele.fileType === expArrayEle.expName
      );
      if (localExp[0]) {
        return true;
      } else {
        return false;
      }
    };

    let expObj = {};
    let workExperienceCertificates = backEndObject.workExperienceCertificates;
    workExpArray.map((ele, index) => {
      if (backEndObject.workExperienceCertificates) {
        expObj[ele.expName] = getExpBoolean(workExperienceCertificates, ele);
      }
    });
    return expObj;
  };

  useEffect(() => {
    // {
    //   passportPhoto: false,
    //   passportCopy: false,
    //   policeCertificate: false,
    //   educationCertificate: [],
    //   workExp: [],
    // }

    let testVal = backendFile.educationalCertificates?.some(
      (ele) => ele.fileType === "hpsc"
    );

    setLocalFile((prevState) => {
      return {
        passportPhoto: backendFile.passportPhoto?.documentLink ? true : false,
        passportCopy: backendFile.passportCopy?.documentLink ? true : false,
        policeCertificate: backendFile.policeClearanceCertificate?.documentLink
          ? true
          : false,
        educationCertificate: {
          ssc: backendFile.educationalCertificates?.some(
            (ele) => ele.fileType === "ssc"
          ),
          hsc: backendFile.educationalCertificates?.some(
            (ele) => ele.fileType === "hsc"
          ),
        },
        workExp: getWorkExpObj(workExpArray, backendFile),
      };
    });
  }, [backendFile]);

  const handleChange = (event, docType, file) => {
    let fileType = file;

    const fileBlob = event.target.files[0];

    const formData = new FormData();
    formData.append("documentName", fileBlob.name);
    formData.append("documentType", docType);
    formData.append("candidateId", candidateID);
    if (fileType) {
      formData.append("fileType", fileType);
    }
    formData.append("candidate-document", fileBlob);
    fileData(formData);
  };

  const fileData = async (data) => {
    try {
      const response = await axios.post(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/uploadCandidateDocument",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // setValue(true);
      // alert("Document Uploaded");
      setDocSEnd((prevState) => prevState + 1);
    } catch (err) {
      // setValue(false);
      alert("Document not Uploaded (*Try to upload .pdf File only)");
      console.log(err);
    }
  };

  const handleDelete = async (docType, fileType) => {
    // /deleteRequest
    // if (response.data.status === "success") {
    //   setDocSEnd((prevState) => prevState + 1);
    // }

    let payload = { documentType: docType, candidateId: candidateID };

    if (fileType) {
      payload["fileType"] = fileType;
    }
    console.log(payload);
    axios({
      method: "delete",
      url: "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/deleteCandidateDocument",
      data: payload,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setDocSEnd((prevState) => prevState + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //

  const compulsoryViewDocument = async (documentName, nestedDocument) => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateUD/getCandidateDocument/${documentName}`,
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
      let url;
      if (response.data.data.doc.document[0]) {
        if (nestedDocument == "hsc" || nestedDocument == "exp2") {
          url = response.data.data.doc.document[0].documentLink;
        } else {
          url = response.data.data.doc.document[1].documentLink;
        }
      } else {
        url = response?.data?.data.doc.document.documentLink;
      }
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
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <Box sx={{ backgroundColor: "lightgrey", padding: "40px" }}>
        <Card>
          <CardContent>
            <Box
              sx={matches ? { padding: "0px 20px" } : { padding: "0px 80px" }}
            >
              <h3>Uploded Document</h3>
              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  1. Passport Photo
                  <span style={{ color: "#f11900" }}>*</span>
                </Typography>
                <Box>
                  {localFile.passportPhoto ? (
                    <Box>
                      <Button
                        onClick={() => compulsoryViewDocument("passportPhoto")}
                        variant="outlined"
                        className={classes.nextButton}
                        sx={{ m: " 0px 10px" }}
                      >
                        View
                      </Button>
                      <Button
                        component="label"
                        onClick={() => handleDelete("passportPhoto")}
                        variant="outlined"
                        className={classes.saveButton}
                      >
                        Delete
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      className={classes.nextButton}
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleChange(e, "passportPhoto")}
                      />
                    </Button>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  2. Passport (Front & Back)
                  <span style={{ color: "#f11900" }}>*</span>
                </Typography>

                <Box>
                  {localFile.passportCopy ? (
                    <Box>
                      <Button
                        onClick={() => compulsoryViewDocument("passportCopy")}
                        variant="outlined"
                        className={classes.nextButton}
                        sx={{ m: " 0px 10px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.saveButton}
                        onClick={() => handleDelete("passportCopy")}
                      >
                        Delete
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      className={classes.nextButton}
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleChange(e, "passportCopy")}
                      />
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  3. Police Clearance certificate
                  <span style={{ color: "#f11900" }}>*</span>
                </Typography>

                <Box>
                  {localFile.policeCertificate ? (
                    <Box>
                      <Button
                        onClick={() =>
                          compulsoryViewDocument("policeClearanceCertificate")
                        }
                        variant="outlined"
                        className={classes.nextButton}
                        sx={{ m: " 0px 10px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.saveButton}
                        onClick={() =>
                          handleDelete("policeClearanceCertificate")
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      className={classes.nextButton}
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleChange(e, "policeClearanceCertificate")
                        }
                      />
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography> 4. SSC</Typography>
                <Box>
                  {localFile.educationCertificate.ssc ? (
                    <Box>
                      <Button
                        onClick={() =>
                          compulsoryViewDocument(
                            "educationalCertificates",
                            "ssc"
                          )
                        }
                        variant="outlined"
                        className={classes.nextButton}
                        sx={{ m: " 0px 10px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.saveButton}
                        onClick={() =>
                          handleDelete("educationalCertificates", "ssc")
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      className={classes.nextButton}
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleChange(e, "educationalCertificates", "ssc")
                        }
                      />
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "10px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography> 5. HSC</Typography>

                <Box>
                  {localFile.educationCertificate.hsc ? (
                    <Box>
                      <Button
                        onClick={() =>
                          compulsoryViewDocument(
                            "educationalCertificates",
                            "hsc"
                          )
                        }
                        variant="outlined"
                        className={classes.nextButton}
                        sx={{ m: " 0px 10px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        className={classes.saveButton}
                        onClick={() =>
                          handleDelete("educationalCertificates", "hsc")
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      className={classes.nextButton}
                    >
                      Upload
                      <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleChange(e, "educationalCertificates", "hsc")
                        }
                      />
                    </Button>
                  )}
                </Box>
              </Box>

              {workExpArray.map((ele, index) => (
                <Box
                  sx={{
                    padding: "10px 0px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    {6 + index}. Work Experince {index + 1}
                  </Typography>
                  <Box>
                    {localFile.workExp[`exp${index + 1}`] ? (
                      <Box>
                        <Button
                          onClick={() =>
                            compulsoryViewDocument(
                              "workExperienceCertificates",
                              `exp${index + 1}`
                            )
                          }
                          variant="outlined"
                          className={classes.nextButton}
                          sx={{ m: " 0px 10px" }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          className={classes.saveButton}
                          onClick={() =>
                            handleDelete(
                              "workExperienceCertificates",
                              `exp${index + 1}`
                            )
                          }
                        >
                          Delete
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="contained"
                        className={classes.nextButton}
                      >
                        Upload
                        <input
                          hidden
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            handleChange(
                              e,
                              "workExperienceCertificates",
                              `exp${index + 1}`
                            )
                          }
                        />
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 0px",
                }}
              >
                <Box sx={{ padding: "0px 10px" }}>
                  <Button
                    variant="outlined"
                    sx={{ border: "1px solid #828282" }}
                  >
                    {" "}
                    <Link
                      to="/home/myApplicant/newApplicant/candidateworkexp"
                      style={{
                        color: "#828282",
                        textDecoration: " auto",
                        padding: "2px 0px",
                      }}
                    >
                      Previous
                    </Link>
                  </Button>
                </Box>
                {localFile.educationCertificate.ssc == true &&
                localFile.passportCopy == true &&
                localFile.passportPhoto == true &&
                localFile.policeCertificate == true ? (
                  <Box>
                    <Button variant="outlined" className={classes.saveButton}>
                      <Link
                        to="/home/myApplicant/newApplicant/uploadvideo"
                        style={{
                          textDecoration: " auto",
                          padding: "2px 15px",
                        }}
                        className={classes.saveButton}
                        onClick={handleNext}
                      >
                        Next
                      </Link>
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ padding: "0px 10px" }}>
                    <Typography sx={{ color: "red" }}>
                      *YOU NEED TO UPLOAD ALL DOCUMENT
                    </Typography>
                  </Box>
                )}
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default DocumentUpload;
