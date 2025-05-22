import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Box
        className="login-form slide-up"
        component="form"
        sx={{
          m: 1,
          width: "25ch",
          //   border: "2px solid black",
          padding: 3,
          //   borderRadius: 4,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center", color:"white" }}
        >
          Login
        </Typography>
        <TextField id="standard-basic" label="Email" variant="standard" />
        <TextField id="standard-basic" label="Password" variant="standard" />
        <Grid container spacing={0} sx={{ pt: 2, pb: 2 }}>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="rememberMe" />}
              label={
                <Typography sx={{ fontSize: "0.7rem" }}>Remember me</Typography>
              }
            />
          </Grid>
          <Grid item xs={6} sx={{ pt: 1.5 }}>
            <Link to={"/"}>
              <Typography sx={{ fontSize: "0.7rem" }}>
                Forgot Password?
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Button
          variant="contained"
            component={Link}
            to="/home"
          sx={{
            maxWidth:"75px",
            mx: "auto",
            display: "block",
            backgroundImage:
              "linear-gradient(to right, rgb(23, 185, 28), #81C784)",
            color: "#ffffff",
            border: "none",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, rgb(128, 244, 4), rgb(0, 0, 0))",
            },
          }}
        >
          Login
        </Button>

        <Typography sx={{ fontSize: "0.9rem", pt: 2 }}>
          Don't have an account? <Link>Signup</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
