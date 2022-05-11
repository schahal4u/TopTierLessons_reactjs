import React, { useState, useEffect } from "react";
import {
  Container,
  CardContent,
  Item,
  TextField,
  Card,
  Box,
  Typography,
} from "@mui/material";
import "../Assets/Css/login.css";
import logo from "../Assets/Images/logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { pink } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AdminLoginAction } from "../Redux/Actions/AdminLoginAction";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetProfileDetailAction } from "../Redux/Actions/AdminGetProfileDetail";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SnackbarModal from "../Component/modals/SnackbarModal";

const Login = () => {
  let accessToken;
  const { adminInfo, error } = useSelector((state) => state.adminLogin);
  const { profileDetail, profileError } = useSelector(
    (state) => state.getProfileDetail
  );

  const defautFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormData = (e) => {
    if (loginSuccess === true) {
      setLoginSuccess(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    if (formData.username === "" || formData.password === "") {
      setLoginSuccess(true);
      setSnackbar({ ...snackbar, open: true });
      setFormData({ ...formData, username: "", password: "" });
    } else {
      if (formData.username != "" && formData.password != "") {
        dispatch(AdminLoginAction(formData));
      }
    }
  };

  // useEffect(() => {
  //   const accessToken = localStorage.token;
  //   const adminInfo = JSON.parse(localStorage.adminInfo);

  //   if (
  //     accessToken != null &&
  //     getProfileDetail?.success === true &&
  //     adminInfo != null
  //   ) {
  //     history.push("/dashboard");
  //   } else {
  //     history.push("/login");
  //   }
  // }, []);

  const profileGetting = async () => {
    accessToken = localStorage.token;

    if (accessToken != null) {
      dispatch(AdminGetProfileDetailAction());
    }
  };

  useEffect(() => {
    if (error?.success === false) {
      setLoginSuccess(true);
      setSnackbar({ ...snackbar, open: true });
      setFormData({ ...formData, username: "", password: "" });
    }
    if (adminInfo != null && adminInfo?.success === true) {
      profileGetting();
    }
  }, [adminInfo, error]);

  useEffect(() => {
    if (profileDetail != null && profileDetail?.success === true) {
      history.push("/dashboard");
    }
    if (profileError != null && profileError?.success === false) {
      setSnackbar({ ...snackbar, open: true });
      setFormData({ ...formData, username: "", password: "" });
    }
  }, [profileDetail]);

  // if (accessToken != null && JSON.parse(localStorage.adminInfo) != null) {
  //   return <Redirect to={"/dashboard"} />;
  // }

  // const handleClick = (newState) => () => {

  // };

  const handleClose = () => setSnackbar({ ...snackbar, open: false });
  return (
    <>
      <SnackbarModal handleClose={handleClose} snackbar={snackbar} />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        className="LoginScreen"
      >
        <Box
          component="img"
          sx={{
            height: 186,
            width: 186,
            maxHeight: { xs: 186, md: 186 },
            maxWidth: { xs: 300, md: 300 },
          }}
          alt="The house from the offer."
          src={logo}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "55px",
              fontWeight: "bold",
              mx: "auto",
              my: 1,
            }}
          >
            Login
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <AlternateEmailIcon
              style={loginSuccess ? { color: "#D32F2F" } : { color: "#FFFFFF" }}
              sx={{ color: "action.active", mx: 1.5, my: 1 }}
            />

            <TextField
              error={loginSuccess ? true : false}
              // helperText={loginSuccess ? "something went wrong" : ""}
              name="username"
              margin="normal"
              id="input-with-sx"
              label="Username"
              variant="standard"
              value={formData.username}
              onChange={handleFormData}
              InputLabelProps={{
                sx: {
                  color: "#FFFFFF",
                },
              }}
              sx={{
                width: "350px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockOutlinedIcon
              style={loginSuccess ? { color: "#D32F2F" } : { color: "#FFFFFF" }}
              sx={{ color: "action.active", mx: 1.5, my: 1 }}
            />
            <TextField
              error={loginSuccess ? true : false}
              // helperText={loginSuccess ? "something went wrong" : ""}
              name="password"
              margin="normal"
              id="input-with-sx"
              label="Password"
              variant="standard"
              value={formData.password}
              onChange={handleFormData}
              InputLabelProps={{
                sx: {
                  color: "#FFFFFF",
                },
              }}
              InputProps={{
                borderColor: "#FFFFFF",
              }}
              sx={{ width: "350px" }}
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              align="right"
              sx={{
                color: "white",
                my: 0.6,
                // textAlign: "right",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box sx={{ mx: "auto" }}>
            <Button
              sx={{
                px: 7,
                my: 3,
                borderRadius: "30px",
                fontSize: "20px",
              }}
              variant="contained"
              onClick={() => loginHandler()}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Login;
