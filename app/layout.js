import { Container } from "@mui/material";


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Finance track</title>
      </head>
      <body>
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
