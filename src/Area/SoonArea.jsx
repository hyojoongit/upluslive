import styled, { css } from "styled-components";

let Area = styled.div`
  position: relative;
  height: 669px;
`;
let Background = styled.div`
  position: absolute;
  background-color: rgb(157, 191, 222);
  background: linear-gradient(rgb(157, 191, 222, 0.6), rgb(9, 13, 25, 0.6) 90%);
  top: 89.5px;
  width: 100%;
  height: 600px;
  z-index: -1;
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
  children,
  color,
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
    </Area>
  );
}

export default SoonArea;
