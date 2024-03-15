import React from "react";

const RecoItem = (props) => {
  return (
    <div>
      {props.title} written by {props.author}
    </div>
  );
};

export default RecoItem;
