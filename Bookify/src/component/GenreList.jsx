import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import GenreItem from "./GenreItem";

const GenreList = (props) => {
  const [genreList, setGenreList] = useState([]);
  const [selectGenre, setSelectGenre] = useState("");

  const genreSelection = [
    "Fantasy",
    "Science Fiction",
    "Dystopian",
    "Adventure",
    "Romance",
    "Mystery",
    "Horror",
    "Thriller",
    "NonFiction",
  ];

  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    base("Genre")
      .select()
      .eachPage((records, fetchNextPage) => {
        props.setGenres(records);
        fetchNextPage();
      });
  }, []); // Empty dependency array

  return (
    <div className="recoGenre">
      {props.genres.map((genre) => (
        <GenreItem
          key={genre.id}
          className="recoGenreItem"
          genre={genre.fields.Genre}
          id={genre.id}
        >
          {genre.fields.Genre}
        </GenreItem>
      ))}
      <div>
        <select
          value={selectGenre}
          onChange={(e) => {
            setSelectGenre(e.target.value);
          }}
        >
          {genreSelection.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <button>Add</button>
      </div>
    </div>
  );
};

export default GenreList;
