import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Register = ()=>{
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
    const {name, email, password, confirmPassword}=user;
    if(name && email && password && (password === confirmPassword))
    {
      axios.post("https://loginappbackend.onrender.com/register", user)
      .then(res=>{alert(res.data.message)
            handleClick()})
     
    }
    else{
      alert("Invalid input");
    }
  }

  const handleClick =()=>{
    history.push("/login");
    // window.location.reload(false);
  }
  
  return (
    <Box backgroundColor='white'  borderRadius={3} sx={{width:'20rem', height:'33rem',p:3,boxShadow:'0px 0px 4px 0px #dee2e8;'}}>
      <Typography variant='h4' component='div' textAlign='center'>Register</Typography>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <TextField name='name' value={user.name}  onChange={handleChange} id="name" label="Username" variant="outlined" sx={{margin:'1rem 1.5rem'}}/>
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{margin:'1rem 1.5rem'}} variant="standard">
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" sx={{margin:'0.5rem 5.5rem'}} onClick={register}>Register</Button>
        <Typography variant='h6' textAlign='center'>or</Typography>
        <Button variant="contained" sx={{margin:'0.5rem 5.5rem'}} onClick={handleClick}>Login</Button>
    </Box>
    </Box>
  )
}

export default Register