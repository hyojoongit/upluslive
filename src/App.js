import "./App.css";
import Nav from "./Nav";
import Home from "./Pages/Home";
import Live from "./Pages/Live";
import Player from "./Pages/Player";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import programData from "./programData.js";
import soonData from "./soonData.js";

function App() {
  let [programs] = useState(programData);
  let [soons] = useState(soonData);

  return (
    <div className="App">
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/soon"></Route>
        <Route path="/best"></Route>
        <Route path="/shorts"></Route>
        <Route
          path="/player/:id"
          element={<Player programs={programs}></Player>}
        ></Route>

        <Route path="*" element={<div>페이지 없음</div>}></Route>
      </Routes>
    </div>
  );
}

function SideNav(props) {
  return (
    <Nav>
      <Nav.List>
        <Nav.Item>
          <Nav.Link to="/">홈</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/live">LIVE</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/soon">LIVE예고</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/best">베스트</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/shorts">쇼츠</Nav.Link>
        </Nav.Item>
      </Nav.List>
    </Nav>
  );
}

export default App;
