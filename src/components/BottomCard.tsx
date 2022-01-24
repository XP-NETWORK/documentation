// import Image from "next/image";
// import Link from "next/link";
import React from "react";

export const BottomCard = ({
  title,
  description,
  image,
  link,
}: BottomCardProps) => {
  return (
    <a
      href={link}
      className="flex flex-col items-start py-4 px-6 rounded-2xl w-full bg-white dark:bg-[#323545] hover:no-underline border dark:border-slate-700 transition ease-in-out hover:-translate-y-3"
    >
      <div className="flex space-x-4">
        <img
          className="items-start"
          width={20}
          height={20}
          src={image}
          alt="info"
        />
        <h4 className="text-lg mt-1 dark:text-white font-medium">{title}</h4>
      </div>
      <p className="mt-2 mb-4 dark:text-white">{description}</p>
      <img
        className="items-start"
        width={20}
        height={20}
        src="/assets/arrow.svg"
        alt="info"
      />
    </a>
  );
};

export interface BottomCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}
