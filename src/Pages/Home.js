import programData from "../programData.js";
import soonData from "../soonData.js";
import { useState, useEffect } from "react";
import ProgramCard from "../Card/ProgramCard";
import SoonArea from "../Area/SoonArea";
import SoonCard from "../Card/SoonCard";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";

function searchCards(focused) {
  //focused가 soon에 속할때, focused된 카드의 배열 내 순서 반환
  let parsed = parseInt(focused);
  if (parsed / 100 >= 1 && parsed / 100 < 2) {
    return parsed % 100;
  } else return 0;
}

function isFocused(line, focused, i) {
  // ++ focused 가 본인인지 확인하는 함수 필요. boolean 반환.
  //    <ProgramCard ... focused=함수명()>으로 사용
  let parsed = "";
  if (line == "000") {
    //parsed 에 i -> "00i" 형태로 변환.
    parsed = "00" + i;
  } else if (line == "100") {
    parsed = "10" + i;
  } else if (line == "200") {
    parsed = "20" + i;
  }

  if (parsed == focused) {
    console.log(parsed + "is focused");
  }
  //focused, parsed 비교. 같으면 true 반환
  return parsed == focused ? true : false;
}

function Home() {
  let [programs] = useState(programData);
  let [soons] = useState(soonData);
  let [focused, setFocused] = useState("000");

  const [ScrollY, setScrollY] = useState(0);
  const [ScrollX, setScrollX] = useState(0);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    setScrollX(window.pageXOffset);
  };

  const [selected, setSelected] = useState("");

  useEffect(() => {
    console.log("ScrollY is", ScrollY);
  }, [ScrollY]);
  useEffect(() => {
    console.log("ScrollX is", ScrollX);
  }, [ScrollX]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

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
              image={programs[i].image}
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
                color={soons[i].color}
                image={
                  "url('/images/soonImages/soonThumbnail" + (i + 1) + ".png')"
                }
                focused={isFocused(100, focused, i)}
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
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("000", focused, i)}
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
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
              focused={isFocused("000", focused, i)}
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Home;
