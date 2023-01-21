import styled, { css } from "styled-components";

let Area = styled.div`
  position: relative;
  height: 790px;
`;
let Background = styled.div`
  margin-top: 157px;
  position: absolute;
  background: linear-gradient(rgb(9, 13, 25, 0.4), rgb(9, 13, 25, 1) 85%);
  top: 89.5px;
  width: 100%;
  height: 720px;
  z-index: -1;
  backdrop-filter: blur(100px);
`;
let BackgroundImg = styled.div`
  margin-top: 157px;
  position: absolute;
  background-image: ${(props) => props.image};
  background-repeat: no-repeat;
  background-size: 1920px 600px;
  top: 89.5px;
  width: 100%;
  height: 580px;
  z-index: -2;
  transition: 0.5s;
`;

let Contents = styled.div`
  position: relative;
  width: 1491px;
  height: 360px;
  margin: 130px 0 0 389px;
`;

let Body = styled.p`
  font-size: 28px;
  font-weight: 400;
  color: #eee;
  text-align: left;
  margin: 0 0 20px 0;
  width: 50%;
`;

let Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: #eee;
  text-align: left;
  margin: 0 0 20px 0;
`;

let Button = styled.button`
  display: block;
  margin-top: 40px;
  padding: 24px 44px;
  border: none;
  background: none;
  border-radius: 8px;
  font-size: 30px;
  font-weight: 700;
  height: 88px;
  color: #aeaeb2;
  background-color: #3e4154;
  &:hover {
    height: 100px;
    color: #090d19;
    background-color: #eee;
    transition: ease-in-out 0.15s;
  }
`;

function SoonArea({
  id,
  children,
  image,
  time,
  title,
  description,
  focused = false,
}) {
  return (
    <Area>
      {children}
      <Background>
        <Contents>
          <Body>{time}</Body>
          <Title>{title}</Title>
          <Body>{description}</Body>
          <Button>알림 예약</Button>
        </Contents>
      </Background>
      <BackgroundImg image={image}></BackgroundImg>
    </Area>
  );
}

export default SoonArea;
