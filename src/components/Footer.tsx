// import Image from "next/image";
// import Link from "next/link";
import React, { useEffect } from "react";

const footerLinks = [
  {
    id: 0,
    title: "Ecosystem",
    links: [
      {
        name: "Hello",
        href: "/docs/hello",
      },
      {
        name: "Multichain NFT Bridge",
        href: "https://bridge.xp.network/",
      },
      { name: "XPNET Staking", href: "https://stake.xp.network/" },
    ],
  },
  {
    id: 1,
    title: "Docs",
    links: [
      { name: "Whitepaper", href: "https://xp.network/whitepaper/" },
      { name: "Wiki", href: "/" },
      { name: "API", href: "https://docs.xp.network/docs/API/usage" },
      { name: "GitHub", href: "https://github.com/XP-NETWORK" },
    ],
  },
  {
    id: 2,
    title: "Community",
    links: [
      { name: "Telegram", href: "https://t.me/xp_network" },
      {
        name: "Twitter",
        href: "https://twitter.com/XPNetwork_?ref_src=twsrc%5Etfw",
      },
      { name: "Reddit", href: "https://www.reddit.com/user/XP_network/" },
      {
        name: "Linkedin",
        href: "https://www.linkedin.com/company/xp-network/",
      },
      { name: "Discord", href: "/uniswap" },
      { name: "Bitclout", href: "/xp" },
    ],
  },
];

export const Footer = () => {
  return (
    <div className="py-10 bg-[#DADDE2] dark:bg-[#1C1E26]">
      <div className="max-w-4xl mx-auto px-4">
        <footer className="grid gap-y-10 md:gap-0 md:grid-cols-4 items-start">
          {/* <Link href="/"> */}
          <a className="flex items-center space-x-2">
            <img src="/assets/logo.svg" width={20} height={20} alt="logo" />
            <span className="text-black dark:text-gray-300 whitespace-nowrap">
              XP.NETWORK{" "}
              <span className="text-gray-600 dark:text-gray-400">| DOCS</span>
            </span>
          </a>
          {/* </Link> */}
          {footerLinks.map((link, i) => (
            <div key={i}>
              <h4 className="font-medium dark:text-white">{link.title}</h4>
              <div className="flex flex-col gap-y-3 mt-5">
                {link.links.map((link, i) => (
                  // <Link key={i} href={link.href}>
                  <a
                    href={link.href}
                    key={link.href}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {link.name}
                  </a>
                  // </Link>
                ))}
              </div>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
};
