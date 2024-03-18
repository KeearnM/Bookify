import React from "react";
import Airtable from "airtable";

const GenreItem = (props) => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  const deleteGenre = () => {
    base("Genre").destroy([props.id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        props.toggleRefetch();
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
      props.toggleRefetch();
    });
  };

  return (
    <div className="recoGenreItem">
      {props.genre}
      <button className="genreRemoveButton" onClick={deleteGenre}>
        -
      </button>
    </div>
  );
};

export default GenreItem;
