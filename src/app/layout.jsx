import "./globals.css";
import NavbarWrapper from "./components/navbar/NavbarWrapper";

export const metadata = {
  title: "BagiMakan Panel",
  description: "BagiMakan app admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
