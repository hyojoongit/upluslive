import programData from "../programData.js";
import iphoneData from "../data/iphoneLiveData.js";
import galaxyData from "../data/galaxyLiveData.js";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgramCard from "../Card/ProgramCard";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";
import { isFocused, parseToId, searchCards } from "../Functions/focusFunctions";

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

function Live() {
  let navigate = useNavigate();
  let [iphones] = useState(iphoneData);
  let [galaxies] = useState(galaxyData);

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
              focused={isFocused("000", focused, i)}
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
              focused={isFocused("100", focused, i)}
              video={galaxies[i].video}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <HorizontalList left="389px">
        <SectionTitle>인터넷&TV</SectionTitle>
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
        <SectionTitle>태블릿&워치</SectionTitle>
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
        <SectionTitle>유독</SectionTitle>
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
              focused={isFocused("400", focused, i)}
              video={galaxies[i].video}
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Live;
