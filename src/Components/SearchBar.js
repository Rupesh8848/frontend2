
import React from "react";
import { FaSearch } from "react-icons/fa";


export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  async function handleChange(event) {
    setSearch(event.target.value);
  }
  return (
    <div className="border-[1px] w-[40%] flex h-[48px] px-4 gap-4 rounded-[10px] ">
      <FaSearch className=" h-[100%] text-[rgb(95,99,104)]" />
      <input
        placeholder="Search"
        value={search}
        onChange={handleChange}
        className="flex w-[100%] h-[100%] outline-none placeholder:text-[rgb(95,99,104)]"
      />
    </div>
  );
}
