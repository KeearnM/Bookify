import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const apiKey = "AIzaSyD_g_PmV4I7edpZjnpRj3qctGOmwX7YPyo";
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
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {}, [searchResult]);

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
      <div className="searchDiv">
        {searchResult.map((item, index) => {
          return (
            <SearchItem
              key={index}
              search={item}
              readList={props.readList}
              setReadList={props.setReadList}
              setSearchResult={setSearchResult}
            ></SearchItem>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
