import { useEffect, useState } from "react";
import "./App.css";
import Search from "./component/Search";
import ReadingList from "./component/ReadingList";
import RecoList from "./component/RecoList";

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
      {/* {readList.map((item, index) => {
        return <label>{item.title}</label>;
      })} */}
      <RecoList
        setReadList={setReadList}
        readList={readList}
        refetchTrigger={refetchTrigger}
        toggleRefetch={toggleRefetch}
      ></RecoList>
      {/* <label>{import.meta.env.VITE_API_KEY_AIRTABLE}</label> */}
    </div>
  );
}

export default App;
