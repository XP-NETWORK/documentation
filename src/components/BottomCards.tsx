import { BottomCard } from "./BottomCard";
import React from "react";

const bottomCards = [
  {
    title: "Discord",
    description: "Hop in the #dev-chat to get realtime help.",
    image: "/assets/discord.svg",
    link: "https://discord.gg/g3vkcsmd38",
  },
  {
    title: "GitHub",
    description: "Hop in the #dev-chat to get realtime help.",
    image: "/assets/github-blue.svg",
    link: "https://github.com/XP-NETWORK",
  },
  {
    title: "Telegram",
    description: "Hop in the #dev-chat to get realtime help.",
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
