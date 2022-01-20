import React from "react";

export const SearchBar = () => {
  return (
    <form action="" className="flex justify-center my-16">
      <input
        type="text"
        className="max-w-xs px-4 py-2 border-2 dark:bg-[#3F414B] dark:border-gray-600 focus:border-blue-500 outline-none rounded-lg"
        placeholder="Search"
      />
    </form>
  );
};
