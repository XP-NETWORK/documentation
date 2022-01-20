// import Image from "next/image";
import React from "react";

export const Card = ({ title, description, image }: CardProps) => {
  return (
    <div className="flex flex-col items-start p-6 rounded-2xl w-full dark:bg-[#323545] bg-white text-black dark:text-white">
      <img
        className="items-start"
        width={20}
        height={20}
        src={image}
        alt="info"
      />
      <h4 className="text-lg mt-4 font-medium">{title}</h4>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export interface CardProps {
  title: string;
  description: string;
  image: string;
}
