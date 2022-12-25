import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Login = ({setLoginUser})=>{
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
    window.location.reload(false);
  }
  
  const login=()=>{
    axios.post("https://loginappbackend.onrender.com/login",user)
    .then(res=>{alert(res.data.message)
          setLoginUser(res.data.user)
          history.push("/")
        })
  }
  return (
    <Box backgroundColor='white'  borderRadius={3} sx={{width:'20rem', height:'28rem',p:3,boxShadow:'0px 0px 4px 0px #dee2e8;'}}>
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
  )
}

export default Login