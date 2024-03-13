import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const apiKey = "AIzaSyD_g_PmV4I7edpZjnpRj3qctGOmwX7YPyo";
  const maxResults = 10;

  const getSearch = () => {
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
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <div>
      <input
        placeholder="Enter Search Query Here"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <button onClick={getSearch}>Search</button>
      <div>
        {searchResult.map((item, index) => {
          return <SearchItem key={index} search={item}></SearchItem>;
        })}
      </div>
    </div>
  );
};

export default Search;
