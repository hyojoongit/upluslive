import "./App.css";
import Nav from "./Nav";
import Home from "./Pages/Home";
import HomeB from "./Pages/HomeB";
import Live from "./Pages/Live";
import Player from "./Pages/Player";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import programData from "./programData.js";

function App() {
  let [programs] = useState(programData);
  const location = useLocation();
  const [showSideNav, setShowSideNav] = useState(true);

  //player에서는 sideNav 안보이게
  useEffect(() => {
    if (location.pathname.startsWith("/player")) {
      console.log(location.pathname, "no side nav");
      setShowSideNav(false);
    } else {
      console.log(location.pathname, "shows side nav");
      setShowSideNav(true);
    }
  }, [location.pathname]);

  return (
    <div
      className="App"
      style={{ margin: "0", height: "1080px", overflow: "hidden" }}
    >
      {showSideNav && <SideNav />}
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
        <Route path="/b" element={<HomeB />}></Route>
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
