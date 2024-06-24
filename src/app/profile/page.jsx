import LeftSide from "@/components/profile/leftSide";
import RightSide from "@/components/profile/rightSide";
import { Grid } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <LeftSide />
      </Grid>
      <Grid item xs={12} md={8}>
        <RightSide />
      </Grid>
    </Grid>
  );
};

export default Profile;
