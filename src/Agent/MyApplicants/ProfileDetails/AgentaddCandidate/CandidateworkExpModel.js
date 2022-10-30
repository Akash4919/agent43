import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import classes from "./AddProfile.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditIcon from "@mui/icons-material/Edit";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "65%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "10px 10px",
  overflow: "scroll",
};

export default function CandidateworkExpModel(props) {
  const [open, setOpen] = React.useState(false);
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    designation: Yup.string("Name must be string").required(
      "*Designation is required"
    ),
    companyName: Yup.string("Name must be string").required(
      "*Company Name is required"
    ),
    workLocation: Yup.string().required("*Work Locationis required"),
    responsibility: Yup.string("Name must be string")
      .required("* Role & Responsibility is required")
      .min(50, "Minimun 50 Words")
      .max(300, "Maximun 200 Wrods"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
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
    const formData = data;
    handleClose();
    if (props.buttonName === <EditIcon />) {
      formData.id = props.docData.id;
    }
    props.buttonName === "Add Experience"
      ? props.handleAdd(formData)
      : props.handleEdit(formData);
  };

  return (
    <div>
      <Box sx={{ paddingTop: "10px" }}>
        <Button onClick={handleOpen}>{props.buttonName}</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.scroll} sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleClose}>
              <HighlightOffIcon sx={{ marginLeft: "30px" }} />
            </Button>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ display: "grid" }}>
                <label style={{ padding: "3px 15px", fontWeight: 600 }}>
                  Designation
                </label>
                <TextField
                  required
                  id="designation"
                  name="designation"
                  defaultValue={props.docData ? props.docData.designation : ""}
                  margin="dense"
                  {...register("designation")}
                  error={errors.designation ? true : false}
                  size="small"
                  sx={{ padding: "0px 15px", paddingBottom: "20px" }}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ padding: "0px 20px" }}
                >
                  {errors.designation?.message}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ display: "grid" }}>
                <label style={{ padding: "3px 15px", fontWeight: 600 }}>
                  Comapny Name
                </label>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  defaultValue={props.docData ? props.docData.companyName : ""}
                  size="small"
                  margin="dense"
                  sx={{ padding: "0px 15px", paddingBottom: "10px" }}
                  {...register("companyName")}
                  error={errors.companyName ? true : false}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ padding: "0px 20px" }}
                >
                  {errors.companyName?.message}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <lable style={{ padding: "8px 15px", fontWeight: 600 }}>
                Start Date :
              </lable>
              <Box>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        inputFormat="dd/MM/yyyy"
                        {...register("startDate")}
                        error={errors.startDate ? true : false}
                        defaultValue={
                          props.docData ? props.docData.startDate : ""
                        }
                        onChange={(event) => {
                          onChange(event);
                          setStartDate(event);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{
                              width: "-webkit-fill-available",
                              padding: "8px 15px",
                              paddingBottom: "20px",
                            }}
                          />
                        )}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText sx={{ color: "red", paddingLeft: "20px" }}>
                  {errors.startDate?.message}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <lable style={{ padding: "5px 15px", fontWeight: 600 }}>
                End Date :
              </lable>
              <Box>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        inputFormat="dd/MM/yyyy"
                        {...register("endDate")}
                        error={errors.companyname ? true : false}
                        defaultValue={
                          props.docData ? props.docData.endDate : ""
                        }
                        onChange={(event) => {
                          onChange(event);
                          setEndDate(event);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            sx={{
                              width: "-webkit-fill-available",
                              padding: "8px 15px",
                              paddingBottom: "15px",
                            }}
                          />
                        )}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />
                <FormHelperText sx={{ color: "red", paddingLeft: "20px" }}>
                  {errors.endDate?.message}
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Box sx={{ display: "grid" }}>
              <Box>
                <label style={{ margin: "8px 15px", fontWeight: 600 }}>
                  Work Location
                </label>
                <Box>
                  <TextField
                    required
                    id="workLocation"
                    name="workLocation"
                    size="small"
                    margin="dense"
                    defaultValue={
                      props.docData ? props.docData.workLocation : ""
                    }
                    {...register("workLocation")}
                    error={errors.workLocation ? true : false}
                    sx={{
                      padding: "3px 15px",
                      width: "-webkit-fill-available",
                      paddingBottom: "15px",
                    }}
                  />
                  <Typography
                    variant="inherit"
                    color="textSecondary"
                    sx={{ padding: "0px 20px" }}
                  >
                    {errors.workLocation?.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <lable style={{ padding: "8px 15px", fontWeight: 600 }}>
                Role & Responsibility :
              </lable>
              <Box>
                <TextField
                  id="responsibility"
                  name="responsibility"
                  multiline
                  margin="dense"
                  rows={3}
                  placeholder="Maximum 200 Words."
                  defaultValue={
                    props.docData ? props.docData.responsibility : ""
                  }
                  {...register("responsibility")}
                  error={errors.responsibility ? true : false}
                  sx={{
                    padding: "3px 15px",
                    display: "grid",
                    paddingBottom: "15px",
                  }}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ padding: "0px 20px" }}
                >
                  {errors.responsibility?.message}
                </Typography>
              </Box>
            </Box>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 0px",
              }}
            >
              <Button
                variant={"outlined"}
                onClick={handleSubmit(onSubmit)}
                className={classes.saveButton}
                sx={{ padding: "7px 30px" }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
