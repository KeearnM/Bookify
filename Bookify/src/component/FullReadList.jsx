import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadItem from "./ReadItem";
import Airtable from "airtable";

const FullReadList = () => {
  const [fullReadList, setFullReadList] = useState([]);

  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    base("Table 1")
      .select()
      .eachPage((records, fetchNextPage) => {
        setFullReadList(records);
        fetchNextPage();
      });
  }, []);

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
        {" "}
        {fullReadList.map((record) => {
          return (
            <ReadItem
              key={record.id}
              id={record.id}
              title={record.fields.Title}
              author={record.fields.Author}
              thumbnail={record.fields.Thumbnail}
            ></ReadItem>
          );
        })}
      </div>
    </div>
  );
};

export default FullReadList;
