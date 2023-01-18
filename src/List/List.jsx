import styled from "styled-components";

let HorizontalList = styled.ul`
  list-style: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  padding-left: 389px;
  text-align: left;
  margin: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-margin: 181px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function List({ children }) {
  return <HorizontalList>{children}</HorizontalList>;
}

export default List;
