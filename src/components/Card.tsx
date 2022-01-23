// import Image from "next/image";
import React from "react";

export const Card = ({ title, description, image, link }: any) => {
  return (
    <a
      href={link}
      className="flex flex-col items-start p-6 rounded-2xl w-full hover:bg-blue-500 dark:hover:bg-blue-500 hover:no-underline hover:text-white dark:bg-[#323545] bg-white text-black dark:text-white transition ease-in-out hover:-translate-y-2"
    >
      {image}
      <h4 className="text-lg mt-4 font-medium">{title}</h4>
      <p className="mt-2">{description}</p>
    </a>
  );
};
