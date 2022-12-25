import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Homepage = ({userData})=>{
  return (
    <Box backgroundColor='white'  borderRadius={3} sx={{width:'400px', height:'300px', p:3, boxShadow:'0px 0px 4px 0px #dee2e8', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Typography variant='h5'> Welcome {userData.name}</Typography>
      <Typography variant='h5'>Your Email is {userData.email}</Typography>
    </Box>
  )
}

export default Homepage