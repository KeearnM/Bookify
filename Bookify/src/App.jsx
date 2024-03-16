import { useState } from "react";
import "./App.css";
import Search from "./component/Search";
import ReadingList from "./component/ReadingList";
import RecoList from "./component/RecoList";

function App() {
  const [readList, setReadList] = useState([]);

  return (
    <div>
      <Search readList={readList} setReadList={setReadList}></Search>
      <ReadingList readList={readList}></ReadingList>
      {/* {readList.map((item, index) => {
        return <label>{item.title}</label>;
      })} */}
      <RecoList setReadList={setReadList} readList={readList}></RecoList>
      {/* <label>{import.meta.env.VITE_API_KEY_AIRTABLE}</label> */}
    </div>
  );
}

export default App;
