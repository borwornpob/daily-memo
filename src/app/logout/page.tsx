import { lucia, validateRequest } from "root/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  return (
    <form action={logout}>
      <button type="submit">Sign out</button>
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
