import React, { useEffect, useState, useContext } from "react";
import CandidateListComponent from "./CandidateListComponent";
import { userContext } from "../FindJobs";
import axios from "axios";

function CandidateList() {
  const data = useContext(userContext);
  const [CandidateList, setCandidateList] = useState([]);
  const [candidatePageNo, setCandidatePageNo] = useState(1);

  const token = localStorage.getItem("jwt");
  const getAllCandidates = async () => {
    try {
      const res = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getCandidateList`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            pageSize: 8,
            page: candidatePageNo,
            jobId: data._id,
          },
        }
      );
      console.log(res);
      setCandidateList(res?.data?.data?.docs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllCandidates();
  }, [data._id]);
  return (
    <>
      {CandidateList.length > 0 ? (
        CandidateList.map((el, index) => {
          return <CandidateListComponent key={index} data={el} />;
        })
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>No Candidate Left To Apply</h4>
        </div>
      )}
    </>
  );
}

export default CandidateList;
