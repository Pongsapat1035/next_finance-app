"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './style/main.css'
import { AlertProvider } from "./alertContext";
import { ConfirmProvider } from "./confirmContext"
const theme = createTheme({
  palette: {
    primary: {
      main: '#232323',
      light: '#e3e6ea'
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
      base: '#D7D7D7',
    },
    text: {
      main: '#232323',
      light: '#7D7D7D',
      white: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Inria sans", "Helvetica", "Arial", sans-serif',
    body2: {
      fontSize: '1rem'
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: '#232323',
        variantMapping: {
          body1: 'p',
          body2: 'span'
        }
      },
      styleOverrides: {
        h1: {
          fontSize: '4rem',
          "@media (min-width:600px)": {
            fontSize: '6rem'
          }
        },
        h3: {
          fontSize: '2rem',
          "@media (min-width:600px)": {
            fontSize: '3rem'
          }
        },
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
            {
              props: { variant: 'outlined' },
              style: {
                borderRadius: 5,
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: 'none',
              },
            }
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
            <ConfirmProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
              </LocalizationProvider>
            </ConfirmProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
