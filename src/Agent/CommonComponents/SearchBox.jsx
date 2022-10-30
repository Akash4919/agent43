import {
  Paper,
  Box,
  Button,
  InputBase,
  Divider,
  useMediaQuery,
} from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useForm } from "react-hook-form";
import axios from "axios";
import classes from "./navbar.module.css";
function Searchbox(props) {
  const { setJobsList } = props;
  const matches = useMediaQuery("(min-width:700px)");

  const onSubmit = (data) => {
    getData(data);
  };
  const getData = async (data) => {
    try {
      const response = await axios.get(
        "https://startlazaa-dev.herokuapp.com/eman-api/v1/candidateJobRoute/searchJobs",
        {
          params: {
            jobDesignation: data.jobDesignation,
            location: data.location,
          },
        },
        {
          headers: {
            authorization: "",
            "Content-Type": "application/json",
          },
        }
      );
      setJobsList(response?.data?.searchJobs);
    } catch (err) {
      console.log(err);
    }
  };
  const { control, register, handleSubmit } = useForm({});
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        m: "30px 0",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={
            matches
              ? { display: "flex" }
              : { display: "flex", flexDirection: "column" }
          }
        >
          {matches ? (
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: " 500px",
                justifyContent: "space-evenly",
              }}
            >
              <SearchSharpIcon sx={{ marginLeft: "20px", color: "grey" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Job title or keyword"
                name="jobDesignation"
                {...register("jobDesignation")}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <LocationOnOutlinedIcon
                sx={{ marginLeft: "20px", color: "grey" }}
              />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="State,Country"
                name="location"
                {...register("location")}
              />
            </Paper>
          ) : (
            <>
              <Paper sx={!matches ? { width: "90vw", mb: "10px" } : {}}>
                <SearchSharpIcon sx={{ marginLeft: "20px", color: "grey" }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Job title or keyword"
                  name="jobDesignation"
                  {...register("jobDesignation")}
                />
              </Paper>
              <Paper sx={!matches ? { width: "90vw", mb: "10px" } : {}}>
                <LocationOnOutlinedIcon
                  sx={{ marginLeft: "20px", color: "grey" }}
                />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="State,Country"
                  name="location"
                  {...register("location")}
                />
              </Paper>
            </>
          )}
          <Button
            variant="outlined"
            type="submit"
            className={classes.applyIcon}
            sx={matches ? { ml: "10px" } : { width: "100%" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Searchbox;
