import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Register = ()=>{
  const [invalidIn, setInvalidIn] = useState(false);
  const [incPass, setIncPass] = useState(false);
  const [loginSuc, setLoginSuc] = useState(false);
  const [userAlready, setUserAlready] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleChange = (e)=>{
    const {name ,value} = e.target
    setUser(
      {
        ...user,
          [name]:value
      }
    )
  }
  const register=()=>{
    setOpen(true);
    const {name, email, password, confirmPassword}=user;
    if(name && email && password)
    { if(password === confirmPassword)
      {
        setIncPass(false);
        axios.post("https://loginappbackend.onrender.com/register", user)
        .then(res=>{
            let mes = res.data.message;
            if(mes === "Registered Successfully")
            setLoginSuc(true);
            if(mes === "User already registered. Please login now")
            setUserAlready(true);
            setOpen(false);
            handleClick();
          })
      }
      else
      {
        setIncPass(true);
        setOpen(false);
      }
    }
    else{
      setInvalidIn(true);
      setOpen(false);
    }
  }

  const handleClick =()=>{
    history.push("/login");
    // window.location.reload(false);
  }
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUserAlready(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginSuc(false);
  };
  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInvalidIn(false);
  };
  return (
    <Box width='100vw' height='100vh' m={0} p={0} sx={{display:'flex', flexDirection:'column'}}>
    {open &&  <Box m={0} sx={{ width: '100%' }}>
    <LinearProgress sx={{height:'5px'}} />
  </Box>}
  <Snackbar open={userAlready} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal:            'center' }}  onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="info">User already registered!. Please Login</Alert>
  </Snackbar>
  <Snackbar open={loginSuc} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal:            'center' }}  onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success">Registered sucessfully!</Alert>
  </Snackbar>
  <Snackbar open={invalidIn} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal:            'center' }}  onClose={handleClose3}>
        <Alert onClose={handleClose3} severity="error">Invalid input!</Alert>
  </Snackbar>
    <Box backgroundColor='white'  borderRadius={3} sx={{width:'20rem', height:'33rem',p:3, boxShadow:'0px 0px 4px 0px #dee2e8', margin:'auto'}}>
      <Typography variant='h4' component='div' textAlign='center'>Register</Typography>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <TextField name='name' value={user.name}  onChange={handleChange} id="name" label="Username" variant="outlined" error={false} sx={{margin:'1rem 1.5rem'}}/>
        <TextField name='email' value={user.email}  onChange={handleChange} id="email" label="Email" variant="outlined" sx={{margin:'1rem 1.5rem'}}/>
        <FormControl sx={{margin:'1rem 1.5rem'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            name='password'
            value={user.password} onChange={handleChange} 
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility />: <VisibilityOff /> }
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{margin:'1rem 1.5rem'}} variant="standard" error={incPass}>
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
            name='confirmPassword'
            value={user.confirmPassword}
            id="standard-adornment-password" onChange={handleChange} 
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {incPass && <FormHelperText>Invalid password</FormHelperText>}
        </FormControl>
        <Button variant="contained" sx={{margin:'0.5rem 5.5rem'}} onClick={register}>Register</Button>
        <Typography variant='h6' textAlign='center'>or</Typography>
        <Button variant="contained" sx={{margin:'0.5rem 5.5rem'}} onClick={handleClick}>Login</Button>
    </Box>
    </Box>
    </Box>
  )
}

export default Register