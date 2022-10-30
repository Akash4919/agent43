import {
  Button,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./navbar.module.css";
const NaVBar = function () {
  const [portal, setPortal] = useState("Candidate");

  const portalChangeHandler = (e) => {
    setPortal(e.target.value);
    console.log(portal);
  };

  const matches = useMediaQuery("(min-width:700px)");

  return (
    <div className={classes.navbarBox}>
      <div className={classes.logo}>
        {matches ? <h1>STARTLAZAA</h1> : <h1>SL</h1>}
      </div>
      <div className={classes.buttonBox}>
        <div>
          <FormControl
            className={classes.dropDownBtn}
            sx={{ m: 1, minWidth: 80 }}
          >
            <Select
              value={portal}
              onChange={portalChangeHandler}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                width: { sx: "100px", md: "150px" },
                height: `${matches ? "40px" : "30px"}`,
              }}
            >
              <MenuItem value="Candidate">Candidate</MenuItem>
              <MenuItem value="Recruiter">Recruiter</MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            className={classes.signUpBut}
            variant="contained"
            component={Link}
            to="/signIn"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NaVBar;
