import React,{useState, useContext} from "react";
import { TextField, Button, Box , Typography,Alert, AlertTitle} from "@mui/material";
import { validateEmail, validatePassword } from './validation';
import { UserContext } from "../../contexts/user-context";

export default function Login() {
  const [isLoginMode, setIsLoginMode]=useState(true)
  const [showErrorEmail, setShowErrorEmail]=useState(false)
  const [showErrorPassword, setShowErrorPassword]=useState(false)
  const [showErrorName, setShowErrorName]=useState(false)
  const {setAuthSucceed}= useContext(UserContext)
  
  const switchModeHandler=()=>{
    setIsLoginMode(prev=>!prev)
  }

  let name;
  let email;
  let password;
  const validateForm=(e)=>{
    const data = new FormData(e.currentTarget);
    email = data.get('email');
    password = data.get('password');
    name=data.get('name');
    if(!isLoginMode && name.length==0){
      setShowErrorName('Please enter a user name')
    }
    const passwordValidateError = validatePassword(password)
    if (passwordValidateError) {
      setShowErrorPassword(passwordValidateError);
    }
    const emailValidateResult = validateEmail(email)
    if (!emailValidateResult) {
      setShowErrorEmail("Please enter valid email address");
    }
    if(isLoginMode){
      return (emailValidateResult && !passwordValidateError)
    }else{
      return (emailValidateResult && !passwordValidateError &&(!isLoginMode && name.length!==0))
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    //validate the form
    if(validateForm(e)){
      let form
      if(isLoginMode){
        form ={
          email: email,
          password:password
        }
      }else{
        form ={
          name:name,
          email:email,
          password:password
        }
      }
      console.log(form)
      setAuthSucceed(true)
    }
  }

  return (
    <>
        <Box
          sx={{my:8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
          <Typography component="h1" variant="h5">{isLoginMode?'LOG IN': 'SIGN UP'}</Typography>
          <Box sx={{width:'50%'}}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {!isLoginMode&& (
                <TextField
                  error={showErrorName}
                  helperText={showErrorName}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />
              )}
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
              <Button 
                variant="contained" 
                type="submit" 
                fullWidth 
                sx={{ mt: 3, mb: 2 }}
              >Submit</Button>
            </Box>
            <Button variant="outlined" fullWidth onClick={switchModeHandler} sx={{ mt: 3, mb: 2 }}>SWITCH TO {isLoginMode?'SIGN UP': 'LOG IN'}</Button>
          </Box>
        </Box>
    </>
  )
}
