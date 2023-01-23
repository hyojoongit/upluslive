import programData from "../programData.js";
import soonData from "../soonData.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgramCardVertical from "../Card/ProgramCardVertical";
import SoonAreaVertical from "../Area/SoonAreaVertical";
import SoonCardVertical from "../Card/SoonCardVertical";
import HorizontalList from "../List/List";
import VerticalList from "../List/VerticalList";
import SectionTitleVertical from "../List/TitleVertical";
import {
  focusedSection,
  isFocused,
  parseToId,
  searchCards,
} from "../Functions/focusFunctions";

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
      if (e.keyCode === 38 && focused > 0) {
        setFocused(parseToId(parseInt(focused) - 1));
      } else if (e.keyCode === 40) {
        setFocused(parseToId(parseInt(focused) + 1));
      } else if (e.keyCode === 37 && focused >= 100) {
        setFocused(
          parseToId(parseInt(focused) - 100 - (parseInt(focused) % 100))
        );
      } else if (e.keyCode === 39) {
        setFocused(
          parseToId(parseInt(focused) + 100 - (parseInt(focused) % 100))
        );
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
        block: "start",
        inline: "start",
      });
    } else console.log("element to scroll not found");
  }, [focused]);

  return (
    <div
      style={{
        margin: "0",
        height: "1080px",
        width: "fit-content",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
      }}
    >
      <VerticalList left="389px">
        <SectionTitleVertical>LIVE</SectionTitleVertical>
        {programs.map(function (a, i) {
          return (
            <ProgramCardVertical
              onClick={() => {
                setFocused(programs[i].id);
                console.log(
                  "focused on : " +
                    focused +
                    "focused section : " +
                    focusedSection(focused, programs[i].id)
                );
              }}
              id={programs[i].id}
              image={"url(" + programs[i].image + ")"}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("000", focused, i)}
              video={programs[i].video}
              description={programs[i].description}
              section={focusedSection(focused, programs[i].id)}
            ></ProgramCardVertical>
          );
        })}
      </VerticalList>
      <VerticalList left="40px">
        <SectionTitleVertical>LIVE 예고</SectionTitleVertical>
        {soons.map(function (a, i) {
          return (
            <SoonCardVertical
              onClick={() => {
                setFocused(soons[i].id);
                console.log(
                  "focused on : " +
                    focused +
                    "focused section : " +
                    focusedSection(focused, soons[i].id)
                );
              }}
              id={soons[i].id}
              color={soons[i].color}
              image={
                "url('/images/soonImages/soonThumbnail" + (i + 1) + ".png')"
              }
              focused={isFocused("100", focused, i)}
              section={focusedSection(focused, soons[i].id)}
            ></SoonCardVertical>
          );
        })}
      </VerticalList>
      <SoonAreaVertical
        time={soons[searchCards(focused)].time}
        title={soons[searchCards(focused)].title}
        image={
          "url('/images/soonImages/soonThumbnail" +
          (searchCards(focused) + 1) +
          ".png')"
        }
        description={soons[0].description}
        section={focusedSection(focused, 100)}
      ></SoonAreaVertical>
      <VerticalList left="40px">
        <SectionTitleVertical>LIVE</SectionTitleVertical>
        {programs.map(function (a, i) {
          return (
            <ProgramCardVertical
              onClick={() => {
                setFocused(programs[i].id);
                console.log(
                  "focused on : " +
                    focused +
                    "focused section : " +
                    focusedSection(focused, programs[i].id)
                );
              }}
              id={programs[i].id}
              image={"url(" + programs[i].image + ")"}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("000", focused, i)}
              video={programs[i].video}
              description={programs[i].description}
              section={focusedSection(focused, programs[i].id)}
            ></ProgramCardVertical>
          );
        })}
      </VerticalList>
    </div>
  );
}

export default Home;
