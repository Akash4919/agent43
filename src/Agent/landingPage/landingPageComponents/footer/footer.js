import { Container, Grid, Link, Typography } from "@mui/material";

import React from "react";

const Footer = () => {
  return (
    <>
      <Grid container sx={{ padding: "60px 85px", backgroundColor: "white" }}>
        <Grid item xs={12} sm={6} md={3}>
          <div style={{ padding: "0px 20px" }}>
            <h2>Logo</h2>
            <p>
              joobs is the largest talent platformin Southeast Asia and Taiwan
              for career development and recruitment.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div style={{ padding: "0px 10px", paddingLeft: "20%" }}>
            <h3>Employer</h3>
            <div>
              <Link style={{ textDecoration: " none", color: "black" }}>
                About Us
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: " none", color: "black" }}>
                Careers
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: " none", color: "black" }}>
                Blog
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div style={{ padding: "0px 20px" }}>
            <h3>Find vacancy Based on</h3>
            <div>
              <Link
                style={{
                  textDecoration: " none",
                  color: "black",
                }}
              >
                Help Center
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: " none", color: "black" }}>
                Job Location
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: " none", color: "black" }}>
                Company Name
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div style={{ padding: "0px 20px" }}>
            <h3>Address</h3>
            <p>Hello@jobb.com</p>
            <p>
              Jl. Setiabudhi No. 193 Sukasari, Bangdung west java, indonesia
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <p>2022 Hazar Hamzah- All right reserved.</p>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
