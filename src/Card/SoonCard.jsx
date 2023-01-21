import styled, { css } from "styled-components";

let Frame = styled.div`
  padding-top: 157px;

  width: 184px;
  height: 180px;
  border-radius: 16px;
  margin: 0 20px 60px 0;
  display: inline-block;
  position: relative;
  overflow: visible;
  scroll-margin: 389px;
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
  transition: ease-in-out 0.15s;

  height: 138px;
  width: 184px;
  margin: 21px 20px 0 0;

  ${({ focused }) =>
    focused &&
    css`
      height: 180px;
      width: 240px;
      margin: 0;
      opacity: 1;
      transform: translateX(-28px);
      box-shadow: 0px 10px 40px 20px rgba(9, 13, 25, 0.4),
        inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
      z-index: 1;
    `}
`;

function SoonCard({ id, image, onClick, color, focused = false }) {
  return (
    <Frame id={id}>
      <Card image={image} onClick={onClick} focused={focused}></Card>
    </Frame>
  );
}

export default SoonCard;
