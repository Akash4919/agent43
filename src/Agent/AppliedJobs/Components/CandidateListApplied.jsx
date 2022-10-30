import React, { useEffect, useState, useContext } from "react";
import CandidateListComponent from "./CandidateListComponentApplied";
import { userContext } from "../AppliedJob";
import axios from "axios";

function CandidateListApplied() {
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
      {CandidateList.map((el, index) => {
        return <CandidateListComponent key={index} data={el} />;
      })}
    </>
  );
}

export default CandidateListApplied;
