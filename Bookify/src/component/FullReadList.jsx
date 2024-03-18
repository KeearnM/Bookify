import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReadItem from "./ReadItem";
import Airtable from "airtable";
import RefetchContext from "./RefetchContext";
import styles from "./fullread.module.css";

const FullReadList = () => {
  const [fullReadList, setFullReadList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Step 1: Add loading state
  const { refetchTrigger, setRefetchTrigger, toggleRefetch } =
    useContext(RefetchContext);

  const base = new Airtable({
    apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
  }).base("appSwRUsjekOwOCZ6");

  useEffect(() => {
    let ignore = false; //when ignore is true stop, prevents double data
    setIsLoading(true);
    base("Table 1")
      .select()
      .eachPage(
        (records, fetchNextPage) => {
          if (ignore) return;
          setFullReadList((prevRecords) => [...prevRecords, ...records]);
          if (records.length > 0) {
            fetchNextPage();
          } else {
            setIsLoading(false);
          }
        },
        (error) => {
          if (error) {
            console.error(error);
          }
          if (!ignore) {
            setIsLoading(false);
          }
        }
      );
    return () => {
      ignore = true;
    };
  }, [refetchTrigger]);

  return (
    <div className="fullRead">
      <div className="fullReadHeader">
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
          {isLoading ? (
            <div>
              <a>
                <img
                  src="https://s9.gifyu.com/images/SUoFD.gif"
                  alt="output onlinegiftools"
                  border="0"
                />
              </a>
            </div> // Step 4: Display loading indicator
          ) : (
            fullReadList.map((record) => (
              <ReadItem
                key={record.id}
                id={record.id}
                title={record.fields.Title}
                author={record.fields.Author}
                thumbnail={record.fields.Thumbnail}
                toggleRefetch={toggleRefetch}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FullReadList;
