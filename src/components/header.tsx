"use server";
import {
  Link,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { auth } from "@/auth";
import React from "react";
import * as actions from "@/actions";

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;

  if (session?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session?.user?.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button color="primary" type="submit" variant="shadow">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );

    // authContent = (
    //   <Popover placement="left">
    //     <PopoverTrigger>
    //       <Avatar src={session.user.image || ""} />
    //     </PopoverTrigger>
    //     <PopoverContent>
    //       <div className="p-4">
    //         <form action={actions.signOut}>
    //           <Button type="submit">Sign Out</Button>
    //         </form>
    //       </div>
    //     </PopoverContent>
    //   </Popover>
    // );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button color="secondary" type="submit" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button color="secondary" type="submit" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

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
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}
