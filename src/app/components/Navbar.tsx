import Link from "next/link";
import { auth, signIn, signOut } from "../../../auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 shadow-sm font-work-sans-400">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <img src="/logo.png" alt="logo" width={100} height={50} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <div className="flex items-center gap-5">
                <Link href={"/create"}>Create</Link>

                <form
                  action={async () => {
                    "use server";

                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button>
                    <span>signout</span>
                  </button>
                </form>

                <Link href={`/user/${session?.user?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </div>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
