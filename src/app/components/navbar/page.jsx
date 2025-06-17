import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import Link from "next/link";

export default function NavbarPanel() {
  return (
    <Navbar className="bg-slate-800 text-white">
      <NavbarBrand>
        <p className="font-bold text-inherit">BBJ App!</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/user-confirm/share">Share Food</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/user-confirm/need">Need Food</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/admin-map-view">Map View</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/announcements">Announcement</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
