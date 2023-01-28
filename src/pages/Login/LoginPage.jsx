import React from "react";
import "./login.css";
import { TextField, Button } from "@mui/material";

export default function Login() {

  return (
    <div className="body">
      <div class="login-box">
        <h2>Login / Sign Up</h2>
        <TextField
          fullWidth
          required
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button size="large" type="submit" fullWidth variant="contained">
          Login
        </Button>

        <Button size="large" type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
          Create Account
        </Button>
        
      </div>
    </div>
  );
}
