import React, { useEffect, useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { userId } from "../MyApplicant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const ViewDocuments = () => {
  const candidateId = useContext(userId);
  const token = localStorage.getItem("jwt");
  const [reqListDoc, setReqDocList] = useState([]);
  const [docSend, setDocSEnd] = useState(1);
  const [up, setUp] = useState(1);
  useEffect(() => {
    getRequestedDocument();
  }, [up]);
  const getRequestedDocument = async () => {
    try {
      const res = await axios.get(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/mdoc/documents/getAllDataOfCandidateDocs",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: candidateId,
          },
        }
      );
      setReqDocList(res?.data?.docData?.docRequestedByRecruiter);
    } catch (err) {
      console.log(err);
    }
  };
  const uploadDocument = async (e, documentName) => {
    const fileBlob = e.target.files[0];

    const formData = new FormData();
    formData.append("documentType", documentName);
    formData.append("candidateId", candidateId);
    formData.append("document", fileBlob);
    sendDocument(formData);
  };
  const sendDocument = async (data) => {
    try {
      const res = await axios.post(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/mdoc/documents/uploadReqDocByCandidate",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setUp(up + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const onDownload = async (documentName) => {
    try {
      const response = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/mdoc/documents/getReqDocsByRecruiter`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: candidateId,
            documentName: documentName,
          },
        }
      );
      let url = response?.data?.link;
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
  const handleReqDocDelete = (docName) => {
    console.log(docName);

    axios({
      method: "delete",
      url: "https://startlazaanikhil.herokuapp.com/eman-api/v1/candidateUD/deleteReqDocument",
      params: { documentName: docName },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setDocSEnd((prevState) => prevState + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Box>
        <div>
          <h3>Required Documents</h3>
        </div>
        {reqListDoc.length <= 0 ? (
          <div>
            <h4>NO DOCUMENTS REQUESTED BY EMPLOYER</h4>
          </div>
        ) : (
          <div>
            {reqListDoc?.map((el, index) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <span style={{ fontSize: "18px" }}>{el.documentName}</span>
                  </Box>
                  <Box sx={{ mt: "-5px" }}>
                    {!el?.isDocumentIsUploaded ? (
                      <Button component="label">
                        Upload
                        <input
                          hidden
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => uploadDocument(e, el.documentName)}
                        />
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => onDownload(el.documentName)}>
                          View
                        </Button>
                        <Button
                          onClick={() => handleReqDocDelete(el.documentName)}
                        >
                          <DeleteOutlinedIcon
                            sx={{
                              color: "#f11900",
                            }}
                          />
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              );
            })}
          </div>
        )}
      </Box>
    </>
  );
};

export default ViewDocuments;
