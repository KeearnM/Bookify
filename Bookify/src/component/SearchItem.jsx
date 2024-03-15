import React, { useState } from "react";

const SearchItem = (props) => {
  const title = props.search.volumeInfo.title;
  const author = props.search.volumeInfo.authors;
  const categories = props.search.volumeInfo.categories;
  const smallThumbnail = props.search.volumeInfo.imageLinks.smallThumbnail;
  const thumbnail = props.search.volumeInfo.imageLinks.thumbnail;

  const [searchItem, setSearchItem] = useState({});

  const AddToReadList = () => {
    const searchStuff = {};
    searchStuff.title = title;
    searchStuff.author = author;
    searchStuff.categories = categories;
    searchStuff.smallThumbnail = smallThumbnail;
    searchItem.thumbnail = thumbnail;
    props.setReadList([...props.readList, searchStuff]);
    props.setSearchResult([]);
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
