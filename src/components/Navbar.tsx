// import Link from "next/link";
// import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useToggle from "../hooks/useToggle";
import React from "react";
import logoDark from "../logos/white.svg";
import useDarkMode from "../hooks/useDarkMode";

export const Navbar = () => {
  const [latestCommit, SetLatestCommit] = useState<number>();
  const [isMenuOpen, toggleMenu] = useToggle(false);
  // const [isDarkMode, toggleDarkMode] = useToggle(false);
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  useEffect(() => {
    fetch("https://xpvitaldata.herokuapp.com/last-commit")
      .then((res) => res.json())
      .then((latestCommit) => {
        SetLatestCommit(Date.parse(latestCommit));
      });
  }, []);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    document.querySelector("html").classList.toggle("dark");
    console.log(isDarkMode);
  }, [isDarkMode]);

  useLayoutEffect(() => {
    document.querySelector("#menu").classList.toggle("hidden");
  }, [isMenuOpen]);

  return (
    <nav className="w-full dark:text-white relative">
      <div className="flex flex-col items-start md:flex-row md:space-x-12 md:items-center">
        <a
          href="/"
          // className="flex space-x-2 justify-center hover:no-underline"
          className="dark:text-white"
        >
          {isDarkMode ? (
            <img src="../logos/white.svg" alt="logo" />
          ) : (
            <img src="../logos/black.svg" alt="logos" />
          )}
        </a>
        <div
          id="menu"
          className={
            "flex md:flex md:pt-4 flex-col w-full mt-8 md:mt-0 md:flex-row items-start space-y-5 md:space-y-0 md:space-x-10"
          }
        >
          <a
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://docs.xp.network/docs/Whitepaper2.0/introduction/"
          >
            Whitepaper
          </a>
          <a
            className="md:inline text-sm dark:hover:text-white hover:no-underline hover:opacity-50"
            href="https://docs.xp.network/docs/API/usage"
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
      <button
        className="absolute flex space-x-2 items-center top-6 md:top-4 right-3 dark:text-white md:hidden"
        onClick={toggleMenu}
      >
        {!isMenuOpen && (
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="6.28491" width="9" height="2" rx="1" fill="currentColor" />
            <rect
              x="0.284912"
              y="12"
              width="15"
              height="2"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="0.284912"
              y="6"
              width="15"
              height="2"
              rx="1"
              fill="currentColor"
            />
          </svg>
        )}
        <span>MENU</span>
        {isMenuOpen && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.40994 6.99915L12.7099 2.70915C12.8982 2.52084 13.004 2.26545 13.004 1.99915C13.004 1.73285 12.8982 1.47745 12.7099 1.28915C12.5216 1.10084 12.2662 0.995056 11.9999 0.995056C11.7336 0.995056 11.4782 1.10084 11.2899 1.28915L6.99994 5.58915L2.70994 1.28915C2.52164 1.10084 2.26624 0.995056 1.99994 0.995056C1.73364 0.995056 1.47824 1.10084 1.28994 1.28915C1.10164 1.47745 0.995847 1.73285 0.995847 1.99915C0.995847 2.26545 1.10164 2.52084 1.28994 2.70915L5.58994 6.99915L1.28994 11.2891C1.19621 11.3821 1.12182 11.4927 1.07105 11.6146C1.02028 11.7364 0.994141 11.8671 0.994141 11.9991C0.994141 12.1312 1.02028 12.2619 1.07105 12.3837C1.12182 12.5056 1.19621 12.6162 1.28994 12.7091C1.3829 12.8029 1.4935 12.8773 1.61536 12.928C1.73722 12.9788 1.86793 13.0049 1.99994 13.0049C2.13195 13.0049 2.26266 12.9788 2.38452 12.928C2.50638 12.8773 2.61698 12.8029 2.70994 12.7091L6.99994 8.40915L11.2899 12.7091C11.3829 12.8029 11.4935 12.8773 11.6154 12.928C11.7372 12.9788 11.8679 13.0049 11.9999 13.0049C12.132 13.0049 12.2627 12.9788 12.3845 12.928C12.5064 12.8773 12.617 12.8029 12.7099 12.7091C12.8037 12.6162 12.8781 12.5056 12.9288 12.3837C12.9796 12.2619 13.0057 12.1312 13.0057 11.9991C13.0057 11.8671 12.9796 11.7364 12.9288 11.6146C12.8781 11.4927 12.8037 11.3821 12.7099 11.2891L8.40994 6.99915Z"
              fill="#212226"
            />
          </svg>
        )}
      </button>
      <div className="btn absolute top-6 md:top-5 right-28 md:right-5">
        <div className="relative rounded-full  inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-500  appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-700  cursor-pointer"
          ></label>
        </div>
      </div>
    </nav>
  );
};
