// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullReadList from "./pages/FullReadList.jsx";
import RefetchLayout from "./component/RefetchLayout.jsx";
import Index from "./pages/Index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<RefetchLayout />}>
          <Route index element={<Index />} />
          <Route path="/fullreadlist" element={<FullReadList />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
