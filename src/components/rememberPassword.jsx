import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const RememberPassword = () => {
  return (
    <Typography variant="body2" sx={{ textAlign: "center" }}>
      Remember your password?
      <Link href="/auth/login/" style={{ marginLeft: "10px" }}>
        Login Now
      </Link>
    </Typography>
  );
};

export default RememberPassword;
