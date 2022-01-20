// import Link from "next/link";
// import Image from "next/image";
import React from "react";

export const Repo = ({ name, link }: RepoProps) => {
  return (
    // <div>
    // <Link href={link}>
    <a
      href={link}
      className="flex text-black dark:text-white bg-white dark:bg-[#323545] w-full p-5 rounded-xl space-x-4"
      target="_blank"
    >
      <img src="/assets/github.svg" width={20} height={20} alt="github logo" />
      <div className="w-full">{name}</div>
      <img src="/assets/link.svg" width={20} height={20} alt="link logo" />
    </a>
    // </Link>
    // </div>
  );
};

export interface RepoProps {
  name: string;
  link: string;
}
