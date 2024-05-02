import { GitHub } from "react-feather";

export default async function Page() {
  return (
    <div className="container mx-auto p-4 space-y-2">
      <p className="text-3xl font-bold">Sign in</p>
      <a className="btn btn-primary" href="/login/github">
        <GitHub className="" />
        Sign in with GitHub
      </a>
    </div>
  );
}
