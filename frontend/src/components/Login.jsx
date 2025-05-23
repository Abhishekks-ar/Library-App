import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
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
          width: "31ch",
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

        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <TextField
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

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
            maxWidth: "100px",
            mx: "auto",
            display: "block",
            backgroundColor: "#30204d",
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: 1,
            borderRadius: "4px",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#a366ff",
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px #30204d",
            },
          }}
        >
          Login
        </Button>

        <Typography sx={{ fontSize: "0.9rem", pt: 2 }}>
          Don't have an account? <Link to="/">Signup</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
