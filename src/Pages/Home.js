import programData from "../programData.js";
import iphoneData from "../data/iphoneData.js";
import galaxyData from "../data/galaxyData.js";
import internetData from "../data/internetData.js";

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

let SideGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 1080px;
  width: 120px;
  background: linear-gradient(
    270deg,
    rgba(9, 13, 25, 0) 0%,
    rgba(9, 13, 25, 0.8) 100%
  );
`;

function Home() {
  let navigate = useNavigate();
  let [programs] = useState(programData);
  let [soons] = useState(soonData);
  let [iphones] = useState(iphoneData);
  let [galaxies] = useState(galaxyData);
  let [internets] = useState(internetData);

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
      } else if (e.keyCode === 37 && parseInt(focused) % 100 > 0) {
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
      <SideGradient></SideGradient>
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
              video={programs[i].video}
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
        description={soons[searchCards(focused)].description}
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
        {iphones.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(iphones[i].id);
                console.log("focused on : " + focused);
              }}
              id={iphones[i].id}
              image={"url(" + iphones[i].image + ")"}
              title={iphones[i].title}
              type={iphones[i].type}
              views={iphones[i].views}
              focused={isFocused("200", focused, i)}
              video={iphones[i].video}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <HorizontalList left="389px">
        <SectionTitle>갤럭시</SectionTitle>
        {galaxies.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(galaxies[i].id);
                console.log("focused on : " + focused);
              }}
              id={galaxies[i].id}
              image={"url(" + galaxies[i].image + ")"}
              title={galaxies[i].title}
              type={galaxies[i].type}
              views={galaxies[i].views}
              focused={isFocused("300", focused, i)}
              video={galaxies[i].video}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <HorizontalList left="389px">
        <SectionTitle>인터넷 & TV</SectionTitle>
        {internets.map(function (a, i) {
          return (
            <ProgramCard
              onClick={() => {
                setFocused(internets[i].id);
                console.log("focused on : " + focused);
              }}
              id={internets[i].id}
              image={"url(" + internets[i].image + ")"}
              title={internets[i].title}
              type={internets[i].type}
              views={internets[i].views}
              focused={isFocused("400", focused, i)}
              video={internets[i].video}
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Home;
