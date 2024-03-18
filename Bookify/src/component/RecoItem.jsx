import React, { useState } from "react";
import Airtable from "airtable";

const RecoItem = (props) => {
  const title = props.recoItem?.volumeInfo?.title ?? "No Title";
  const author = props.recoItem?.volumeInfo?.authors ?? "N/A";
  const categories = props.recoItem?.volumeInfo?.categories ?? "N/A";
  const smallThumbnail =
    props.recoItem?.volumeInfo?.imageLinks?.smallThumbnail ?? "N/A";
  const thumbnail =
    props.recoItem?.volumeInfo?.imageLinks?.thumbnail ??
    "https://placekeanu.com/500/500/g";
  const description =
    props.recoItem?.volumeInfo?.description ??
    "Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah croissant candy canes bonbon candy. Apple pie jelly beans topping carrot cake danish tart cake cheesecake. Muffin danish chocolate soufflé pastry icing bonbon oat cake. Powder cake jujubes oat cake. Lemon drops tootsie roll marshmallow halvah carrot cake.";

  const [loading, setLoading] = useState(false);

  const addToReadTable = () => {
    setLoading(true);
    const base = new Airtable({
      apiKey: import.meta.env.VITE_API_KEY_AIRTABLE,
    }).base("appSwRUsjekOwOCZ6");
    base("Table 1").create(
      [
        {
          fields: {
            Title: title,
            Author: author.toString(),
            Thumbnail: thumbnail,
            SmallThumbnail: smallThumbnail,
            Categories: categories.toString(),
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          props.toggleRefetch();
          setLoading(false);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
        props.toggleRefetch();
        setLoading(false);
      }
    );
  };

  return (
    <div className="recoItem">
      <div className="recoCard">
        <div className="recoImage recoCard__front">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="recoDescription recoCard__back">
          <p>{description}</p>
        </div>
      </div>
      <div className="recoText">
        {title} written by {author}
      </div>
      <div className="recoButtonDiv">
        <div className="loading">{loading && <div>Loading...</div>}</div>
        <button onClick={() => addToReadTable()}>Add</button>
      </div>
    </div>
  );
};

export default RecoItem;
