import React from "react";

const ReadItem = (props) => {
  return (
    <div>
      {props.title}
      {props.author}
    </div>
  );
};

export default ReadItem;
