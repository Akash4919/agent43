import * as React from "react";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Autocomplete,
  Stack,
} from "@mui/material";
import classes from "./AgentProfile.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflow: "scroll",
};

export default function AgentProfilemodal(props) {
  const { data, setUp, up } = props;
  // console.log(data);
  const [open, setOpen] = React.useState(false);
  const [companyTypeValue, setCompanyTypeValue] = useState(null);
  const [companyStrengthValue, setCompanyStrengthValue] = useState(null);
  const token = localStorage.getItem("jwt");
  const companyStrengthRange = [
    "0-19 Employees",
    "20-99 Employees",
    "100-499 Employees",
    "500-2000 Employees",
    "> 2000 Employees",
  ];
  const companyTypeOptions = [
    "Private Limited Company",
    "Public Company ",
    "Sole Proprietorship",
    "Government Organization",
    " Limited Liability Partnership (LLP)",
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string("Name must be string").required(
      "*Company Name is required"
    ),
    companyEmail: Yup.string("")
      .required("*Email is required")
      .max(70, "maximum 70 character")
      .email("Email is invalid"),
    companyMobile: Yup.string("").required("*CompanyMobile Name is required"),
    companyAddress: Yup.string("").required("*Address Name is required"),
    companyAbout: Yup.string("").required("*Aboutcompany Name is required"),
    companyStrength: Yup.string().required("*Field is required"),
    companyType: Yup.string().required("*Field is required"),
    domainName: Yup.string("").required("*CompanyWebsite  is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    let companyLink = [
      { domainName: data.domainName, domainUrl: data.companyEmail },
    ];
    const SendData = { ...data, companyLinks: companyLink };

    const sendAgentData = async () => {
      try {
        const res = await axios.post(
          "https://startlazaa-dev.herokuapp.com/eman-api/v1/agent/profile/addProfileInfo",
          SendData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        handleClose();
        setUp(up + 1);
      } catch (err) {
        console.log(err);
        alert("Data not Saved Found some error");
      }
    };
    sendAgentData();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon sx={{ width: "30px", height: "30px", p: "20px 0px" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.scroll}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ padding: "0px 20px" }}>Agent Profile</h2>
            <Button onClick={handleClose}>
              <HighlightOffIcon sx={{ marginLeft: "30px", fontSize: "30px" }} />
            </Button>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Name</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  name="companyName"
                  defaultValue={data?.companyName}
                  {...register("companyName")}
                  error={errors.companyName ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyName?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}> Company Email Id</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  name="companyEmail"
                  defaultValue={data?.companyEmail}
                  {...register("companyEmail")}
                  error={errors.companyEmail ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyEmail?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Mobile.No</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  defaultValue={data?.companyMobile}
                  name="companyMobile"
                  {...register("companyMobile")}
                  error={errors.companyMobile ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyMobile?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Location</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  defaultValue={data?.companyAddress}
                  name="companyAddress"
                  {...register("companyAddress")}
                  error={errors.companyAddress ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyAddress?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Website</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  name="domainName"
                  defaultValue={data?.domainName}
                  {...register("domainName")}
                  error={errors.domainName ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.domainName?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Type</label>

                <Stack>
                  <Autocomplete
                    options={companyTypeOptions}
                    defaultValues={data?.companyType}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register("companyType")}
                      />
                    )}
                    value={companyTypeValue}
                    name="companyType"
                    {...register("companyType")}
                    onChange={(e, newValue) => setCompanyTypeValue(newValue)}
                  />
                </Stack>
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyType?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}>Company Strength</label>

                <Stack>
                  <Autocomplete
                    options={companyStrengthRange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register("companyStrength")}
                      />
                    )}
                    value={companyStrengthValue}
                    name="companyStrength"
                    {...register("companyStrength")}
                    onChange={(e, newValue) =>
                      setCompanyStrengthValue(newValue)
                    }
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.companyStrength?.message}
                  </FormHelperText>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "grid", p: "0px 20px" }}>
                <label style={{ padding: "8px 0px" }}> AboutCompany</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  multiline
                  maxRows={4}
                  defaultValue={data?.companyAbout}
                  name="companyAbout"
                  {...register("companyAbout")}
                  error={errors.companyAbout ? true : false}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.companyAbout?.message}
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "center", p: " 30px 20px" }}
          >
            <Button
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
              className={classes.saveButton}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
