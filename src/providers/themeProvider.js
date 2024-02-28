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
    const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'dark');
    const toggleThemeMode = () => {
        setThemeMode(prevMode => {
            const newMode = prevMode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
        const savedThemeMode = localStorage.getItem('themeMode');
        if (savedThemeMode) {
            setThemeMode(savedThemeMode);
        }
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Navbar toggleThemeMode={toggleThemeMode} darkMode={themeMode === 'dark'}/>
            {children}
        </MuiThemeProvider>
    );
}
