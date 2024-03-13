import React, { useEffect, useState } from "react";

const RecoList = () => {
  const genreList = ["fantasy", "science fiction"];
  const [recommended, setRecommended] = useState("");

  const apiKey = "AIzaSyD_g_PmV4I7edpZjnpRj3qctGOmwX7YPyo";
  const maxResults = 5;

  const GenreURL = (Genre) => {
    const apiKey = "AIzaSyD_g_PmV4I7edpZjnpRj3qctGOmwX7YPyo";
    let url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      Genre
    )}&key=${apiKey}`;
    return url;
  };

  const randomPicker = (books) => {
    bookItem = books.items;
    randomOutput = Math.floor(Math.random() * books.totalItems);
    return bookItem[randomOutput];
  };

  const searchByGenre = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data.items);
        console.log(searchResult);
      })
      .catch((error) => console.error("Error:", error));
  };

  return <div></div>;
};

export default RecoList;
