import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import CandidateListComponent from "./CandidateListComponentApplied";
import { userContext } from "../AppliedJob";

function AddedCandidates() {
  const PORT = 4004;
  const token = localStorage.getItem("jwt");
  const descriptionData = useContext(userContext);
  const [jobID, setJobID] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  useEffect(() => {
    setJobID(descriptionData?._id);
  }, [descriptionData]);
  useEffect(() => {
    getAddedCandidates();
  }, [jobID]);

  const getAddedCandidates = async () => {
    try {
      const res = await axios.get(
        `https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/jobs/getAddedCandidates`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            jobId: jobID,
            page: "1",
            pageSize: "8",
          },
        }
      );
      setCandidateList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {candidateList.map((el, index) => {
        return <CandidateListComponent data={el} key={index} />;
      })}
    </>
  );
}

export default AddedCandidates;
