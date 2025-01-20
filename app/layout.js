
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          Header
        </div>
        {children}
      </body>
    </html>
  );
}
