import { useState, React, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDateFormat } from "./Datafunction";
import * as Yup from "yup";
// import "./style.css";
// import classes from "../EducationComponent/educationalDetails.module.css";

function PersonalDetailsChildren(props) {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setInitial(props.childrenArray);
  }, [props.childrenArray]);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Field is required"),
    gender: Yup.string().required("Field is required"),
    dateOfBirth: Yup.string().required("Field is required"),
  });

  const saveChild = (data) => {
    props.handleAdd(data);
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "40%",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    boxShadow: 24,
    p: 5,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  return (
    <>
      <Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Click to Add Child Information</Typography>
            <Button onClick={() => handleOpen("add", {})}>
              <AddCircleOutlineOutlinedIcon
                sx={{ fontSize: "30px", color: "#337AB7" }}
              />
            </Button>
          </Box>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit(saveChild)}>
            <Box sx={style}>
              <Typography>Full Name:</Typography>
              <TextField
                id="fullName"
                name="fullName"
                {...register("fullName")}
                error={errors.fullName ? true : false}
                // sx={{ width: "80%" }}
              />
              <FormHelperText sx={{ color: "red", ml: "20px" }}>
                {errors.fullName?.message}
              </FormHelperText>
              <Typography>Gender</Typography>
              <Select
                size="small"
                // sx={{ width: "80%" }}
                id="gender"
                name="gender"
                {...register("gender")}
                error={errors.gender ? true : false}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "red", ml: "20px" }}>
                {errors.gender?.message}
              </FormHelperText>
              <Typography>Date Of Birth</Typography>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      inputFormat="dd/MM/yyyy"
                      onChange={(event) => {
                        onChange(event);
                      }}
                      error={errors.dateOfBirth ? true : false}
                      renderInput={(params) => <TextField {...params} />}
                      {...restField}
                    />
                  </LocalizationProvider>
                )}
              />
              <FormHelperText sx={{ color: "red", ml: "20px" }}>
                {errors.dateOfBirth?.message}
              </FormHelperText>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ mt: "10px", width: "30%" }}
                  // className={classes.saveButton}
                  onClick={handleSubmit(saveChild)}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Modal>
      </Box>
      <Box>
        {initial.map((child, index) => {
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6"> Child {index + 1}</Typography>
                <Button onClick={() => props.handleDelete(child)}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  p: "5px 20px",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">
                  Full Name: {child.fullName}
                </Typography>

                <Typography variant="h6">Gender: {child.gender}</Typography>

                <Typography variant="h6" sx={{ paddingRight: "30px" }}>
                  Date Of Birth: {getDateFormat(child.dateOfBirth)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default PersonalDetailsChildren;
