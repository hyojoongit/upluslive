import styled, { css } from "styled-components";

let Frame = styled.div`
  width: 184px;
  height: 180px;
  border-radius: 16px;
  margin: 0 20px 0 0;
  display: inline-block;
  position: relative;
  overflow: visible;
`;


let Card = styled.div`
  background: ${(props) => props.color || "white"};
  border-radius: 16px;
  display: inline-block;
  position: absolute;
  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);

  height: ${(props) => (props.foucused ? "180px" : "138px")};
  width: ${(props) => (props.foucused ? "240px" : "184px")};
  opacity: ${(props) => (props.focused ? "1" : "0.8")};
  margin: ${(props) => (props.focused ? "0" : "21px 20px 0 0")};

  &:hover {
    margin: 0;
    transform: translateX(-28px);
    box-shadow: 0px 10px 40px 20px rgba(9, 13, 25, 0.4),
      inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
    width: 240px;
    height: 180px;
    transition: ease-in-out 0.2s;
    opacity: 100%;
    z-index: 1;
  }
`;

function SoonCard({ onClick, color, focused = false }) {
  return (
    <Frame>
      <Card onClick={onClick} color={color} focused={focused}></Card>
    </Frame>
  );
}

export default SoonCard;
