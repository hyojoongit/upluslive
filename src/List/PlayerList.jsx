import styled from "styled-components";

let PlayerList = styled.ul`
  list-style: none;
  text-align: left;
  white-space: nowrap;
  overflow-x: hidden;
  margin: 0 auto;
`;

function List({ children, left }) {
  return <PlayerList left={left}>{children}</PlayerList>;
}

export default List;
