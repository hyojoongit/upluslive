import styled, { css } from "styled-components";

let VerticalList = styled.ul`
  width: fit-content;
  list-style: none;
  /* display: flex; */
  flex-shrink: 0;
  flex-direction: column;
  white-space: nowrap;
  overflow-x: visible;
  overflow-y: hidden;
  padding-left: ${(props) => props.left};
  text-align: left;
  margin: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* scroll-margin-left: 389px; */

  &::-webkit-scrollbar {
    display: none;
  }
  :last-child {
    margin-right: 80px;
  }
`;

function List({ children, left }) {
  return <VerticalList left={left}>{children}</VerticalList>;
}

export default List;
