import React,{useState, useContext, useId} from "react";
import { TextField, Button, Box , Typography, CircularProgress, Snackbar, Alert} from "@mui/material";
import { validateEmail, validatePassword } from './validation';
import { UserContext } from "../../contexts/user-context";
import useHttpClient from '../../hooks/http-hook'
import ImageUpload from "../../components/imageUpload/imageUpload";
import AlertMessage from "../../components/AlertMessage";

export default function Login() {
  const [isLoginMode, setIsLoginMode]=useState(true)
  const [showErrorEmail, setShowErrorEmail]=useState(false)
  const [showErrorPassword, setShowErrorPassword]=useState(false)
  const [showErrorName, setShowErrorName]=useState(false)
  const [alertOpen, setAlertOpen]=useState(false)
  const {setAvatar, login,token}= useContext(UserContext)
  const {isLoading, loadingError,sendRequest}= useHttpClient()
  //image file
  const [file, setFile] = useState()
  
  //swith between signup/login
  const switchModeHandler=()=>{
    setIsLoginMode(prev=>!prev)
  }
  const closeAlertHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  let data;
  let name;
  let email;
  let password;
  const validateForm=(e)=>{
    data = new FormData(e.currentTarget);
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
  const handleSubmit=async(e)=>{
    e.preventDefault()
    //validate the form
    if(validateForm(e)){
      let form
      if(isLoginMode){
        form ={
          email: email,
          password:password
        }
        try {
          const responseData= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`,"POST",JSON.stringify({email:form.email,password:form.password}), {"Content-Type":"application/json"})
          login(responseData.userId, responseData.token,responseData.image)
        } catch (err) {
        }
        setAlertOpen(true)
      }else{
        if(file){
          try {
            data.append('image',file)
            const responseData= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,"POST",data)
            login(responseData.userId, responseData.token,responseData.image)
          } catch (err) {
          }
          setAlertOpen(true)
        }
      }
    }
  }

  return (
    <>
        <Box
          sx={{my:8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
          {
              isLoading? (<CircularProgress size={200}/>): (
                <>
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

                    {!isLoginMode && <ImageUpload file={file} setFile={setFile}/>}

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
                </>
              )
          }
          <Snackbar open={alertOpen} autoHideDuration={3000} onClose={closeAlertHandler} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            {
              token? (
                <Alert onClose={closeAlertHandler} severity="success" sx={{ width: '100%' }}>
                  Successfully Login/Signup
                </Alert>
              ):(
                <Alert onClose={closeAlertHandler} severity="error" sx={{ width: '100%' }}>
                  {loadingError}
                </Alert>
              )
            }
          </Snackbar>
          <AlertMessage open={!file&& !isLoginMode}>Please upload your avatar </AlertMessage>
        </Box>
    </>
  )
}
