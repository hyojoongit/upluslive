import { useHistory, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { isFocused, parseToId, searchCards } from "../Functions/focusFunctions";
import { EmojiHappy } from "iconsax-react";

import programData from "../programData.js";
import iphoneData from "../data/iphoneData.js";
import galaxyData from "../data/galaxyData.js";

import PlayerCard from "../Card/PlayerCard";
import ViewCard from "../Player/ViewCard";
import CardArea from "../Player/CardArea";
import HorizontalList from "../List/List";
import PlayerList from "../List/PlayerList";
import ReactModal from "../Pages/ReactionModal";

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
  display: flex;
  flex-direction: column;
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

const Participants = styled.div`
  margin: 20px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #eee;
  height: 37px;
  &::before {
    height: 12px;
    width: 12px;
    background-color: #fa5454;
    border-radius: 6px;
    content: " ";
  }
`;

const Announcement = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 20px 20px;
  padding: 20px;
  gap: 10px;
  height: auto;
  background: rgba(9, 13, 25, 0.6);
  border-radius: 20px;

  padding: 20px;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  color: #eeeeee;
  text-align: left;
`;

const ReactionThread = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 40px 40px 40px;
  gap: 32px;
  height: auto;
`;
const Reaction = styled.div`
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  color: #d1d1d7;
  &::before {
    color: #8d8e94;
    content: "${(props) => props.user}";
    margin-right: 12px;
  }
`;

const ButtonArea = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 254px;
  background: linear-gradient(
    180deg,
    rgba(9, 13, 25, 0.0001) 0%,
    rgba(9, 13, 25, 0.9) 41.15%
  );
`;

const ReactButton = styled.div`
  position: absolute;
  bottom: 0;
  margin: 40px;
  width: calc(100% - 80px);
  border-radius: 8px;
  height: 88px;
  background-color: #3e4154;
  transition: 0.2s;
  font-size: 30px;
  font-weight: 700;
  color: #aeaeb2;
  align-items: center;
  display: flex;
  justify-content: center;
  vertical-align: bottom;
  gap: 8px;

  ${(p) =>
    p.focused &&
    css`
      height: 100px;
      background-color: #eee;
      margin-bottom: 34px;
      color: #090d19;
    `}
`;

//***????????? ???????????? ????????? ????????????***//
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
  let [iphones] = useState(iphoneData);
  let [galaxies] = useState(galaxyData);

  const matchVideo = (id) => {
    if (id < 100) {
      console.log("id : ", id, " 000 ");
      return programs.find(function (a) {
        return a.id == id;
      });
    } else if (id >= 200 && id < 300) {
      console.log("id : ", id, " 200 ");

      return iphones.find(function (a) {
        return a.id == id;
      });
    } else if (id >= 300 && id < 400) {
      console.log("id : ", id, " 300 ");

      return galaxies.find(function (a) {
        return a.id == id;
      });
    }
  };

  let match = matchVideo(id);

  const [focusedCard, setFocusedCard] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      setFocusedCard(focusedCard + 1);
    } else if (e.keyCode === 37 && focusedCard !== 1) {
      setFocusedCard(focusedCard - 1);
    } else if (e.keyCode === 8) {
      navigate(-1);
    } else if (e.keyCode === 13 && focusedCard >= 4) {
      navigate("/player/" + parseToId(focusedCard - 4));
    } else if (e.keyCode === 13 && focusedCard === 3) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    console.log(focusedCard);

    if (showModal) {
      document.removeEventListener("keydown", handleKeyDown);
    } else {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCard, showModal]);

  return (
    <div style={{ margin: "0", height: "1080px", overflow: "hidden" }}>
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
            <Time>?????? 10?????????</Time>
            <Title>{match.title}</Title>
            <Description>
              ?????????+ IPTV ?????? ?????? ??????! ????????? ?????????! ????????? / IPTV ??????
              ????????? ?????? ?????? 61?????? ????????? ?????????+ 3?????? ???????????????
              ???????????????~
            </Description>
            <Time>????????????</Time>
            <Description>
              ??? ???????????? ????????? S20 ????????? ?????? ????????? <br /> 1. S20+, S20 ?????????
              ??????+?????? ?????????, 3?????? ????????? ????????? ?????? ??????!
              <br />
              2. ?????? ??? ????????? ?????? ?????? ??? ????????? 1?????? ????????? ??????!
              <br />
              3. ?????? ?????? ???, ???????????? ???????????? ?????? ??????!
              <br />
              4. ?????? ?????????+???????????? ?????? ??????!
              <br />
              5. ?????? ????????? 90??? ?????? ??????! <br />??? ????????? ????????? 11???
              19???(???)?????? ??????&?????? ?????? ???, 12??? 2???(???) ????????? ????????????
              ???????????????. <br />
              ?????? 4???????????? ?????????S20+ ??????, 5G?????????+ (55?????????), ???????????????
              ?????? ??? ????????? ?????????. <br />??? ?????? ????????? ?????? ?????? ?????? ??? ???
              ????????????.
              <br />
              <br />
            </Description>
          </TextWrapper>
        </Card2>

        <Card3 focused={focusedCard === 3} current={focusedCard}>
          <Participants>{match.views}?????????</Participants>
          <Announcement>
            ????????? ????????? Apple Watch 8 ??????! ?????? ?????? ?????? ????????? 3?????? ????????? +
            ????????? ?????? ?????? ??? ????????? 1?????? ??????!
          </Announcement>
          <ReactionThread>
            <Reaction user="????????????">
              ????????? ?????? ????????? ?????????????????? ????????? ??????????????? ????????? ????????????.
              ????????????
            </Reaction>

            <Reaction user="Song100">?????? ?????????</Reaction>
            <Reaction user="??????">
              50%??????, ???????????? ?????????....2090?????? ????????? ???????????????
            </Reaction>
            <Reaction user="?????? ?????????">
              ???????????? ????????? ?????? ?????? ????????????
            </Reaction>
            <Reaction user="????????????">
              ????????? ????????? ?????? ???????????? ???????????? ????????? ???????????????
            </Reaction>
            <Reaction user="??????">
              50%??????, ???????????? ?????????....2090?????? ????????? ???????????????
            </Reaction>
            <Reaction user="???????????????">?????? ???????????????</Reaction>
            <Reaction user="?????? ?????????">
              ???????????? ????????? ?????? ?????? ????????????
            </Reaction>
          </ReactionThread>
          <ButtonArea>
            <ReactButton focused={focusedCard === 3}>
              <EmojiHappy
                size="32"
                variant="Bold"
                style={{ paddingTop: "4px" }}
              />
              ?????? ?????????
            </ReactButton>
          </ButtonArea>
        </Card3>

        <Related focused={focusedCard === 4} current={focusedCard}>
          ????????????
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
                  matched={match.id === parseToId(i)}
                ></PlayerCard>
              );
            })}
          </PlayerList>
        </OuterWrapper>
      </CardArea>
      <ReactModal visible={showModal} setShowModal={setShowModal}></ReactModal>
    </div>
  );
}

export default Player;
