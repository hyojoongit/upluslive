import styled, { css } from "styled-components";
import { Play, Flash } from "iconsax-react";

let Frame = styled.div`
  width: 320px;
  height: 612px;
  border-radius: 16px;
  margin: 0 20px 0 0;
  display: inline-block;
  position: relative;
  overflow: visible;
  scroll-margin-left: 389px;
  scroll-margin-top: 181px;
`;

let Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 360px;
  height: 612px;
  display: none;
`;

let Card = styled.div`
  box-sizing: border-box;
  background-image: ${(props) => props.image};
  background-size: auto 544px;
  background-position: center;
  width: 320px;
  height: 544px;
  border-radius: 16px;
  margin: 0 20px 0 0;
  display: inline-block;
  position: absolute;
  opacity: 80%;
  margin-top: 34px;
  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);

  ${(p) =>
    p.focused &&
    css`
      /* border: solid rgba(255, 255, 255, 1) 8px; */
      background-size: auto 612px;
      margin: 0;
      transform: translateX(-20px);
      box-shadow: 0px 10px 60px 40px rgba(9, 13, 25, 0.4),
        inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
      width: 360px;
      height: 612px;
      transition: ease-in-out 0.15s;
      opacity: 100%;
      z-index: 1;
    `}/* &:hover {
    background-size: auto 612px;
    margin: 0;
    transform: translateX(-20px);
    box-shadow: 0px 10px 60px 40px rgba(9, 13, 25, 0.4),
      inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
    width: 360px;
    height: 612px;
    transition: ease-in-out 0.15s;
    opacity: 100%;
    z-index: 1;
  } */
`;

let TopStampWrapper = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  position: absolute;
  text-align: center;
  margin-block: 0px;
  top: 20px;
  right: 20px;
  border-radius: 10px;
  height: 40px;
  width: auto;
  font-size: 20px;
  color: #eee;
  backdrop-filter: blur(10px);
  background-color: rgba(9, 13, 25, 0.6);
  padding: ${(props) =>
    props.type == "LIVE" ? "4px 8px 4px 0px;" : "4px 8px;"};
`;

let LiveStamp = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: "#eee";
  &::before {
    height: 32px;
    font-weight: 900;
    border-radius: 10px 0 0 10px;
    margin-right: 8px;
    padding: 4px 8px;
    background-color: #fa5454;
    color: #eee;
    content: "LIVE";
  }
`;
let ViewStamp = styled.div`
  line-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: "#eee";
`;
let BestStamp = styled.div`
  line-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #eee;
`;
let ShortsStamp = styled.div`
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #eee;
  height: 100%;
`;

let BottomStampWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  bottom: 10px;
  border-radius: 10px;
  width: auto;
  height: 40px;
  padding: 4px 12px 4px 12px;
  font-size: 20px;
  font-weight: 900;
  background-color: ${(props) => {
    if (props.type === "best") return "#d04141";
    else if (props.type === "shorts") return "#1754ae";
    else return "rgba(9, 13, 25, 0.6)";
  }};
  display: ${(props) =>
    props.type == "LIVE" || props.type == "default" ? "none" : "inline-block"};
`;

let TitleArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.7) 60%);
  padding: 20px;
  bottom: 0px;
  width: 100%;
  height: 30%;
  white-space: pre-wrap;
`;

let Title = styled.p`
  display: -webkit-box;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
  ${(p) =>
    p.focused &&
    css`
      font-size: 36px;
      transition: 0.15s;
    `}
`;

function ProgramCard({
  id,
  image,
  video,
  type,
  views,
  title,
  onClick,
  focused = false,
}) {
  return (
    <Frame id={id}>
      <Card onClick={onClick} image={image} focused={focused}>
        <Video autoplay="autoplay" muted="muted" loop="loop">
          <source src={video} type="video/mp4"></source>
        </Video>
        <TopStampWrapper type={type}>
          {(type === "best" || type === "shorts" || type === "default") && (
            <ViewStamp>
              <Play></Play>
              {`${views}`}
            </ViewStamp>
          )}
          {type === "LIVE" && <LiveStamp>{`${views}`}</LiveStamp>}
        </TopStampWrapper>
        <TitleArea focused={focused}>
          <BottomStampWrapper type={type}>
            {type === "best" && <BestStamp>BEST</BestStamp>}
            {type === "shorts" && (
              <ShortsStamp>
                <Flash variant="Bold"></Flash>쇼츠
              </ShortsStamp>
            )}
          </BottomStampWrapper>
          <Title focused={focused}>{title}</Title>
        </TitleArea>
      </Card>
    </Frame>
  );
}

export default ProgramCard;
