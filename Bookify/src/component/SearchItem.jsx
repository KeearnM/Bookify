import React, { useState } from "react";
import Airtable from "airtable";

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
    searchStuff.author = author.toString();
    searchStuff.categories = categories;
    searchStuff.smallThumbnail = smallThumbnail;
    searchItem.thumbnail = thumbnail;
    props.setReadList([...props.readList, searchStuff]);
    props.setSearchResult([]);
  };

  const addToReadTable = () => {
    const base = new Airtable({
      apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
    }).base("appSwRUsjekOwOCZ6");
    base("Table 1").create(
      [
        {
          fields: {
            Title: title,
            Author: author.toString(),
            Thumbnail: thumbnail,
            SmallThumbnail: smallThumbnail,
            Categories: categories.toString(),
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
        props.setSearchResult([]);
      }
    );
  };

  return (
    <div className="searchItems">
      <div>{title}</div>
      by
      <div>{author}</div>
      {/* <button onClick={AddToReadList}>Add</button> */}
      <button onClick={addToReadTable}>Add to Airtable</button>
    </div>
  );
};

export default SearchItem;
