import { useEffect, useState } from "react";
import "./App.css";
import Search from "./component/Search";
import ReadingList from "./component/ReadingList";
import RecoList from "./component/RecoList";
import { Route, Link } from "react-router-dom";

function App() {
  const [readList, setReadList] = useState([]);
  const [records, setRecords] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const toggleRefetch = () => {
    setRefetchTrigger((refetchTrigger) => !refetchTrigger);
  };

  useEffect(() => {
    console.log(refetchTrigger); // This will log the updated state
  }, [refetchTrigger]);

  return (
    <div>
      <a className="logoImage" href="https://ibb.co/LzDySWm">
        <img
          src="https://i.ibb.co/tMw6Btg/Screenshot-2024-03-17-at-22-13-19.png"
          alt="Screenshot-2024-03-17-at-22-13-19"
          border="0"
        />
      </a>
      <Search
        readList={readList}
        setReadList={setReadList}
        refetchTrigger={refetchTrigger}
        toggleRefetch={toggleRefetch}
      ></Search>
      <ReadingList
        readList={readList}
        records={records}
        setRecords={setRecords}
        refetchTrigger={refetchTrigger}
        toggleRefetch={toggleRefetch}
      ></ReadingList>
      <RecoList
        setReadList={setReadList}
        readList={readList}
        refetchTrigger={refetchTrigger}
        toggleRefetch={toggleRefetch}
      ></RecoList>
    </div>
  );
}

export default App;
