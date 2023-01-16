import React from "react";
import styled, { css } from "styled-components";

const Item = styled.li`
  margin: 20px 0 0 0;
  :first-child {
    margin: 0;
  }

  ${(p) =>
    p.active &&
    css`
      background-color: rgb(238, 238, 238, 0.2);
      transition: 1s;
    `}
`;

function NavItem({ children, disabled = false }) {
  return <Item role={disabled ? "presentation" : null}>{children}</Item>;
}

export default NavItem;
