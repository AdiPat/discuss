"use server";
import { Link, NavbarContent } from "@nextui-org/react";
import { Navbar, NavbarBrand, Input } from "@nextui-org/react";
import React from "react";
import HeaderAuth from "@/components/header-auth";

export default async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Input />
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
