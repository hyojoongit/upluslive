import programData from "../programData.js";
import soonData from "../soonData.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgramCard from "../Card/ProgramCard";
import SoonArea from "../Area/SoonArea";
import SoonCard from "../Card/SoonCard";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";
import { isFocused, parseToId, searchCards } from "../Functions/focusFunctions";
import styled from "styled-components";
import { Scroll } from "iconsax-react";

const ScrollContainer = styled.div`
  position: fixed;
  top: 200px;
  left: 400px;
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

function Home() {
  let navigate = useNavigate();
  let [programs] = useState(programData);
  let [soons] = useState(soonData);
  let [focused, setFocused] = useState("000");

  //***방향키 입력에 따른 focused state 변경***//
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 38 && focused >= 100) {
        setFocused(
          parseToId(parseInt(focused) - 100 - (parseInt(focused) % 100))
        );
      } else if (e.keyCode === 40) {
        setFocused(
          parseToId(parseInt(focused) + 100 - (parseInt(focused) % 100))
        );
      } else if (e.keyCode === 37 && focused > 0) {
        setFocused(parseToId(parseInt(focused) - 1));
      } else if (e.keyCode === 39) {
        setFocused(parseToId(parseInt(focused) + 1));
      } else if (e.keyCode === 13) {
        navigate("/player/" + focused);
      } else if (e.keyCode === 8) {
        navigate(-1);
      }
      console.log(">>>activate");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focused]);

  //***focused state가 변하면 해당 element를 좌측 상단으로***//
  useEffect(() => {
    const element = document.getElementById(focused);

    if (element) {
      console.log("scrollIntoView");
      console.log("element:", element.getClientRects());
      element.scrollIntoView({
        behavior: "smooth",
        // block: "start",
        inline: "start",
      });
    } else console.log("element to scroll not found");
  }, [focused]);

  return (
    <div>
      {/* <SectionTitle left="389px">LIVE</SectionTitle> */}
      <HorizontalList left="389px">
        <SectionTitle>LIVE</SectionTitle>
        {programs.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(programs[i].id);
                console.log("focused on : " + focused);
              }}
              id={programs[i].id}
              image={"url(" + programs[i].image + ")"}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("000", focused, i)}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      {/* <SectionTitle left="389px">LIVE 예고</SectionTitle> */}
      <SoonArea
        time={soons[searchCards(focused)].time}
        title={soons[searchCards(focused)].title}
        image={
          "url('/images/soonImages/soonThumbnail" +
          (searchCards(focused) + 1) +
          ".png')"
        }
        description={soons[0].description}
      >
        <HorizontalList left="389px">
          <SectionTitle>LIVE예고</SectionTitle>

          {soons.map(function (a, i) {
            return (
              <SoonCard
                onClick={() => {
                  setFocused(soons[i].id);
                  console.log("focused on : " + focused);
                }}
                id={soons[i].id}
                color={soons[i].color}
                image={
                  "url('/images/soonImages/soonThumbnail" + (i + 1) + ".png')"
                }
                focused={isFocused("100", focused, i)}
              ></SoonCard>
            );
          })}
        </HorizontalList>
      </SoonArea>

      <HorizontalList left="389px">
        <SectionTitle>아이폰</SectionTitle>

        {programs.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(programs[i].id);
                console.log("focused on : " + focused);
              }}
              id={programs[i].id}
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("300", focused, i)}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <SectionTitle left="389px">갤럭시</SectionTitle>
      <HorizontalList left="389px">
        {programs.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(programs[i].id);
                console.log("focused on : " + focused);
              }}
              id={programs[i].id}
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("400", focused, i)}
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Home;
