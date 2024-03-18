import React, { useState } from "react";
import Airtable from "airtable";

const ReadItem = (props) => {
  const [loading, setLoading] = useState(false);

  const removeItem = () => {
    setLoading(true);
    const base = new Airtable({
      apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
    }).base("appSwRUsjekOwOCZ6");

    base("Table 1").destroy([props.id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        setLoading(false);
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
      props.toggleRefetch();
      setLoading(false);
    });
  };
  return (
    <div id={props.id} className="readItem">
      <div className="readImage">
        <img src={props.thumbnail}></img>
      </div>
      <div className="readText">
        {props.title} written by {props.author}
      </div>
      <div className="readButtonDiv">
        <div className="loading">{loading && <div>Loading...</div>}</div>
        <button onClick={removeItem}>Remove</button>
      </div>
    </div>
  );
};

export default ReadItem;
