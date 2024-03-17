import React from "react";

const GenreItem = (props) => {
  return (
    <div className="recoGenreItem">
      {props.genre}
      <button className="genreRemoveButton">-</button>
    </div>
  );
};

export default GenreItem;
