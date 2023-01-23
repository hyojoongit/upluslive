import styled, { css } from "styled-components";

let Area = styled.div`
  transform: translateX(-28px);
  top: 181px;
  position: relative;
  width: 572px;
  height: 868px;
  display: flex;
  border-radius: 20px;
  transition: ease-in-out 0.2s;
  ${(p) =>
    !p.section &&
    css`
      width: 0;
      opacity: 0;
      transition: ease-in-out 0.2s;
    `}
`;

let Background = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(9, 13, 25, 0.8);
  margin-left: 44px;
  width: 528px;
  backdrop-filter: blur(100px);
  padding: 40px;
  transition-delay: 0.2s;

  &::before {
    content: "";
    position: absolute;
    left: -44px;
    top: 132px;
    margin-top: -22px;
    border-top: 22px solid transparent;
    border-right: 22px solid rgba(37, 44, 65, 0.8);
    border-bottom: 22px solid transparent;
    border-left: 22px solid transparent;
  }
  ${(p) =>
    !p.section &&
    css`
      opacity: 0;
      transition: ease-in-out 0.2s;
      transition-delay: 0.2s;
    `}
`;

let BackgroundImg = styled.div`
  margin-left: 44px;
  position: absolute;
  border-radius: 20px;
  background-image: ${(props) => props.image};
  background-repeat: no-repeat;
  background-size: 1000px 868px;
  width: 528px;
  height: 868px;
  z-index: -2;
  transition: 0.5s;
  transition-delay: 0.2s;

  ${(p) =>
    !p.section &&
    css`
      width: 0;
      opacity: 0;
      transition-delay: 0;
    `}
`;

let Body = styled.p`
  font-size: 28px;
  font-weight: 400;
  color: #eee;
  text-align: left;
  margin: 0 0 20px 0;
  width: 100%;
`;

let Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: #eee;
  text-align: left;
  margin: 0 0 20px 0;
`;

let Button = styled.button`
  position: absolute;
  width: calc(100% - 80px);
  display: block;
  margin-bottom: 40px;
  bottom: 0;
  padding: 24px 44px;
  border: none;
  background: none;
  border-radius: 8px;
  font-size: 30px;
  font-weight: 700;
  height: 88px;
  color: #aeaeb2;
  background-color: #3e4154;

  ${(p) =>
    !p.focused &&
    css`
      height: 100px;
      color: #090d19;
      background-color: #eee;
      transition: ease-in-out 0.15s;
    `}
`;

function SoonArea({
  id,
  children,
  image,
  time,
  title,
  description,
  focused = false,
  section,
}) {
  return (
    <Area section={section}>
      <Background section={section}>
        <Body>{time}</Body>
        <Title>{title}</Title>
        <Body>{description}</Body>
        <Button focused={focused}>알림 예약</Button>
      </Background>
      <BackgroundImg image={image} section={section}></BackgroundImg>
    </Area>
  );
}

export default SoonArea;
