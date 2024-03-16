import React, { useEffect, useState } from "react";
import Airtable from "airtable";

const GenreList = () => {
  const [genreList, setGenreList] = useState([]);

  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    base("Genre")
      .select()
      .eachPage((records, fetchNextPage) => {
        setGenreList(records);
        fetchNextPage();
      });
  }, []); // Empty dependency array

  const test = () => {
    console.log(genreList);
  };

  return (
    <div className="recoGenre">
      {genreList.map((genre) => (
        <div key={genre.id} className="recoGenreItem">
          {genre.fields.Genre}
        </div>
      ))}
    </div>
  );
};

export default GenreList;
