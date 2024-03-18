import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";

const Search = (props) => {
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY_GOOGLEBOOKS;
  const maxResults = 5;

  const getSearch = () => {
    if (search !== "") {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        search
      )}&maxResults=${maxResults}&key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSearchResult(data.items);
          console.log(searchResult);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const closeSearch = () => {
    setSearchResult([]);
    setSearch([]);
  };

  useEffect(() => {}, [searchResult]);

  return (
    <div>
      <input
        className="searchInput"
        placeholder="Enter Search Query Here"
        value={search}
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
      ></input>
      <button onClick={getSearch}>Search</button>
      <button onClick={closeSearch}>Close Search</button>
      <div className="searchDiv">
        {searchResult.map((item, index) => {
          return (
            <SearchItem
              key={index}
              search={item}
              readList={props.readList}
              setReadList={props.setReadList}
              setSearchResult={setSearchResult}
              toggleRefetch={props.toggleRefetch}
              refetchTrigger={props.refetchTrigger}
              setSearch={setSearch}
            ></SearchItem>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
