import React, { useEffect, useState } from "react";
import ReadItem from "./ReadItem";
import Airtable from "airtable";

const ReadingList = (props) => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    base("Table 1")
      .select()
      .eachPage((records, fetchNextPage) => {
        props.setRecords(records);
        fetchNextPage();
      });
  }, [props.refetchTrigger]);

  const test = () => {
    console.log(props.records);
  };

  return (
    <div className="readDiv">
      <h2>Reading List</h2>
      <div className="readingList">
        <div className="Invis">{props.refetchTrigger ? "true" : "false"}</div>
        {/* {props.readList.map((item, index) => {
        return (
          <ReadItem
            key={index}
            title={item.title}
            author={item.author}
          ></ReadItem>
        );
      })} */}
        {props.records.slice(0, 5).map((record) => {
          return (
            <ReadItem
              key={record.id}
              id={record.id}
              title={record.fields.Title}
              author={record.fields.Author}
              thumbnail={record.fields.Thumbnail}
              toggleRefetch={props.toggleRefetch}
            ></ReadItem>
          );
        })}
        {/* <button onClick={test}>Test</button> */}
      </div>
    </div>
  );
};

export default ReadingList;
