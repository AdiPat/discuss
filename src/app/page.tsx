import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form className="p-4" action={actions.signIn}>
        <Button type="submit">Sign Up!</Button>
      </form>
      <form className="p-4" action={actions.signOut}>
        <Button type="submit">Sign Out!</Button>
      </form>
      {session?.user ? (
        <p>{JSON.stringify(session.user)}</p>
      ) : (
        <p>You are signed out!</p>
      )}
      <h1>Profile</h1>
      <Profile />
    </div>
  );
}
