import { Avatar } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./drawer.module.css";
const Drawer = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.outerBox}>
      <div className={classes.topBox}></div>
      <div className={classes.backButton}>
        <ArrowBackIcon onClick={() => navigate(-1)} />
      </div>
      <div className={classes.avatarBox}>
        <Avatar
          alt="AC"
          sx={{ width: 70, height: 70 }}
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        />
        <div style={{ color: "white" }}>
          <h2>Peter Theil</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/home/profile/personalDetails">Update Profile</Link>
          </div>
        </div>
      </div>
      <div className={classes.tabBox}>
        <div className={classes.linkTab}>
          <NavLink
            exact
            className={({ isActive }) =>
              isActive ? `${classes.activeLink}` : `${classes.link}`
            }
            to="/home/findJob/descriptionComponent"
          >
            Find Job
          </NavLink>
        </div>
        <div className={classes.linkTab}>
          <NavLink
            exact
            className={({ isActive }) =>
              isActive ? `${classes.activeLink}` : `${classes.link}`
            }
            to="/home/appliedJob/descriptionComponent"
          >
            Applied Job
          </NavLink>
        </div>
        <div className={classes.linkTab}>
          <NavLink
            exact
            className={({ isActive }) =>
              isActive ? `${classes.activeLink}` : `${classes.link}`
            }
            to="/home/savedJob/descriptionComponent"
          >
            Saved Job
          </NavLink>
        </div>
        <div className={classes.linkTab}>
          <NavLink
            exact
            className={({ isActive }) =>
              isActive ? `${classes.activeLink}` : `${classes.link}`
            }
            to="/home/meetings"
          >
            My Meetings
          </NavLink>
        </div>
        <div className={classes.linkTab}>
          <NavLink
            exact={true}
            className={classes.link}
            style={{ color: "red" }}
            to="/home/myApplicant"
          >
            My Applicant
          </NavLink>
        </div>
        <div className={classes.linkTab}>
          <NavLink
            exact={true}
            className={classes.link}
            style={{ color: "red" }}
            to="/logout"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
