import React, { useEffect, useState } from "react";
import RecoItem from "./RecoItem";
import GenreList from "./GenreList";

const RecoList = (props) => {
  const [genres, setGenres] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY_GOOGLEBOOKS;
  const maxResults = 5;

  useEffect(() => {
    if (genres.length > 0) {
      cycleGenre(genres, 5);
    }
  }, [genres]); // Depend on genres state

  const fetchGenreData = async (genre) => {
    const apiKey = import.meta.env.VITE_API_KEY_GOOGLEBOOKS;
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      genre
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const totalItems = data.totalItems;
      let randomBook = null;

      if (totalItems > 0) {
        const maxResults = Math.min(totalItems, 10); // Fetch up to 10 items
        const startIndex = Math.floor(
          Math.random() * (totalItems - maxResults)
        );
        const urlWithStartIndex = `${url}&startIndex=${startIndex}`;

        // Fetch the books with the startIndex included
        const responseWithStartIndex = await fetch(urlWithStartIndex);
        const dataWithStartIndex = await responseWithStartIndex.json();

        // Check if items exist in the response
        if (dataWithStartIndex.items && dataWithStartIndex.items.length > 0) {
          // Select a random book from the fetched items
          const randomIndex = Math.floor(
            Math.random() * dataWithStartIndex.items.length
          );
          randomBook = dataWithStartIndex.items[randomIndex];
        }
      }

      return { totalItems, randomBook };
    } catch (error) {
      console.error("Error fetching genre data:", error);
      return { totalItems: 0, randomBook: null };
    }
  };

  const cycleGenre = async (genres, numberOfLoops) => {
    setLoading(true);
    let fetchPromises = [];

    for (let i = 0; i < numberOfLoops; i++) {
      const currentGenre = genres[i % genres.length].fields.Genre;
      const fetchPromise = fetchGenreData(currentGenre)
        .then(({ totalItems, randomBook }) => {
          if (randomBook) {
            return randomBook;
          }
          return null;
        })
        .catch((error) => console.log("error:", error));
      fetchPromises.push(fetchPromise);
    }

    Promise.all(fetchPromises)
      .then((results) => {
        const flattenedResults = results.flat();
        setRecommended(flattenedResults);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setLoading(false);
  };

  return (
    <div className="RecoDiv">
      <div className="recoHeader">
        <h2>Recommended</h2>
        <h3>Genre selected for recommendation:</h3>
        {loading && <div>Gimme a sec, fetching more...</div>}

        <div className="recoGenreList"></div>
        <GenreList
          genres={genres}
          setGenres={setGenres}
          toggleRefetch={props.toggleRefetch}
          refetchTrigger={props.refetchTrigger}
        ></GenreList>
      </div>
      <div className="recoWrapper">
        <div className="RecoList">
          {recommended.map((item, index) => {
            return (
              <RecoItem
                key={index}
                recoItem={item}
                setReadList={props.setReadList}
                readList={props.readList}
                toggleRefetch={props.toggleRefetch}
              ></RecoItem>
            );
          })}
        </div>
      </div>
      <div className="recoMoreButton">
        <button onClick={() => cycleGenre(genres, 5)}>More</button>
      </div>
    </div>
  );
};

export default RecoList;
