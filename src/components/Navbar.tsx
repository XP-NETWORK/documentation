// import Link from "next/link";
// import Image from "next/image";
import { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import React from "react";

export const Navbar = () => {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <nav className="py-4 flex w-full justify-between dark:text-white">
      <div className="flex space-x-12 items-center">
        <a
          href="https://docs.xp.network"
          // className="flex space-x-2 justify-center hover:no-underline"
        >
          <img
            className="shrink-0"
            src={
              isDarkMode
                ? "/assets/xp-network-dark.svg"
                : "/assets/xp-network-light.svg"
            }
            alt="XP Network logo"
          />
        </a>

        <a
          className="hidden md:inline dark:hover:text-white hover:no-underline hover:opacity-50"
          href="https://xp.network/whitepaper/"
        >
          Whitepaper
        </a>
        <a
          className="hidden md:inline dark:hover:text-white hover:no-underline hover:opacity-50"
          href="https://xp.network/api/"
        >
          API
        </a>
        <a
          className="hidden md:inline dark:hover:text-white hover:no-underline hover:opacity-50"
          href="https://xp.network"
        >
          Home
        </a>
        <a
          className="hidden md:inline dark:hover:text-white hover:no-underline hover:opacity-50"
          href="https://github.com/xp-network"
        >
          GitHub
        </a>
      </div>
      <div className="btn">
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={isDarkMode}
            onClick={toggle}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
    </nav>
  );
};
