import { db, validateRequest } from "root/db";
import { UserCard } from "./UserCard";
import { eq } from "drizzle-orm";
import * as schema from "root/schema";

const data = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Notes",
    href: "/daily",
  },
  {
    id: 3,
    title: "About",
    href: "/about",
  },
];

export const Navbar = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <div className="drawer z-20">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <p className="text-lg font-bold">Daily Notes!</p>
            </div>
            <div className="flex-none hidden lg:block space-x-4">
              <ul className="menu menu-horizontal space-x-4">
                {/* Navbar menu content here */}
                {data.map((item) => (
                  <li key={item.id} className="self-center">
                    <a href={item.href} className="font-bold text-l">
                      {item.title}
                    </a>
                  </li>
                ))}
                <a className="btn btn-secondary" href="/login/">
                  Sign in
                </a>
              </ul>
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 font-bold">
            {/* Sidebar content here */}
            {data.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="text-bold">
                  {item.title}
                </a>
              </li>
            ))}
            <a className="btn btn-secondary" href="/login/">
              Sign in
            </a>
          </ul>
        </div>
      </div>
    );
  }

  const userInfo = await db.query.user.findFirst({
    where: eq(schema.user.id, user.id),
    with: {
      UserProfile: true,
    },
  });

  return (
    <div className="drawer z-20">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <p className="text-lg font-bold">Daily Notes!</p>
          </div>
          <div className="flex-none hidden lg:block space-x-4">
            <ul className="menu menu-horizontal space-x-4">
              {/* Navbar menu content here */}
              {data.map((item) => (
                <li key={item.id} className="self-center">
                  <a href={item.href} className="font-bold text-l">
                    {item.title}
                  </a>
                </li>
              ))}
              <UserCard
                name={
                  userInfo?.UserProfile?.firstName +
                    userInfo?.UserProfile?.lastName || "John Doe"
                }
              />
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 font-bold">
          {/* Sidebar content here */}
          <UserCard name="Borwornpob Thumrongchotikhun" />
          {data.map((item) => (
            <li key={item.id}>
              <a href={item.href} className="text-bold">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
