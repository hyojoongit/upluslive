import programData from "../programData.js";
import soonData from "../soonData.js";
import { useState } from "react";
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

// ++ focused 가 본인인지 확인하는 함수. boolean 반환.
//    <ProgramCard ... focused=함수명()>으로 사용

function Home() {
  let [programs] = useState(programData);
  let [soons] = useState(soonData);
  let [focused, setFocused] = useState("000");

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
            ></ProgramCard>
          );
        })}
      </HorizontalList>

      <SectionTitle>LIVE 예고</SectionTitle>
      <SoonArea
        time={soons[searchCards(focused)].time}
        title={soons[searchCards(focused)].title}
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
                idx={i}
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
              image={programs[i].image}
              title={programs[i].title}
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
            ></ProgramCard>
          );
        })}
      </HorizontalList>
    </div>
  );
}

export default Home;
