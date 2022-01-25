import { BottomCard } from "./BottomCard";
import React from "react";

const bottomCards = [
  {
    title: "Discord",
    description: "Get real-time dev support from the XP.NETWORK tech team.",
    image: "/assets/discord.svg",
    link: "https://discord.gg/g3vkcsmd38",
  },
  {
    title: "GitHub",
    description:
      "Explore XP.NETWORK source code, bridge API, and latest developments.",
    image: "/assets/github-blue.svg",
    link: "https://github.com/XP-NETWORK",
  },
  {
    title: "Telegram",
    description:
      "Keep in touch with our community, receive updates and discuss anything.",
    image: "/assets/telegram.svg",
    link: "https://t.me/xp_network",
  },
];

export const BottomCards = () => {
  return (
    <div className="flex gap-6 mt-16 flex-col md:flex-row">
      {bottomCards.map((card, i) => (
        <BottomCard {...card} key={i} />
      ))}
    </div>
  );
};
