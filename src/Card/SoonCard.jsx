import styled, { css } from "styled-components";

let Frame = styled.div`
  width: 184px;
  height: 180px;
  border-radius: 16px;
  margin: 0 20px 60px 0;
  display: inline-block;
  position: relative;
  overflow: visible;
`;

let Card = styled.div`
  background-color: rgba(9, 13, 25);
  background-image: ${(props) => props.image};
  background-size: contain;
  border-radius: 16px;
  display: inline-block;
  position: absolute;
  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
  overflow: hidden;

  height: ${(props) => (props.foucused ? "180px" : "138px")};
  width: ${(props) => (props.foucused ? "240px" : "184px")};
  opacity: ${(props) => (props.focused ? "1" : "1")};
  margin: ${(props) => (props.focused ? "0" : "21px 20px 0 0")};
  /* transform: ${(props) => (props.focused ? "translateX(-28px)" : "none")};
  box-shadow: ${(props) =>
    props.focused
      ? "0px 10px 40px 20px rgba(9, 13, 25, 0.4), inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2)"
      : "inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2)"};
  z-index: ${(props) => (props.focused ? "0" : "1")};
  transition: ${(props) => (props.focused ? "ease-in-out 0.15s" : "0")}; */

  &:hover {
    margin: 0;
    transform: translateX(-28px);
    box-shadow: 0px 10px 40px 20px rgba(9, 13, 25, 0.4),
      inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
    width: 240px;
    height: 180px;
    transition: ease-in-out 0.15s;
    opacity: 100%;
    z-index: 1;
  }
`;

function SoonCard({ image, onClick, color, focused = false }) {
  return (
    <Frame>
      <Card
        image={image}
        onClick={onClick}
        color={color}
        focused={focused}
      ></Card>
    </Frame>
  );
}

export default SoonCard;
