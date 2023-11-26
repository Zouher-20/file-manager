import Link from "next/link";
import { useEffect } from "react";
import { ThemeChanger } from "~/components/ThemeChanger";
import styles from "./style.module.css";
import { Icon } from "@iconify/react";

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
    { id: 2, path: "/my-files", name: "My Files" },
    { id: 3, path: "/my-groups", name: "My Groups" },
    // { id: 4, path: "/discover", name: "Discover" },
  ];

  return (
    <div
      className={
        "navbar w-screen bg-primary px-8 py-0 text-base-100 " + styles.navbar
      }
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="text-2xl">Logo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="flex gap-8 px-1 ">
          {links &&
            links.map((link: LinksInterface["link"]) => {
              return (
                <Link key={link.id} href={link.path}>
                  {link.name}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="navbar-end flex gap-4">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default Appbar;
