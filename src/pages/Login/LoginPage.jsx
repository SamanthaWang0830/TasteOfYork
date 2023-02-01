import React,{useState} from "react";
import { TextField, Button, Box , Typography, Grid, Paper} from "@mui/material";
import { validateEmail, validatePassword } from './validation';
import logo from './logo.JPG'

export default function Login() {
  const [isLoginMode, setIsLoginMode]=useState(true)
  const [showErrorEmail, setShowErrorEmail]=useState(false)
  const [showErrorPassword, setShowErrorPassword]=useState(false)

  
  const switchModeHandler=()=>{
    setIsLoginMode(prev=>!prev)
  }

  const validateForm=(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const passwordValidateError = validatePassword(password)
    if (passwordValidateError) {
      setShowErrorPassword(passwordValidateError);
    }
    const emailValidateResult = validateEmail(email)
    if (!emailValidateResult) {
      setShowErrorEmail("Please enter valid email address");
    }
    return (emailValidateResult && !passwordValidateError )
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    validateForm(e)
  }

  return (
    <>
        <Box
          sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
          <Typography component="h1" variant="h5">{isLoginMode?'LOG IN': 'SIGN UP'}</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {! isLoginMode && (
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
              variant="outlined"
            />)}
            <TextField
              error={showErrorEmail}
              helperText={showErrorEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              
            />
            <TextField
              error={showErrorPassword}
              helperText={showErrorPassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>Submit</Button>
            <Button variant="outlined" fullWidth onClick={switchModeHandler} sx={{ mt: 3, mb: 2 }}>SWITCH TO {isLoginMode?'SIGN UP': 'LOG IN'}</Button>
          </Box>
        </Box>
    </>
  )
}
