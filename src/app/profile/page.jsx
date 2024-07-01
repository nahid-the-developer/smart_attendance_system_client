'use client'
import React, {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {httpClient} from "@/utils/api";
import {TokenContext} from "@/context/tokenContext";
import Avatar from "@mui/material/Avatar";
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import TakeSample from "@/components/face_detaction/TakeSample";

const Profile = () => {
    const [user, setUser] = useState()
    const context = useContext(TokenContext);

    useEffect(() => {
        if (context === 'added') {
            httpClient.get(`/profile/profile/`)
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log("Error fetching profile:", err);
                })
        }
    }, [context]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 4,
            }}
        >
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                flexWrap: 'wrap'
            }}>
                <Avatar
                    alt={user?.name}
                    src={user?.avatar}
                    sx={{width: 120, height: 120}}
                />
                <Box sx={{display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <TakeSample/>
                    <Button variant="contained">
                        Train Data
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{maxWidth: 600}}>
                <Table aria-label="profile information">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">Name</Typography>
                            </TableCell>
                            <TableCell>{user?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">ID</Typography>
                            </TableCell>
                            <TableCell>{user?.academic_id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">Batch</Typography>
                            </TableCell>
                            <TableCell>{user?.batch}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">Semester</Typography>
                            </TableCell>
                            <TableCell>{user?.semester}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">Department</Typography>
                            </TableCell>
                            <TableCell>{user?.department}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle1">Email</Typography>
                            </TableCell>
                            <TableCell>{user?.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default Profile;
