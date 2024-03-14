import { useState } from "react";
import "./App.css";
import Search from "./component/Search";
import ReadingList from "./component/ReadingList";
import RecoList from "./component/RecoList";

function App() {
  const [readList, setReadList] = useState([]);

  const test = () => {
    console.log(readList);
  };
  return (
    <div>
      <Search readList={readList} setReadList={setReadList}></Search>
      <button onClick={test}>Test</button>
      <ReadingList readList={readList}></ReadingList>
      {/* {readList.map((item, index) => {
        return <label>{item.title}</label>;
      })} */}
      <RecoList></RecoList>
    </div>
  );
}

export default App;
