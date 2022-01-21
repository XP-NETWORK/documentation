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
      <div className="flex space-x-10 dark:hover:text-white">
        <a className="flex space-x-2 items-center">
          <img
            className="block pt-2"
            src="/assets/logo.svg"
            alt="XP Network"
            width={20}
            height={20}
          />
          <p className="dark:text-white">XP.NETWORK</p>
        </a>

        <a className="hidden md:inline" href="/whitepaper">
          Whitepaper
        </a>
        <a className="hidden md:inline" href="https://github.com/xp-network">
          API
        </a>
        <a className="hidden md:inline" href="https://xp.network">
          XP.network
        </a>
        <a className="hidden md:inline" href="https://github.com/xp-network">
          Github
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
