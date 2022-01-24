// import Image from "next/image";
import React from "react";

export const Card = ({ title, description, image, link, color }: any) => {
  return (
    <a
      href={link}
      className="flex relative flex-col items-start p-6 pt-5 rounded-2xl w-full border dark:border-slate-700 hover:bg-blue-500 dark:hover:bg-blue-500 hover:no-underline hover:text-white dark:bg-[#323545] bg-white text-black dark:text-white transition ease-in-out hover:-translate-y-3"
    >
      {image}

      <h4 className="text-lg mt-2 font-medium text-md z-10">{title}</h4>
      <p className="my-2 mb-8 z-10 text-sm">{description}</p>
      <svg
        width="250"
        height="180"
        viewBox="0 0 337 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 z-0 rounded-3xl "
      >
        <g fill="transparent">
          <rect
            x="402.693"
            y="258.964"
            width="111"
            height="111"
            rx="42.5"
            transform="rotate(165 402.693 258.964)"
            stroke={color}
            stroke-width="35"
          />
        </g>
      </svg>
    </a>
  );
};
