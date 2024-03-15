import React, { useEffect, useState } from "react";
import RecoItem from "./RecoItem";

const RecoList = () => {
  const [genreList, setGenreList] = useState(["fantasy", "science fiction"]);
  const [recommended, setRecommended] = useState([]);
  const [randomPick, setRandomPick] = useState("");
  const [showPick, setShowPick] = useState("Peter Pan");

  const apiKey = "AIzaSyDY-CD2irz5dzkeBSsAkXsW6dtAqouJ_2A";
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
        setRandomPick(randomPicker(data));
        console.log(randomPick.volumeInfo.title);
      })
      .catch((error) => console.error("Error:", error));
  }

  const testClick = () => {
    searchByGenre(GenreURL("fantasy"));
  };

  const cycleGenre = (genres, numberOfLoops) => {
    let fetchPromises = [];
    //I need to store all my promises into a list because I am making multiple fetch request
    //this ensure I can use promise.all to make sure all my promises are ran

    for (let i = 0; i < numberOfLoops; i++) {
      const currentGenre = genres[i % genres.length];
      const fetchPromise = fetch(GenreURL(currentGenre))
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          return randomPicker(data);
        })
        .catch((error) => console.log("error:", error));
      fetchPromises.push(fetchPromise);
    }

    Promise.all(fetchPromises)
      .then((results) => {
        const flattenedResults = results.flat();
        setRecommended(flattenedResults);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    cycleGenre(genreList, 5);
  }, []);

  useEffect(() => {
    console.log("Updated recommended state:", recommended);
  }, [recommended]);

  return (
    <div>
      <h2>Recommended</h2>
      <div className="recoGenre">
        <h3>Genre selected for recommendation:</h3>
        {genreList.map((item, index) => {
          return <h4>{item}</h4>;
        })}
      </div>
      <div className="RecoList">
        {recommended.map((item, index) => {
          return (
            <RecoItem
              key={index}
              title={item.volumeInfo.title}
              author={item.volumeInfo.authors}
            ></RecoItem>
          );
        })}
      </div>
      <button onClick={() => cycleGenre(genreList, 5)}>More</button>
    </div>
  );
};

export default RecoList;
