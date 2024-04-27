'use client'
import React, {useEffect, useState} from 'react';
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme} from "@mui/material";
import Navbar from "@/components/Navbar";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ThemeProvider({children}) {

    useEffect(() => {
    }

    return (
            <CssBaseline/>
            {children}
        </MuiThemeProvider>
    );
}
