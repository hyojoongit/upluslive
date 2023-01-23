import styled, { css } from "styled-components";

let Frame = styled.div`
  :nth-child(2) {
    margin-top: 181px;
  }
  transform: translateX(-24px);
  width: 340px;
  height: 207px;
  border-radius: 16px;
  margin: 0 0 40px 0;
  display: flex;
  position: relative;
  overflow: visible;
  scroll-margin-top: 181px;

  ${(p) =>
    p.focused &&
    css`
      height: 255px;
      width: 340px;
      z-index: 1;
    `}
`;

let Card = styled.div`
  flex-shrink: 0;
  background-position: center;
  background-color: rgba(9, 13, 25);
  background-image: ${(props) => props.image};
  background-size: auto 207px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  box-shadow: inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
  overflow: hidden;
  transition: ease-in-out 0.15s;
  opacity: 60%;

  height: 207px;
  width: 276px;
  margin: 0 0 40px 32px;

  ${({ focused }) =>
    focused &&
    css`
      background-size: auto 255px;
      height: 255px;
      width: 340px;
      margin: 0;
      opacity: 1;
      /* transform: translateX(-28px); */
      box-shadow: 0px 10px 40px 20px rgba(9, 13, 25, 0.4),
        inset 0px 0px 20px 0px rgba(238, 238, 238, 0.2);
      z-index: 1;
    `}

  ${(p) =>
    !p.section &&
    css`
      opacity: 0.5;
    `}
`;

function SoonCardVertical({
  id,
  image,
  onClick,
  color,
  focused = false,
  section,
}) {
  return (
    <Frame id={id} section={section} focused={focused}>
      <Card
        image={image}
        onClick={onClick}
        section={section}
        focused={focused}
      ></Card>
    </Frame>
  );
}

export default SoonCardVertical;
