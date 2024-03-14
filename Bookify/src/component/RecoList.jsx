import React, { useEffect, useState } from "react";

const RecoList = () => {
  const genreList = ["fantasy", "science fiction"];
  const [recommended, setRecommended] = useState("");
  const [randomPick, setRandomPick] = useState("");
  const [showPick, setShowPick] = useState("Peter Pan");

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
    const bookItem = books.items;
    const randomOutput = Math.floor(Math.random() * books.items.length);
    console.log("bookItem: ", bookItem);
    console.log("randomeOutput: ", randomOutput);
    return bookItem[randomOutput];
  };

  function searchByGenre(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecommended(data); //Might remove this since recommended is meant to be the list of recommended books
        setRandomPick(randomPicker(data));
        console.log(randomPick.volumeInfo.title);
      })
      .catch((error) => console.error("Error:", error));
  }

  const testClick = () => {
    searchByGenre(GenreURL("fantasy"));
  };

  useEffect(() => {
    if (randomPick && randomPick.volumeInfo) {
      console.log(randomPick.volumeInfo.title);
      setShowPick(randomPick.volumeInfo.title);
    }
  }, [randomPick]);

  return (
    <div>
      <div>Recommended</div>
      <button onClick={testClick}>Test</button>
      <label>{showPick}</label>
    </div>
  );
};

export default RecoList;
