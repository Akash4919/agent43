import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page, setJobID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  console.log(page, query);
  const sendQuery = useCallback(async () => {
    const PORT = 4004;
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFnZW50LS02MzI5NDYwNjQyZjdlNGYyMjkyZTAyMDEiLCJpYXQiOjE2NjM2NDkzMTUsImV4cCI6MTY3MTQyNTMxNX0.ny86WFChT7vGOe78oSY27z332bEfjzQQhyvreu8wzoQ`;

    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(query, {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });

      console.log(res.data.data.doc);
      await setList((prev) => [...prev, ...res.data.data.doc]);
      setJobID(list[0]._id);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;
