import programData from "../programData.js";
import soonData from "../soonData.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgramCard from "../Card/ProgramCard";
import SoonArea from "../Area/SoonArea";
import SoonCard from "../Card/SoonCard";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";

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

//***focused가 soon에 속할때, focused된 카드의 배열 내 순서 반환***//
function searchCards(focused) {
  let parsed = parseInt(focused);
  if (parsed / 100 >= 1 && parsed / 100 < 2) {
    return parsed % 100;
  } else return 0;
}

//***인자를 id 형태(세 자리 문자열)로 변환***//
function parseToId(num) {
  if (num >= 0 && num <= 9) {
    return "00" + num;
  } else if (num >= 10 && num <= 99) {
    return "0" + num;
  } else if (num >= 100 && num <= 999) {
    return num;
  } else {
    console.log("Cannot parse to Id : id over 999");
    return;
  }
}

//***focused 가 본인인지 확인하는 함수. boolean 반환.***//
function isFocused(line, focused, i) {
  let parsed = "";
  if (line == "000") {
    parsed = parseToId(i);
  } else if (line == "100") {
    parsed = parseToId(100 + i);
  } else if (line == "200") {
    parsed = parseToId(200 + i);
  }
  return parsed == focused ? true : false;
}

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
        block: "start",
        inline: "start",
      });
    } else console.log("element to scroll not found");
  }, [focused]);

  return (
    <div>
      <SectionTitle>LIVE</SectionTitle>
      <HorizontalList>
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

      <SectionTitle>LIVE 예고</SectionTitle>
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
        <HorizontalList>
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

      <SectionTitle>아이폰</SectionTitle>
      <HorizontalList>
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

      <SectionTitle>갤럭시</SectionTitle>
      <HorizontalList>
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
