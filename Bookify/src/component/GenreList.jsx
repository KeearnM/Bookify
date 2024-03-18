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

  const addToReadTable = () => {
    const base = new Airtable({
      apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
    }).base("appSwRUsjekOwOCZ6");
    base("Genre").create(
      [
        {
          fields: {
            Genre: selectGenre,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          props.toggleRefetch();
          return;
        }
        props.toggleRefetch();
        records.forEach(function (record) {
          console.log(record.getId());
        });
        props.setSearchResult([]);
      }
    );
  };

  useEffect(() => {
    base("Genre")
      .select()
      .eachPage((records, fetchNextPage) => {
        props.setGenres(records);
        fetchNextPage();
      });
  }, [props.refetchTrigger]); // Empty dependency array

  return (
    <div className="recoGenre">
      {props.genres.map((genre) => (
        <GenreItem
          key={genre.id}
          className="recoGenreItem"
          genre={genre.fields.Genre}
          id={genre.id}
          toggleRefetch={props.toggleRefetch}
        >
          {genre.fields.Genre}
        </GenreItem>
      ))}
      <div>
        <div className="Invis">{props.refetchTrigger ? "true" : "false"}</div>
        <select
          value={selectGenre}
          onChange={(e) => {
            setSelectGenre(e.target.value);
            console.log(selectGenre);
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
        <button onClick={addToReadTable}>Add</button>
      </div>
    </div>
  );
};

export default GenreList;
