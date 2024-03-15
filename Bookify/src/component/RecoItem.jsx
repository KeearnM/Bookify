import React from "react";

const RecoItem = (props) => {
  const title = props.recoItem.volumeInfo.title;
  const author = props.recoItem.volumeInfo.authors;
  const categories = props.recoItem.volumeInfo.categories;
  const smallThumbnail = props.recoItem.volumeInfo.imageLinks.smallThumbnail;
  const thumbnail = props.recoItem.volumeInfo.imageLinks.thumbnail;
  const description = props.recoItem.volumeInfo.description;

  const AddToReadList = () => {
    const recoStuff = {};
    recoStuff.title = title;
    recoStuff.author = author;
    recoStuff.categories = categories;
    recoStuff.smallThumbnail = smallThumbnail;
    recoStuff.thumbnail = thumbnail;
    props.setReadList([...props.readList, recoStuff]);
  };

  return (
    <div>
      {title} written by {author}{" "}
      <button onClick={() => AddToReadList()}>Add</button>
    </div>
  );
};

export default RecoItem;
