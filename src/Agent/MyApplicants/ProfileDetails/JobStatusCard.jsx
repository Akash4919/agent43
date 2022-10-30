import { Button, Typography, Box, Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../MyApplicant";
import axios from "axios";
import JobPortal from "./JobPortal";
import { getDateFormat } from "./AgentaddCandidate/Datafunction";
const JobsProfiles = () => {
  const data = useContext(userContext);
  const token = localStorage.getItem("jwt");
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    getAllJobs();
  }, [data._id]);
  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/candidates/getAgentCandidateJobs",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            candidateId: data._id,
            page: 1,
            pageSize: 20,
          },
        }
      );
      console.log(res);
      setJobList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(jobList);
  return (
    <div>
      {jobList.length <= 0 ? (
        <h3>NO JOB APPLIED TO THIS CANDIDATE</h3>
      ) : (
        <>
          {jobList?.map((el, index) => {
            return (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: "10px 0px",
                  }}
                >
                  {console.log(
                    el?.createdById?.companyInformation?.companyLogo
                  )}
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      src={
                        el?.createdById?.companyInformation?.companyLinks[0]
                          ?.domainUrl
                      }
                      sx={{ width: "50px", height: "50px" }}
                    />

                    <Typography sx={{ p: "10px 20px", fontWeight: "600" }}>
                      {el?.jobDesignation}
                    </Typography>
                  </Box>
                  <Typography sx={{ p: "10px 20px", fontWeight: "600" }}>
                    {el.candidateJobStatus}
                  </Typography>
                  <Typography
                    sx={{ p: "10px 20px", color: "lightgrey" }}
                  ></Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    // p: "10px 0px",
                    mt: "-10px",
                  }}
                >
                  <Typography sx={{ pl: "15px", pt: "10px" }}>
                    Applied to :
                    <span style={{ fontWeight: 700 }}>
                      {el?.recruiterCompanyName}
                    </span>
                  </Typography>
                  <Typography sx={{ pl: "15px" }}>
                    Applied on :
                    <span style={{ fontWeight: 700 }}>
                      {getDateFormat(el?.candidateJobDate)}
                    </span>
                  </Typography>
                  <Box sx={{ mt: "-30px" }}>
                    <JobPortal id={el._id} />
                  </Box>
                </Box>
                <Typography
                  sx={{ borderBottom: "1px solid lightgrey", p: "6px 0px" }}
                ></Typography>
              </Box>
            );
          })}
        </>
      )}
    </div>
  );
};

export default JobsProfiles;
