import Navigation from "./components/navs/Navigation";
import "./globals.css";

export const metadata = {
  title: "My Custom App",
  description: "A fresh start with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Add custom meta tags or links here */}</head>
      <body>
        {/* Include global components like a header or footer here */}
        <Navigation />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
