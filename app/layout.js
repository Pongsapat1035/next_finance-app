"use client"
import { Container } from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './style/main.css'
import { AlertProvider } from "./alertContext";
const theme = createTheme({
  palette: {
    primary: {
      main: '#232323',
      light: '#7D7D7D'
    },
    error: {
      main: '#F46F6F',
      light: '#FFF2F2',
      dark: '#C3291B'
    },
    success: {
      main: '#5AAE25',
      light: '#F1F8E9',
      dark: '#46B693'
    },
    background: {
      main: '#F0F0F0',
      paper: '#ffffff',
      base: '#F1F0F0'
    }
  },
  typography: {
    fontFamily: '"Inria sans", "Helvetica", "Arial", sans-serif'
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: '#232323'
      },
      styleOverrides: {
        root: {
          color: '#FFF2F2'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                borderRadius: 50,
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.7rem 0',
                textTransform: 'none',
                boxShadow: 'none'
              },
            },
            {
              props: { variant: 'square' },
              style: {
                borderRadius: 5,
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.7rem 0',
                textTransform: 'none',
                boxShadow: 'none',
                color: '#ffffff',
                backgroundColor: '#232323'
              },
            },
          ],
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        square: false,
        elevation: 0
      },
      styleOverrides: {
        root: {
          borderRadius: '20px'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#F46F6F',
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#232323'
        }
      }
    }

  }

});

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Finance track</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <Container>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
              </LocalizationProvider>
            </Container>
          </AlertProvider>
        </ThemeProvider>
        {/* <AlertBadge></AlertBadge> */}
      </body>
    </html>
  );
}
