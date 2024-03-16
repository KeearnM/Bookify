import React from "react";
import Airtable from "airtable";

const ReadItem = (props) => {
  const removeItem = () => {
    const base = new Airtable({
      apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
    }).base("appSwRUsjekOwOCZ6");

    base("Table 1").destroy([props.id], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
      props.toggleRefetch();
    });
  };
  return (
    <div id={props.id}>
      {props.title} written by {props.author}
      <button onClick={removeItem}>Remove</button>
    </div>
  );
};

export default ReadItem;
