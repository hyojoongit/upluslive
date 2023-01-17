import styled, { css } from "styled-components";

let Frame = styled.div`
  width: 320px;
  height: 612px;
  border-radius: 16px;
  margin: 0 20px 0 0;
  display: inline-block;
  position: relative;
  overflow: visible;
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
  &:hover {
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
  }
`;

let TopStampArea = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  position: absolute;
  text-align: center;
  padding: 8px 12px;
  margin-block: 0px;
  top: 20px;
  right: 20px;
  border-radius: 10px;
  width: auto;
  font-size: 20px;
  font-weight: 900;
  color: #eee;
  background-color: rgba(9, 13, 25, 0.6);
`;

let TopStamp = styled.div`
  margin-right: 8px;
  color: ${(props) => (props.type == "LIVE" ? "#FA5454" : "#eee")};
`;

let BottomStampArea = styled.div`
  box-sizing: border-box;
  position: relative;
  bottom: 10px;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  background-color: rgba(9, 13, 25, 0.6);
`;

let TitleArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.6) 60%);
  padding: 20px;
  bottom: 0px;
  width: 100%;
  height: 30%;
  white-space: pre-wrap;
`;

let Title = styled.p`
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
      transition: 1s;
    `}
`;

function ProgramCard({
  image,
  video,
  type,
  views,
  title,
  onClick,
  focused = false,
}) {
  return (
    <Frame>
      <Card onClick={onClick} image={image} focused={focused}>
        <Video autoplay loop>
          <source src={video} type="video/mp4"></source>
        </Video>
        <TopStampArea>
          <TopStamp type={type}>{type}</TopStamp>
          {views}
        </TopStampArea>
        <TitleArea>
          <BottomStampArea></BottomStampArea>
          <Title>{title}</Title>
        </TitleArea>
      </Card>
    </Frame>
  );
}

export default ProgramCard;
