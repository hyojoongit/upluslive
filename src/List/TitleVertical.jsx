import styled from "styled-components";

let TitleArea = styled.p`
  background: linear-gradient(
    180deg,
    rgba(9, 13, 25, 1) 0%,
    rgba(9, 13, 25, 0.5) 70%,
    rgba(9, 13, 25, 0) 100%
  );
  margin: 0;
  width: 100%;
  position: fixed;
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-align: left;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-left: ${(props) => props.left};
  z-index: 3;
`;
function SectionTitleVertical({ children, left }) {
  return <TitleArea left={left}>{children}</TitleArea>;
}

export default SectionTitleVertical;
