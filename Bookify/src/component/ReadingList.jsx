import React from "react";
import ReadItem from "./ReadItem";

const ReadingList = (props) => {
  return (
    <div className="readingList">
      <div>Reading List</div>
      {props.readList.map((item, index) => {
        return (
          <ReadItem
            key={index}
            title={item.title}
            author={item.author}
          ></ReadItem>
        );
      })}
    </div>
  );
};

export default ReadingList;
