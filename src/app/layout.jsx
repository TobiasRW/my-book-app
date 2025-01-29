import NavWrapper from "./components/navs/NavWrapper";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import UserProvider from "./context/UserContext";

export const metadata = {
  title: "My Custom App",
  description: "A fresh start with Next.js",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>{/* Add custom meta tags or links here */}</head>
      <body className="relative sm:mx-auto sm:h-screen sm:w-[430px] sm:shadow-md sm:dark:border-x sm:dark:border-darkgray">
        <ThemeProvider>
          <UserProvider>
            <NavWrapper />
            <main>{children}</main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
