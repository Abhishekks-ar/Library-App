import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <Box
        className="login-form slide-up"
        component="form"
        sx={{
          m: 1,
          width: "25ch",
          padding: 3,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          Login
        </Typography>

        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

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
          type="submit"
          variant="contained"
          sx={{
            maxWidth: "75px",
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
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
