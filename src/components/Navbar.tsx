// import Link from "next/link";
// import Image from "next/image";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useToggle from "../hooks/useToggle";
import React from "react";

export const Navbar = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [latestCommit, SetLatestCommit] = useState<number>();
  const [menuOpen, toggleMenu] = useToggle(true);

  useEffect(() => {
    const html = document.querySelector("html");
    html?.classList.toggle("dark", isDarkMode);

    document.querySelector("#menu").classList.toggle("hidden");

    fetch("https://xpvitaldata.herokuapp.com/last-commit")
      .then((res) => res.json())
      .then((latestCommit) => {
        SetLatestCommit(Date.parse(latestCommit));
      });
  }, [isDarkMode, menuOpen]);

  return (
    <nav className="w-full dark:text-white relative">
      <div className="flex py-4 flex-col items-start md:flex-row md:space-x-12 md:items-center">
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
        <div
          id="menu"
          className={
            "flex md:flex flex-col w-full mt-8 md:mt-0 md:flex-row items-start space-y-5 md:space-y-0 md:space-x-10"
          }
        >
          <a
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://xp.network/whitepaper/"
          >
            Whitepaper
          </a>
          <a
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://xp.network/api/"
          >
            API
          </a>
          <a
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://xp.network"
          >
            Home
          </a>
          <a
            target="_blank"
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://github.com/xp-network"
          >
            GitHub
            <span className="text-xs ml-2 px-2 text-black bg-gray-200  dark:bg-gray-700 dark:text-white rounded-full">
              <svg
                className="inline-block mr-1 mb-1"
                width="7"
                height="8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.5" cy="4" r="3.5" fill="#1BEA6E" />
              </svg>
              Latest commit {new Date(latestCommit).toLocaleDateString()}
            </span>
          </a>
        </div>
      </div>
      <button className="absolute top-5 right-5 md:hidden" onClick={toggleMenu}>
        MENU
      </button>
      <div className="btn absolute top-5 right-28 md:right-5">
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={isDarkMode}
            onClick={toggle}
            className="toggle-checkbox absolute block w-5 h-5 rounded-full border bg-white appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
    </nav>
  );
};
