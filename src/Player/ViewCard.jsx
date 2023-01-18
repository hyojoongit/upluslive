import styled, { css } from "styled-components";

let Frame = styled.div`
  width: 532px;
  height: 930px;
  border-radius: 20px;
  background-color: rgba(9, 13, 25, 0.5);
`;

function ViewCard({ title }) {
  return <Frame></Frame>;
}

export default ViewCard;
