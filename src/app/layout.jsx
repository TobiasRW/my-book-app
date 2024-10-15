import NavWrapper from "./components/navs/NavWrapper";
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';

export const metadata = {
  title: "My Custom App",
  description: "A fresh start with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>{/* Add custom meta tags or links here */}</head>
      <body>
        <ThemeProvider>
          <NavWrapper />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
