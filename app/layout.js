import { Container } from "@mui/material";

import { AuthProvider } from "./authContext";

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
            {children}
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
