import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { httpClient } from "@/utils/api";

const ProfileOption = () => {
  const options = [{ name: "Profile", path: "/profile" }];
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [avatarUrl, setAvatarUrl] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      httpClient
        .get("/profile/avatar/")
        .then((response) => {
          if (response.status === 200) {
            setAvatarUrl(response.data.avatar_url);
          }
        })
        .catch((error) => {
          console.error("Error fetching the avatar URL:", error);
        });
    }
  }, [session]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src={avatarUrl} />
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
