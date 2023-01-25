import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

function isCurrent(to) {
  if (
    //
    to === "/" &&
    window.location.pathname !== "/" &&
    window.location.pathname.startsWith(to)
  ) {
    return false;
  } else return window.location.pathname.startsWith(to);
}

const Link = styled.a`
  display: block;
  color: rgb(238, 238, 238, 0.6);
  text-decoration: none;
  text-align: left;
  font-size: 32px;
  font-weight: bold;

  padding: 20px;
  border-radius: 12px;

  ${(p) =>
    p.active &&
    css`
      color: #eee;
      transition: ease-in-out 0.2s;
      background-color: rgb(238, 238, 238, 0.08);
    `}
`;

function NavLink({ children, to, active = false }) {
  let navigate = useNavigate();
  return (
    <Link
      onClick={() => {
        console.log("move to : " + to);
        navigate(to);
      }}
      active={isCurrent(to)}
    >
      {children}
    </Link>
  );
}

export default NavLink;
