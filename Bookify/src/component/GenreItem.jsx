import React from "react";

const GenreItem = (props) => {
  return (
    <div className="recoGenreItem">
      {props.genre}
      <button>-</button>
    </div>
  );
};

export default GenreItem;
