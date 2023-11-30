import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { ThemeChanger } from "~/components/ThemeChanger";
import styles from "../style.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  return (
    <div className={"navbar bg-primary sm:px-8 " + styles.navbar}>
      <div className="navbar-start pt-2">
        <DropdownMenu />
        <div className="ml-4 avatar placeholder mr-4 hidden sm:block">
          <div className="w-6 rounded-full bg-base-200 p-4 text-primary">
            <span>A</span>
          </div>
        </div>
        <a className="text-2xl text-base-100 ">Ahmad Mustafa</a>
      </div>
      <div className="navbar-center hidden lg:flex text-base-100 ">
        <div className="flex gap-8  ">
          {links &&
            links.map((link: LinksInterface["link"]) => {
              return (
                <Link key={link.id} href={link.path} className={router.pathname == link.path ? " bg-base-200 text-primary rounded-b-lg p-2" : 'p-2'}>
                  {link.name}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="navbar-end flex gap-4 pt-2 text-base-100 ">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default Appbar;

const DropdownMenu = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <Icon className="w-8 h-8 text-base-100 " icon='solar:hamburger-menu-broken' />
      </div>
      <ul className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-primary border ">
        <li> <Link href='/' >
          My Groups
        </Link></li>
        <li> <Link href='/my-files' >
          My Files
        </Link></li>
      </ul>
    </div>
  );
}