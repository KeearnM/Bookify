import React, { useEffect, useState } from "react";
import ReadItem from "./ReadItem";
import Airtable from "airtable";

const ReadingList = (props) => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  const [records, setRecords] = useState([]);

  useEffect(() => {
    base("Table 1")
      .select()
      .eachPage((records, fetchNextPage) => {
        setRecords(records);
        fetchNextPage();
      });
  });

  const test = () => {
    console.log(records);
  };

  return (
    <div className="readingList">
      <h2>Reading List</h2>
      {props.readList.map((item, index) => {
        return (
          <ReadItem
            key={index}
            title={item.title}
            author={item.author}
          ></ReadItem>
        );
      })}
      {records.map((record) => {
        return (
          <ReadItem
            key={record.id}
            id={record.id}
            title={record.fields.Title}
            author={record.fields.Author}
          ></ReadItem>
        );
      })}
      <button onClick={test}>Test</button>
    </div>
  );
};

export default ReadingList;
