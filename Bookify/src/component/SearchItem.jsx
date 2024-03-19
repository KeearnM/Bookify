import React, { useState } from "react";
import Airtable from "airtable";

const SearchItem = (props) => {
  const title = props.search?.volumeInfo?.title ?? "Nothing Found";
  const author = props.search?.volumeInfo?.authors ?? "Nothing Found";
  const categories = props.search?.volumeInfo?.categories ?? "Nothing Found";
  const smallThumbnail =
    props.search?.volumeInfo?.imageLinks?.smallThumbnail ??
    "https://placekeanu.com/500/500/g";
  const thumbnail = props.search?.volumeInfo?.imageLinks?.thumbnail ?? "N/A";

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
        props.setSearch([]);
        props.toggleRefetch();
      }
    );
  };

  return (
    <div className="searchItems">
      <div>{title}</div>
      by
      <div>{author}</div>
      <button onClick={addToReadTable}>Add</button>
    </div>
  );
};

export default SearchItem;
