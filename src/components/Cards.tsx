import { Card, CardProps } from "./Card";
import React from "react";

const card: CardProps[] = [
  {
    description: "Who we are and what we can do for your business.",
    title: "What is XP.network",
    image: "/assets/info.svg",
    link: "/docs/home",
  },
  {
    description: "Technological and methodological background of XP.network",
    title: "Whitepaper",
    image: "/assets/file.svg",
    link: "/docs/home",
  },
  {
    description: "An intuitive interface for integrating the Bridge into dApps",
    title: "JavaScript API",
    image: "/assets/api.svg",
    link: "/docs/home",
  },
];

export const Cards = () => {
  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        {card.map((c, i) => {
          return <Card {...c} key={i} />;
        })}
      </div>
    </>
  );
};
