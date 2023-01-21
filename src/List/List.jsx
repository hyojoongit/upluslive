import styled from "styled-components";

let HorizontalList = styled.ul`
  list-style: none;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: visible;
  padding-left: ${(props) => props.left};
  text-align: left;
  margin: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-margin: 181px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function List({ children, left }) {
  return <HorizontalList left={left}>{children}</HorizontalList>;
}

export default List;
