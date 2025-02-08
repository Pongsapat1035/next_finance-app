"use client"
import { Container } from "@mui/material";
import { AuthProvider } from "./authContext";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './style/main.css'

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
      light: '#E5F8D6',
      dark: '#46B693'
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
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Container>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
              </LocalizationProvider>
            </Container>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
