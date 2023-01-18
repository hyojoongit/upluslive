import { useHistory, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import programData from "../programData.js";

import ProgramCard from "../Card/ProgramCard";
import ViewCard from "../Player/ViewCard";
import CardArea from "../Player/CardArea";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 532px;
  height: 930px;
  border-radius: 20px;
  background-color: rgba(9, 13, 25, 0.6);
  box-shadow: 0px 0px 20px 0px rgba(9, 13, 25, 0.2);
  position: absolute;
  transition: 0.3s ease-in-out;
  font-size: 40px;
  ${(p) =>
    p.focused &&
    css`
      width: 574px;
      height: 998px;
      box-shadow: 0px 10px 40px 20px rgba(9, 13, 25, 0.4);
      background-color: rgba(9, 13, 25, 0.5);
      color: white;
    `}
`;

//card 1 : focused -> 1 / not focused -> 1
const Card1 = styled(Card)`
  background-color: white;
  z-index: 3;
  left: ${(props) => (props.focused ? 81 : 102)}px;
`;

//card 2 : focused -> 2 / not focused -> 1(focused: 3, 4), 2
const Card2 = styled(Card)`
  z-index: 2;
  height: ${(props) => {
    if (props.current === 4 || props.current === 3) return "850px";
  }};
  left: ${(props) => {
    if (props.current === 2) return "673px";
    else if (props.current === 1) return "694px";
    else if (props.current === 4 || props.current === 3) return "132px";
  }};
`;

//card 3 : focused -> 2 / not focused -> 1(focused: 4), 3(focused: 1)
const Card3 = styled(Card)`
  z-index: 1;
  height: ${(props) => {
    if (props.current === 4) return "780px";
  }};
  left: ${(props) => {
    if (props.current === 3) return "673px";
    else if (props.current === 4) return "152px";
    else return "1286px";
  }};
`;

//***키보드 입력으로 스크롤 비활성화***//
var keys = {};
window.addEventListener(
  "keydown",
  function (e) {
    keys[e.code] = true;
    switch (e.code) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "Space":
        e.preventDefault();
        break;
      default:
        break;
    }
  },
  false
);
window.addEventListener(
  "keyup",
  function (e) {
    keys[e.code] = false;
  },
  false
);

function Player(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  let [programs] = useState(programData);
  let match = props.programs.find(function (a) {
    return a.id == id;
  });

  const [focusedCard, setFocusedCard] = useState(1);
  let focused;

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 && focusedCard !== 4) {
      setFocusedCard(focusedCard + 1);
    } else if (e.keyCode === 37 && focusedCard !== 1) {
      setFocusedCard(focusedCard - 1);
    } else if (e.keyCode === 8) {
      navigate(-1);
    } else if (e.keyCode === 13 && focused) {
      navigate("/player/" + focused);
    }
  };

  useEffect(() => {
    console.log(focusedCard);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCard]);

  return (
    <div>
      <CardArea image={match.image}>
        <Card1 focused={focusedCard === 1} current={focusedCard}>
          VIDEO
        </Card1>
        <Card2 focused={focusedCard === 2} current={focusedCard}>
          PROGRAM INFO <br></br>
          {match.title}
        </Card2>
        <Card3 focused={focusedCard === 3} current={focusedCard}>
          LIVE REACTIONS
        </Card3>
        {/* <SectionTitle>LIVE</SectionTitle>
        <HorizontalList>
          {programs.map(function (a, i) {
            return (
              <ProgramCard
                id={programs[i].id}
                image={programs[i].image}
                title={programs[i].title}
                type={programs[i].type}
                views={programs[i].views}
              ></ProgramCard>
            );
          })}
        </HorizontalList> */}
      </CardArea>

      {/* <CardArea>
        <ViewCard></ViewCard>
        <ViewCard></ViewCard>
        <ViewCard></ViewCard>
      </CardArea>

      <ProgramCard
        video={match.video}
        id={match.id}
        image={match.image}
        title={match.title}
        type={match.type}
        views={match.views}
      ></ProgramCard> */}
    </div>
  );
}

export default Player;
