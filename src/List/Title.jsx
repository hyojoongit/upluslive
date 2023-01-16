import styled from "styled-components";

let TitleArea = styled.p`
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-align: left;
  margin-top: 60px;
  margin-bottom: 20px;
  padding-left: 389px;
`;
function SectionTitle({ children }) {
  return <TitleArea>{children}</TitleArea>;
}

export default SectionTitle;
