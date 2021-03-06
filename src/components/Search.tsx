import React from "react";
import LayoutProviders from "@theme/LayoutProviders";
import SearchBar from "@theme/SearchBar";

export const Search = () => {
  return (
    <div className="my-16 flex justify-center">
      <LayoutProviders>
        <div className="hidden">
          <SearchBar />
        </div>
        <button
          className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 dark:bg-gray-700 text-slate-400 py-2 px-3 rounded-md"
          onClick={() => {
            (
              document.querySelector(".DocSearch-Button") as HTMLButtonElement
            ).click();
          }}
        >
          Search
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.65191 0.372986C4.9706 0.372986 3.35814 1.04089 2.16927 2.22976C0.9804 3.41863 0.3125 5.03108 0.3125 6.7124C0.3125 8.39372 0.980401 10.0062 2.16927 11.195C3.35814 12.3839 4.9706 13.0518 6.65191 13.0518C8.08128 13.0518 9.46088 12.5691 10.5728 11.6939L14.4086 15.5303C14.7014 15.8232 15.1763 15.8232 15.4692 15.5303C15.7621 15.2375 15.7622 14.7626 15.4693 14.4697L11.6334 10.6333C12.5086 9.52138 12.9913 8.14177 12.9913 6.7124C12.9913 5.03108 12.3234 3.41863 11.1346 2.22976C9.94568 1.04089 8.33323 0.372986 6.65191 0.372986ZM10.091 10.1172C10.9878 9.21134 11.4913 7.98783 11.4913 6.7124C11.4913 5.42891 10.9815 4.19798 10.0739 3.29042C9.16633 2.38285 7.9354 1.87299 6.65191 1.87299C5.36842 1.87299 4.1375 2.38285 3.22993 3.29042C2.32237 4.19798 1.8125 5.42891 1.8125 6.7124C1.8125 7.99589 2.32237 9.22681 3.22993 10.1344C4.1375 11.0419 5.36842 11.5518 6.65191 11.5518C7.92736 11.5518 9.1509 11.0483 10.0568 10.1514C10.0623 10.1455 10.0679 10.1397 10.0737 10.134C10.0794 10.1283 10.0851 10.1227 10.091 10.1172Z"
                fill="#B7BFCB"
              />
            </svg>
          </span>
        </button>
      </LayoutProviders>
    </div>
  );
};
