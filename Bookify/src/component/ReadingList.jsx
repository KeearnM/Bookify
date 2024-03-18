import React, { useEffect, useState } from "react";
import ReadItem from "./ReadItem";
import Airtable from "airtable";
import { Route, Link } from "react-router-dom";

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
      <div className="readListHeader">
        <h2>Reading List</h2>
        <Link to="/fullreadlist" className="readListLink">
          {" "}
          or click here to access the full list!
        </Link>
      </div>
      <div className="readerWrapper">
        <div className="readingList">
          <div className="Invis">{props.refetchTrigger ? "true" : "false"}</div>
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
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
