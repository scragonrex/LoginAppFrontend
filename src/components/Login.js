import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Login = ({setLoginUser})=>{
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [user, setUser] = useState({
    email:"",
    password:""
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

  const handleClick =()=>{
    history.push("/register");
    // window.location.reload(false);
  }
  
  const login=()=>{
    setOpen(true);
    axios.post("https://loginappbackend.onrender.com/login",user)
    .then(res=>{alert(res.data.message)
          setLoginUser(res.data.user)
          history.push("/")
          setOpen(false)
        })
  }
  return (
    <Box width='100vw' height='100vh' m={0} p={0} sx={{display:'flex', flexDirection:'column'}}>
    { open&&<Box m={0} sx={{ width: '100%' }}>
    <LinearProgress sx={{height:'5px'}}/>
  </Box>}
    <Box backgroundColor='white' borderRadius={3} sx={{width:'20rem', height:'28rem',p:3,boxShadow:'0px 0px 6px 0px #dee2e8', margin:'auto'}}>
      <Typography variant='h4' component='div' textAlign='center'>Login</Typography>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <TextField name='email' value={user.email}  onChange={handleChange} id="outlined-basic" label="Email" variant="outlined" sx={{margin:'1rem 3rem'}}/>
        <FormControl sx={{margin:'1rem 3rem'}} variant="outlined">
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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            />
        </FormControl>
        <Button variant="contained" sx={{margin:'1rem 5.5rem'}} onClick={login}>Login</Button>
        <Button variant="contained" sx={{margin:'1rem 5.5rem'}} onClick={handleClick}>Register</Button>
    </Box>
    </Box>
</Box>
  )
}

export default Login