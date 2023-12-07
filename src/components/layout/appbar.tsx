import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeChanger } from "~/components/ThemeChanger";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession, signOut } from "next-auth/react";

interface LinksInterface {
  links: Array<{ id: number; path: string; name: string }>;
  link: { id: number; path: string; name: string };
}

const Appbar = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";
    document.documentElement.setAttribute("data-theme", theme);
  });

  const links: LinksInterface["links"] = [
    { id: 1, path: "/", name: "My Groups" },
    { id: 2, path: "/my-files", name: "My Files" },
  ];
  const router = useRouter();
  const session = useSession({ required: true });

  return (
    <div className="navbar bg-primary sm:px-4">
      <div className="navbar-start">
        <DropdownMenu />
        <div className="flex items-center gap-2">
          <div className="avatar placeholder hidden sm:block ">
            <div className="rounded-full bg-base-200 p-4 text-primary">
              <span>
                {Array.from(session.data?.user?.name ?? "A")[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <a className="leading-none text-base-100">
            <span className="block font-bold ">{session.data?.user?.name}</span>
            <small className="text-base-300">{session.data?.user?.email}</small>
          </a>
        </div>
      </div>
      {/* <div className="navbar-center hidden text-base-100 lg:flex ">
        <div className="flex gap-2 ">
          {links &&
            links.map((link: LinksInterface["link"]) => {
              return (
                <Link
                  key={link.id}
                  href={link.path}
                  className={
                    router.pathname == link.path
                      ? "rounded-lg bg-base-200 p-2 text-primary "
                      : "p-2"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
        </div>
      </div> */}

      <div className="navbar-end flex items-center gap-4  text-base-100 ">
        <ThemeChanger />
        <div className="tooltip tooltip-bottom" data-tip="Signout">
          <Icon
            onClick={() => {
              signOut();
            }}
            className="mb-[8px] h-8 w-8 cursor-pointer"
            icon={"solar:logout-2-outline"}
          />
        </div>
      </div>
    </div>
  );
};

export default Appbar;

const DropdownMenu = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <Icon
          className="h-8 w-8 text-base-100 "
          icon="solar:hamburger-menu-broken"
        />
      </div>
      <ul className="menu dropdown-content z-[1] mt-3 w-52 rounded-box border border-primary bg-base-100 p-2 shadow ">
        <li>
          {" "}
          <Link href="/">My Groups</Link>
        </li>
        <li>
          {" "}
          <Link href="/my-files">My Files</Link>
        </li>
      </ul>
    </div>
  );
};
