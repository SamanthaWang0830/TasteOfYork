import React from "react";
import "./login.css";
import { TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Login() {
  const white = grey[50];

  return (
    <div className="body">
      <div class="login-box">
        <h2>Login / Sign Up</h2>
        <TextField
          className="textField"
          fullWidth
          required
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          className="textField"
          fullWidth
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          className="btn"
          size="large"
          type="submit"
          fullWidth
          variant="contained"
        >
          Login
        </Button>

        <Button
          className="btn"
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
