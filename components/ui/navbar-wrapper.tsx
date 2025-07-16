"use client";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

function shouldShowNavbar(path: string) {
  return !(
    path === "/" ||
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.match(/^\/mini-quest\/[^/]+\/quiz/)
  );
}

export function NavbarWrapper() {
  const pathname = usePathname();
  if (!shouldShowNavbar(pathname)) return null;
  return <Navbar />;
}
