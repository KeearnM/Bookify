import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadItem from "./ReadItem";
import Airtable from "airtable";

const FullReadList = () => {
  const [fullReadList, setFullReadList] = useState([]);
  const [refetchFullList, setRefetchFullList] = useState(false);

  const toggleFullFetch = () => {
    console.log("I am Clicked", refetchFullList);
    setRefetchFullList((refetchFullList) => !refetchFullList);
    console.log("I am Set", refetchFullList);
  };

  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    console.log("test");
    base("Table 1")
      .select()
      .eachPage((records, fetchNextPage) => {
        setFullReadList(records);
        fetchNextPage();
      });
  }, [refetchFullList]);

  return (
    <div>
      <Link to="/" className="logoImage">
        <img
          src="https://i.ibb.co/tMw6Btg/Screenshot-2024-03-17-at-22-13-19.png"
          alt="Logo"
          border="0"
        />
      </Link>
      <div className="readingList">
        <div className="">{refetchFullList ? "true" : "false"}</div>
        <button onClick={toggleFullFetch}></button>
        {fullReadList.map((record) => {
          return (
            <ReadItem
              key={record.id}
              id={record.id}
              title={record.fields.Title}
              author={record.fields.Author}
              thumbnail={record.fields.Thumbnail}
              toggleFullFetch={toggleFullFetch}
            ></ReadItem>
          );
        })}
      </div>
    </div>
  );
};

export default FullReadList;
