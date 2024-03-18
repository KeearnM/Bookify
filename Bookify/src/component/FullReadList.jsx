import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadItem from "./ReadItem";
import Airtable from "airtable";
import RefetchContext from "./RefetchContext";

const FullReadList = () => {
  const [fullReadList, setFullReadList] = useState([]);
  const { refetchTrigger, setRefetchTrigger, toggleRefetch } =
    useContext(RefetchContext);

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
  }, [refetchTrigger]);

  return (
    <div>
      <div className="fullReadHeader">
        {" "}
        <Link to="/" className="logoImage">
          <img
            src="https://i.ibb.co/tMw6Btg/Screenshot-2024-03-17-at-22-13-19.png"
            alt="Logo"
            border="0"
          />
        </Link>
        <div>Your Entire Read List</div>
      </div>
      <div className="fullReadWrapper">
        <div className="fullReadingList">
          <div className="Invis">{refetchTrigger ? "true" : "false"}</div>
          {fullReadList.map((record) => {
            return (
              <ReadItem
                key={record.id}
                id={record.id}
                title={record.fields.Title}
                author={record.fields.Author}
                thumbnail={record.fields.Thumbnail}
                toggleRefetch={toggleRefetch}
              ></ReadItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullReadList;
