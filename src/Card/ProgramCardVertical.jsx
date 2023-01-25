import styled, { css } from "styled-components";
import { Play, Flash } from "iconsax-react";

let Frame = styled.div`
  :nth-child(2) {
    margin-top: 44px;
  }
  transition: ease-in-out 0.15s;
  width: 740px;
  height: 188px;
  border-radius: 16px;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: visible;
  scroll-margin-top: 537px;
  scroll-margin-left: 389px;
  ${(p) =>
    p.focused &&
    css`
      height: 544px;
      border-radius: 20px 0 0 20px;
    `}
  ${(p) =>
    !p.section &&
    css`
      opacity: 0.5;
    `}
`;

let Card = styled.div`
  transition: ease-in-out 0.15s;
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
  background-image: ${(props) => props.image};
  background-size: auto 544px;
  background-position: center;
  position: relative;
  width: 328px;
  height: 188px;
  border-radius: 16px;
  display: inline-block;
  opacity: 60%;

  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);

  ${(p) =>
    p.focused &&
    css`
      /* border: solid rgba(255, 255, 255, 1) 8px; */
      background-size: auto 612px;
      margin: 0;
      width: 328px;
      height: 544px;
      opacity: 100%;
      border-radius: 20px 0 0 20px;

      z-index: 1;
    `}
`;

let Video = styled.video`
  border-radius: 20px 0 0 20px;

  display: ${(props) => {
    if (props.focused) return "block";
    else return "none";
  }};
`;

let StampWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

let TopStampWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  text-align: center;
  margin-block: 0px;
  border-radius: 10px;
  height: 40px;
  width: auto;
  font-size: 20px;
  color: #eee;
  padding: ${(props) =>
    props.type == "LIVE" ? "4px 8px 4px 0px;" : "4px 8px 4px 0px;"};
`;

let LiveStamp = styled.div`
  display: flex;
  font-weight: 500;
  color: "#eee";
  &::before {
    height: 32px;
    font-weight: 900;
    border-radius: 10px 0 0 10px;
    margin-right: 8px;
    color: #fa5454;
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
  display: flex;
  align-items: center;
  color: #eee;
  height: 100%;
`;

let BottomStampWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
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
  transition: ease-in-out 0.15s;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 0 32px 32px 32px;
  bottom: 0px;
  white-space: pre-wrap;
  border-radius: 0 20px 20px 0;
  gap: 12px;
  ${(p) =>
    p.focused &&
    css`
      padding: 32px;

      background-color: rgba(9, 13, 25, 0.8);
      backdrop-filter: blur(100px);
    `}
`;

let Title = styled.p`
  display: -webkit-box;
  position: relative;
  width: 100%;
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

let Description = styled.p`
  display: none;
  position: relative;
  width: 100%;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;
  color: #aeaeb2;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  margin: 0;
  margin-top: 8px;
  ${(p) =>
    p.focused &&
    css`
      display: -webkit-box;
    `}
`;

let ButtonWrapper = styled.div`
  position: absolute;
  display: none;
  bottom: 32px;
  height: fit-content;
  width: 348px;
  flex-direction: column;
  ${(p) =>
    p.focused &&
    css`
      display: flex;
    `}
  &::before {
    text-align: center;
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 12px;
    color: #d1d1d7;
    content: "48분 12초 후 종료";
  }
`;

const Button = styled.div`
  display: none;
  position: relative;
  height: 68px;
  width: auto;
  border-radius: 8px;
  background-color: #eee;
  transition: 0.2s;
  font-size: 26px;
  font-weight: 700;
  color: #090d19;
  align-items: center;
  display: flex;
  justify-content: center;
  vertical-align: bottom;
  gap: 8px;

  ${(p) =>
    p.focused &&
    css`
      display: flex;
    `}
`;

let TitleBackground = styled.div`
  position: absolute;
  background-image: ${(props) => props.image};
  border-radius: 0 20px 20px 0;
  width: 0;
  height: 0;
  top: 0;
  left: 328px;
  ${(p) =>
    p.focused &&
    css`
      transition: ease-in-out 0.3s;
      transition-delay: 0.1s;
      width: 412px;
      height: 544px;
    `}
`;

function ProgramCardVertical({
  id,
  image,
  video,
  type,
  views,
  title,
  description,
  onClick,
  focused = false,
  section,
}) {
  return (
    <Frame id={id} section={section} focused={focused} image={image}>
      <Card onClick={onClick} image={image} focused={focused}>
        <Video
          focused={focused}
          src={video}
          controls={false}
          autoPlay={true}
          loop={true}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            visibility: { focused },
          }}
        />
      </Card>
      <TitleBackground focused={focused} image={image}></TitleBackground>
      <TitleArea focused={focused}>
        <StampWrapper>
          <TopStampWrapper type={type}>
            {(type === "best" || type === "shorts" || type === "default") && (
              <ViewStamp>
                <Play style={{ marginRight: "4px" }}></Play>
                {`${views}`}
              </ViewStamp>
            )}
            {type === "LIVE" && <LiveStamp>{`${views}`}</LiveStamp>}
          </TopStampWrapper>
          <BottomStampWrapper type={type}>
            {type === "best" && <BestStamp>BEST</BestStamp>}
            {type === "shorts" && (
              <ShortsStamp>
                <Flash variant="Bold"></Flash>쇼츠
              </ShortsStamp>
            )}
          </BottomStampWrapper>
        </StampWrapper>
        <Title focused={focused}>{title}</Title>
        <Description focused={focused}>{description}</Description>
        <ButtonWrapper focused={focused}>
          <Button focused={focused}>시청하기</Button>
        </ButtonWrapper>
      </TitleArea>
    </Frame>
  );
}

export default ProgramCardVertical;
