import styled, { css } from "styled-components";
import { Play, Flash } from "iconsax-react";

let Frame = styled.div`
  opacity: ${(props) => props.opacity};
  width: 250px;
  height: 457px;
  border-radius: 16px;
  margin: 0 20px 0 0;
  display: inline-block;
  position: relative;
  overflow: visible;
  scroll-margin-left: 389px;
  transition: ease-in-out 0.15s;

  /* scroll-margin-top: 181px; */
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
  opacity: 80%;

  background-size: auto 406px;
  background-position: center;
  width: 250px;
  height: 334px;
  border-radius: 12px;
  margin: 25px 20px 0 0;
  display: inline-block;
  position: absolute;
  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);

  ${(p) =>
    p.focused &&
    css`
      opacity: 1;

      background-size: auto 385px;
      margin: 0;
      transform: translateX(-20px);
      box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
      width: 287px;
      height: 385px;
      transition: ease-in-out 0.15s;
      z-index: 1;
    `}
`;

let TopStampWrapper = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  position: absolute;
  text-align: center;
  margin-block: 0px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
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

let TitleArea = styled.div`
  transition: 0.2s;
  padding: 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 64px;
  white-space: pre-wrap;
  ${(p) =>
    p.focused &&
    css`
      bottom: 0px;
    `}
`;

let Title = styled.p`
  top: 0;
  display: -webkit-box;
  position: absolute;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  color: rgba(141, 142, 148, 1);
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
  ${(p) =>
    p.focused &&
    css`
      color: white;

      font-size: 22px;
      transition: 0.15s;
    `}
`;

function PlayerCard({
  id,
  opacity,
  image,
  video,
  type,
  views,
  title,
  onClick,
  focused = false,
}) {
  return (
    <Frame id={id} opacity={opacity}>
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
      </Card>
      <TitleArea focused={focused}>
        <Title focused={focused}>{title}</Title>
      </TitleArea>
    </Frame>
  );
}

export default PlayerCard;
