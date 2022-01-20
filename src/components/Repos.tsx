import { RepoProps } from "./Repo";
import { Repo } from "./Repo";
import React from "react";

const repos: RepoProps[] = [
  {
    name: "Audits",
    link: "https://github.com/XP-NETWORK/audits",
  },
  {
    name: "JavaScript API",
    link: "https://github.com/XP-NETWORK/xpjs",
  },
  {
    name: "Bridge Factories",
    link: "https://github.com/XP-NETWORK/XP.network-HECO-Migration",
  },
  {
    name: "Documents",
    link: "https://github.com/XP-NETWORK/documentation",
  },
  {
    name: "Language Agnostic REST API",
    link: "https://github.com/XP-NETWORK/xp-rest",
  },
  {
    name: "Bridge UI",
    link: "https://github.com/XP-NETWORK/bridge-interface",
  },
];

export const Repos = () => {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-16">
      {repos.map((repo) => (
        <Repo key={repo.name} {...repo} />
      ))}
    </div>
  );
};
