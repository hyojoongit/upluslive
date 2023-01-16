import "./App.css";
import Nav from "./Nav";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live"></Route>
        <Route path="/soon"></Route>
        <Route path="/best"></Route>
        <Route path="/shorts"></Route>
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
