"use client";

import { usePathname } from "next/navigation";
import NavbarPanel from "./page";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Don't show navbar on /map-view route
  if (
    pathname === "/map-view" ||
    pathname === "/" ||
    pathname === "/admin-signup"
  ) {
    return null;
  }

  return <NavbarPanel />;
}
