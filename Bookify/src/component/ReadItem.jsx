import React from "react";

const ReadItem = (props) => {
  return (
    <div>
      {props.title} written by {props.author}
    </div>
  );
};

export default ReadItem;
