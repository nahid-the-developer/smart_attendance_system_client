import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const LeftSide = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'10px'}}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <Typography fontSize='20px'>Nahid Hasan</Typography>
      <Button size="small" variant="contained">Edit Profile</Button>
    </Box>
  );
};

export default LeftSide;
