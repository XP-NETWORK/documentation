// import Link from "next/link";
// import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useToggle from "../hooks/useToggle";
import React from "react";
import logoDark from "../logos/white.svg";
import logoLight from "../logos/black.svg";
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
    <nav className="w-full  relative">
      <div className="flex flex-col items-start md:flex-row md:space-x-12 md:items-center">
        <a
          href="/"
          // className="flex space-x-2 justify-center hover:no-underline"
          className=" hover:text-inherit"
        >
          <svg
            width="192"
            height="50"
            viewBox="20 0 192 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H46V60H0V0Z"
              className="fill-[#E22440] hover:fill-[#E22440]"
            />
            <path
              d="M0.5 0.5H45.5V59.5H0.5V0.5Z"
              stroke="url(#paint0_linear_140_6683)"
              stroke-opacity="0.3"
              className="fill-[#E22440] hover:fill-[#E22440]"
            />
            <path
              d="M26.8716 50.4018L24.2817 47.8118C23.5462 47.0763 22.3569 47.0763 21.6293 47.8118L19.0394 50.4018C18.2804 51.1608 17.0442 51.1608 16.2852 50.4018L15.0333 49.1499L19.0003 45.1827C21.1833 42.9996 24.7199 42.9996 26.9029 45.1827L30.8698 49.1499L29.6179 50.4018C28.8668 51.1608 27.6384 51.1608 26.8716 50.4018Z"
              fill="white"
              className="fill-white hover:fill-white"
            />
            <path
              d="M12.8111 46.9197L11.5592 45.6678C10.8002 44.9088 10.8002 43.6725 11.5592 42.9135L14.1491 40.3235C14.8846 39.588 14.8846 38.3986 14.1491 37.6709L11.5592 35.081C10.8002 34.322 10.8002 33.0857 11.5592 32.3267L12.8111 31.0747L16.7781 35.0418C18.961 37.2249 18.961 40.7617 16.7781 42.9448L12.8111 46.9197Z"
              fill="white"
              className="fill-white hover:fill-white"
            />
            <path
              d="M22.9905 34.4237C21.5587 34.4237 20.1268 33.8838 19.0392 32.7883L15.0723 28.8212L16.3242 27.5692C17.0831 26.8103 18.3194 26.8103 19.0783 27.5692L21.6682 30.1592C22.3959 30.8869 23.593 30.8869 24.3206 30.1592L26.9105 27.5692C27.6695 26.8103 28.9057 26.8103 29.6647 27.5692L30.9166 28.8212L26.9496 32.7883C25.8542 33.8681 24.4224 34.4237 22.9905 34.4237Z"
              fill="white"
              className="fill-white hover:fill-white"
            />
            <path
              d="M33.1389 46.8885L29.1719 42.9214C26.9889 40.7383 26.9889 37.2015 29.1719 35.0184L33.1389 31.0513L34.3908 32.3032C35.1497 33.0622 35.1497 34.2985 34.3908 35.0575L31.8009 37.6475C31.0654 38.383 31.0654 39.5724 31.8009 40.3001L34.3908 42.8901C35.1497 43.6491 35.1497 44.8854 34.3908 45.6444L33.1389 46.8885Z"
              fill="white"
              className="fill-white hover:fill-white"
            />
            <path
              d="M56.3087 33.6008C56.5492 33.6008 56.6113 33.6634 56.6811 33.7573L59.8078 37.967H59.9164L62.9344 33.7808C63.0197 33.6713 63.1516 33.6087 63.3223 33.6087H65.2154C65.4093 33.6087 65.4792 33.7808 65.3861 33.8903L61.15 39.2581L65.8671 45.2362C65.9757 45.3927 65.9136 45.5413 65.7119 45.5413H63.8033C63.6327 45.5413 63.4775 45.4787 63.3689 45.3222L59.8465 40.5492H59.7379L56.3785 45.3066C56.2466 45.4631 56.0992 45.5492 55.9208 45.5492H54.0277C53.8726 45.5492 53.7872 45.4161 53.8958 45.2675L58.5431 39.305L54.3536 33.9373C54.2682 33.7808 54.307 33.6087 54.5088 33.6087H56.3087V33.6008Z"
              fill="white"
            />
            <path
              d="M75.0375 33.6008C77.6211 33.6008 79.4909 35.4866 79.4909 37.8731C79.4909 40.3301 77.6211 42.1689 75.0375 42.1689H71.2825V45.2362C71.2825 45.4318 71.1971 45.5413 71.0187 45.5413H69.6067C69.4127 45.5413 69.3041 45.4318 69.3041 45.2362V33.9138C69.3041 33.7182 69.4127 33.6087 69.6067 33.6087H75.0375V33.6008ZM75.0375 40.3066C76.6203 40.3066 77.5125 39.2737 77.5125 37.8731C77.5125 36.496 76.6203 35.4631 75.0375 35.4631H71.2825V40.3066H75.0375V40.3066Z"
              fill="white"
            />
            <path
              d="M83.6417 42.8027C84.4253 42.8027 85.1003 43.46 85.1003 44.2503C85.1003 45.0406 84.4253 45.7214 83.6417 45.7214C82.8581 45.7214 82.2064 45.0406 82.2064 44.2503C82.2064 43.46 82.8581 42.8027 83.6417 42.8027Z"
              fill="white"
            />
            <path
              d="M98.1964 45.5413C98.0412 45.5413 97.9171 45.4787 97.824 45.3457L93.937 40.3927L91.0509 36.3864L90.9422 36.4099L91.0741 39.9623V45.244C91.0741 45.4396 90.9655 45.5492 90.7483 45.5492H89.3828C89.2121 45.5492 89.119 45.4396 89.119 45.244V33.9138C89.119 33.7182 89.2044 33.6086 89.3983 33.6086H90.6785C90.8957 33.6086 91.0664 33.6712 91.175 33.8277L95.349 39.0859L97.9559 42.7244L98.0645 42.701L97.9093 39.172V33.9138C97.9093 33.7182 98.0179 33.6086 98.2119 33.6086H99.5774C99.7713 33.6086 99.8567 33.7182 99.8567 33.9138V45.244C99.8567 45.4396 99.7713 45.5492 99.5774 45.5492H98.1964V45.5413Z"
              fill="white"
            />
            <path
              d="M113.054 33.6008C113.209 33.6008 113.356 33.7338 113.356 33.906V35.1579C113.356 35.3144 113.201 35.4396 113.054 35.4396H106.188V38.3974H112.441C112.635 38.3974 112.743 38.5069 112.743 38.7025V39.9545C112.743 40.1501 112.635 40.2362 112.441 40.2362H106.188V43.6791H113.271C113.465 43.6791 113.55 43.7651 113.55 43.9451V45.2362C113.55 45.4318 113.465 45.5413 113.271 45.5413H104.496C104.302 45.5413 104.217 45.4318 104.217 45.2362V33.9138C104.217 33.7182 104.302 33.6087 104.496 33.6087H113.054V33.6008Z"
              fill="white"
            />
            <path
              d="M127.128 33.6008C127.322 33.6008 127.43 33.7104 127.43 33.906V35.1579C127.43 35.3536 127.322 35.4631 127.128 35.4631H123.109V45.2362C123.109 45.3927 123 45.5413 122.806 45.5413H121.441C121.247 45.5413 121.138 45.4318 121.138 45.2362V35.4631H117.119C116.925 35.4631 116.817 35.3536 116.817 35.1579V33.906C116.817 33.7104 116.925 33.6008 117.119 33.6008H127.128Z"
              fill="white"
            />
            <path
              d="M132.194 33.6008C132.388 33.6008 132.496 33.6634 132.543 33.8199L135.282 43.2174H135.39L138.02 33.8199C138.067 33.6634 138.175 33.6008 138.323 33.6008H139.781C139.937 33.6008 140.045 33.6634 140.084 33.8199L142.776 43.2174H142.885L145.6 33.8434C145.647 33.6869 145.755 33.6008 145.903 33.6008H147.509C147.703 33.6008 147.773 33.6869 147.703 33.8825L144.01 45.2753C143.948 45.4474 143.816 45.5413 143.637 45.5413H141.837C141.667 45.5413 141.558 45.4553 141.488 45.2596L139.099 36.8716H138.99L136.624 45.2831C136.577 45.4553 136.469 45.5492 136.321 45.5492H134.498C134.304 45.5492 134.172 45.4631 134.11 45.2831L130.394 33.8434C130.332 33.6869 130.394 33.6008 130.588 33.6008H132.194V33.6008Z"
              fill="white"
            />
            <path
              d="M156.765 33.4287C160.194 33.4287 162.871 36.0109 162.871 39.5868C162.871 43.1392 160.202 45.7213 156.765 45.7213C153.335 45.7213 150.659 43.1392 150.659 39.5868C150.659 36.0109 153.328 33.4287 156.765 33.4287ZM152.653 39.5868C152.653 42.0437 154.329 43.859 156.757 43.859C159.193 43.859 160.861 42.0437 160.861 39.5868C160.861 37.1141 159.185 35.291 156.757 35.291C154.329 35.291 152.653 37.1063 152.653 39.5868Z"
              fill="white"
            />
            <path
              d="M172.514 33.6008C175.098 33.6008 176.991 35.4866 176.991 37.8731C176.991 39.5398 176.099 40.9404 174.733 41.6446L176.712 45.197C176.82 45.3927 176.712 45.5492 176.471 45.5492H174.888C174.694 45.5492 174.539 45.3927 174.454 45.244L172.871 42.1532C172.809 42.1767 172.701 42.1767 172.569 42.1767H168.767V45.244C168.767 45.4396 168.682 45.5492 168.488 45.5492H167.122C166.882 45.5492 166.796 45.3927 166.796 45.244V33.9138C166.796 33.7182 166.905 33.6087 167.099 33.6087H172.514V33.6008ZM172.514 40.3066C174.097 40.3066 175.013 39.2737 175.013 37.8731C175.013 36.496 174.097 35.4631 172.514 35.4631H168.759V40.3066H172.514V40.3066Z"
              fill="white"
            />
            <path
              d="M182.786 33.6008C182.98 33.6008 183.089 33.7104 183.089 33.906V39.1642L188.69 33.8434C188.846 33.6869 189.063 33.6008 189.319 33.6008H191.274C191.468 33.6008 191.553 33.7964 191.406 33.9529L186.192 38.7495L191.685 45.1657C191.84 45.3222 191.747 45.5413 191.514 45.5413H189.777C189.513 45.5413 189.296 45.4553 189.125 45.2596L184.757 40.0484L183.081 41.4099V45.244C183.081 45.4396 182.972 45.5492 182.779 45.5492H181.413C181.219 45.5492 181.11 45.4396 181.11 45.244V33.9138C181.11 33.7182 181.219 33.6087 181.413 33.6087H182.786V33.6008Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_140_6683"
                x1="21.3571"
                y1="71.5"
                x2="19.9861"
                y2="52.9799"
                gradientUnits="userSpaceOnUse"
              >
                <stop />
                <stop offset="1" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
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
        className="absolute flex space-x-2 items-center top-5 md:top-4 right-1 dark:text-white md:hidden"
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
      <div className="btn absolute top-5 md:top-5 right-20 md:right-5">
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
