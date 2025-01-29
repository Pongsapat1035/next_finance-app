"use client"
import { Container } from "@mui/material";
import { AuthProvider } from "./authContext";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function RootLayout({ children }) {
  console.log('this is from root layout')
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Finance track</title>
      </head>
      <body>
        <AuthProvider>
          <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
