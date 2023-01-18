import styled, { css } from "styled-components";

let Area = styled.div`
  padding: 75px 0px;
  display: flex;
  background-color: rgba(9, 13, 25, 0.6);
  background: linear-gradient(rgb(9, 13, 25, 0.4), rgb(9, 13, 25, 0.6) 50%);
  backdrop-filter: blur(100px);
  flex-direction: row;
  justify-content: start;
  align-items: start;
  position: relative;
  width: auto;
  height: 930px;
`;

let BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: ${(props) => props.image};
  background-repeat: no-repeat;
  background-size: 1920px 1080px;
  height: 100%;
  width: 100%;
  z-index: -2;
`;

let InnerArea = styled.div`
  display: flex;
  background-color: #a9be9e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  position: relative;
  width: auto;
  height: 930px;
`;

function CardArea({ children, image }) {
  return (
    <>
      <Area>
        <InnerArea>{children}</InnerArea>
      </Area>
      <BackgroundImg image={image}></BackgroundImg>
    </>
  );
}

export default CardArea;
