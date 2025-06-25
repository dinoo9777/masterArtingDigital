import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearch ,resetAll} from "../store/slices/contentSlice";

const KeywordSearch = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.content.search);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  const onClear = () => {
    //dispatch(setSearch(""));
    dispatch(resetAll());
  };

  return (
    <div className="relative my-6 mx-5">   
      {/* 🔤 Input */}
      <input
        type="text"
        placeholder="Find the item's you're looking for"
        value={search}
        onChange={onChange}
        className="w-full p-4 px-5 bg-[#1e1e23] text-gray-100 rounded focus:outline-none"
      />
    {/* 🔍 Search Icon */}
    {!search && (
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7 7 0 103.64 3.64a7 7 0 0012.71 12.71z"
          />
        </svg>
      </span>)}
      {/* ✕ Clear Button */}
      {search && (
        <a href="#"
          onClick={(e) => { e.preventDefault(); onClear(); }}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-sm"
          aria-label="Clear search"
        >
          ✕
        </a>
      )}
    </div>
  );
};

export default KeywordSearch;
