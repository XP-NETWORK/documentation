import { Card } from "./Card";
import React from "react";

const card = [
  {
    description: "Who we are and what we can do for your business.",
    title: "What is XP.NETWORK",
    color: "#EB5260",
    image: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
        <path d="M11 11H13V17H11V11ZM11 7H13V9H11V7Z" fill="black" />
      </svg>
    ),
    link: "/docs/home",
  },
  {
    description: "Technological and methodological background of XP.NETWORK",
    title: "Whitepaper",
    color: "#FB8417",
    image: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2204_3837)">
          <path
            d="M7.80676 16H15.8068V18H7.80676V16ZM7.80676 12H15.8068V14H7.80676V12ZM13.8068 2H5.80676C4.70676 2 3.80676 2.9 3.80676 4V20C3.80676 21.1 4.69676 22 5.79676 22H17.8068C18.9068 22 19.8068 21.1 19.8068 20V8L13.8068 2ZM17.8068 20H5.80676V4H12.8068V9H17.8068V20Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_2204_3837">
            <rect width="23.1671" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    link: "https://xp.network/whitepaper/",
  },
  {
    description: "An intuitive interface for integrating the Bridge into dApps",
    title: "JavaScript API",
    color: "#5ECDF3",
    image: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 12L12 14L10 12L12 10L14 12ZM12 6L14.12 8.12L16.62 5.62L12 1L7.38 5.62L9.88 8.12L12 6ZM6 12L8.12 9.88L5.62 7.38L1 12L5.62 16.62L8.12 14.12L6 12ZM18 12L15.88 14.12L18.38 16.62L23 12L18.38 7.38L15.88 9.88L18 12ZM12 18L9.88 15.88L7.38 18.38L12 23L16.62 18.38L14.12 15.88L12 18Z"
          fill="black"
        />
      </svg>
    ),
    link: "https://xp.network/api/",
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
