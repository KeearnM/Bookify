import React, { useState } from "react";

const SearchItem = (props) => {
  const title = props.search.volumeInfo.title;
  const author = props.search.volumeInfo.authors;

  const [searchItem, setSearchItem] = useState({});

  const AddToReadList = () => {
    const searchStuff = {};
    searchStuff.title = title;
    searchStuff.author = author;
    props.setReadList([...props.readList, searchStuff]);
  };

  return (
    <div className="searchItems">
      <div>{title}</div>
      by
      <div>{author}</div>
      <button onClick={AddToReadList}>Add</button>
    </div>
  );
};

export default SearchItem;