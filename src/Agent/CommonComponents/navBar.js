import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  Tab,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./navbar.module.css";
import { Link as RouterLink } from "react-router-dom";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import logo from "./logo.jpeg";
const Navbar = (props) => {
  const [value, setValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleLogOut = () => {
    localStorage.removeItem("jwt");
    dispatch(authActions.logout());
    handleClose();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTimeout(() => {
      props.handleActive(window.location.href);
    }, 100);
  };

  const handleNavChange = () => {
    setValue("4");
  };
  const matchSm = useMediaQuery("(min-width:600px)"); // less than 600 - false

  console.log(matchSm);

  return (
    <div>
      <div className={classes.backBox}></div>
      <div className={classes.mainOuterBox}>
        <div className={classes.logoBox}>
          <img src={logo} style={{ maxWidth: "70%" }} />
        </div>
        <div className={classes.tabBox}>
          {matchSm && (
            <TabContext value={value}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", height: "100%" }}
              >
                <TabList onChange={handleChange} aria-label="Tabs">
                  <Tab
                    label="Find Jobs"
                    style={{ minHeight: "65px" }}
                    value="1"
                    component={RouterLink}
                    to="/home/findJob/descriptionComponent"
                  />
                  <Tab
                    label="Applied Jobs"
                    value="2"
                    component={RouterLink}
                    to="/home/appliedJob/descriptionComponent"
                  />
                  <Tab
                    label="Saved Jobs"
                    value="3"
                    component={RouterLink}
                    to="/home/savedJob/descriptionComponent"
                  />
                  <Tab
                    label="My Candidates"
                    value="4"
                    component={RouterLink}
                    to="/home/myApplicant/CandidateProfile"
                  />
                  <Tab
                    label="My Meetings"
                    value="5"
                    component={RouterLink}
                    to="/home/meetings"
                  />
                </TabList>
              </Box>
            </TabContext>
          )}
        </div>
        <div className={classes.rightBox}>
          <div>
            <NotificationsNoneRoundedIcon fontSize="large" />
          </div>
          <div>
            {matchSm ? (
              <div>
                <IconButton onClick={handleMenu}>
                  <AccountCircleRoundedIcon fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/home/profile/personalDetails"
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    onClick={HandleLogOut}
                    to="/"
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <IconButton
                component={RouterLink}
                onClick={handleNavChange}
                to="/drawer"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
