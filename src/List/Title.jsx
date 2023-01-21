import styled from "styled-components";

let TitleArea = styled.p`
  position: absolute;
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-align: left;
  margin-top: 60px;
  margin-bottom: 20px;
  padding-left: ${(props) => props.left};
`;
function SectionTitle({ children, left }) {
  return <TitleArea left={left}>{children}</TitleArea>;
}

export default SectionTitle;
