import { useHistory, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { isFocused, parseToId, searchCards } from "../Functions/focusFunctions";

import programData from "../programData.js";

import PlayerCard from "../Card/PlayerCard";
import ViewCard from "../Player/ViewCard";
import CardArea from "../Player/CardArea";
import HorizontalList from "../List/List";
import PlayerList from "../List/PlayerList";

const Related = styled.div`
  transition: 0.2s;
  position: absolute;
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-align: left;
  margin-top: 60px;
  margin-bottom: 20px;
  width: 200px;
  top: 80px;
  margin-left: 40px;
  opacity: ${(props) => {
    if (props.current >= 4) return "1";
    else if (props.current === 3) return "0.5";
  }};
  left: ${(props) => {
    if (props.current >= 4) return "840px";
    else if (props.current === 3) return "1553px";
    else return "1920px";
  }};
  display: ${(props) => {
    if (props.current <= 2) return "block";
    else return "block";
  }};
`;

const Card = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 532px;
  height: 930px;
  border-radius: 20px;
  background-color: rgba(9, 13, 25, 0.6);
  box-shadow: 0px 0px 20px 0px rgba(9, 13, 25, 0.2);
  position: absolute;
  transition: 0.2s ease-in-out;
  font-size: 40px;
  overflow: hidden;
  ${(p) =>
    p.focused &&
    css`
      /* border: solid rgba(255, 255, 255, 1) 8px; */
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
  flex-direction: column;
  flex-wrap: nowrap;
  z-index: 2;
  height: ${(props) => {
    if (props.current >= 4 || props.current === 3) return "850px";
  }};
  left: ${(props) => {
    if (props.current === 2) return "673px";
    else if (props.current === 1) return "694px";
    else if (props.current >= 4 || props.current === 3) return "132px";
  }};
`;

//card 3 : focused -> 2 / not focused -> 1(focused: 4), 3(focused: 1)
const Card3 = styled(Card)`
  z-index: 1;
  height: ${(props) => {
    if (props.current >= 4) return "780px";
  }};
  left: ${(props) => {
    if (props.current === 3) return "673px";
    else if (props.current >= 4) return "152px";
    else return "1286px";
  }};
`;

//card 4 : focused -> 2,3 / not focused -> 3(focused: 3), out(focused: 1,2)
const OuterWrapper = styled(Card)`
  transition: 0.2s;
  overflow: visible;
  box-shadow: none;
  background-color: rgba(9, 13, 25, 0);
  border-radius: 20px 0 0 20px;
  z-index: 0;
  height: 480px;
  width: ${(props) => {
    if (props.current >= 4) return "auto";
    else if (props.current === 3) return "367px";
  }};
  opacity: ${(props) => {
    if (props.current >= 4) return "1";
    else if (props.current === 3) return "0.5";
  }};
  left: ${(props) => {
    if (props.current >= 4) return 840 - 270 * (props.current - 4) + "px";
    else if (props.current === 3) return "1553px";
    else return "1920px";
  }};
  display: ${(props) => {
    if (props.current <= 2) return "block";
    else return "block";
  }};
`;

const InfoTag = styled.div`
  letter-spacing: 1px;
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #fa5454;
  color: #eee;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 30%;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  top: 30%;
  height: 70%;
  position: absolute;
  display: inline-block;
  gap: 20px;
  width: calc(100%-80px);
  margin: 0 0 0 40px;
  padding-right: 40px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    height: 200px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(238, 238, 238, 0.1);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(174, 174, 178, 1);
  }
`;

const Time = styled.p`
  margin-block-end: 20px;
  font-size: 28px;
  font-weight: 500;
  color: #eee;
  text-align: start;
`;

const Title = styled.p`
  margin-block-start: 20px;
  margin-block-end: 40px;
  font-size: 36px;
  font-weight: 700;
  color: #eee;
  text-align: start;
`;

const Description = styled.p`
  text-align: start;
  font-size: 22px;
  font-weight: 400;
  color: #aeaeb2;
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
    if (e.keyCode === 39) {
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

  //focus된 관련방송 앞으로 스크롤 보내기
  // useEffect(() => {
  //   const element = document.getElementById(parseToId(focusedCard - 3));
  //   if (element) {
  //     console.log("scrollIntoView");
  //     console.log("element:", element.getClientRects());
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //       inline: "start",
  //     });
  //   } else console.log("element to scroll not found");
  // }, [focusedCard]);

  return (
    <div style={{ margin: "0", height: "100%", overflow: "hidden" }}>
      <CardArea image={match.image} video={match.video}>
        <Card1 focused={focusedCard === 1} current={focusedCard}>
          <InfoTag>LIVE</InfoTag>
          <video
            src={match.video}
            controls={false}
            autoPlay={true}
            loop={true}
            style={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Card1>
        <Card2 focused={focusedCard === 2} current={focusedCard}>
          {/* PROGRAM INFO <br></br>
          {match.title} */}
          <ImageWrapper>
            <img
              src="/images/soonImages/soonThumbnail3.png"
              style={{
                width: "100%",
              }}
            ></img>
          </ImageWrapper>
          <TextWrapper>
            <Time>오후 10시까지</Time>
            <Title>{match.title}</Title>
            <Description>
              디즈니+ IPTV 독점 출시 기념! 혜택도 플러스! 인터넷 / IPTV 신규
              고객을 위한 최대 61만원 혜택과 디즈니+ 3개월 구독권까지
              챙겨가세요~
            </Description>
            <Time>방송소개</Time>
            <Description>
              ♥ 프리미엄 중고폰 S20 시리즈 구매 혜택♥ <br /> 1. S20+, S20 울트라
              개통+리뷰 작성시, 3만원 신세계 상품권 전원 증정!
              <br />
              2. 방송 중 실시간 전화 상담 및 개통시 1만원 상품권 증정!
              <br />
              3. 채팅 참여 시, 스타벅스 커피쿠폰 추첨 기회!
              <br />
              4. 투명 케이스+액정필름 전원 제공!
              <br />
              5. 불량 발생시 90일 무상 교체! <br />※ 라이브 혜택은 11월
              19일(토)까지 개통&리뷰 작성 시, 12월 2일(금) 모바일 쿠폰으로
              발송됩니다. <br />
              ※월 4천원대는 갤럭시S20+ 기준, 5G라이트+ (55요금제), 공시지원금
              기준 월 기기값 입니다. <br />※ 재고 상황에 따라 조기 소진 될 수
              있습니다.
              <br />
              <br />
            </Description>
            {/* 

            <Description></Description> */}
          </TextWrapper>
        </Card2>
        <Card3 focused={focusedCard === 3} current={focusedCard}>
          LIVE REACTIONS
        </Card3>
        <Related focused={focusedCard === 4} current={focusedCard}>
          관련방송
        </Related>
        <OuterWrapper focused={focusedCard === 4} current={focusedCard}>
          <PlayerList>
            {programs.map(function (a, i) {
              return (
                <PlayerCard
                  id={programs[i].id}
                  image={"url(" + programs[i].image + ")"}
                  title={programs[i].title}
                  type={programs[i].type}
                  views={programs[i].views}
                  focused={isFocused("000", parseToId(focusedCard - 4), i)}
                  opacity={1 - (focusedCard - 4 - i) * 0.6}
                ></PlayerCard>
              );
            })}
          </PlayerList>
        </OuterWrapper>
      </CardArea>
    </div>
  );
}

export default Player;
