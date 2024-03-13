import React from "react";

const SearchItem = (props) => {
  return <div>{props.search.volumeInfo.title}</div>;
};

export default SearchItem;
