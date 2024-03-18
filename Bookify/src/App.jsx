import { useContext, useEffect, useState } from "react";
import "./App.css";
import Search from "./component/Search";
import ReadingList from "./component/ReadingList";
import RecoList from "./component/RecoList";
import { Route, Link } from "react-router-dom";
import RefetchContext from "./component/RefetchContext";

function App() {
  const [readList, setReadList] = useState([]);
  const [records, setRecords] = useState([]);
  const { refetchTrigger, setRefetchTrigger, toggleRefetch } =
    useContext(RefetchContext);

  useEffect(() => {
    console.log(refetchTrigger); // This will log the updated state
  }, [refetchTrigger]);

  return (
    <div>
      <div className="topPart">
        <Link to="/" className="logoImage">
          <img
            src="https://i.ibb.co/tMw6Btg/Screenshot-2024-03-17-at-22-13-19.png"
            alt="Logo"
            border="0"
          />
        </Link>

        <Search
          readList={readList}
          setReadList={setReadList}
          refetchTrigger={refetchTrigger}
          toggleRefetch={toggleRefetch}
        ></Search>
      </div>
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
