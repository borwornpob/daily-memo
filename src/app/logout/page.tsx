import { lucia, validateRequest } from "root/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <form action={logout}>
      <div className="container mx-auto p-4 space-y-2">
        <p className="text-3xl font-bold">Sign out</p>
        <button className="btn btn-primary" type="submit">
          Sign out
        </button>
      </div>
    </form>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    console.error("Unauthorized");
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}
