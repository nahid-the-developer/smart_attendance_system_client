import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const ProfileOption = () => {
  const options = [{name: "Profile", path: '/profile'}];
  const link =
    "https://scontent.fjsr1-1.fna.fbcdn.net/v/t39.30808-1/431543286_1527318811162112_9202064736696775829_n.jpg?stp=c525.145.928.928a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEwbwzjUryv1-QrmzsILS3iLdyEqlZ-EIwt3ISqVn4QjI_Bnu3PfahD7o6ZspBvXYq35uBYrdNgPaS_QT9JOQvS&_nc_ohc=5qxrgNiXkEAQ7kNvgGvJ5n0&_nc_ht=scontent.fjsr1-1.fna&oh=00_AYBrxMUAe8v8aIl_pC2hdj7Pgby6qhuwrUIdvFAzlnKT1g&oe=667228E4";

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Profile Photo" src={link} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <Link
              href={option.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {option.name}
            </Link>
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            signOut();
            handleCloseUserMenu;
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileOption;
