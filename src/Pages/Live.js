import programData from "../programData.js";
import { useState, useEffect } from "react";
import ProgramCard from "../Card/ProgramCard";
import HorizontalList from "../List/List";
import SectionTitle from "../List/Title";

function searchCards(focused) {
  //focused가 soon에 속할때, focused된 카드의 배열 내 순서 반환
  let parsed = parseInt(focused);
  if (parsed / 100 >= 1 && parsed / 100 < 2) {
    return parsed % 100;
  } else return 0;
}

// ++ focused 가 본인인지 확인하는 함수 필요. boolean 반환.
//    <ProgramCard ... focused=함수명()>으로 사용

function Live() {
  let [programs] = useState(programData);
  let [focused, setFocused] = useState("000");
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollX, setScrollX] = useState(0);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    setScrollX(window.pageXOffset);
  };

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
              video={programs[i].video}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <SectionTitle>갤럭시</SectionTitle>
      <HorizontalList>
        {programs.map(function (a, i) {
          return (
            <ProgramCard
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <SectionTitle>인터넷 & TV</SectionTitle>
      <HorizontalList>
        {programs.map(function (a, i) {
          return (
            <ProgramCard
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <SectionTitle>태블릿 & 워치</SectionTitle>
      <HorizontalList>
        {programs.map(function (a, i) {
          return (
            <ProgramCard
              image={programs[i].image}
              title={programs[i].title}
              type={programs[i].type}
              views={programs[i].views}
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Live;
