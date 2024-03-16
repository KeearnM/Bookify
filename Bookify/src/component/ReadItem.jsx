import React from "react";

const ReadItem = (props) => {
  return (
    <div id={props.id}>
      {props.title} written by {props.author}
    </div>
  );
};

export default ReadItem;
